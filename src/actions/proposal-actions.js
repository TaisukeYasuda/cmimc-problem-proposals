import fetch from 'isomorphic-fetch';
import { FETCH_MY_PROPOSALS } from './types';

import auth from '../auth';

const API_URL = 'http://localhost:8000/api/proposals',
      CLIENT_ROOT_URL = 'http://localhost:8000';

/*******************************************************************************
 * Synchronous actions.
 ******************************************************************************/

export function proposalErrorHandler(dispatch, errorMessage) {
  dispatch({
    type: FETCH_MY_PROPOSALS,
    payload: {
      error: true,
      message: errorMessage
    }
  });
}

/*******************************************************************************
 * Async thunk actions.
 ******************************************************************************/

export function fetchMyProposals() {
  return dispatch => {
    dispatch({ 
      type: FETCH_MY_PROPOSALS, 
      payload: { status: null }
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
              payload: { status: 'success', content: data.content }
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
