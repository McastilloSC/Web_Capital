import axios from 'axios'

const apiURL = import.meta.env.VITE_API_URL;
const apiDev = import.meta.env.VITE_API_URL_DEV;

// Set config defaults when creating the instance
console.log(import.meta.env.PROD ? apiURL : apiDev)
const instance = axios.create({
    baseURL: import.meta.env.PROD ? apiURL : apiDev
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token_auth_sc')

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        //
        console.log("Ocurrio un erro al obtener el token");
        return Promise.reject(error);
    }
);

//Alter defaults after instance has been created
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers.get['Content-Type'] = 'application/json';

export default instance;