import React, { useEffect } from "react";
import { useAuth } from "../auth/useAuth";
import axiosInstance from "./AxiosInstance";

const useAxiosInstance = () => {
  const { user, authLoading } = useAuth();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (authLoading) return;
        if (user && user.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
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
