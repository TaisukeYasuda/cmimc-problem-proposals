import { 
  FETCH_MY_PROPOSALS
} from '../actions/types';

const INITIAL_STATE = { 
  error: false, 
  message: '', 
  myProposals: [], 
};

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case FETCH_MY_PROPOSALS:
      if (action.payload.status === 'error') 
        return { ...state, error: true, message: action.payload.message};
      else if (action.payload.status === 'success')
        return { ...state, error: false, myProposals: action.payload.content };
    default:
      return state;
  }
}
