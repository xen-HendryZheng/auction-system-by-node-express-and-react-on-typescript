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
    getOngoingBid = () => {
        return axiosInstance
            .get(API_ENDPOINT.ITEM+'?item_status=publish');
    };
    getCompletedBid = () => {
        return axiosInstance
            .get(API_ENDPOINT.ITEM+'?item_status=closed');
    };
    getOwnedItems = () => {
        return axiosInstance
            .get(API_ENDPOINT.ITEM+'?own=true');
    };
    publishItem = (item_id: number) => {
        return axiosInstance
            .patch(API_ENDPOINT.ITEM,{item_id});
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ItemService();