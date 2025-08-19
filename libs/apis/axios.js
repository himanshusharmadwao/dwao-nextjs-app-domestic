// api/axios.js
import axios from "axios";
import { getCookie } from "cookies-next";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Define your base URL
  headers: {
    // Accept: "application/json",
    "Content-Type": "application/json ",
  },
});

// Interceptor to add Authorization token to requests
api.interceptors.request.use(
  (config) => {
    const token = getCookie("authToken"); // Get token from local storage
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
