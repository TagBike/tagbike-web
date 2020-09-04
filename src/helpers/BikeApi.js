import axios from 'axios';
import Cookies from 'js-cookie';
import siteConfig from '@iso/config/site.config';

const token = Cookies.get('token');

console.log('Token', token);

const api = axios.create({
    baseURL: siteConfig.apiUrl,
    //timeout: 1000,
    headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
     },
});

let BikeApi = () => { return  {
    login:async (email, password) => {
        const json = await api.post(
            '/auth/login',
            {email, password}
        );

        return json.data;
    },
    getListUser: async () => {
        const json = await api.get(
            '/user'
        );

        return json.data;
    },
    getUserById: async (id) => {
        const json = await api.get(
            `/user/${id}`
        );

        return json.data;
    },
    createUser:async (data) => {
        const json = await api.post(
            '/user/create',
            data
        );
        
        return json.data;
    },
    updateUser: async (data) => {
        const json = await api.put(
            `/user/update/${data.id}`,
            data
        );
        return json.data;
    },
    deleteUser:async (id) => {
        const json = await api.delete(
            '/user/delete/'+id,
            {}
        );
        return json.data;
    },
    getListClient: async () => {
        const json = await api.get(
            '/customer'
        );

        return json.data;
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
        return json.data;
    },
    updateClient: async (data) => {
        const json = await api.put(
            `/customer/update/${data.id}`,
            data
        );
        return json.data;
    },
    deleteClient:async (id) => {
        const json = await api.delete(
            '/customer/delete/'+id,
            {}
        );
        return json.data;
    },
    getListBike: async () => {
        const json = await api.get(
            '/bike'
        );

        return json.data;
    },
    getBikeById: async (id) => {
        const json = await api.get(
            `/bike/${id}`
        );

        return json.data;
    },
    createBike:async (data) => {
        const json = await api.post(
            '/bike/create',
            data
            );
            return json.data;
    },
    updateBike: async (data) => {
        const json = await api.put(
            `/bike/update/${data.id}`,
            data
        );
        return json.data;
    },
    deleteBike:async (id) => {
        const json = await api.delete(
            '/bike/delete/'+id,
            {}
        );
        return json.data;
    },
    getListTag: async () => {
        const json = await api.get(
            '/tag'
        );

        return json.data;
    },
    createTag:async (name, qrCode) => {
        const json = await api.post(
            '/tag/create',
            {name, qrCode}
            );
            return json.data;
    },
    deleteTag:async (id) => {
        const json = await api.delete(
            '/tag/delete/'+id,
            {}
        );
        return json.data;
    },
    getListPlan: async () => {
        const json = await api.get(
            '/plan'
        );

        return json.data;
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
        return json.data;
    },
    deletePlan:async (id) => {
        const json = await api.delete(
            '/plan/delete/'+parseInt(id),
            {}
        );
        return json.data;
    },
    
}};

//BikeApi = Object.assign(api);

export default BikeApi;