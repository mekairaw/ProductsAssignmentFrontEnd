import {products, setHeaders} from '../constants/api';
import axios from 'axios';
import { GENERIC_ERROR, ERROR_CREATING, ERROR_EDITING, ERROR_DELETING } from '../constants/defaultResponses';

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_SPECIFIC_PRODUCT = 'GET_SPECIFIC_PRODUCT';
export const CREATING_NEW_PRODUCT = 'CREATING_NEW_PRODUCT';
export const EDITING_PRODUCT = 'EDITING_PRODUCT';
export const DELETING_PRODUCT = 'DELETING_PRODUCT';

export function getProducts(){
    return dispatch => {
        dispatch({type: `${GET_ALL_PRODUCTS}_PENDING`});
        axios.get(products, {headers: setHeaders()})
        .then(response => {
            return dispatch({
                type: `${GET_ALL_PRODUCTS}_FULFILLED`,
                payload: response.data
            });
        })
        .catch(e => {
            return dispatch({
                type: `${GET_ALL_PRODUCTS}_REJECTED`,
                payload: GENERIC_ERROR
            });
        });
    }
}

export function getSpecificProduct(id){
    return dispatch => {
        dispatch({type: `${GET_SPECIFIC_PRODUCT}_PENDING`});
        axios.get(`${products}/${id}`, {headers: setHeaders()})
        .then(response => {
            return dispatch({
                type: `${GET_ALL_PRODUCTS}_FULFILLED`,
                payload: response.data
            });
        })
        .catch(e => {
            return dispatch({
                type: `${GET_SPECIFIC_PRODUCT}_REJECTED`,
                payload: GENERIC_ERROR
            });
        });
    }
}

export function creatingProduct(info){
    return dispatch => {
        dispatch({type: `${CREATING_NEW_PRODUCT}_PENDING`});
        axios.post(products, JSON.stringify(info), {headers: setHeaders()})
        .then(response => {
            if(response.data.success === true){
                return dispatch({
                    type: `${CREATING_NEW_PRODUCT}_FULFILLED`,
                    payload: response.data
                });
            }
            return dispatch({
                type: `${CREATING_NEW_PRODUCT}_REJECTED`,
                payload: response.data
            });
        })
        .catch(e => {
            return dispatch({
                type: `${CREATING_NEW_PRODUCT}_REJECTED`,
                payload: ERROR_CREATING
            });
        });
    }
}

export function editingProduct(info){
    return (dispatch, getState) => {
        dispatch({type: `${EDITING_PRODUCT}_PENDING`});
        const {existingProductEdition} = getState();
        axios.put(`${products}/${existingProductEdition.product.id}`, JSON.stringify(info), {headers: setHeaders()})
        .then(response => {
            if(response.data.success === true){
                return dispatch({
                    type: `${EDITING_PRODUCT}_FULFILLED`,
                    payload: response.data
                });
            }
            return dispatch({
                type: `${EDITING_PRODUCT}_REJECTED`,
                payload: response.data
            });
        })
        .catch(e => {
            return dispatch({
                type: `${EDITING_PRODUCT}_REJECTED`,
                payload: ERROR_EDITING
            });
        });
    }
}

export function deletingProduct(id){
    return dispatch => {
        dispatch({type: `${DELETING_PRODUCT}_PENDING`});
        axios.delete(`${products}/${id}`, {headers: setHeaders()})
        .then(response => {
            if(response.data.success === true){
                dispatch({
                    type: `${DELETING_PRODUCT}_FULFILLED`,
                    payload: response.data
                });
                return dispatch(getProducts());
            }
            return dispatch({
                type: `${DELETING_PRODUCT}_REJECTED`,
                payload: response.data
            });
        })
        .catch(e => {
            return dispatch({
                type: `${DELETING_PRODUCT}_REJECTED`,
                payload: ERROR_DELETING
            });
        });
    }
}