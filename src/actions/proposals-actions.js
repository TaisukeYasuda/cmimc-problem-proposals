import fetch from 'isomorphic-fetch';
import {
  PROPOSAL_ERROR,
  FETCH_MY_PROPOSALS,
  POST_PROPOSAL
} from './types';

import auth from '../auth';

const API_URL = 'http://localhost:8000/api/proposals',
      CLIENT_ROOT_URL = 'http://localhost:8000';

export const PENDING = 'pending',
             SUCCESS = 'success';

/*******************************************************************************
 * Synchronous actions.
 ******************************************************************************/

export function proposalErrorHandler(dispatch, errorMessage) {
  dispatch({
    type: PROPOSAL_ERROR,
    payload: errorMessage
  });
}

/*******************************************************************************
 * Async thunk actions.
 ******************************************************************************/

export function fetchMyProposals() {
  return dispatch => {
    dispatch({ 
      type: FETCH_MY_PROPOSALS, 
      payload: { status: PENDING }
    });
    let token = localStorage.getItem('token'),
        staffId = auth.staffId();
    fetch(`${API_URL}/${staffId}`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(
      response => {
        return response.json()
        .then(data => {
          if (data.error) proposalErrorHandler(dispatch, data.message);
          else {
            dispatch({ 
              type: FETCH_MY_PROPOSALS,
              payload: { status: SUCCESS, content: data.content }
            });
          }
        });
      }, 
      error => {
        errorMessage = error.message || 'Failed to communicate with server.';
        proposalErrorHandler(dispatch, errorMessage);
      }
    );
  }
}

export function postProposal(proposal) {
  return dispatch => {
    dispatch({
      type: POST_PROPOSAL,
      payload: { status: PENDING }
    });
    let token = localStorage.getItem('token'),
        staffId = auth.staffId();
    proposal.staff_id = staffId;
    fetch(API_URL, {
      method: 'post',
      body: JSON.stringify(proposal),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(
      response => {
        return response.json()
        .then(data => {
          if (data.error) proposalErrorHandler(dispatch, data.message);
          else {
            dispatch({ 
              type: POST_PROPOSAL,
              payload: { status: SUCCESS }
            });
          }
        });
      },
      error => {
        errorMessage = error.message || 'Failed to communicate with server.';
        proposalErrorHandler(dispatch, errorMessage);
      }
    );
  }
}
