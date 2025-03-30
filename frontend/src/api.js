import { ACCESS_TOKEN } from "./constants";
import axios from "axios";

// !Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
});

// !Add request interceptor
api.interceptors.request.use(
  (config) => {
    // TODO: Add Authorization token
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // TODO: Add CSRF token only for mutation requests
    const method = config.method?.toLowerCase();
    if (method === "post" || method === "put" || method === "delete") {
      const csrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("csrftoken="))
        ?.split("=")[1];

      if (csrfToken) {
        config.headers["X-CSRFToken"] = csrfToken;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
