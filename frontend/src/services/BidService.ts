import { API_ENDPOINT } from './config';
import axiosInstance from './AxioService';


class BidService {
    bidItem = (bid_item_id: number, bid_price: number) =>{
        return axiosInstance
        .post(API_ENDPOINT.BID,{
            bid_item_id,
            bid_price,
        });
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BidService();