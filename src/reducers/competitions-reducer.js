import { 
  COMP_ERROR,
  COMP_REQ,
  requestStatuses
} from '../actions/types';

const INITIAL_STATE = { 
  error: false, 
  message: '', 
  requestStatus: requestStatuses.IDLE
};

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case COMP_ERROR:
      return { ...state, error: true, message: action.payload };
    case COMP_REQ:
      return { 
        ...state, 
        error: false, 
        message: '', 
        requestStatus: action.payload.requestStatus 
      };
    default:
      return state;
  }
}
