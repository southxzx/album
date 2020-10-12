import axios from 'axios';
import { PRODUCT_SERVER } from '../../component/utils/misc';
// import { response } from 'express';
import { 
    GET_PRODUCT_BY_SELL,
    GET_PRODUCT_BY_ARRIVAL
} from './types';

export const getProductBySell = () => {

    // article?sortBy=sold&order=desc&limit=4
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
    .then(response =>response.data);

    return {
        type:GET_PRODUCT_BY_SELL,
        payload: request
    }
    
}
export const getProductByArrival = () => {

    // article?sortBy=sold&order=desc&limit=4
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(response =>response.data);

    return {
        type:GET_PRODUCT_BY_ARRIVAL,
        payload: request
    }
    
}