import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import fetch from 'isomorphic-fetch';

import { 
  registerUser,
  errorHandler
} from '../../actions';

import SignupForm from '../forms/signup';
import Error from '../error';

const ANDREW_URL = 'https://apis.scottylabs.org/directory/v1/andrewID/';

class SignupPage extends React.Component {
  submit = values => {
    console.log(values);
    if (!values.name ||
        !values.email ||
        !values.andrewid ||
        !values.password ||
        !values.passwordConfirm) {
      this.props.errorHandler('Please fill out all fields.');
      return;
    }
    if (values.password !== values.passwordConfirm) {
      this.props.errorHandler('Passwords do not match.');
      return;
    }
    /* check if andrew id exists */
    fetch(ANDREW_URL + values.andrewid.toLowerCase())
    .then(
      response => {
        this.props.signup(values);
      },
      error => {
        this.props.errorHandler('Andrew ID not found.');
      }
    );
  }

  render = () =>  (
    <section>
      { this.props.error && <Error message={this.props.message} /> }
      <h1>Sign Up</h1>
      <p>Already have an account? Try <Link to='/login'>logging in</Link>.</p>
      <SignupForm onSubmit={this.submit} />
    </section>
  )
}

SignupPage.propTypes = {
  error: PropTypes.bool.isRequired,
  message: PropTypes.string,
  errorHandler: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.auth.error,
  message: state.auth.message
});

const mapDispatchToProps = dispatch => ({
  errorHandler: message => {
    errorHandler(dispatch, message);
  },
  signup: values => {
    registerUser(values)(dispatch);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupPage);
