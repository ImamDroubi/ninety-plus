import React, { useContext, useState } from 'react'

const AuthContext = React.createContext();

export function useAuth(){
  return useContext(AuthContext);
}

export function AuthProvider({children}) {
  const [currentUser,setCurrentUser] = useState();

  function login(){
    setCurrentUser({
      _id : "abc123",
      username : "Imam Droubi",
      email : "imam.droubi@gmail.com",
      photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=1780&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      followers : 55
    });
  }

  function logout(){
    setCurrentUser(undefined);
  }

  const value = {
    currentUser,
    login,
    logout
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}