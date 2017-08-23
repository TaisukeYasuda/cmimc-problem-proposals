const router = require('express').Router(),
      auth = require('../config/auth'),
      handler = require('../utils/handler');

const User = require('../database/user');

router.get('/', auth.verifyJWT, (req, res) => {
  const { id } = req.query;
  if (!id) {
    return handler(false, 'Invalid request.', 400)(req, res);
  } else if (id !== req.payload.user_id) {
    return handler(false, 'Unauthorized request for user information.', 401)(req, res);
  } else { 
    User.findById(id, (err, user) => {
      if (err) {
        return handler(false, 'Database failed to find user.', 503)(req, res);
      } else {
        const { name, email, university, unread, read, urgent, requests } = user;
        return handler(true, 'Successfully retrieved user data.', 200, {
          user: {
            name, email, university, unread, read, urgent, requests
          }
        })(req, res);
      }
    });
  }
});

router.get('/admin', (req, res) => {
  User.find({ admin: true }, 'name email', (err, admins) => {
    if (err) {
      handler(false, 'Database failed to load admins.', 503)(req, res);
    } else {
      handler(true, 'Successfully loaded admins info.', 200, {
        admins: admins
      })(req, res);
    }
  });
});

module.exports = router;
