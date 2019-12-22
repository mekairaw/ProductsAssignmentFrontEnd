import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';

export const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: blue[300],
      color: grey[900],
    },
    body: {
      fontSize: 14,
    },
}))(TableCell);
  
export const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: blue[100],
      },
      '&:nth-of-type(odd):hover': {
        backgroundColor: blue[200],
      },
    },
}))(TableRow);

export const ColorButtonBlue = withStyles(theme => ({
    root: {
        color: theme.palette.white,
        backgroundColor: blue[500],
        '&:hover':{
            backgroundColor:blue[700]
        },
    },
}))(Button);