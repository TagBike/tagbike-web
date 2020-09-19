import axios from 'axios';
import Cookies from 'js-cookie';
import siteConfig from '@iso/config/site.config';

const token = Cookies.get('token');

const api = axios.create({
    baseURL: siteConfig.apiUrl,
    //timeout: 3000,
    headers: {
        'Accept': 'application/json',
        'content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
     },
});

let BikeApi = () => { return  {
    get: async (uri, data) => await api.get(uri, data),
    post: async (uri, data) => await api.post(uri, data),
    put: async (uri, data) => await api.put(uri, data),
    delete: async (uri, data) => await api.delete(uri, data),

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
    getMedicalById: async (id) => {
        const json = await api.get(
            `/medical/${id}`
        );
        
        return json;
    },
    updateMedical: async (data) => {
        const json = await api.put(
            `/medical/update/${data.customer_id}`,
            data
        );
        return json.data;
    },
    createMedical: async (data) => {
        const json = await api.post(
            `/medical/create`,
            data
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
    getBikeByCustomer: async (id) => {
        const json = await api.get(
            `/customer/${id}/bikes`
        );
        
        return json;
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
    createTag:async (data) => {
        const json = await api.post(
            '/tag/create',
            data
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
    updatePlan: async (data) => {
        const json = await api.put(
            `/plan/update/${data.id}`,
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
    getListEvent: async () => {
        const json = await api.get(
            '/event'
        );
    
        return json.data;
    },
    getEventById: async (id) => {
        const json = await api.get(
            `/event/${id}`
        );
    
        return json.data;
    },
    getEventByCustomer: async (id) => {
        const json = await api.get(
            `/customer/${id}/events`
        );
    
        return json.data;
    },
    createEvent:async (data) => {
        const json = await api.post(
            '/event',
            data
        );
        
        return json.data;
    },
    updateEvent: async (data) => {
        const json = await api.put(
            `/event/${data.id}`,
            data
        );
        return json.data;
    },
    deleteEvent:async (id) => {
        const json = await api.delete(
            '/event/'+id,
            {}
        );
        return json.data;
    },
    
}};

export default BikeApi;