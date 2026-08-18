import apiClient from "../api/apiClient";

const TEAM_PATH = "teams";

const teamService = {
  async list(params = {}) {
    const response = await apiClient.get(TEAM_PATH, { params });
    return response.data;
  },

  async create(payload) {
    const response = await apiClient.post(TEAM_PATH, payload);
    return response.data;
  },

  async update(id, payload) {
    const response = await apiClient.put(`${TEAM_PATH}/${id}`, payload);
    return response.data;
  },

  async remove(id) {
    const response = await apiClient.delete(`${TEAM_PATH}/${id}`);
    return response.data;
  },
};

export default teamService;
