import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import HomePage from './components/pages/home-page';  
import NotFoundPage from './components/pages/not-found-page';

const Routes = () => (  
  <Switch>
    <Route exact path='/' component={HomePage} />

    <Route path='*' component={NotFoundPage} />
  </Switch>
);

export default Routes;
