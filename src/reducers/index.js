import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import {reducer as formReducer}from 'redux-form';
import ProductsList from './products/productsListReducer';
import Product from './products/viewCreateEditProductReducer';
import DeleteProductModal from './products/productsListReducer';

const rootReducer = history => combineReducers({
    router: connectRouter(history),
    form: formReducer,
    productsList: ProductsList,
    specificProduct: Product,
    deleteProductModal: DeleteProductModal
});

export default rootReducer;