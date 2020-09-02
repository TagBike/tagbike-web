import axios from 'axios';
const BASEURL = "http://cep.la/";

export default {
     //get address, city, state by zipcode
    
    getAddressByZip: async (zip) => {
        return await axios.get(
            `${BASEURL}${zip}`, {
                headers: {
                    'Accept': 'application/json'
                }
            }
        );
    }    
};