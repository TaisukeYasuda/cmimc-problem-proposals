import fetch from 'isomorphic-fetch';

import { 
  COMP_ERROR,
  COMP_REQ,
  COMP_RES,
  requestStatuses
} from './types';
import { requestTypes } from '../../constants';
import auth from '../auth';

/*******************************************************************************
 * Synchronous actions.
 ******************************************************************************/

export function compErrorHandler(dispatch, errorMessage) {
  dispatch({ type: COMP_ERROR, payload: errorMessage });
}

/*******************************************************************************
 * Async thunk actions.
 ******************************************************************************/

export function requestCompetition({ name, shortName, website }) {
  return dispatch => {
    dispatch({ 
      type: COMP_REQ, 
      payload: { requestStatus: requestStatuses.PENDING }
    });

    const userId = auth.userId();
    if (!userId) return compErrorHandler(dispatch, 'User not logged in.');
    fetch('/api/competitions', {
      method: 'post',
      body: JSON.stringify({ 
        type: requestTypes.REQUEST, 
        competition: {
          name, shortName, website 
        },
        userId: userId
      }),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(
      response => {
        return response.json()
        .then(data => {
          if (!data.success) compErrorHandler(dispatch, data.message);
          else {
            dispatch({ 
              type: COMP_REQ, 
              payload: {
                requestStatus: requestStatuses.SUBMITTED 
              }
            });
          }
        });
      }, 
      error => {
        errorMessage = error.message || 'Failed to communicate with server.';
        compErrorHandler(dispatch, errorMessage);
      }
    );
  }
}

export function respondCompetition(request, adminResponse) {
  return dispatch => {
    if (!auth.isAdmin()) compErrorHandler(dispatch, 'User is not an admin.');
    if (response !== requestTypes.ACCEPT && response !== requestTypes.REJECT) {
      compErrorHandler(dispatch, 'Invalid response to request.');
    }
    dispatch({ 
      type: COMP_RES, 
      payload: { requestStatus: requestStatuses.PENDING }
    });
    fetch.post('/api/competition', {
      method: 'post',
      body: JSON.stringify({
        requestId: request._id,
        type: adminResponse
      }),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(
      response => {
        return response.json()
        .then(data => {
          if (!data.success) compErrorHandler(dispatch, data.message);
          else {
            dispatch({ 
              type: COMP_RES, 
              payload: {
                type: adminResponse,
                requestStatus: requestStatuses.SUCCESS
              }
            });
          }
        });
      },
      error => {
        errorMessage = error.message || 'Failed to communicate with server.';
        compErrorHandler(dispatch, errorMessage);
      }
    );
  }
}
