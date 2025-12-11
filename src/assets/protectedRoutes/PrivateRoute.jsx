import React from "react";
import { useAuth } from "../../hooks and contexts/auth/useAuth";

import { Navigate } from "react-router-dom";
import { LoadingBubbles } from "../../LoadingAnimations";

const PrivateRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) return <LoadingBubbles></LoadingBubbles>;
  return user ? children : <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
