import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_DEV_URL}/api`,
  withCredentials: true,
});

export default api;
