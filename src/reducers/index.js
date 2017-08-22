import { combineReducers } from 'redux';  
import { reducer as formReducer } from 'redux-form';

import initReducer from './init-reducer.js';
import authReducer from './auth-reducer.js';
import competitionsReducer from './competitions-reducer.js';
import proposalsReducer from './proposals-reducer.js';

const rootReducer = combineReducers({
  /* state appears in this form */
  init: initReducer, 
  auth: authReducer,
  competitions: competitionsReducer,
  proposals: proposalsReducer,
  form: formReducer
});

export default rootReducer;
