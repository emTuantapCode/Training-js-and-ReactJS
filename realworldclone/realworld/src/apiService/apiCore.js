import getDataUser from "../localStorage";
import axios from 'axios';
// import queryString from 'query-string';
const baseURL = process.env.REACT_APP_URL_API

const localdata = getDataUser()
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        'content-type': 'application/json',
    },
    // paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    let token = localdata && `Token ${localdata.token}`
    if (token) {
        config.headers['Authorization'] = token || null
    }
    return config;
});

// axiosClient.interceptors.response.use((response) => {
//     if (response && response.data) {
//         return response.data;
//     }

//     return response;
// }, (error) => {
//     // Handle errors
//     throw error;
// });

export default axiosClient; 