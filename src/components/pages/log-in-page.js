import React from "react";

import { Row, Col } from "react-materialize";

const LoginPage = ({ message }) => (
  <Row className="container">
    <Col m={6} s={12}>
      <h2>Log In</h2>
      
    </Col>
    <Col m={6} s={12}>
      <h2>Sign Up</h2>
    </Col>
  </Row>
);

export default LoginPage;
