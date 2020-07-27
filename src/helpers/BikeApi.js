import Cookies from 'js-cookie';
import qs from 'qs';


const BASEAPI = 'http://alunos.b7web.com.br:501';

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

    login:async (email, password) => {
        const json = await apiFetchPost(
            '/user/signin',
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

    getStates:async () => {
        const json = await apiFetchGet(
            '/states'
        );

        return json.states;
    },

    getCategories:async () => {
        const json = await apiFetchGet(
            '/categories'
        );

        return json.categories;
    },

    getAds:async (options) => {
        const json = await apiFetchGet(
            '/ad/list',
            options
        );
        return json;
    },
    
    getAd:async (id, other = false) => {
        const json = await apiFetchGet(
            '/ad/item',
            {id, other}
        );
        return json;
    },

    addAd:async (fData) => {
        const json = await apiFetchFile(
            '/ad/add',
            fData
        );
        return json;
    }
    
};

export default () => BikeApi;