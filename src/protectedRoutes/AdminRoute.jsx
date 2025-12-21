import React from "react";
import useUserInfo from "../hooks and contexts/role/useUserInfo";

import { Navigate } from "react-router-dom";
import { LoadingBubbles } from "../LoadingAnimations";

const AdminRoute = ({ children }) => {
  const { userData, infoLoading } = useUserInfo();

  if (infoLoading) return <LoadingBubbles></LoadingBubbles>;
  if (!userData || userData.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
