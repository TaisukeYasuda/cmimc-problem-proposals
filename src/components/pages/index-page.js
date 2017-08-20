import React from "react";

import { Row, Col, Input, Button, Card } from "react-materialize";

const IndexPage = ({ message }) => (
  <Row className="container">
    <Col m={5} s={12} style={{marginTop: "24px"}}>
      <h1 className="teal-text text-darken-4">USMCA</h1>
      <p>Welcome to the official USMCA problem proposals website. If you have not already, sign up and add some contests to your profile.</p>
    </Col>
    <Col m={5} s={12} offset="m1" style={{marginTop: "24px"}}>
      <Card>
        <h2 className="teal-text text-darken-4">Sign Up</h2>
        <form>
          <Row className="placeholder-form">
            <Input type="text" placeholder="Name" s={12} />
            <Input type="email" placeholder="Email" s={12} />
            <Input type="password" placeholder="Password" s={12} />
            <Input type="password" placeholder="Password (confirm)" s={12} />
            <Input type="text" placeholder="University" s={12} />
            <Col s={12}>
              <Button waves="light" className="teal darken-4 right">Sign Up</Button>
            </Col>
          </Row>
        </form>
      </Card>
    </Col>
  </Row>
);

export default IndexPage;
