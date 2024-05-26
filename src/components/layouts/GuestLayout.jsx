import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";

export default function GuestLayout() {

  const delayResponse = async ()=>{
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  const {currentUser} = useAuth();
  useEffect(()=>{
    delayResponse();
  },[currentUser]);
  
  return currentUser ? <Navigate to="/"/> :  <Outlet/> ;
}
