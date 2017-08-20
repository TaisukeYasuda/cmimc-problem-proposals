import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, Input, Button, Card } from "react-materialize";

import LoginForm from "../forms/login";
import SignupForm from "../forms/signup";

import Error from "../error";

const LoginPage = ({ authError, authMessage }) => (
  <Row className="container">
    <Error s={12} error={ authError } message={ authMessage } />
    <Col l={6} s={12} offset={"l3"} style={{marginTop: "24px"}}>
      <Card>
        <h2 className="teal-text text-darken-4">Log In</h2>
        <LoginForm />
      </Card>
    </Col>
  </Row>
);

LoginPage.propTypes = {
  authError: PropTypes.bool.isRequired,
  authMessage: PropTypes.string
};

const mapStateToProps = state => ({
  authError: state.auth.error,
  authMessage: state.auth.message
});

export default connect(mapStateToProps)(LoginPage);
