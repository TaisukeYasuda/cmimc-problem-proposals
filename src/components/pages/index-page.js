import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, Card } from "react-materialize";

import SignupForm from "../forms/signup";
import Error from "../error";

const IndexPage = ({ authError, authMessage }) => (
  <Row className="container">
    <Error s={12} error={ authError } message={ authMessage } />
    <Col m={5} s={12} style={{marginTop: "24px"}}>
      <h1 className="teal-text text-darken-4">USMCA</h1>
      <p>Welcome to the official USMCA problem proposals website. If you have not already, sign up and add some contests to your profile.</p>
    </Col>
    <Col m={5} s={12} offset="m1" style={{marginTop: "24px"}}>
      <Card>
        <h2 className="teal-text text-darken-4">Sign Up</h2>
        <SignupForm />
      </Card>
    </Col>
  </Row>
);

IndexPage.propTypes = {
  authError: PropTypes.bool.isRequired,
  authMessage: PropTypes.string
};

const mapStateToProps = state => ({
  authError: state.auth.error,
  authMessage: state.auth.message
});

export default connect(mapStateToProps)(IndexPage);
