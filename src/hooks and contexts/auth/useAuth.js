import { useContext } from "react";
import { AuthContext } from "./CreateContext";

export const useAuth = () => {
  return useContext(AuthContext);
};
