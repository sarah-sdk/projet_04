import { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();

  if (!user || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
