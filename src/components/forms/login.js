import React from 'react';
import { Field, reduxForm } from 'redux-form';

const LoginForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <Field name='email' component='input' type='text' placeholder='Email' />
    </div>
    <div>
      <Field name='password' component='input' type='password' placeholder='Password' />
    </div>
    <button type='submit'>Submit</button>
  </form>
)

export default reduxForm({ 
  /* unique name for form */
  form: 'login'
})(LoginForm);
