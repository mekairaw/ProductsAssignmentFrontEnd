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

import {getProducts} from '../../actions/productActions';

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

class ProductsLanding extends Component {
    componentDidMount() {
        this.props.getProducts();
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <h2>Products</h2>
                <ColorButtonBlue variant="contained" className={classes.button}>New Product</ColorButtonBlue>
                <Paper  className={classes.root}>
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
                                            <IconButton>
                                                <VisibilityIcon/>
                                            </IconButton>
                                            <IconButton>
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton>
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
            </div>
        );
    }
}

ProductsLanding.propTypes = {
    products: PropTypes.array.isRequired,
    getProducts: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const {products} = state.productsList;
    return {products};
}

const mapDispatchToProps = {
    getProducts
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ProductsLanding));