import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import renderKaTeX from '../katex';

class ProposalsList extends React.Component {
  render() {
    let subjects = this.props.subjects,
        proposals = this.props.proposals,
        proposalsView = proposals.map((proposal, key) => (
          <tr key={key}>
            <td>{proposal.prob_id}</td>
            <td>{subjects[proposal.subject].title}</td>
            <td ref={renderKaTeX}>{proposal.problem}</td>
            <td><a href='#' className='view-btn'></a></td>
            <td><a href='#' className='edit-btn'></a></td>
          </tr>
        ));
    return proposals.length === 0 ? (
      <p>No proposals.</p>
    ) : (
      <table ref="mytable">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>Statement</th>
            <th>View</th>
            <th>Edit</th>
          </tr>
          { proposalsView }
        </tbody>
      </table>
    );
  }
}

ProposalsList.propTypes = {
  proposals: PropTypes.array.isRequired,
  subjects: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  subjects: state.init.subjects
})

export default connect(mapStateToProps)(ProposalsList);
