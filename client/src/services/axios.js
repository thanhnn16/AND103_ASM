import axios from 'axios';

import {API_URL} from "./appUrl";

const instance = axios.create({
    baseURL: API_URL,
    // You can add other configuration options here
});

export default instance;
