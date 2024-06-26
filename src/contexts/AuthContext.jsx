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
  const [currentUser, setCurrentUser] = useState(null);
  const [accessToken, setAccessToken] = useState(cookies.get("access_token"));
  const [fetchingUser, setFetchingUser] = useState(true);

  useEffect(() => {
    cookies.set("access_token", accessToken);
  }, [accessToken]);

  useEffect(() => {
    const storedUser = localStorage.getItem("current_user");
    if (storedUser) {
      setCurrentUser(storedUser);
    }
    setFetchingUser(false);
  }, []);

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
    fetchingUser,
    login,
    logout,
    setAccessToken,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
