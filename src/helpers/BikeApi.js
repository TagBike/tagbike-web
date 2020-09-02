import axios from 'axios';
import Cookies from 'js-cookie';
import siteConfig from '@iso/config/site.config';

const token = Cookies.get('token');

const api = axios.create({
    baseURL: siteConfig.apiUrl,
    timeout: 1000,
    headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json',
        'Authentication': token
     },
});

let BikeApi = {
    login:async (email, password) => {
        const json = await api.post(
            '/auth/login',
            {email, password}
        );

        return json;
    },
    getListUser: async () => {
        const json = await api.get(
            '/user'
        );

        return json;
    },
    getUserById: async (id) => {
        const json = await api.get(
            `/user/${id}`
        );

        return json;
    },
    createUser:async (data) => {
        const json = await api.post(
            '/user/create',
            data
        );
        
        return json;
    },
    updateUser: async (data) => {
        const json = await api.put(
            `/user/update/${data.id}`,
            data
        );
        return json;
    },
    deleteUser:async (id) => {
        const json = await api.delete(
            '/user/delete/'+id,
            {}
        );
        return json;
    },
    getListClient: async () => {
        const json = await api.get(
            '/customer'
        );

        return json;
    },
    getClientById: async (id) => {
        const json = await api.get(
            `/customer/${id}`
        );

        return json.data;
    },
    createClient:async (data) => {
        const json = await api.post(
            '/customer/create',
            data
        );
        return json;
    },
    updateClient: async (data) => {
        const json = await api.put(
            `/customer/update/${data.id}`,
            data
        );
        return json;
    },
    deleteClient:async (id) => {
        const json = await api.delete(
            '/customer/delete/'+id,
            {}
        );
        return json;
    },
    getListBike: async () => {
        const json = await api.get(
            '/bike'
        );

        return json;
    },
    getBikeById: async (id) => {
        const json = await api.get(
            `/bike/${id}`
        );

        return json;
    },
    createBike:async (data) => {
        const json = await api.post(
            '/bike/create',
            data
            );
            return json;
    },
    updateBike: async (data) => {
        const json = await api.put(
            `/bike/update/${data.id}`,
            data
        );
        return json;
    },
    deleteBike:async (id) => {
        const json = await api.delete(
            '/bike/delete/'+id,
            {}
        );
        return json;
    },
    getListTag: async () => {
        const json = await api.get(
            '/tag'
        );

        return json;
    },
    createTag:async (name, qrCode) => {
        const json = await api.post(
            '/tag/create',
            {name, qrCode}
            );
            return json;
    },
    deleteTag:async (id) => {
        const json = await api.delete(
            '/tag/delete/'+id,
            {}
        );
        return json;
    },
    getListPlan: async () => {
        const json = await api.get(
            '/plan'
        );

        return json;
    },
    getPlanById: async (id) => {
        const json = await api.get(
            `/plan/${id}`
        );

        return json.data;
    },
    createPlan:async (data) => {
    const json = await api.post(
        '/plan/create',
        data
        );
        return json;
    },
    deletePlan:async (id) => {
        const json = await api.delete(
            '/plan/delete/'+parseInt(id),
            {}
        );
        return json;
    },
    
};

BikeApi = Object.assign(api);

export default BikeApi;