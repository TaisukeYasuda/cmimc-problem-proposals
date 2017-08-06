import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import fetch from 'isomorphic-fetch';

import { 
  loginUser,
  errorHandler
} from '../../actions';

import LoginForm from '../forms/login';
import Error from '../error';

class LoginPage extends React.Component {
  componentWillMount = () => {
    if (this.props.authenticated) this.props.history.push('/');
  }

  componentWillUpdate = (nextProps) => {
    if (nextProps.authenticated) this.props.history.push('/');
  }

  submit = values => {
    if (!values.email ||
        !values.password) {
      this.props.errorHandler('Please fill out all fields.');
      return;
    }
    this.props.login(values);
  }

  render = () =>  (
    <section>
      { this.props.error && <Error message={this.props.message} /> }
      <h1>Login</h1>
      <p>Don't have an account? Try <Link to='/'>signing up</Link>.</p>
      <LoginForm onSubmit={this.submit} />
    </section>
  )
}

LoginPage.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  message: PropTypes.string,
  errorHandler: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  error: state.auth.error,
  message: state.auth.message
});

const mapDispatchToProps = dispatch => ({
  errorHandler: message => {
    errorHandler(dispatch, message);
  },
  login: values => {
    loginUser(values)(dispatch);
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginPage)
);
