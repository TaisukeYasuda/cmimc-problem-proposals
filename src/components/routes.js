import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";

import IndexPage from "./pages/index-page";
import LoginPage from "./pages/login-page";
import AccountPage from "./pages/account-page";
import ProposePage from "./pages/propose-page";
import ContestsPage from "./pages/contests-page";
import ViewContestPage from "./pages/view-contest-page";
import ViewDatabasePage from "./pages/view-database-page";
import ViewProblemPage from "./pages/view-problem-page";
import NotFoundPage from "./pages/not-found-page";

import requireAuth from "./auth/require-auth";

const Routes = ({ authenticated }) => (
  <Switch>
    <Route exact path="/" component={ authenticated ? AccountPage : IndexPage } />
    <Route exact path="/login" component={ LoginPage }/>
    <Route exact path="/contests" component={ requireAuth(ContestsPage) }/>
    <Route exact path="/propose" component={ requireAuth(ProposePage) }/>
    <Route exact path="/view-database" component={ requireAuth(ViewDatabasePage) }/>
    <Route exact path="/view-contest" component={ requireAuth(ViewContestPage) }/>
    <Route exact path="/view-problem" component={ requireAuth(ViewProbPage) }/>
    <Route path="*" component={ NotFoundPage } />
  </Switch>
);

Routes.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

export default withRouter(connect(mapStateToProps)(Routes));
