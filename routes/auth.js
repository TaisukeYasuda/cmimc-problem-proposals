const router = require('express').Router(),
      auth = require('../config/auth'),
      handler = require('../utils/handler');

const User = require('../database/user');

router.post('/signup', (req, res) => {
  const { name, email, password, university } = req.body;
  if (!name || !email || !password || !university) {
    handler(false, 'Please fill out all fields.', 400);
  } else { 
    User.findOne({ email }, (err, user) => {
      if (err) {
        handler(false, 'Database failed to find email.', 503);
      } else if (user) {
        handler(false, 'Email exists already.', 400);
      } else {
        User.save({ name, email, password, university }, err => {
          if (err) {
            handler(false, 'Failed to save user.', 503);
          } else {
            handler(true, 'User registered successfully.', 200, {
              token: auth.signJWT(email)
            });
          }
        }); 
      }
    });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    handler(false, 'Please fill out al fields.', 400);
  } else {
    User.findOne({ email }, (err, user) => {
      if (err) {
        handler(false, 'Database failed to find email.', 503);
      } else if (!user) {
        handler(false, 'Account does not exist.', 400);
      } else {
        user.checkPassword(password, (err, result) => {
          return result.authenticated ? 
            handler(true, 'User authenticated.', 200, {
              token: auth.signJWT(user.email)
            }) : 
            handler(false, 'Authentication failed.', 401);
        });         
      }
    });
  }
});

module.exports = router;
