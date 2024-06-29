import { Button, CircularProgress } from "@mui/material";
import {
  StreamVideo,
  StreamCall,
  SpeakerLayout,
  CallControls,
  LivestreamLayout,
  LoadingIndicator,
  StreamVideoClient,
  CallRecordingList,
} from "@stream-io/video-react-sdk";
import { ParticipantView, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLiveStreamAuth } from "../../contexts/LiveStreamAuthContext";
import axios from "axios";
import { axiosInstance } from "../../apiCalls";
const apiKey = "whsuc3edb47g";
export default function LiveStreamComponent({ liveId }) {
  const { currentUser } = useAuth();
  const [client, setClient] = useState();
  const [call, setCall] = useState();
  const [token, setToken] = useState();
  const tokenProvider = async () => {
    // if (!currentUser) return null;
    try {
      const res = await axiosInstance.get(`lectures/${liveId}/join-live`);
      setToken(res.data.token);
      console.log(res);
      // setToken(token.token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      tokenProvider();
    }
  }, [currentUser]);
  useEffect(() => {
    if (token) {
      const stringId = currentUser.user_id.toString();
      const user = {
        id: stringId,
        name: currentUser.first_name,
      };
      const newClient = new StreamVideoClient({ apiKey, user, token });
      const newCall = newClient.call("livestream", liveId);
      if (currentUser.roles.indexOf("student") != -1) {
        newCall.join();
      } else {
        newCall.join({ create: true });
      }
      setClient(newClient);
      setCall(newCall);

      return () => {
        if (client) client.disconnectUser();
      };
    }
  }, [token]);
  const [callRecordings, setCallRecordings] = useState([]);
  const getRecordings = async (call) => {
    try {
      const response = await call.queryRecordings();
      console.log(response);
      setCallRecordings(response.recordings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecordings(call);
  }, [call]);
  if (!client || !call) return <CircularProgress />;
  return (
    <>
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <LivestreamView call={call} />
          {/* <SpeakerLayout /> */}
          {/* <LivestreamLayout /> */}
          {/* <CallControls /> */}
        </StreamCall>
      </StreamVideo>
      <div className="bg-primary-100 my-3 p-3 text-gray-900">
        <CallRecordingList callRecordings={callRecordings} />
      </div>
    </>
  );
}

const LivestreamView = ({ call }) => {
  const { currentUser } = useAuth();
  const {
    useCameraState,
    useMicrophoneState,
    useParticipantCount,
    useIsCallLive,
    useParticipants,
    useScreenShareState,
    useIsCallRecordingInProgress,
  } = useCallStateHooks();

  const { camera: cam, isEnabled: isCamEnabled } = useCameraState();
  const { microphone: mic, isEnabled: isMicEnabled } = useMicrophoneState();
  const { screenShare } = useScreenShareState();
  const participantCount = useParticipantCount();
  const isCallRecordingInProgress = useIsCallRecordingInProgress();
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);
  const isLive = useIsCallLive();
  const [firstParticipant] = useParticipants(); // if first participant, then it's host

  const toggleRecording = useCallback(async () => {
    try {
      setIsAwaitingResponse(true);
      if (isCallRecordingInProgress) {
        await call?.stopRecording();
      } else {
        await call?.startRecording();
      }
    } catch (e) {
      console.error(`Failed start recording`, e);
    }
  }, [call, isCallRecordingInProgress]);
  useEffect(() => {
    if (!call) return;
    // we wait until call.recording_started/stopped event
    // to remove the loading indicator
    const eventHandlers = [
      call.on("call.recording_started", () => setIsAwaitingResponse(false)),
      call.on("call.recording_stopped", () => setIsAwaitingResponse(false)),
    ];
    return () => {
      eventHandlers.forEach((unsubscribe) => unsubscribe());
    };
  }, [call]); // ------
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      {firstParticipant ? (
        <div className="flex">
          <div className="basis-3/5">
            <ParticipantView
              trackType="screenShareTrack"
              participant={firstParticipant}
            />
          </div>
          <div className="basis-1/5">
            <ParticipantView
              trackType="videoTrack"
              participant={firstParticipant}
            />
          </div>
        </div>
      ) : (
        <div>لم يبدأ البث المباشر بعد، حاول تحديث الصفحة...</div>
      )}
      <div>{isLive ? `Live: ${participantCount}` : `In Backstage`}</div>
      {currentUser?.roles.indexOf("student") != -1 ? (
        <div>
          <Button variant="contained" onClick={() => mic.toggle()}>
            {isMicEnabled ? "إيقاف المايك" : "تفعيل المايك"}
          </Button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "4px" }}>
          <Button
            variant="contained"
            onClick={() => (isLive ? call.stopLive() : call.goLive())}
          >
            {isLive ? "إيقاف البث" : "بدء البث"}
          </Button>
          <Button variant="contained" onClick={() => cam.toggle()}>
            {isCamEnabled ? "إيقاف الكاميرا" : "تفعيل الكاميرا"}
          </Button>
          <Button variant="contained" onClick={() => mic.toggle()}>
            {isMicEnabled ? "إيقاف المايك" : "تفعيل المايك"}
          </Button>
          <Button variant="contained" onClick={() => screenShare.toggle()}>
            مشاركة الشاشة
          </Button>
          {isAwaitingResponse ? (
            <LoadingIndicator />
          ) : (
            <Button variant="contained" onClick={toggleRecording}>
              {isCallRecordingInProgress ? "إيقاف التسجيل" : "تسجيل"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
