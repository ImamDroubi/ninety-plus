import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useProfile } from "../hooks/useProfile";

const UserProfileContext = React.createContext();

export function useUserProfile() {
  return useContext(UserProfileContext);
}

export function UserProfileProvider({ children }) {
  const { currentUser } = useAuth();
  const { profileInfo, isLoading } = useProfile(currentUser);

  const value = {
    profileInfo,
    isLoading,
  };
  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
}
