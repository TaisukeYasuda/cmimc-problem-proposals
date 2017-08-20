import { 
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from '../actions/types';

const INITIAL_STATE = { 
  error: false, 
  message: '', 
  authenticated: false
};

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case AUTH_USER:
      console.log('User authenticated!');
      return { ...state, error: false, message: '', authenticated: true
      };
    case UNAUTH_USER:
      console.log('User logged off!');
      return { ...state, error: false, authenticated: false };
    case AUTH_ERROR:
      console.log('User authentication failed!');
      return { ...state, error: true, message: action.payload };
    default:
      return state;
  }
}
