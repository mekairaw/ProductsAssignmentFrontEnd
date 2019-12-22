import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControlLabel, FormControl, InputLabel, Select, FormHelperText } from '@material-ui/core';
import React from 'react';

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

export const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'indigo',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'indigo',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'indigo',
      },
      '&:hover fieldset': {
        borderColor: 'indigo',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'indigo',
      },
    },
  },
})(TextField);

export const GreenCheckbox = withStyles({
  root: {
    color: indigo[400],
    '&$checked': {
      color: indigo[600],
    },
  },
  checked: {},
})(Checkbox);

export const CssFormControl = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'indigo',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'indigo',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'indigo',
      },
      '&:hover fieldset': {
        borderColor: 'indigo',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'indigo',
      },
    },
  },
})(FormControl);

export const renderTextField = ({
  label,
  input,
  type,
  meta: {touched, invalid, error},
  ...custom
}) => (
  <CssTextField
  label={label}
  placeholder={label}
  type={type}
  variant="outlined"
  margin="normal"
  fullWidth
  error={touched && invalid}
  helperText={touched && error}
  {...input}
  {...custom}
  />
);

export const renderCheckbox = ({input, label, ...custom}) => (
  <div>
    <FormControlLabel
    control={
      <GreenCheckbox
      checked={input.value ? true : false}
      onChange={input.onChange}
      {...custom}
      />
    }
    label={label}
    />
  </div>
);

export const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <CssFormControl variant="outlined" fullWidth error={touched && !!error}>
    <InputLabel htmlFor="age-native-simple" variant={'outlined'} style={{backgroundColor: "#FFFFFF"}}>{label}</InputLabel>
    <Select
      native
      {...input}
      {...custom}
      inputProps={{
        name: 'age',
        id: 'age-native-simple'
      }}
    >
      {children}
    </Select>
    {touched && error && <div><FormHelperText>{touched && error}</FormHelperText></div>}
    
  </CssFormControl>
)