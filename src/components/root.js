import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './app';
import configureStore from '../configureStore';
import { initApp } from '../actions';
import { AUTH_USER } from '../actions/types';

import auth from '../auth';

const store = configureStore();

initApp()(store.dispatch);
if (auth.isLoggedIn()) {
  store.dispatch({ type: AUTH_USER });
}

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default Root;
