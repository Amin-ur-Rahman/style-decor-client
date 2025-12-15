import React from "react";
import useUserInfo from "../hooks and contexts/role/useUserInfo";

import { Navigate } from "react-router-dom";
import { LoadingBubbles } from "../LoadingAnimations";

const DecoratorRoute = ({ children }) => {
  const { userData, infoLoading } = useUserInfo();

  if (infoLoading) return <LoadingBubbles></LoadingBubbles>;
  return userData.role === "decorator" ? (
    children
  ) : (
    <Navigate to="/"></Navigate>
  );
};

export default DecoratorRoute;
