import { API_ENDPOINT } from './config';
import axiosInstance from './AxioService';


class UserService {
    profile = () => {
        return axiosInstance
            .get(API_ENDPOINT.PROFILE);
    };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();