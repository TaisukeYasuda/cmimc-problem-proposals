import fetch from 'isomorphic-fetch';
import $ from 'jquery';

import auth from '../auth';
import {
  requestStatuses,
  INIT_ERROR,
  INIT_USER,
  INIT_APP
} from './types';

/*******************************************************************************
 * Synchronous actions.
 ******************************************************************************/

export function initErrorHandler(dispatch, errorMessage) {
  dispatch({ type: INIT_ERROR, payload: errorMessage});
}

/*******************************************************************************
 * Async thunk actions.
 ******************************************************************************/
export function initUser() {
  return dispatch => {
    dispatch({ 
      type: INIT_USER, 
      payload: { 
        requestStatus: requestStatuses.PENDING
      }
    });
    const userId = auth.userId();
    console.log('logged in:', userId);
    if (userId) {
      fetch(`/api/user?${$.param({ id: userId })}`, { 
        method: 'get',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(
        response => {
          return response.json()
          .then(data => {
            const { error, message, user } = data;
            if (error) initErrorHandler(dispatch, message);
            else {
              dispatch({
                type: INIT_USER,
                payload: {
                  requestStatus: requestStatuses.SUCCESS,
                  user: user
                }
              });
            }
          });
        }, 
        error => {
          errorMessage = error.message || 'Failed to communicate with server.';
          initErrorHandler(dispatch, errorMessage);
        }
      );
    }
  }
}

export function initApp() {
  return dispatch => {
    initUser()(dispatch);
  }
}
