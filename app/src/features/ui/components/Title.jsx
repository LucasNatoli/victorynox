import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

export function Title(props) {
  return (
    <Typography component="h2" variant={props.variant || "h5"} color="primary" m={2}>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

