import { 
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  PROTECTED_TEST 
} from '../actions/types';

const INITIAL_STATE = { 
  error: false, 
  message: '', 
  authenticated: false
};

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: false, message: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, error: false, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: true, message: action.payload };
    case PROTECTED_TEST:
      return { ...state, error: false, content: action.payload };
    default:
      return state;
  }
}
