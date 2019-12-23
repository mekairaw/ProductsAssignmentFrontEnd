import {products, setHeaders} from '../constants/api';
import axios from 'axios';
import {reset} from 'redux-form';
import { GENERIC_ERROR, ERROR_CREATING, ERROR_EDITING, ERROR_DELETING, ERROR_GETTING_ALL_PRODUCTS, ERROR_GETTING_PRODUCT } from '../constants/defaultResponses';

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_SPECIFIC_PRODUCT = 'GET_SPECIFIC_PRODUCT';
export const CREATING_NEW_PRODUCT = 'CREATING_NEW_PRODUCT';
export const EDITING_PRODUCT = 'EDITING_PRODUCT';
export const DELETING_PRODUCT = 'DELETING_PRODUCT';

export const OPENING_DELETE_MODAL = 'OPENING_DELETE_MODAL';
export const CLOSING_DELETE_MODAL = 'CLOSING_DELETE_MODAL';

export const SET_IS_VIEWING_PRODUCT = 'SET_IS_VIEWING_PRODUCT';
export const SET_IS_EDITING_PRODUCT = 'SET_IS_EDITING_PRODUCT';
export const SET_IS_CREATING_PRODUCT = 'SET_IS_CREATING_PRODUCT';

export const MARK_ERROR_AS_READ = 'MARK_ERROR_AS_READ';

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
            console.log(e)
            return dispatch({
                type: `${GET_ALL_PRODUCTS}_REJECTED`,
                payload: ERROR_GETTING_ALL_PRODUCTS
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
                type: `${GET_SPECIFIC_PRODUCT}_FULFILLED`,
                payload: response.data
            });
        })
        .catch(e => {
            return dispatch({
                type: `${GET_SPECIFIC_PRODUCT}_REJECTED`,
                payload: ERROR_GETTING_PRODUCT
            });
        });
    }
}

export function creatingProduct(info){
    return dispatch => {
        dispatch({type: `${CREATING_NEW_PRODUCT}_PENDING`});
        if(!info.isActive){
            info.isActive = false;
        }
        axios.post(products, JSON.stringify(info), {headers: setHeaders()})
        .then(response => {
            if(response.data.success === true){
                dispatch({
                    type: `${CREATING_NEW_PRODUCT}_FULFILLED`,
                    payload: response.data.message
                });
                return dispatch(reset('ProductForm'));
            }
            return dispatch({
                type: `${CREATING_NEW_PRODUCT}_REJECTED`,
                payload: response.data.message
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
        if(!info.isActive){
            info.isActive = false;
        }
        const {specificProduct} = getState();
        axios.put(`${products}/${specificProduct.product.id}`, JSON.stringify(info), {headers: setHeaders()})
        .then(response => {
            if(response.data.success === true){
                return dispatch({
                    type: `${EDITING_PRODUCT}_FULFILLED`,
                    payload: response.data.message
                });
            }
            return dispatch({
                type: `${EDITING_PRODUCT}_REJECTED`,
                payload: response.data.message
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

export function deletingProduct(){
    return (dispatch, getState) => {
        dispatch({type: `${DELETING_PRODUCT}_PENDING`});
        const {deleteProductModal} = getState();
        axios.delete(`${products}/${deleteProductModal.productId}`, {headers: setHeaders()})
        .then(response => {
            if(response.data.success === true){
                dispatch({
                    type: `${DELETING_PRODUCT}_FULFILLED`,
                    payload: response.data.message
                });
                return dispatch(getProducts());
            }
            return dispatch({
                type: `${DELETING_PRODUCT}_REJECTED`,
                payload: response.data.message
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

export function openingDeleteModal(id){
    return dispatch => {
        return dispatch({type: OPENING_DELETE_MODAL, payload: id});
    }
}

export function closingDeleteModal(){
    return dispatch => {
        return dispatch({type: CLOSING_DELETE_MODAL});
    }
}

export function setIsViewingProduct(){
    return dispatch => {
        return dispatch({type: SET_IS_VIEWING_PRODUCT});
    }
}

export function setIsEditingProduct(){
    return dispatch => {
        return dispatch({type: SET_IS_EDITING_PRODUCT});
    }
}

export function setIsCreatingProduct(){
    return dispatch => {
        return dispatch({type: SET_IS_CREATING_PRODUCT});
    }
}

export function markErrorsAsRead(){
    return dispatch => {
        return dispatch({type: MARK_ERROR_AS_READ});
    }
}