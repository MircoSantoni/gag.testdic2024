import api from './axiosConfig'

export const clientApi = {
    getAll: async () => {
        const response = await api.get('/');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/${id}`);
        return response.data;
    },

    save: async (client) => {
        console.log(client);
        const response = await api.post('/', client);
        return response.data;
    },

    update: async (id, client) => {
        const response = await api.put(`/${id}`, client);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/${id}`);
        return response.data;
    }
};
