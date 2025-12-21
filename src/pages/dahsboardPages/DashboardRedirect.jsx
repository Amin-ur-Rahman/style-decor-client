import { Navigate } from "react-router-dom";
import useUserInfo from "../../hooks and contexts/role/useUserInfo";
import { LoadingBubbles } from "../../LoadingAnimations";

const DashboardRedirect = () => {
  const { userData, infoLoading } = useUserInfo();

  if (infoLoading) return <LoadingBubbles />;

  if (userData.role === "admin") {
    return <Navigate to="/dashboard/admin" replace />;
  }

  if (userData.role === "decorator") {
    return <Navigate to="/dashboard/decorator-home" replace />;
  }

  return <Navigate to="/dashboard/user" replace />;
};

export default DashboardRedirect;
