import { Button, CircularProgress } from "@mui/material";
import {
  StreamVideo,
  StreamCall,
  SpeakerLayout,
  CallControls,
  LivestreamLayout,
  LoadingIndicator,
} from "@stream-io/video-react-sdk";
import { ParticipantView, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLiveStreamAuth } from "../../contexts/LiveStreamAuthContext";

export default function LiveStreamComponent({ liveId }) {
  const { createClient, client, call } = useLiveStreamAuth();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      createClient(currentUser.user_id, currentUser.first_name, liveId);
    }

    return () => {
      if (client) client.disconnectUser();
    };
  }, []);
  useEffect(() => {
    if (call) {
      if (currentUser.roles.indexOf("student") != -1) {
        call.join({ create: true });
      } else {
        call.join({ create: true });
      }
    }
  }, [call]);
  if (!client || !call) return <CircularProgress />;
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <LivestreamView />
        {/* <SpeakerLayout /> */}
        {/* <LivestreamLayout /> */}
        {/* <CallControls /> */}
      </StreamCall>
    </StreamVideo>
  );
}

const LivestreamView = () => {
  const { call } = useLiveStreamAuth();
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
        <div>
          <div>
            <ParticipantView
              trackType="screenShareTrack"
              participant={firstParticipant}
            />
          </div>
          <div>
            <ParticipantView
              trackType="videoTrack"
              participant={firstParticipant}
            />
          </div>
        </div>
      ) : (
        <div>The host hasn't joined yet</div>
      )}
      <div>{isLive ? `Live: ${participantCount}` : `In Backstage`}</div>
      <div style={{ display: "flex", gap: "4px" }}>
        <Button
          variant="contained"
          onClick={() => (isLive ? call.stopLive() : call.goLive())}
        >
          {isLive ? "Stop Live" : "Go Live"}
        </Button>
        <Button variant="contained" onClick={() => cam.toggle()}>
          {isCamEnabled ? "Disable camera" : "Enable camera"}
        </Button>
        <Button variant="contained" onClick={() => mic.toggle()}>
          {isMicEnabled ? "Mute Mic" : "Unmute Mic"}
        </Button>
        <Button variant="contained" onClick={() => screenShare.toggle()}>
          share screen
        </Button>
        {isAwaitingResponse ? (
          <LoadingIndicator />
        ) : (
          <Button variant="contained" onClick={toggleRecording}>
            {isCallRecordingInProgress ? "إيقاف التسجيل" : "تسجيل"}
          </Button>
        )}
      </div>
    </div>
  );
};
