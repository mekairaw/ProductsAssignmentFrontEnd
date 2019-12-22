import {GET_SPECIFIC_PRODUCT, CREATING_NEW_PRODUCT, EDITING_PRODUCT, SET_IS_VIEWING_PRODUCT, SET_IS_EDITING_PRODUCT, SET_IS_CREATING_PRODUCT} from '../../actions/productActions';
import {GET_PRODUCT_TYPES} from '../../actions/productTypesActions';

const INITIAL_STATE = {
    product: null,
    isEditing: false,
    isViewing: false,
    isProcessing: false,
    errorCreating: false,
    errorEditing: false,
    successCreating: false,
    successEditing: false,
    isFetching: false,
    errorFetchingProduct: false,
    errorMessage: '',
    successMessage: '',
    productTypes: [],
    isFetchingProductTypes: false,
    errorFetchingProductTypes: false
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
            return {...state, isViewing: true, isEditing: false, product: null};
        case SET_IS_EDITING_PRODUCT:
            return {...state, isViewing: false, isEditing: true, product: null};
        case SET_IS_CREATING_PRODUCT:
            return {...state, isViewing: false, isEditing: false, product: null};
        case `${CREATING_NEW_PRODUCT}_PENDING`:
            return {...state, isProcessing: true};
        case `${CREATING_NEW_PRODUCT}_FULFILLED`:
            return {...state, isProcessing: false, successMessage: action.payload, errorCreating: false, errorMessage: '', successCreating: true};
        case `${CREATING_NEW_PRODUCT}_REJECTED`:
            return {...state, isProcessing: false, errorCreating: true, errorMessage: action.payload, successMessage: '', successCreating: false};
        case `${EDITING_PRODUCT}_PENDING`:
            return {...state, isProcessing: true};
        case `${EDITING_PRODUCT}_FULFILLED`:
            return {...state, isProcessing: false, successMessage: action.payload, errorEditing: false, errorMessage: '', isEditing: false, isViewing: true, successEditing: true};
        case `${EDITING_PRODUCT}_REJECTED`:
            return {...state, isProcessing: false, errorEditing: true, errorMessage: action.payload, successMessage: '', successEditing: false};
        case `${GET_PRODUCT_TYPES}_PENDING`:
            return {...state, isFetchingProductTypes: true};
        case `${GET_PRODUCT_TYPES}_FULFILLED`:
            return {...state, isFetchingProductTypes: false, productTypes: action.payload, errorFetchingProductTypes: false, errorMessage: ''};
        case `${GET_PRODUCT_TYPES}_REJECTED`:
            return {...state, isFetchingProductTypes: false, productTypes: [], errorFetchingProductTypes: true, errorMessage: action.payload};
        default:
            return state;
    }
}