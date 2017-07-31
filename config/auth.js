/*******************************************************************************
 *
 * Configure JWT authentication logic.
 *
 ******************************************************************************/

const jwt = require('jsonwebtoken'),
      crypto = require('crypto'),
      SECRET = process.env.JWT_SECRET; // JWT secret for signing and verifying

module.exports = function(connection) {
  return {
    /***************************************************************************
     * verifyJWT: middleware for verifying the token
     **************************************************************************/
    verifyJWT: function(req, res, next) {
      var token = req.headers.authorization.substr('Bearer '.length);
      token = token || req.body.token || req.query.token;
      if (token) {
        jwt.verify(token, SECRET, function(err, decoded) {
          if (err) {
            res.status(503).json({
              message: 'Failed to authenticate token.'
            });
          } else {
            req.payload = decoded;
            next();
          }
        });
      } else {
        res.status(403).json({message: 'No token provided.'});
      }
    }, 

    /***************************************************************************
     * signJWT: helper function for creating the token
     **************************************************************************/
    signJWT: function (email, privilege, staff_id) {
      // set expiration to 60 days
      var today = new Date(),
          exp = new Date(today);
      exp.setDate(today.getDate() + 60);

      return jwt.sign({
        email: email,
        privilege: privilege,
        staff_id: staff_id,
        exp: parseInt(exp.getTime() / 1000),
      }, SECRET);
    }, 

    /***************************************************************************
     * authenticate: authenticate user with email and password
     **************************************************************************/
    authenticate: function(email, password, callback) {
      var sql = 'SELECT * FROM staff WHERE email=?';
      connection.query(sql, [email], function(err, rows, fields) {
        if (err) {
          return callback({
            success: false,
            message: 'Database failed to load email.'
          });
        }

        if (rows.length == 0) 
          return callback({success: false, message: 'Email not found.'});
        else {
          var user = rows[0],
              salt = user.salt,
              hash = crypto.pbkdf2Sync(password, salt, 1000, 64).toString('hex');
          if (user.password !== hash) 
            return callback({success: false, message: 'Incorrect password.'});
          else 
            return callback({success: true, user: user});
        }
      }); // end searching for user
    }
  };
};
