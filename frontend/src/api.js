import axios from "axios";

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

if (import.meta.env.PROD && !configuredApiUrl) {
  throw new Error("VITE_API_URL must be configured for production builds.");
}

export const API_URL = (configuredApiUrl || "http://localhost:8000").replace(/\/+$/, "");

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export async function getCsrfToken() {
  const response = await api.get("/api/csrf/");
  return response.data.csrfToken;
}

export async function logout() {
  await api.post("/api/logout/");
  localStorage.removeItem("creatorMarketUser");
}

api.interceptors.request.use(async (config) => {
  if (["post", "put", "patch", "delete"].includes(config.method?.toLowerCase())) {
    if (!config.headers["X-CSRFToken"]) {
      config.headers["X-CSRFToken"] = await getCsrfToken();
    }
  }

  return config;
});

export default api;
