import api from "./api";

const areaService = {
    getArea: (params = {}) => {
        return api.get("/areas", { params });
    },

    createArea: (data) => {
        return api.post("/areas", data);
    },

    updateArea: (id, data) => {
        return api.put(`/areas/${id}`, data);
    },

    deleteArea: (id) => {
        return api.delete(`/areas/${id}`);
    },
};

export default areaService;