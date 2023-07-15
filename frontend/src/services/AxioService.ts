import axios from 'axios';
import { API_URL } from './config';

const axiosInstance = axios.create({
    baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const stored = localStorage.getItem('user')
        const session =  stored ? JSON.parse(stored) : null;
        console.log(session);
        const auth = session.accessToken ? `Bearer ${session.accessToken}` : '';
        config.headers.Authorization = auth;
        return config;
    },
    (error) => Promise.reject(error),
);

export default axiosInstance;
