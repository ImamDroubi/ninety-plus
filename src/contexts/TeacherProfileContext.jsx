import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useProfile } from "../hooks/useProfile";

const TeacherProfileContext = React.createContext();

export function useTeacherProfile() {
  return useContext(TeacherProfileContext);
}

export function TeacherProfileProvider({ children }) {
  const { currentUser } = useAuth();
  const { profileInfo, isLoading } = useProfile(currentUser);

  const value = {
    profileInfo,
    isLoading
  };
  return (
    <TeacherProfileContext.Provider value={value}>
      {children}
    </TeacherProfileContext.Provider>
  );
}
