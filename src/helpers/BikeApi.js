import Cookies from 'js-cookie';
import qs from 'qs';
import siteConfig from '@iso/config/site.config';

const BASEAPI = siteConfig.apiUrl;

const fetchFile = async (endPoint, body) =>  {
    
    if (!body.token) {
        let token = Cookies.get('token');
        if (token) {
            body.append('token', token);
        }
    }

    const res = await fetch(BASEAPI+endPoint, {
        method:'POST',
        body
    });

    const json = await res.json();

    if (json.notallowed) {
        window.location.href = 'signin';
        return;
    }

    return json;
}

const fetchPost = async (endPoint, body) =>  {
    
    if (!body.token) {
        let token = Cookies.get('token');
        if (token) {
            body.token = token;
        }
    }

    const res = await fetch(BASEAPI+endPoint, {
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    });

    const json = await res.json();

    if (json.notallowed) {
        window.location.href = 'signin';
        return;
    }

    return json;
}

const fetchPut = async (endPoint, body) =>  {
    
    if (!body.token) {
        let token = Cookies.get('token');
        if (token) {
            body.token = token;
        }
    }

    const res = await fetch(BASEAPI+endPoint, {
        method:'PUT',
        headers:{
            'Accept': 'application/json',
            'content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    });

    const json = await res.json();

    if (json.notallowed) {
        window.location.href = 'signin';
        return;
    }

    return json;
}

const fetchGet = async (endPoint, body = []) =>  {

    if (!body.token) {
        let token = Cookies.get('token');
        if (token) {
            body.token = token;
        }
    }

    const res = await fetch(`${BASEAPI+endPoint}?${qs.stringify(body)}`);

    const json = await res.json();

    if (json.notallowed) {
        window.location.href = 'signin';
        return;
    }

    return json;
}

const fetchDelete = async (endPoint, body) =>  {
    
    if (!body.token) {
        let token = Cookies.get('token');
        if (token) {
            body.token = token;
        }
    }

    const res = await fetch(BASEAPI+endPoint, {
        method:'DELETE',
        headers:{
            'Accept': 'application/json',
            'content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    });

    const json = await res.json();

    if (json.notallowed) {
        window.location.href = 'signin';
        return;
    }

    return json;
}




const BikeApi = {

    // rotas de usuário
    // Login
    login:async (email, password) => {
        const json = await fetchPost(
            '/auth/login',
            {email, password}
        );

        return json;
    },

    //Listar Usuários
    getListUser: async () => {
        const json = await fetchGet(
            '/user'
        );

        return json;
    },

    //Listar Usuários
    getUserById: async (id) => {
        const json = await fetchGet(
            `/user/${id}`
        );

        return json;
    },

    //cadastro usuário
    createUser:async (data) => {
        const json = await fetchPost(
            '/user/create',
            data
        );
        
        return json;
    },

    //update user
    updateUser: async (data) => {
        const json = await fetchPut(
            `/user/update/${data.id}`,
            data
        );
        return json;
    },

    //deleta usuário
    deleteUser:async (id) => {
        const json = await fetchDelete(
            '/user/delete/'+id,
            {}
        );
        return json;
    },

    // fim das rotas de usuário 

    //rotas de clientes
    
    //listar clientes
    getListClient: async () => {
        const json = await fetchGet(
            '/customer'
        );

        return json;
    },

    //get user by id
    getClientById: async (id) => {
        const json = await fetchGet(
            `/customer/${id}`
        );

        return json.data;
    },

    //cadastro cliente
    createClient:async (data) => {
        const json = await fetchPost(
            '/customer/create',
            data
        );
        return json;
    },
    //update customer
    updateClient: async (data) => {
        const json = await fetchPut(
            `/customer/update/${data.id}`,
            data
        );
        return json;
    },

    //deleta cliente
    deleteClient:async (id) => {
        const json = await fetchDelete(
            '/customer/delete/'+id,
            {}
        );
        return json;
    },


    //rotas de bike
    
    //listar bikes
    getListBike: async () => {
        const json = await fetchGet(
            '/bike'
        );

        return json;
    },

    //get bike by id
    getBikeById: async (id) => {
        const json = await fetchGet(
            `/bike/${id}`
        );

        return json;
    },

    //cadastro bike
    createBike:async (data) => {
        const json = await fetchPost(
            '/bike/create',
            data
            );
            return json;
    },

    //update bike
    updateBike: async (data) => {
        const json = await fetchPut(
            `/bike/update/${data.id}`,
            data
        );
        return json;
    },

    //deleta bike
    deleteBike:async (id) => {
        const json = await fetchDelete(
            '/bike/delete/'+id,
            {}
        );
        return json;
    },

    //fim rotas de bike

    //rotas de etiqueta
    
    //listar eitquetas
    getListTag: async () => {
        const json = await fetchGet(
            '/tag'
        );

        return json;
    },

    //cadastro etiqueta
    createTag:async (name, qrCode) => {
        const json = await fetchPost(
            '/tag/create',
            {name, qrCode}
            );
            return json;
    },

    //deleta etiqueta
    deleteTag:async (id) => {
        const json = await fetchDelete(
            '/tag/delete/'+id,
            {}
        );
        return json;
    },

    //fim rotas de etiqueta


    //rotas de planos
    
    //listar planos
    getListPlan: async () => {
        const json = await fetchGet(
            '/plan'
        );

        return json;
    },

    //get plan by id
    getPlanById: async (id) => {
        const json = await fetchGet(
            `/plan/${id}`
        );

        return json.data;
    },

    //cadastro planos
    createPlan:async (data) => {
    const json = await fetchPost(
        '/plan/create',
        data
        );
        return json;
    },

    //deleta plano
    deletePlan:async (id) => {
        const json = await fetchDelete(
            '/plan/delete/'+parseInt(id),
            {}
        );
        return json;
    },
    
};

export default BikeApi;
export { fetchGet, fetchPost, fetchPut, fetchDelete, fetchFile };