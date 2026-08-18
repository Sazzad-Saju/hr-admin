import apiClient from "../api/apiClient";

const departmentService = {
    async list(params ={}) {
        const response = await apiClient.get("departments", { params });
        return response.data;
    },

    async create(payload) {
        const response = await apiClient.post("departments", payload);
        return response.data;
    },

    async update(id, payload){
        const response = await apiClient.put(`departments/${id}`, payload);
        return response.data;
    },

    async remove(id){
        const response = await apiClient.delete(`departments/${id}`);
        return response.data;
    },
};

export default departmentService;