import {GET_SPECIFIC_PRODUCT, CREATING_NEW_PRODUCT, EDITING_PRODUCT, SET_IS_VIEWING_PRODUCT, SET_IS_EDITING_PRODUCT, SET_IS_CREATING_PRODUCT,
MARK_ERROR_AS_READ} from '../../actions/productActions';
import {GET_PRODUCT_TYPES} from '../../actions/productTypesActions';

const INITIAL_STATE = {
    product: null,
    isEditing: false,
    isViewing: false,
    isProcessing: false,
    error: false,
    success: false,
    isFetching: false,
    message: '',
    productTypes: [],
    isFetchingProductTypes: false
}

export default function ViewEditCreateProduct(state=INITIAL_STATE, action){
    switch(action.type){
        case `${GET_SPECIFIC_PRODUCT}_PENDING`:
            return {...state, isFetching: true};
        case `${GET_SPECIFIC_PRODUCT}_FULFILLED`:
            return {...state, isFetching: false, product: action.payload, error: false, message: ''};
        case `${GET_SPECIFIC_PRODUCT}_REJECTED`:
            return {...state, isFetching: false, product: null, error: true, message: action.payload};
        case SET_IS_VIEWING_PRODUCT:
            return {...state, isViewing: true, isEditing: false, product: null};
        case SET_IS_EDITING_PRODUCT:
            return {...state, isViewing: false, isEditing: true, product: null};
        case SET_IS_CREATING_PRODUCT:
            return {...state, isViewing: false, isEditing: false, product: null};
        case `${CREATING_NEW_PRODUCT}_PENDING`:
            return {...state, isProcessing: true};
        case `${CREATING_NEW_PRODUCT}_FULFILLED`:
            return {...state, isProcessing: false, message: action.payload, error: false, success: true};
        case `${CREATING_NEW_PRODUCT}_REJECTED`:
            return {...state, isProcessing: false, error: true, message: action.payload, success: false};
        case `${EDITING_PRODUCT}_PENDING`:
            return {...state, isProcessing: true};
        case `${EDITING_PRODUCT}_FULFILLED`:
            return {...state, isProcessing: false, message: action.payload, errorEditing: false, isEditing: false, isViewing: true, success: true};
        case `${EDITING_PRODUCT}_REJECTED`:
            return {...state, isProcessing: false, error: true, message: action.payload, success: false};
        case `${GET_PRODUCT_TYPES}_PENDING`:
            return {...state, isFetchingProductTypes: true};
        case `${GET_PRODUCT_TYPES}_FULFILLED`:
            return {...state, isFetchingProductTypes: false, productTypes: action.payload, error: false, message: ''};
        case `${GET_PRODUCT_TYPES}_REJECTED`:
            return {...state, isFetchingProductTypes: false, productTypes: [], error: true, message: action.payload};
        case MARK_ERROR_AS_READ:
            return {...state, error: false, success: false, message: ''};
        default:
            return state;
    }
}