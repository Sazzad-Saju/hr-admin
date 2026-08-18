import apiClient from "../api/apiClient";

export const authService = {
  async login(credentials) {
    const response = await apiClient.post(
      `login`,
      credentials
    );

    return response.data?.data;
  },

  async me() {
    const response = await apiClient.get(`me`);

    return response.data?.data?.admin;
  },

  async logout() {
    const response = await apiClient.post(`logout`);

    return response.data;
  },

  async changePassword(payload) {
    const response = await apiClient.put(
      `change-password`,
      payload
    );

    return response.data;
  },
};
