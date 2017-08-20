import React from "react";
import { Row, Col, Input, Button, Card } from "react-materialize";

import LoginForm from "../forms/login";
import SignupForm from "../forms/signup";

class LoginPage extends React.Component {
  loginSubmit(values) {
    console.log("Login:", values);
  }

  signupSubmit(values) {
    console.log("Signup:", values);
  }

  render() { 
    return (
      <Row className="container">
        <Col m={5} s={12} style={{marginTop: "24px"}}>
          <Card>
            <h2 className="teal-text text-darken-4">Log In</h2>
            <LoginForm onSubmit={ this.loginSubmit } />
          </Card>
        </Col>
        <Col m={5} s={12} offset="m1" style={{marginTop: "24px"}}>
          <Card>
            <h2 className="teal-text text-darken-4">Sign Up</h2>
            <SignupForm onSubmit={ this.signupSubmit } />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default LoginPage;
