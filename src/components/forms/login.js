import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, Button } from 'react-materialize';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { authErrorHandler, loginUser } from "../../actions";

const EmailInput = ({ input, meta, ...rest }) => (
        <Input type="email" placeholder="Email" s={12} { ...input } { ...rest } />
      ),
      PasswordInput = ({ input, meta, ...rest }) => (
        <Input type="password" placeholder="Password" s={12} { ...input } { ...rest } />
      );

class LoginForm extends React.Component {
  onSubmit = ({ email, password }) => {
    if (!email || !password) {
      this.props.authErrorHandler("Please fill out all fields.");
    } else {
      this.props.loginUser({ email, password });
    }
  };

  render() {
    const { handleSubmit, authError, authMessage } = this.props;
    return (
      <form onSubmit={ handleSubmit(this.onSubmit) }>
        <Row className="placeholder-form">
          <div>
            <Field name="email" component={ EmailInput } />
          </div>
          <div>
            <Field name="password" component={ PasswordInput } />
          </div>
          <Col s={12}>
            <Button waves="light" className="teal darken-4 right">Log In</Button>
          </Col>
        </Row>
      </form>
    );
  }
}

LoginForm.propTypes = {
  authError: PropTypes.bool.isRequired,
  authMessage: PropTypes.string,
  authErrorHandler: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authError: state.auth.error,
  authMessage: state.auth.message
});

const mapDispatchToProps = dispatch => ({
  authErrorHandler: message => {
    authErrorHandler(dispatch, message);
  },
  loginUser: values => {
    loginUser(values)(dispatch);
  }
});

export default reduxForm({
  /* unique name for form */
  form: 'login'
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginForm)
);
