import 'babel-polyfill';
import $ from 'jquery';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

import Header from './components/header';

$(document).ready(() => {
  ReactDOM.render(
    <BrowserRouter>
      <div>
        <Header />
        <Routes />
      </div>
    </BrowserRouter>,
    document.getElementById('root')
  );
});
