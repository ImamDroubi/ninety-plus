import { Button, CircularProgress } from "@mui/material";
import { StreamVideo, StreamCall } from "@stream-io/video-react-sdk";
import { ParticipantView, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLiveStreamAuth } from "../../contexts/LiveStreamAuthContext";

export default function LiveStreamComponent() {
  const { createClient, client, call } = useLiveStreamAuth();
  const { currentUser } = useAuth();

  useEffect(() => {
    createClient("user", "host", "12345");
  }, []);
  useEffect(() => {
    if (call) call.join({ create: true });
  }, [client, call]);
  if (!client || !call) return <CircularProgress />;
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <LivestreamView />
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
  } = useCallStateHooks();

  const { camera: cam, isEnabled: isCamEnabled } = useCameraState();
  const { microphone: mic, isEnabled: isMicEnabled } = useMicrophoneState();
  const { screenShare } = useScreenShareState();
  const participantCount = useParticipantCount();
  const isLive = useIsCallLive();

  const [firstParticipant] = useParticipants();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      {firstParticipant ? (
        <ParticipantView participant={firstParticipant} />
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
      </div>
    </div>
  );
};
