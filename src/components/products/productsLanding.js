import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import DeleteProductDialog from './deleteProductDialog';

import {getProducts, deletingProduct, setIsEditingProduct, setIsViewingProduct, setIsCreatingProduct,
openingDeleteModal, closingDeleteModal, markErrorsAsRead} from '../../actions/productActions';

import SnackBar from '../snackbar';

import {StyledTableCell, StyledTableRow, ColorButtonBlue} from '../../constants/customUIElements';

const columns = [
    {id: 'name', label: 'Product Name', align: 'center', minWidth: '120px'},
    {id: 'productTypeName', label: 'Product Type', align: 'center', minWidth: '120px'},
    {id: 'price', label: 'Price', align: 'center', minWidth: '120px'}
]

const styles = theme => ({
    root: {
      width: '100%',
      overflowX: 'auto',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    tableWrapper: {
      width: 'auto',
    },
    button: {
      margin: theme.spacing(0, 0, 2, 3),
      color: 'white'
    }
});

export class ProductsLanding extends Component {
    componentDidMount() {
        this.props.getProducts();
    }
    render() {
        const { classes } = this.props;
        const handleViewProduct = (id) => {
            this.props.setIsViewingProduct();
            this.props.history.push(`/${id}`);
        }
        const handleEditProduct = (id) => {
            this.props.setIsEditingProduct();
            this.props.history.push(`/${id}`);
        }
        const handleCreateProduct = () => {
            this.props.setIsCreatingProduct();
            this.props.history.push('/create');
        }
        const handleDeleteOpen = (id) => {
            this.props.openingDeleteModal(id);
        }
        const handleDeleteClose = () => {
            this.props.closingDeleteModal();
        }
        const handleDeleteConfirmation = () => {
            this.props.deletingProduct();
        }
        const handleSnackBarClose = () => {
            this.props.markErrorsAsRead();
        }
        return (
            <div>
                <h2>Products</h2>
                <ColorButtonBlue variant="contained" className={classes.button} onClick={handleCreateProduct}>New Product</ColorButtonBlue>
                <DeleteProductDialog open={this.props.deleteProductModal.open} handleClose={handleDeleteClose}
                isProcessing={this.props.deleteProductModal.isProcessing} handleConfirmation={handleDeleteConfirmation} />
                <SnackBar open={this.props.errorFetchingProducts} handleClose={handleSnackBarClose} variant={'error'} message={this.props.message} />
                <SnackBar open={this.props.deleteProductModal.errorProcessing} handleClose={handleSnackBarClose} variant={'error'}
                message={this.props.deleteProductModal.message} />
                <SnackBar open={this.props.deleteProductModal.success} handleClose={handleSnackBarClose} variant={'success'}
                message={this.props.deleteProductModal.message} />
                {this.props.products.length > 0 ? (
                <Paper  className={classes.root} data-testid='list'>
                    <div className={classes.tableWrapper}>
                        <Table stickyHeader aria-label="Clients table" dense table size="medium">
                            <TableHead>
                                <StyledTableRow>
                                    {columns.map(column => (
                                    <StyledTableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                                    >
                                        {column.label}
                                    </StyledTableCell>
                                    ))}
                                    <StyledTableCell
                                    key='actions'
                                    align='center'
                                    style={{minWidth:80, fontWeight: 'bold'}}
                                    >
                                    Actions
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.products.map(row => {
                                    return (
                                    <StyledTableRow hover tabIndex={-1} key={row.id}>
                                        {columns.map(column => {
                                        const value = row[column.id];
                                        return (
                                            <StyledTableCell key={column.id} align={column.align}>
                                            {value}
                                            </StyledTableCell>
                                        );
                                        })}
                                        <StyledTableCell align='center'>
                                            <IconButton onClick={() => handleViewProduct(row.id)}>
                                                <VisibilityIcon/>
                                            </IconButton>
                                            <IconButton onClick={() => handleEditProduct(row.id)}>
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton onClick={() => handleDeleteOpen(row.id)}>
                                                <DeleteIcon/>
                                            </IconButton>                    
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    );
                                })}
                                </TableBody>
                        </Table>
                    </div>
                </Paper>
                ): <h2 style={{textAlign: 'center'}}>Hmmm, so empty here, let's add some products!</h2>}
            </div>
        );
    }
}

ProductsLanding.propTypes = {
    products: PropTypes.array.isRequired,
    getProducts: PropTypes.func.isRequired,
    deletingProduct: PropTypes.func.isRequired,
    setIsEditingProduct: PropTypes.func.isRequired,
    setIsViewingProduct: PropTypes.func.isRequired,
    setIsCreatingProduct: PropTypes.func.isRequired,
    openingDeleteModal: PropTypes.func.isRequired,
    closingDeleteModal: PropTypes.func.isRequired,
    markErrorsAsRead: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const {products, errorFetchingProducts, message} = state.productsList;
    const {deleteProductModal} = state;
    return {products, deleteProductModal, errorFetchingProducts, message};
}

const mapDispatchToProps = {
    getProducts,
    deletingProduct,
    setIsEditingProduct, 
    setIsViewingProduct,
    setIsCreatingProduct,
    openingDeleteModal,
    closingDeleteModal,
    markErrorsAsRead
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ProductsLanding));