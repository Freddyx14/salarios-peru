
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { authState, loading } = useAuth();

  if (loading) {
    // Could add a loading spinner here
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  }

  if (!authState.user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
