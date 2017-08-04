import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './app';
import { INITIAL_STATE } from '../reducers/auth_reducer';
import configureStore from '../configureStore';

const store = configureStore({ auth: INITIAL_STATE });

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default Root;
