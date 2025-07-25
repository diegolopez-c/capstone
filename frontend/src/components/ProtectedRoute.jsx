import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from "@heroui/react";

const ProtectedRoute = ({ children, requiredRoles }) => {
  const { user, isLoading, isAuthenticated } = useAuth0();
  const userRoles = user && user["https://hospitall.com/roles"];
  const hasRequiredRole =
    userRoles && requiredRoles.some((role) => userRoles.includes(role));
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (!isAuthenticated || !hasRequiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};
export default ProtectedRoute;
