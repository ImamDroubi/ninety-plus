import React, { useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAuth } from "./AuthContext";

const LiveStreamAuthContext = React.createContext();

export function useLiveStreamAuth() {
  return useContext(LiveStreamAuthContext);
}

const API_KEY = "";

export function LiveStreamAuthProvider({ children }) {
  const localStorage = useLocalStorage();
  const {currentUser} = useAuth();
  const [token,setToken] = useState();
  const [userId, setUserId] = useState();
  const [callId, setCallId] = useState();
  
  const value = {};
  return (
    <LiveStreamAuthContext.Provider value={value}>
      {children}
    </LiveStreamAuthContext.Provider>
  );
}
