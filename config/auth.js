/*******************************************************************************
 *
 * Configure JWT authentication logic.
 *
 ******************************************************************************/

const jwt = require('jsonwebtoken'),
      crypto = require('crypto');

const User = require('../database/user');

module.exports = {
  /***************************************************************************
   * verifyJWT: middleware for verifying the token
   **************************************************************************/
  verifyJWT: (req, res, next) => {
    let token = req.headers.authorization.substr('Bearer '.length);
    token = token || req.body.token || req.query.token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.status(503).json({
            success: false,
            message: 'Failed to authenticate token.'
          });
        } else {
          req.payload = decoded;
          next();
        }
      });
    } else {
      res.status(403).json({
        success: false,
        message: 'No token provided.'
      });
    }
  }, 

  /***************************************************************************
   * signJWT: helper function for creating the token
   **************************************************************************/
  signJWT: email => {
    // set expiration to 60 days
    let today = new Date(),
        exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      email: email,
      exp: parseInt(exp.getTime() / 1000),
    }, process.env.JWT_SECRET);
  }, 

  /***************************************************************************
   * authenticate: authenticate user with email and password
   **************************************************************************/
  authenticate: (email, password, callback) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return callback({
          success: false,
          message: 'Database failed to load email.'
        });
      } else if (!user) {
        return callback({
          success: false,
          message: 'Email not found.'
        });
      } else {
        return user.correctPassword(password) ? 
          callback({ success: true, user: user }) : 
          callback({ success: false, message: 'Incorrect password' });
      }
    });
  }
};
