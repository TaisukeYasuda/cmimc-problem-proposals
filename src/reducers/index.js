import { combineReducers } from 'redux';  
import {
  AUTH_USER,
  UNAUTH_USER,
} from '../actions/types';
import authReducer from './auth-reducer.js';

const rootReducer = combineReducers({
  /* state appears in this form */
  auth: authReducer,
  // form: formReducer
});

export default rootReducer;
