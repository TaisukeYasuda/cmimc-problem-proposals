import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ message }) => (
  <div className='alert alert-danger row'>
    <span className='form-error-msg'>{ message }</span>
  </div>
);

Error.propTypes = {
  message: PropTypes.string.isRequired
};

export default Error;
