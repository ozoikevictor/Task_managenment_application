import axios from "axios";

// Base URL comes from the .env file, with a local fallback for the demo app.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001",
});

// Attach the JWT token to every request if the user is logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the token is invalid or expired, the backend will send a 401.
// Clear the stale session and send the user back to login instead of
// leaving them stuck on a page that can never load its data.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
