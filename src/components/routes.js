import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';

import SignupPage from './pages/signup-page';
import LoginPage from './pages/login-page';
import Dashboard from './pages/dashboard';
import ProposePage from './pages/propose-page';
import NotFoundPage from './pages/not-found-page';

const Routes = ({ authenticated }) => (  
  <Switch>
    <Route exact path='/' component={authenticated ? Dashboard : SignupPage} />
    <Route exact path='/login' component={LoginPage}/>
    <Route exact path='/propose' component={ProposePage}/>
    <Route path='*' component={NotFoundPage} />
  </Switch>
);

Routes.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

export default withRouter(connect(mapStateToProps)(Routes));
