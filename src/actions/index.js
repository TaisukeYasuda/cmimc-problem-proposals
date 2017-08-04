import fetch from 'isomorphic-fetch';
import { AUTH_USER,  
         AUTH_ERROR, 
         UNAUTH_USER,
         PROTECTED_TEST } from './types';

const API_URL = 'http://localhost:8000',
      CLIENT_ROOT_URL = 'http://localhost:8000';

/*******************************************************************************
 * Async thunk actions.
 ******************************************************************************/

export function errorHandler(dispatch, error, type) {
  dispatch({ type: type, payload: error.message });
}

export function loginUser({ email, password }) {
  return dispatch => {
    fetch.post(`${API_URL}/login`, { email, password })
    .then(
      response => {
        localStorage['token'] = response.data.token;
        dispatch({ type: AUTH_USER });
        window.location.href = `${CLIENT_ROOT_URL}/dashboard`;
      }, 
      error => {
        errorHandler(dispatch, error, type);
      }
    );
  }
}

export function registerUser({ email, name, password }) {
  return dispatch => {
    fetch.post(`${API_URL}/signup`, { email, name, password })
    .then(
      response => {
        localStorage['token'] = response.data.token;
        dispatch({ type: AUTH_USER });
        window.location.href = `${CLIENT_ROOT_URL}/dashboard`;
      },
      error => {
        errorHandler(dispatch, error, type);
      }
    );
  }
}

export function logoutUser({ email, password }) {
  return dispatch => {
    dispatch({ type: UNAUTH_USER });
    localStorage.remove('token');
    window.location.href = `${CLIENT_ROOT_URL}/login`;
  }
}

export function protectedTest() {
  return dispatch => {
    fetch.get(`${API_URL}/proposals`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(
      response => {
        dispatch({
          type: PROTECTED_TEST,
          payload: response.data
        });
      },
      error => {
        errorHandler(dispatch, error, type);
      }
    );
  }
}
