import {GET_ALL_PRODUCTS, MARK_ERROR_AS_READ} from '../../actions/productActions';

const INITIAL_STATE = {
    products: [],
    isFetchingProducts: false,
    errorFetchingProducts: false,
    message: ''
}

export default function ProductsList(state=INITIAL_STATE, action){
    switch(action.type){
        case `${GET_ALL_PRODUCTS}_PENDING`:
            return {...state, isFetchingProducts: true, errorFetchingProducts: false};
        case `${GET_ALL_PRODUCTS}_FULFILLED`:
            return {...state, isFetchingProducts: false, errorFetchingProducts: false, message: '', products: action.payload}
        case `${GET_ALL_PRODUCTS}_REJECTED`:
            return {...state, isFetchingProducts: false, errorFetchingProducts: true, message: action.payload, products: []};
        case MARK_ERROR_AS_READ:
            return {...state, errorFetchingProducts: false, message: ''};
        default:
            return state;
    }
}