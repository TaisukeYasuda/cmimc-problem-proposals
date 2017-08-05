import React from 'react';
import PropTypes from 'prop-types';

const Error = (props) => (
  props.error ? (
    <div className='alert alert-danger row'>
      <span className='form-error-msg'>{ props.message }</span>
    </div>
  ) : (
    <div></div>
  )
);

Error.propTypes = {
  error: PropTypes.bool.isRequired,
  message: PropTypes.string
};

export default Error;
