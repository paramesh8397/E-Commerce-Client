import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Create instance
const api: AxiosInstance = axios.create({
  baseURL: "https://1k0hqve0qg.execute-api.us-east-1.amazonaws.com/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    if (error.response?.status === 401) {
      // Example: Redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
