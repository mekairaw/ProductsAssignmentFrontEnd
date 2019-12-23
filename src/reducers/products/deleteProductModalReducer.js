import {DELETING_PRODUCT, OPENING_DELETE_MODAL, CLOSING_DELETE_MODAL, MARK_ERROR_AS_READ} from '../../actions/productActions';

const INITIAL_STATE = {
    open: false,
    isProcessing: false,
    errorProcessing: false,
    errorMessage: '',
    productId: null,
    success: false
}

export default function DeleteProductModal(state=INITIAL_STATE, action){
    switch(action.type){
        case OPENING_DELETE_MODAL:
            return {...state, open: true, productId: action.payload};
        case CLOSING_DELETE_MODAL:
            return {...state, open: false, isProcessing: false, productId: null, errorProcessing: false, message: ''};
        case `${DELETING_PRODUCT}_PENDING`:
            return {...state, isProcessing: true};
        case `${DELETING_PRODUCT}_FULFILLED`:
            return {...state, isProcessing: false, open: false, productId: null, message: action.payload, errorProcessing: false, success: true};
        case `${DELETING_PRODUCT}_REJECTED`:
            return {...state, errorProcessing: true, message: action.payload, success: false};
        case MARK_ERROR_AS_READ:
            return {...state, errorProcessing: false, message: '', success: false};
        default:
            return state;
    }
}