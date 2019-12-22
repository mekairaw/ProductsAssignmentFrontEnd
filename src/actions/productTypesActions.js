import axios from 'axios';
import {productTypes, setHeaders} from '../constants/api';
import { ERROR_GETTING_PRODUCT_TYPES } from '../constants/defaultResponses';

export const GET_PRODUCT_TYPES = 'GET_PRODUCT_TYPES';

export function getProductTypes(){
    return dispatch => {
        dispatch({type: `${GET_PRODUCT_TYPES}_PENDING`});
        axios.get(productTypes, {headers: setHeaders()})
        .then(response => {
            return dispatch({type: `${GET_PRODUCT_TYPES}_FULFILLED`, payload: response.data});
        })
        .catch(e => {
            return dispatch({
                type: `${GET_PRODUCT_TYPES}_REJECTED`,
                payload: ERROR_GETTING_PRODUCT_TYPES
            });
        });
    }
}