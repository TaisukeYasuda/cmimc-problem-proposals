const router = require('express').Router(),
      auth = require('../config/auth'),
      handler = require('../utils/handler'),
      constants = require('../constants');
const { REQUEST, ACCEPT, REJECT } = constants.requestTypes;

const User = require('../database/user');

router.post('/', auth.verifyJWT, (req, res) => {
  switch(req.body.type) {
    case REQUEST:
      // search for admins, add request
      handler(true, 'Successful request!', 200)(req, res);
      break;
    default:
      handler(false, 'Invalid competition post.', 400)(req, res);
  }
});

module.exports = router;
