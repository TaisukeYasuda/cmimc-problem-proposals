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
          <Header />
          <Routes authenticated={this.props.authenticated} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps)(App);
