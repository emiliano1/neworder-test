import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { SearchSharp } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchBar: {
      width: '100%',
      maxWidth: 1024,
      margin: theme.spacing(1),
      backgroundColor: "#f6f6f6",
      borderRadius: "0.5rem 0.5rem 0 0",
      marginBottom: "0"
    },
  }),
);

export default function SearchBar(props) {
  const classes = useStyles();

  return (    
    <TextField
    value={props.value}
    onChange={props.onChange}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    className={classes.searchBar}
    variant="filled"
    label="Search React's issues"
    color="primary"
    InputProps={{
        startAdornment: (
        <InputAdornment position="start">
            <SearchSharp />
        </InputAdornment>
        ),
    }}
    />    
  );
}