import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  loginUser,
  registerUser,
  logoutUser
} from '../actions';

import Header from './header';
import Routes from './routes';

class App extends React.Component { 
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header authenticated={this.props.authenticated} />
          <Routes />
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return { authenticated: state.auth.authenticated };
}
const mapDispatchToProps = dispatch => {
  return {
    login: loginUser,
    register: registerUser,
    logout: logoutUser
  };
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);
