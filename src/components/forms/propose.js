import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

const selector = formValueSelector('propose');

const ProposeForm  = ({ subjects, handleSubmit }) => {
  let subjectsView = Object.keys(subjects).map((subject_id, key) => {
        let subject = subjects[subject_id]; 
        return (
          <option key={key} value={subject_id}>{subject.title}</option>
        );
      }),
      difficultyView = [1,2,3,4,5,6,7,8,9,10].map((difficulty, key) => (
        <option key={key} value={difficulty}>{difficulty}</option>
      ));
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name='subject' component='select'>
          <option value=''>Subject</option>
          { subjectsView }
        </Field>
      </div>
      <div>
        <Field name='difficulty' component='select'>
          <option value=''>Difficulty</option>
          { difficultyView }
        </Field>
      </div>
      <div>
        <Field name='problem' component='textarea' placeholder='Problem Statement' />
      </div>
      <div>
        <Field name='answer' component='input' type='text' placeholder='Answer' />
      </div>
      <div>
        <Field name='solution' component='textarea' placeholder='Solution' />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
};

ProposeForm.propTypes = {
  subjects: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  subjects: state.init.subjects
});

export default connect(mapStateToProps)(
  reduxForm({ 
    /* unique name for form */
    form: 'propose'
  })(ProposeForm)
);
