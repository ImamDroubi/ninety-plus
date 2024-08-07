import React, { useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAuth } from "./AuthContext";
import { StreamVideoClient } from "@stream-io/video-react-sdk";
import { axiosInstance } from "../apiCalls";
import axios from "axios";
const LiveStreamAuthContext = React.createContext();

export function useLiveStreamAuth() {
  return useContext(LiveStreamAuthContext);
}

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

export function LiveStreamAuthProvider({ children }) {
  const { currentUser } = useAuth();
  const [client, setClient] = useState();
  const [call, setCall] = useState();

  const createClient = (userId, username, callId) => {
    if (!!client) return;
    const user = {
      id: userId,
      name: username,
    };

    const newClient = new StreamVideoClient({ apiKey, user, tokenProvider });
    const newCall = newClient.call("livestream", callId);
    setClient(newClient);
    setCall(newCall);
  };

  const tokenProvider = async () => {
    // if (!currentUser) return null;
    try {
      const res = await fetch(
        `http://localhost:3001/get-token/${currentUser.user_id}`
      );
      const token = await res.json();
      return token.token;
    } catch (error) {
      console.log(error);
    }
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
