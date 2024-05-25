import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

export const API_BASE_URL = "http://localhost:80/api/v1";
const access_token = cookies.get("access_token");

const defaultOptions = {
  baseURL: API_BASE_URL,
  headers: {
    Authorization : access_token? `Bearer ${access_token}` : undefined
  },
};

export const axiosInstance = axios.create(defaultOptions);