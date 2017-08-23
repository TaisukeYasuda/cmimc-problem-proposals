import { 
  requestStatuses,
  INIT_USER,
  INIT_APP
} from '../actions/types';

const INITIAL_STATE = { 
  error: false, 
  message: '', 
  user: {},
  requestStatus: requestStatuses.IDLE
};

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case INIT_USER:
      switch (action.payload.requestStatus) {
        case (requestStatuses.SUCCESS):
          return {
            ...state,
            error: false,
            message: '',
            user: action.payload.user
          }
        default:
          return state;
      }
    default:
      return state;
  }
}
