import { 
  PROPOSAL_ERROR,
  FETCH_MY_PROPOSALS,
  POST_PROPOSAL
} from '../actions/types';

const INITIAL_STATE = { 
  error: false, 
  message: '', 
  proposalSubmitted: false,
  myProposals: [], 
};

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case PROPOSAL_ERROR:
      return { ...state, error: true, message: action.payload };
    case FETCH_MY_PROPOSALS:
      if (action.payload.status === 'success')
        return { ...state, error: false, myProposals: action.payload.content };
    case POST_PROPOSAL: 
      if (action.payload.status === 'pending')
        return { ...state, proposalSubmitted: true };
      if (action.payload.status === 'success')
        return { ...state, error: false, proposalSubmitted: false };
    default:
      return state;
  }
}
