import {ProductsLanding} from '../productsLanding';
import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('ProductsLanding renders correctly', () => {
    const products = [
        {
            id:1,
            name:'Test',
            productTypeName: 'StandAlone',
            isActive: true,
            notes: 'Testing',
            price: 847.53
        },
        {
            id:2,
            name:'Test',
            productTypeName: 'StandAlone',
            isActive: true,
            notes: 'Testing',
            price: 847.53
        }
    ];
    const deleteProductModal = {
        open: false,
        isProcessing: false,
        errorProcessing: false,
        errorMessage: '',
        productId: null,
        success: false
    };
    const classes = {};

    const getProducts = jest.fn();
    const deletingProduct = jest.fn();
    const setIsEditingProduct = jest.fn(); 
    const setIsViewingProduct = jest.fn();
    const setIsCreatingProduct = jest.fn();
    const openingDeleteModal = jest.fn();
    const closingDeleteModal = jest.fn();
    const markErrorsAsRead = jest.fn();

    const {getByTestId} = render(<ProductsLanding 
        products={products}
        deleteProductModal={deleteProductModal}
        errorFetchingProducts={false}
        message=''
        getProducts={getProducts}
        deletingProduct={deletingProduct}
        setIsEditingProduct={setIsEditingProduct}
        setIsViewingProduct={setIsViewingProduct}
        setIsCreatingProduct={setIsCreatingProduct}
        openingDeleteModal={openingDeleteModal}
        closingDeleteModal={closingDeleteModal}
        markErrorsAsRead={markErrorsAsRead}
        classes={classes}
    />)

    expect(getProducts).toHaveBeenCalledTimes(1);
    expect(getByTestId('list')).toBeDefined();
});