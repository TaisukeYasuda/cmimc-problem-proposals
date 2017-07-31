const auth = require('express-jwt')({
        secret: process.env.JWT_SECRET,
        userProperty: 'payload'
      }),
      jwt = require('jsonwebtoken');

module.exports = {
  authenticate: function(req, res, next) {
    var token = req.headers.authorization.substr('Bearer '.length);
    token = token || req.body.token || req.query.token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
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
  }
};
