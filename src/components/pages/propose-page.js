import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import fetch from 'isomorphic-fetch';

import { 
  postProposal,
  proposalErrorHandler
} from '../../actions';

import ProposeForm from '../forms/propose';
import Error from '../error';
import Spinner from '../spinner';

class ProposePage extends React.Component {
  submit = values =>  {
    if (!values.subject ||
        !values.difficulty ||
        !values.problem ||
        !values.answer ||
        !values.solution) {
      this.props.errorHandler('Please fill out all fields.');
      return;
    }
    this.props.postProposal({
      subject: values.subject,
      difficulty: values.difficulty,
      problem: values.problem,
      answer: values.answer,
      solution: values.solution
    });
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.proposalSubmitting && !nextProps.proposalSubmitting) {
      this.props.history.push('/');
    }
  }

  render() {
    return ( 
      /* can propose only if authenticated */
      this.props.authenticated ? (
        /* show spinner if submitting */
        this.props.proposalSubmitting ? ( <Spinner /> ) : (
          <section>
            { this.props.error && <Error message={this.props.message} /> }
            <h1>Submit Proposal</h1>
            <ProposeForm onSubmit={this.submit} />
          </section>
        )
      ) : (
        <section>
          <h1>You aren't logged in yet!</h1>
          <p>To propose problems for CMIMC, either <Link to='/'>signup</Link> or <Link to='/login'>login</Link>.</p>
        </section>
      )
    );
  }
}

ProposePage.propTypes = {
  error: PropTypes.bool.isRequired,
  message: PropTypes.string,
  proposalSubmitting: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  errorHandler: PropTypes.func.isRequired,
  postProposal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  error: state.proposals.error,
  message: state.proposals.message,
  proposalSubmitting: state.proposals.proposalSubmitting
});

const mapDispatchToProps = dispatch => ({
  errorHandler: message => {
    proposalErrorHandler(dispatch, message);
  },
  postProposal: proposal => {
    postProposal(proposal)(dispatch);
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProposePage)
);
