import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ForbiddenPage from '../pages/forbidden-page';

export default function(ClassifiedComponent) {
  const AuthenticatedComponent = (props) => (
    props.authenticated ? (
      <ForbiddenPage />
    ) : (
      <ClassifiedComponent {...props} />
    )
  );

  AuthenticatedComponent.propTypes = {
    authenticated: PropTypes.bool.isRequired
  };

  const mapStatesToAuth = state => ({
    authenticated: state.auth.authenticated
  });
  
  return connect(mapStatesToAuth)(AuthenticatedComponent);
}
