import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  fetchMyProposals
} from '../actions';

import ProposalsList from './proposals-list';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchMyProposals();
  }

  render() {
    return (
      <section>
        <h1>Dashboard</h1>
        <p>You are logged in! Propose some problems!</p>
        <h1>My Proposals</h1>
        <ProposalsList proposals={this.props.myProposals} />
      </section>
    );
  }
}

Dashboard.propTypes = {
  fetchMyProposals: PropTypes.func.isRequired,
  myProposals: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  myProposals: state.proposals.myProposals
});

const mapDispatchToProps = dispatch => ({
  fetchMyProposals: () => {
    fetchMyProposals()(dispatch);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
