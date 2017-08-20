import React from 'react';
import { Row, Col, Input, Button } from 'react-materialize';
import { Field, reduxForm } from 'redux-form';

const EmailInput = ({ input, meta, ...rest }) => (
        <Input type="email" placeholder="Email" s={12} { ...input } { ...rest } />
      ),
      PasswordInput = ({ input, meta, ...rest }) => (
        <Input type="password" placeholder="Password" s={12} { ...input } { ...rest } />
      );

const LoginForm = ({ handleSubmit }) => (
  <form onSubmit={ handleSubmit }>
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
)

export default reduxForm({ 
  /* unique name for form */
  form: 'login'
})(LoginForm);
