import axios from "axios";

export const API_URL = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  if (["post", "put", "patch", "delete"].includes(config.method?.toLowerCase())) {
    const response = await axios.get(`${API_URL}/api/csrf/`, {
      withCredentials: true,
    });
    config.headers["X-CSRFToken"] = response.data.csrfToken;
  }

  return config;
});

export default api;
