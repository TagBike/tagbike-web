import axios from 'axios';
import { isLogged, doLogin, doLogout } from './AuthHandler';
import bike from './BikeApi';
import zip from './ZipCodeApi';

let RootApi = axios;

RootApi.auth = {
    isLogged: isLogged,
    login: doLogin,
    logout: doLogout
};

RootApi.bike = bike;

RootApi.utils = {
    zip: zip,
}

export default RootApi;