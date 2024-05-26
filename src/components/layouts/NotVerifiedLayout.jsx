import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";

export default function NotVerifiedLayout() {
  const delayResponse = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  };
  const { currentUser } = useAuth();
  useEffect(() => {
    delayResponse();
  }, [currentUser]);

  return currentUser && currentUser.email_verified ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
}
