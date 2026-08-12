import axios from "axios";

import { tokenStorage } from "../auth/tokenStorage";
import { API_BASE_URL } from "../config/env";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.get();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && tokenStorage.get()) {
      tokenStorage.clear();
      window.dispatchEvent(new Event("auth:unauthorized"));
    }

    return Promise.reject(error);
  }
);

export default apiClient;
