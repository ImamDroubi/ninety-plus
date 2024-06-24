import React, { useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAuth } from "./AuthContext";
import { StreamVideoClient } from "@stream-io/video-react-sdk";
const LiveStreamAuthContext = React.createContext();

export function useLiveStreamAuth() {
  return useContext(LiveStreamAuthContext);
}

const apiKey = "whsuc3edb47g";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlciJ9.tsc9kL-C5RhuDl2Nw2VRUFUQB_58IiWg9P6mi3j41rE";
export function LiveStreamAuthProvider({ children }) {
  const [client, setClient] = useState();
  const [call, setCall] = useState();
  const createClient = (userId, username, callId) => {
    if (!!client) return;
    const user = {
      id: userId,
      name: username,
    };
    const newClient = new StreamVideoClient({ apiKey, user, token });
    const newCall = newClient.call("livestream", callId);
    setClient(newClient);
    setCall(newCall);
  };

  const value = {
    createClient,
    client,
    call,
  };
  return (
    <LiveStreamAuthContext.Provider value={value}>
      {children}
    </LiveStreamAuthContext.Provider>
  );
}
