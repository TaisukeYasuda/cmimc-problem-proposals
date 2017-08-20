import fetch from 'isomorphic-fetch';
import { AUTH_USER,  
         AUTH_ERROR, 
         UNAUTH_USER } from './types';

/*******************************************************************************
 * Synchronous actions.
 ******************************************************************************/

export function authErrorHandler(dispatch, errorMessage) {
  dispatch({ type: AUTH_ERROR, payload: errorMessage });
}

export function logoutUser(dispatch) {
  localStorage.removeItem('token');
  dispatch({ type: UNAUTH_USER });
}

/*******************************************************************************
 * Async thunk actions.
 ******************************************************************************/

export function loginUser({ email, password }) {
  return dispatch => {
    fetch('/login', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(
      response => {
        return response.json()
        .then(data => {
          if (!data.success) authErrorHandler(dispatch, data.message);
          else {
            localStorage.setItem('token', data.token);
            dispatch({ type: AUTH_USER });
          }
        });
      }, 
      error => {
        errorMessage = error.message || 'Failed to communicate with server.';
        authErrorHandler(dispatch, errorMessage);
      }
    );
  }
}

export function signupUser({ name, email, password, university }) {
  return dispatch => {
    fetch('/signup', {
      method: 'post',
      body: JSON.stringify({ name, email, password, university }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(
      response => {
        return response.json()
        .then(data => {
          if (!data.success) authErrorHandler(dispatch, data.message);
          else {
            localStorage.setItem('token', data.token);
            dispatch({ type: AUTH_USER });
          }
        });
      },
      error => {
        errorMessage = error.message || 'Failed to communicate with server.';
        authErrorHandler(dispatch, errorMessage);
      }
    );
  }
}


