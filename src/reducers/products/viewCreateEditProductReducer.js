import {GET_SPECIFIC_PRODUCT, CREATING_NEW_PRODUCT, EDITING_PRODUCT, SET_IS_VIEWING_PRODUCT, SET_IS_EDITING_PRODUCT} from '../../actions/productActions';

const INITIAL_STATE = {
    product: null,
    isEditing: false,
    isViewing: false,
    isProcessing: false,
    errorCreating: false,
    errorEditing: false,
    isFetching: false,
    errorFetchingProduct: false,
    errorMessage: '',
    successMessage: ''
}

export default function ViewEditCreateProduct(state=INITIAL_STATE, action){
    switch(action.type){
        case `${GET_SPECIFIC_PRODUCT}_PENDING`:
            return {...state, isFetching: true};
        case `${GET_SPECIFIC_PRODUCT}_FULFILLED`:
            return {...state, isFetching: false, product: action.payload, errorFetchingProduct: false, errorMessage: ''};
        case `${GET_SPECIFIC_PRODUCT}_REJECTED`:
            return {...state, isFetching: false, product: null, errorFetchingProduct: true, errorMessage: action.payload};
        case SET_IS_VIEWING_PRODUCT:
            return {...state, isViewing: true, isEditing: false};
        case SET_IS_EDITING_PRODUCT:
            return {...state, isViewing: false, isEditing: true};
        case `${CREATING_NEW_PRODUCT}_PENDING`:
            return {...state, isProcessing: true};
        case `${CREATING_NEW_PRODUCT}_FULFILLED`:
            return {...state, isProcessing: false, successMessage: action.payload, errorCreating: false, errorMessage: ''};
        case `${CREATING_NEW_PRODUCT_REJECTED}`:
            return {...state, isProcessing: false, errorCreating: true, errorMessage: action.payload, successMessage: ''};
        case `${EDITING_PRODUCT}_PENDING`:
            return {...state, isProcessing: true};
        case `${EDITING_PRODUCT}_FULFILLED`:
            return {...state, isProcessing: false, successMessage: action.payload, errorEditing: false, errorMessage: '', isEditing: false, isViewing: true};
        case `${EDITING_PRODUCT}_REJECTED`:
            return {...state, isProcessing: false, errorEditing: true, errorMessage: action.payload, successMessage: ''};
        default:
            return state;
    }
}