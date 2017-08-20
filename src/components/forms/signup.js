import React from 'react';
import { Row, Col, Input, Button } from 'react-materialize';
import { Field, reduxForm } from 'redux-form';

const NameInput = ({ input, meta, ...rest }) => (
        <Input type="text" placeholder="Name" s={12} { ...input } { ...rest } />
      ),
      EmailInput = ({ input, meta, ...rest }) => (
        <Input type="email" placeholder="Email" s={12} { ...input } { ...rest } />
      ),
      PasswordInput = ({ input, meta, ...rest }) => (
        <Input type="password" placeholder="Password" s={12} { ...input } { ...rest } />
      ),
      PasswordConfirmInput = ({ input, meta, ...rest }) => (
        <Input type="password" placeholder="Password (confirm)" s={12} { ...input } { ...rest } />
      ),
      UniversityInput = ({ input, meta, ...rest }) => (
        <Input type="text" placeholder="University" s={12} { ...input } { ...rest } />
      );

const SignupForm = ({ handleSubmit }) => (
  <form onSubmit={ handleSubmit }>
    <Row className="placeholder-form">
      <div>
        <Field name="name" component={ NameInput } />
      </div>
      <div>
        <Field name="email" component={ EmailInput } />
      </div>
      <div>
        <Field name="password" component={ PasswordInput } />
      </div>
      <div>
        <Field name="passwordConfirm" component={ PasswordConfirmInput } />
      </div>
      <div>
        <Field name="university" component={ UniversityInput } />
      </div>
      <Col s={12}>
        <Button waves="light" className="teal darken-4 right">Sign Up</Button>
      </Col>
    </Row>
  </form>
)

export default reduxForm({ 
  /* unique name for form */
  form: 'signup'
})(SignupForm);
