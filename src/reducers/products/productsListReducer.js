import {GET_ALL_PRODUCTS} from '../../actions/productActions';

const INITIAL_STATE = {
    products: [],
    isFetchingProducts: false,
    errorFetchingProducts: false,
    errorMessage: ''
}

export default function ProductsList(state=INITIAL_STATE, action){
    switch(action.type){
        case `${GET_ALL_PRODUCTS}_PENDING`:
            return {...state, isFetchingProducts: true, errorFetchingProducts: false};
        case `${GET_ALL_PRODUCTS}_FULFILLED`:
            return {...state, isFetchingProducts: false, errorFetchingProducts: false, errorMessage: '', products: action.payload}
        case `${GET_ALL_PRODUCTS}_REJECTED`:
            return {...state, isFetchingProducts: false, errorFetchingProducts: true, errorMessage: action.payload, products: []};
        default:
            return state;
    }
}