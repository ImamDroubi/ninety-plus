import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

export const API_BASE_URL = "http://localhost:80/api/v1";
// export const API_BASE_URL = "http://localhost:3001/";

const defaultOptions = {
  baseURL: API_BASE_URL,
};
const axiosInstance = axios.create(defaultOptions);
axiosInstance.interceptors.request.use(
  (config) => {
    const token = cookies.get("access_token"); // Adjust the key if needed
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export { axiosInstance };
