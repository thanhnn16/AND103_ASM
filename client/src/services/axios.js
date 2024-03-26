import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.0.113/api/',
    // You can add other configuration options here
});

export default instance;