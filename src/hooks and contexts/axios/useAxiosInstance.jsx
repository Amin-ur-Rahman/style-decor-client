import React, { useEffect } from "react";
import { useAuth } from "../auth/useAuth";
import axiosInstance from "./AxiosInstance";

const useAxiosInstance = () => {
  const { user, authLoading } = useAuth();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        if (authLoading) return config;
        if (user) {
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
          // console.log("access token", user.accessToken);
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, [user, authLoading]);
  return axiosInstance;
};

export default useAxiosInstance;
