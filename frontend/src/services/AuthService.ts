import axios from 'axios';
import { API_ENDPOINT } from './config';
import axiosInstance from './AxioService';


class AuthService {
    login = (email: string, password: string) => {
        return axiosInstance
            .post(API_ENDPOINT.LOGIN, {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    };
    register = (email: string, password: string) => {
        return axiosInstance
            .post(API_ENDPOINT.REGISTER, {
                email,
                password
            });
    };

    logout = () => {
        localStorage.removeItem('user');
    };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();