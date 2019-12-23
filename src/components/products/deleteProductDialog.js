import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


class DeleteProductDialog extends Component {

    constructor(props){
        super(props);
    }
    componentDidMount() {
    }
    
    render() {
        const {open, handleClose, handleConfirmation, isProcessing} = this.props;
        
        return (
            <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}
                disableBackdropClick={isProcessing}
                disableEscapeKeyDown={isProcessing}
                scroll={'paper'}
                    maxWidth={'xs'}>
                    <DialogTitle id="form-dialog-title">Delete Product</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ¿Are you sure you want to delete this product? This process is irreversible.
                        </DialogContentText>                                                            
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary"  disabled={isProcessing}>
                            Cancel
                        </Button>
                        <Button  color="primary" onClick={handleConfirmation} disabled={isProcessing}>
                            Confirm
                            </Button>
                    </DialogActions>

                </Dialog>       
            </div>
        )
    }
}



export default DeleteProductDialog;