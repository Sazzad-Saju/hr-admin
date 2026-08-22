import apiClient from "../api/apiClient";

const areaService = {
    async list(params = {}) {
        const response = await apiClient.get("areas", { params });
        return response.data;
    },

    async create(payload) {
        const response = await apiClient.post("areas", payload);
        return response.data;
    },

    async update(id, payload) {
        const response = await apiClient.put(`areas/${id}`, payload);
        return response.data;
    },

    async remove(id) {
        const response = await apiClient.delete(`areas/${id}`);
        return response.data;
    },
};

export default areaService;