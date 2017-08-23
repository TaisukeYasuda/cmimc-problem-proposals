/* initialization */
export const INIT_ERROR = 'init_error', // notify initialization error
             INIT_USER = 'init_user', // fetch user initialization data from server
             INIT_APP = 'init_app'; // fetch initialization data from server

export const requestStatuses = {
  SUCESS: 'success',
  PENDING: 'pending',
  SUBMITTED: 'submitted',
  IDLE: 'idle'
};

/* authorization */
export const AUTH_USER = 'auth_user', // set user to be authenticated
             UNAUTH_USER = 'unauth_user', // set user to be unauthenticated
             AUTH_ERROR = 'auth_error'; // notify an authentication error

/* authorization */
export const USER_ERROR = 'user_error', // notifiy user data error
             USER_INFO = 'user_info', // get user info
             USER_ADMIN = 'user_admin'; // get admins

/* competitions */
export const COMP_ERROR = 'comp_error', // notify a competition error
             COMP_REQ = 'comp_req'; // request to create competition

/* problem proposals */
export const PROPOSAL_ERROR = 'proposal_error', // notify a proposal error
             FETCH_MY_PROPOSALS = 'fetch_my_proposals', // fetch proposals written by user
             POST_PROPOSAL = 'post_proposal', // post a proposal
             GET_PROPPOSAL = 'get_proposal';
