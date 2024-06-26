import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

export default function ProtectedRoute({ children }) {
  const { currentUser, fetchingUser } = useAuth();
  const navigate = useNavigate();

  if (fetchingUser) return <CircularProgress />;
  if (!currentUser) return <Navigate to={"/sign-in"} />;
  return children;
}
