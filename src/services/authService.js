import apiClient from "../api/apiClient";

const ADMIN_AUTH_PATH = "/admin";

export const authService = {
  async login(credentials) {
    const response = await apiClient.post(
      `${ADMIN_AUTH_PATH}/login`,
      credentials
    );

    return response.data?.data;
  },

  async me() {
    const response = await apiClient.get(`${ADMIN_AUTH_PATH}/me`);

    return response.data?.data?.admin;
  },

  async logout() {
    const response = await apiClient.post(`${ADMIN_AUTH_PATH}/logout`);

    return response.data;
  },

  async changePassword(payload) {
    const response = await apiClient.put(
      `${ADMIN_AUTH_PATH}/change-password`,
      payload
    );

    return response.data;
  },
};
