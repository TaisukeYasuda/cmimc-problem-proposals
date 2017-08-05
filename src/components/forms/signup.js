import React from 'react';
import { Field, reduxForm } from 'redux-form';

const SignupForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <Field name='name' component='input' type='text' placeholder='Full Name' />
    </div>
    <div>
      <Field name='email' component='input' type='text' placeholder='Email' />
    </div>
    <div>
      <Field name='andrewid' component='input' type='text' placeholder='Andrew ID' />
    </div>
    <div>
      <Field name='password' component='input' type='password' placeholder='Password' />
    </div>
    <div>
      <Field name='passwordConfirm' component='input' type='password' placeholder='Password (confirm)' />
    </div>
    <button type='submit'>Submit</button>
  </form>
)

export default reduxForm({ 
  /* unique name for form */
  form: 'signup'
})(SignupForm);
