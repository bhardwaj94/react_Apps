import React, { PropTypes } from 'react';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import './searchStyle.css';

const Search = (props) => {
    const { value, onChange } = props;
    return (
        <Paper style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-evenly',
            margin: '10px',
            padding: '15px'
        }}>
            <Typography variant="h5" component="h3">
                Search By Planets.
            </Typography>
            <Input
                placeholder="Enter a search term"
                onChange={e => onChange(e.target.value)}
                value={value}
                autoFocus
                style={{}}
                inputProps={{
                    'aria-label': 'description',
                }}
            />

        </Paper>
    );
};

Search.propTypes = {
    //   value: PropTypes.string,
    //   onChange: PropTypes.func,
};

export default Search;
