import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/home-page';  
import NotFoundPage from './pages/not-found-page';

const Routes = () => (  
  <Switch>
    <Route exact path='/' component={HomePage} />

    <Route path='*' component={NotFoundPage} />
  </Switch>
);

export default Routes;
