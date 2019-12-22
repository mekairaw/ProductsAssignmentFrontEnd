import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import indigo from '@material-ui/core/colors/indigo';

import {creatingProduct, editingProduct, getSpecificProduct} from '../../actions/productActions';
import {getProductTypes} from '../../actions/productTypesActions';
import { connect } from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import {renderTextField, renderCheckbox, renderSelectField, ColorButtonBlue} from '../../constants/customUIElements';

const validate = (values, props) => {
    const errors = {};
    let requiredFields = [
        'name',
        'productTypeId',
        'price'
    ];
    requiredFields.forEach(field => {
        if(!values[field]){
          errors[field] = 'Required*';
        }
    });
    if(values.productTypeId === 'Select product type'){
        errors.productTypeId = 'You MUST select a product Type.*';
    }
    if(values.price === 0){
        errors.price = 'Price need to be greater than 0.*'
    }
    if(values.name && values.name.length > 50){
        errors.name = 'Name exceeds max length allowed (50).*'
    }
    return errors;
}

class ViewCreateEditProduct extends Component {
    componentDidMount() {
        if(this.props.specificProduct.isViewing === true || this.props.specificProduct.isEditing === true){
            const id = this.props.match.params.id;
            this.props.getSpecificProduct(id);
        }
        this.props.getProductTypes();
    }
    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;
        const handleReturnToTop = () => {
            this.props.history.pop();
        }
        return (
            <div>
                <IconButton onClick={() => handleReturnToTop()}>
                  <ArrowBackIcon style={{color: indigo[500]}}/>
                </IconButton>
                <h2>{this.props.specificProduct.isViewing ? `Information for product: ${this.props.specificProduct.product ? this.props.specificProduct.product.name : ''}` :
                this.props.specificProduct.isEditing ? `Information edit for product: ${this.props.specificProduct.product ? this.props.specificProduct.product.name : ''}` :
                `Create new Product`}</h2>
                <form onSubmit={handleSubmit(this.props.specificProduct.isEditing === true ? this.props.editingProduct : this.props.creatingProduct)} init noValidate autoComplete='off'>
                    <Grid container spacing={1}>
                        <Grid item sm={12} md={6} lg={4}>
                            <Field
                                label='Name'
                                name='name'
                                type='text'
                                component={renderTextField}
                                disabled={this.props.specificProduct.isViewing}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} lg={4}>
                            <div style={{height: '16px'}}></div>
                            <Field
                                label='Product Type'
                                name='productTypeId'
                                component={renderSelectField}
                                disabled={this.props.specificProduct.isViewing}
                            >
                                <option key={0} value={null}>Select product type</option>
                                {this.props.specificProduct.productTypes.map(type => {
                                    return(
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    )
                                })}
                            </Field>
                        </Grid>
                        <Grid item sm={12} md={6} lg={4}>
                            <Field
                                label='Notes'
                                name='notes'
                                type='text'
                                component={renderTextField}
                                disabled={this.props.specificProduct.isViewing}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} lg={4}>
                            <Field
                                label='Price'
                                name='price'
                                type='number'
                                component={renderTextField}
                                disabled={this.props.specificProduct.isViewing}
                            />
                        </Grid>
                        <Grid item sm={12} md={6} lg={4}>
                            <div style={{height: '24px'}}></div>
                            <Field 
                                name="isActive" 
                                component={renderCheckbox} 
                                label="Product Active" 
                                disabled={this.props.specificProduct.isViewing}
                            />
                        </Grid>
                        {this.props.specificProduct.isViewing === false && (
                            <Grid item xs={12}>
                                <ColorButtonBlue type='submit' disabled={pristine||submitting||this.props.specificProduct.isProcessing}>
                                    Save
                                </ColorButtonBlue>
                            </Grid>
                        )}
                    </Grid>
                </form>
            </div>
        );
    }
}

ViewCreateEditProduct.propTypes = {
    creatingProduct: PropTypes.func.isRequired,
    editingProduct: PropTypes.func.isRequired,
    getSpecificProduct: PropTypes.func.isRequired,
    getProductTypes: PropTypes.func.isRequired,
    specificProduct: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const {specificProduct} = state;
    const initialValues = specificProduct.product;
    return {specificProduct, initialValues};
}

const mapDispatchToProps = {
    creatingProduct, 
    editingProduct, 
    getSpecificProduct,
    getProductTypes
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'ProductForm', validate, enableReinitialize: true})(ViewCreateEditProduct));