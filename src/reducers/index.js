import { combineReducers } from 'redux';  
import { reducer as formReducer } from 'redux-form';

import initReducer from './init-reducer.js';
import usersReducer from './users-reducer.js';
import authReducer from './auth-reducer.js';
import competitionsReducer from './competitions-reducer.js';
import proposalsReducer from './proposals-reducer.js';

const rootReducer = combineReducers({
  /* state appears in this form */
  init: initReducer, 
  users: usersReducer,
  auth: authReducer,
  competitions: competitionsReducer,
  proposals: proposalsReducer,
  form: formReducer
});

export default rootReducer;
