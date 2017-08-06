import fetch from 'isomorphic-fetch';
import { AUTH_USER,  
         AUTH_ERROR, 
         UNAUTH_USER } from './types';

const API_URL = 'http://localhost:8000',
      CLIENT_ROOT_URL = 'http://localhost:8000';

/*******************************************************************************
 * Synchronous actions.
 ******************************************************************************/

export function errorHandler(dispatch, errorMessage) {
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
    fetch(`${API_URL}/login`, {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(
      response => {
        return response.json()
        .then(data => {
          if (data.error) errorHandler(dispatch, data.message);
          else {
            localStorage.setItem('token', data.token);
            dispatch({ type: AUTH_USER });
          }
        });
      }, 
      error => {
        errorMessage = error.message || 'Failed to communicate with server.';
        errorHandler(dispatch, errorMessage);
      }
    );
  }
}

export function registerUser({ email, name, andrewid, password }) {
  return dispatch => {
    fetch(`${API_URL}/signup`, {
      method: 'post',
      body: JSON.stringify({ email, name, andrewid, password }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(
      response => {
        return response.json()
        .then(data => {
          if (data.error) errorHandler(dispatch, data.message);
          else {
            localStorage.setItem('token', data.token);
            dispatch({ type: AUTH_USER });
          }
        });
      },
      error => {
        errorMessage = error.message || 'Failed to communicate with server.';
        errorHandler(dispatch, errorMessage);
      }
    );
  }
}


