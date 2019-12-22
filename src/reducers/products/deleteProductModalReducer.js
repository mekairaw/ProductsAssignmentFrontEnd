import {DELETING_PRODUCT, OPENING_DELETE_MODAL, CLOSING_DELETE_MODAL} from '../../actions/productActions';

const INITIAL_STATE = {
    open: false,
    isProcessing: false,
    errorProcessing: false,
    errorMessage: '',
    productId: null
}

export default function DeleteProductModal(state=INITIAL_STATE, action){
    switch(action.type){
        case OPENING_DELETE_MODAL:
            return {...state, open: true, productId: action.payload};
        case CLOSING_DELETE_MODAL:
            return {...state, open: false, isProcessing: false, productId: null, errorProcessing: false, errorMessage: ''};
        case `${DELETING_PRODUCT}_PENDING`:
            return {...state, isProcessing: true};
        case `${DELETING_PRODUCT}_FULFILLED`:
            return {...state, isProcessing: false, open: false, productId: null, errorMessage: '', errorProcessing: false};
        case `${DELETING_PRODUCT}_REJECTED`:
            return {...state, errorProcessing: true, errorMessage: ''};
        default:
            return state;
    }
}