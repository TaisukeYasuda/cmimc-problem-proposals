import fetch from 'isomorphic-fetch';
import { normalize } from 'normalizr';

import { subjectsSchema } from '../schema';

import {
  INIT_APP
} from './types';

const API_URL = 'http://localhost:8000/api',
      CLIENT_ROOT_URL = 'http://localhost:8000';

/*******************************************************************************
 * Synchronous actions.
 ******************************************************************************/

export function initErrorHandler(dispatch, errorMessage) {
  dispatch({
    type: INIT_APP,
    payload: {
      error: true,
      message: errorMessage
    }
  });
}

/*******************************************************************************
 * Async thunk actions.
 ******************************************************************************/

export function initApp() {
  return dispatch => {
    dispatch({ 
      type: INIT_APP, 
      payload: { status: null }
    });
    fetch(`${API_URL}/subjects`, { method: 'get' })
    .then(
      response => {
        return response.json()
        .then(data => {
          if (data.error) initErrorHandler(dispatch, data.message);
          else {
            let entities = normalize(data.content, [ subjectsSchema ]).entities;
            dispatch({ 
              type: INIT_APP,
              payload: { status: 'success', subjects: entities.subjects }
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
