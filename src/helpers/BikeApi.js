import Cookies from 'js-cookie';
import qs from 'qs';


const BASEAPI = 'http://127.0.0.1:8000/api';

const apiFetchFile = async (endPoint, body) =>  {
    
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

const apiFetchPost = async (endPoint, body) =>  {
    
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

const apiFetchGet = async (endPoint, body = []) =>  {

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


const BikeApi = {

    // rotas de usuário
    // Login
    login:async (email, password) => {
        const json = await apiFetchPost(
            '/auth/login',
            {email, password}
        );

        return json;
    },

    //Listar Usuários
    getListUser: async () => {
        const json = await apiFetchGet(
            '/user'
        );

        return json;
    },

    //cadastro usuário
    createUser:async (name, email, password, uf, city, cellphone, cpf, birthday, sexy) => {
    const json = await apiFetchPost(
        '/user/create',
        {name, email, password, uf, city, cellphone, cpf, birthday, sexy}
    );
    return json;
},
    // fim das rotas de usuário 

    //rotas de clientes
    
    //listar clientes
    getListClient: async () => {
        const json = await apiFetchGet(
            '/client'
        );

        return json;
    },

    //cadastro cliente
    createClient:async (name, cpf,  email, password, cep, uf,
            city, neighborhood, address, number, complement, phone,
            cellphone, birthday) => {
        const json = await apiFetchPost(
            '/client/create',
            {name, cpf, email, password, cep, uf, city, neighborhood, 
                address, number, complement, phone, cellphone, birthday}
        );
        return json;
    },


    //rotas de bike
    
    //listar bikes
    getListBike: async () => {
        const json = await apiFetchGet(
            '/bike'
        );

        return json;
    },

    //cadastro bike
    createBike:async (serialNumber, biketype, brand, model, color, photoBike, forwardExchange, 
        rearDerailleur, brakeType, typeSuspension, wheelType, forkType, frametype) => {
        const json = await apiFetchPost(
            '/bike/create',
            {serialNumber, biketype, brand, model, color, photoBike, forwardExchange, 
                rearDerailleur, brakeType, typeSuspension, wheelType, forkType, frametype}
            );
            return json;
    },

    //fim rotas de bike

    //rotas de etiqueta
    
    //listar bikes
    getListTag: async () => {
        const json = await apiFetchGet(
            '/tag'
        );

        return json;
    },

    //cadastro etiqueta
    createTag:async (name, qrCode) => {
        const json = await apiFetchPost(
            '/tag/create',
            {name, qrCode}
            );
            return json;
    },

    //fim rotas de etiqueta


    //rotas de planos
    
    //listar planos
    getListPlan: async () => {
        const json = await apiFetchGet(
            '/plan'
        );

        return json;
    },

    //cadastro planos
    createPlan:async (name) => {
    const json = await apiFetchPost(
        '/plan/create',
        {name}
        );
        return json;
    },
    
};

export default () => BikeApi;