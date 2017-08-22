import { 
  PROPOSAL_ERROR,
  FETCH_MY_PROPOSALS,
  POST_PROPOSAL
} from '../actions/types';

import {
  PENDING,
  SUCCESS
} from '../actions/proposals-actions';

const INITIAL_STATE = { 
  error: false, 
  message: '', 
  proposalsLoading: false,
  proposalSubmitting: false,
  myProposals: [], 
  proposal: {}
};

export default function (state = INITIAL_STATE, action) {  
  switch(action.type) {
    case PROPOSAL_ERROR:
      return { 
        ...state, 
        error: true, 
        message: action.payload, 
        proposalsLoading: false,
        proposalSubmitting: false 
      };
    case FETCH_MY_PROPOSALS:
      if (action.payload.status === PENDING)
        return { ...state, error: false, proposalsLoading: true };
      else if (action.payload.status === SUCCESS)
        return { 
          ...state, 
          error: false, 
          proposalsLoading: false,
          myProposals: action.payload.content 
        };
      else return state;
    case POST_PROPOSAL: 
      if (action.payload.status === PENDING)
        return { ...state, proposalSubmitting: true };
      else if (action.payload.status === SUCCESS)
        return { ...state, error: false, proposalSubmitting: false };
      else return state;
    default:
      return state;
  }
}
