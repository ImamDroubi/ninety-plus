import React, { useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Cookies from "universal-cookie";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
const cookies = new Cookies(null, { path: "/" });

export function AuthProvider({ children }) {
  const localStorage = useLocalStorage("current_user");
  const [currentUser, setCurrentUser] = useState(localStorage.getItem());
  const [accessToken, setAccessToken] = useState(cookies.get("access_token"));

  useEffect(() => {
    cookies.set("access_token", accessToken);
  }, [accessToken]);

  function login(
    user = {
      _id: "abc123",
      username: "Imam Droubi",
      email: "imam.droubi@gmail.com",
      profile_picture:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=1780&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      followers: 55,
      role: "student",
      verified: "false",
    }
  ) {
    setCurrentUser(user);
    localStorage.setItem(user);
  }

  function logout() {
    setCurrentUser(undefined);
    localStorage.removeItem(user);
  }

  const value = {
    currentUser,
    login,
    logout,
    setAccessToken,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
