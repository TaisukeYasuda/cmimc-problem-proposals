import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './app';
import configureStore from '../configureStore';
import { AUTH_USER } from '../actions/types';

const store = configureStore(),
      token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: AUTH_USER });
}

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default Root;
