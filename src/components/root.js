import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './app';
import configureStore from '../configureStore';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default Root;
