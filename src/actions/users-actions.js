import fetch from 'isomorphic-fetch';
import $ from 'jquery';

import auth from '../auth';
import {
  requestStatuses,
  USER_ERROR,
  USER_INFO,
  USER_ADMIN
} from './types';

/*******************************************************************************
 * Synchronous actions.
 ******************************************************************************/

export function userErrorHandler(dispatch, errorMessage) {
  dispatch({ type: USER_ERROR, payload: errorMessage});
}

/*******************************************************************************
 * Async thunk actions.
 ******************************************************************************/
export function userInfo() {
  return dispatch => {
    dispatch({ 
      type: USER_INFO, 
      payload: { 
        requestStatus: requestStatuses.PENDING
      }
    });
    const userId = auth.userId();
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
            if (error) userErrorHandler(dispatch, message);
            else {
              dispatch({
                type: USER_INFO,
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
          userErrorHandler(dispatch, errorMessage);
        }
      );
    }
  }
}

export function adminInfo() {
  return dispatch => {
    dispatch({ 
      type: USER_ADMIN, 
      payload: { 
        requestStatus: requestStatuses.PENDING
      }
    });
    fetch('/api/user/admin', { method: 'get' })
    .then(
      response => {
        return response.json()
        .then(data => {
          const { error, message, admins } = data;
          if (error) userErrorHandler(dispatch, message);
          else {
            dispatch({
              type: USER_ADMIN,
              payload: {
                requestStatus: requestStatuses.SUCCESS,
                admins: admins
              }
            });
          }
        });
      }, 
      error => {
        errorMessage = error.message || 'Failed to communicate with server.';
        userErrorHandler(dispatch, errorMessage);
      }
    );
  }
}
