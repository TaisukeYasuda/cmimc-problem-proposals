import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import renderKaTeX from '../../katex';

class ProposeForm extends React.Component {
  previewKaTeX = () => {
    let problem = this.problemField.value,
        answer = this.answerField.value,
        solution = this.solutionField.value,
        problemPreview = document.getElementById('problem-preview'),
        answerPreview = document.getElementById('answer-preview'),
        solutionPreview = document.getElementById('solution-preview');
    if (problem) {
      problemPreview.innerHTML = problem;
      renderKaTeX(problemPreview);
    }
    if (answer) {
      answerPreview.innerHTML = answer;
      renderKaTeX(answerPreview);
    }
    if (solution) {
      solutionPreview.innerHTML = solution;
      renderKaTeX(solutonPreview);
    }
  }

  render() {
    let subjects = this.props.subjects,
        subjectsView = Object.keys(subjects).map((subject_id, key) => {
          let subject = subjects[subject_id]; 
          return (
            <option key={key} value={subject_id}>{subject.title}</option>
          );
        }),
        difficultyView = [1,2,3,4,5,6,7,8,9,10].map((difficulty, key) => (
          <option key={key} value={difficulty}>{difficulty}</option>
        ));
    return (
      <form onSubmit={this.props.handleSubmit}>
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
          <Field 
            name='problem' 
            component='textarea' 
            placeholder='Problem Statement'
            ref={input => this.problemField = input} />
        </div>
        <div id='problem-preview' className='preview'></div>
        <div>
          <Field 
            name='answer' 
            component='input' 
            type='text' 
            placeholder='Answer'
            ref={input => this.answerField = input} />
        </div>
        <div id='answer-preview' className='preview'></div>
        <div>
          <Field 
            name='solution' 
            component='textarea' 
            placeholder='Solution'
            ref={input => this.solutionField = input} />
        </div>
        <div id='solution-preview' className='preview'></div>
        <div>
          <a className='form-btn' onClick={this.previewKaTeX}>Preview</a>
          <button type='submit'>Submit</button>
        </div>
      </form>
    );
  }
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
