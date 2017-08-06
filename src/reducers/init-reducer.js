import { 
  INIT_APP
} from '../actions/types';

const INITIAL_STATE = { 
  error: false, 
  message: '', 
  subjects: {} 
};

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case INIT_APP:
      if (action.payload.status === 'error') 
        return { ...state, error: true, message: action.payload.message};
      else if (action.payload.status === 'success')
        return { ...state, error: false, subjects: action.payload.subjects };
    default:
      return state;
  }
}
