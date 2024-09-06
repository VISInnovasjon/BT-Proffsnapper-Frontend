import React, { ReactNode } from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import { Navigate } from "react-router-dom";

type RouteProps = {
  children: ReactNode;
};
export const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
};
