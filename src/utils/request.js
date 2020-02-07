import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:8080'
});

request.defaults.headers.post['Content-Type'] = 'application/json';
request.interceptors.request.use(config => {
    const token = window.localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default request;
