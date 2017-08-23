import { 
  requestStatuses,
  USER_ERROR,
  USER_INFO,
  USER_ADMIN
} from '../actions/types';

const INITIAL_STATE = { 
  error: false, 
  message: '', 
  user: {},
  admins: [],
  requestStatus: requestStatuses.IDLE
};

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case USER_INFO:
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
    case USER_ADMIN:
      switch (action.payload.requestStatus) {
        case (requestStatuses.SUCCESS):
          return {
            ...state,
            error: false,
            message: '',
            admins: action.payload.admins
          };
        default:
          return state;
      }
    default:
      return state;
  }
}
