import { API_ENDPOINT } from './config';
import axiosInstance from './AxioService';


class ItemService {
    addItem = (item_name: string, item_start_price: number, item_time_window: number) =>{
        return axiosInstance
        .post(API_ENDPOINT.ITEM,{
            item_name,
            item_start_price,
            item_time_window
        });
    }
    getPublishedItems = () => {
        return axiosInstance
            .get(API_ENDPOINT.ITEM+'?item_status=publish');
    };
    getOwnedItems = () => {
        return axiosInstance
            .get(API_ENDPOINT.ITEM+'?own=true');
    };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ItemService();