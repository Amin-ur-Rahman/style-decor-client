import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_api_url,
});

export default axiosInstance;
