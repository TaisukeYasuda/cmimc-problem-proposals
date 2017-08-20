import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';

import IndexPage from './pages/index-page';
import LoginPage from './pages/log-in-page';
import ProposePage from './pages/propose-prob-page';
import DatabasePage from './pages/database-page';
import AccountPage from './pages/account-page';
import ViewProbPage from './pages/view-prob-page';
import NotFoundPage from './pages/not-found-page';

const Routes = ({ authenticated }) => (  
  <Switch>
    <Route exact path='/' component={ IndexPage } />
    <Route exact path='/login' component={ LoginPage }/>
    <Route exact path='/propose' component={ ProposePage }/>
    <Route exact path='/database' component={ DatabasePage }/>
    <Route exact path='/account' component={ AccountPage }/>
    <Route exact path='/view-problem' component={ ViewProbPage }/>
    <Route path='*' component={ NotFoundPage } />
  </Switch>
);

Routes.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

export default withRouter(connect(mapStateToProps)(Routes));
