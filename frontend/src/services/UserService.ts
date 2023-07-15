import { API_ENDPOINT } from './config';
import axiosInstance from './AxioService';


class UserService {
    profile = () => {
        return axiosInstance
            .get(API_ENDPOINT.PROFILE);
    };
    deposit = (amount: number) => {
        return axiosInstance
            .post(API_ENDPOINT.DEPOSIT, { amount});
    };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();