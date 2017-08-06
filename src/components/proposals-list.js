import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProposalsList = ({ subjects, proposals }) => {
  let proposalsView = proposals.map((proposal, key) => (
        <tr key={key}>
          <td>{proposal.prob_id}</td>
          <td>{subjects[proposal.subject].title}</td>
          <td>{proposal.problem}</td>
          <td><a href='#' className='view-btn'></a></td>
          <td><a href='#' className='edit-btn'></a></td>
        </tr>
      ));
  return proposals.length === 0 ? (
    <p>No proposals.</p>
  ) : (
    <table>
      <tbody>
        <tr>
          <th>ID</th>
          <th>Subject</th>
          <th>Statement</th>
          <th>View</th>
          <th>Edit</th>
        </tr>
        {proposalsView}
      </tbody>
    </table>
  );
};

ProposalsList.propTypes = {
  proposals: PropTypes.array.isRequired,
  subjects: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  subjects: state.init.subjects
})

export default connect(mapStateToProps)(ProposalsList);
