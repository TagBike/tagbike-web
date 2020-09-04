import axios from 'axios';
import { isLogged, doLogin, doLogout } from './AuthHandler';
import bike from './BikeApi';
import zip from './ZipCodeApi';

let RootApi =  {
    fetch: axios,
    auth: {
        isLogged: isLogged,
        login: doLogin,
        logout: doLogout
    },
    bike: bike(),
    utils: zip(),
}

export default RootApi;
