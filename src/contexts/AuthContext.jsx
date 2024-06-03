import React, { useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Cookies from "universal-cookie";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
const cookies = new Cookies(null, { path: "/" });

export function AuthProvider({ children }) {
  const localStorage = useLocalStorage();
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("current_user"));
  const [accessToken, setAccessToken] = useState(cookies.get("access_token"));

  useEffect(() => {
    cookies.set("access_token", accessToken);
  }, [accessToken]);

  function login(user) {
    setCurrentUser(user);
    localStorage.setItem("current_user", user);
  }

  function logout() {
    setCurrentUser(undefined);
    setAccessToken(undefined);
    localStorage.removeItem("current_user");
  }

  const value = {
    currentUser,
    login,
    logout,
    setAccessToken,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
