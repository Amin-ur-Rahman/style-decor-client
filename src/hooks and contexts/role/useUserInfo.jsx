import React from "react";
import useAxiosInstance from "../axios/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";

const useUserInfo = () => {
  const axiosInstance = useAxiosInstance();
  const { user, authLoading } = useAuth();

  const {
    data: userInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-info"],
    enabled: !!user && !authLoading,
    queryFn: async () => {
      const res = await axiosInstance.get(`/me?userEmail=${user.email}`);
      return res.data;
    },
  });

  //   console.log(userInfo);

  return {
    userData: userInfo,
    infoLoading: authLoading || isLoading,
    error: isError,
  };
};

export default useUserInfo;
