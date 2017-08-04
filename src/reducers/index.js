import { combineReducers } from 'redux';  
import {
  AUTH_USER,
  UNAUTH_USER,
} from '../actions/types';
import authReducer from './auth_reducer.js';

const rootReducer = combineReducers({  
  auth: authReducer,
  // form: formReducer
});

export default rootReducer;
