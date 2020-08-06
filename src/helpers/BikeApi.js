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

    register:async (name, stateLoc,  email, password) => {
        const json = await apiFetchPost(
            '/user/signup',
            {name, state:stateLoc, email, password}
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

    //rotas de clientes
    
    //listar clientes
    getListClient: async () => {
        const json = await apiFetchGet(
            '/client'
        );

        return json;
    },
    
};

export default () => BikeApi;