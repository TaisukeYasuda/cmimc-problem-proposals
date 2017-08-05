module.exports = function(connection) {
  const router = require('express').Router(),
        auth = require('../config/auth')(connection),
        crypto = require('crypto'),
        datetimeUtil = require('../utils/datetime');

  router.post('/signup', function(req, res, next){
    if (!req.body.email) 
      return res.status(400).json({
        error: true,
        message: 'Email is missing.'
      });
    if (!req.body.name) 
      return res.status(400).json({
        error: true,
        message: 'Name is missing.'
      });
    if (!req.body.andrewid) 
      return res.status(400).json({
        error: true,
        message: 'Andrew ID is missing.'
      });
    if (!req.body.password) 
      return res.status(400).json({
        error: true,
        message: 'Password is missing.'
      });

    // encrypt password with salt
    var salt = crypto.randomBytes(16).toString('hex');
    var user = {
      name: req.body.name,
      password: crypto.pbkdf2Sync(req.body.password, salt, 1000, 64).toString('hex'),
      email: req.body.email,
      andrewid: req.body.andrewid,
      privilege: 'member',
      joined: new Date().toMySQL(),
      salt: salt
    };

    var sql = 'SELECT * FROM staff WHERE ?';
    connection.query(sql, {email: user.email}, function(err, result) {
      if (err) return next(err);

      if (result.length > 0)
        return res.status(400).json({
          error: true,
          message: 'Email is already taken.'
        });

      var sql = 'INSERT INTO staff SET ?';
      connection.query(sql, user, function(err, result) {
        if (err) 
          return res.status(503).json({
            error: true,
            message: 'Database failed to add user.'
          });
        // query again to get staff_id
        var sql = 'SELECT * FROM staff WHERE ?';
        connection.query(sql, {
          email: user.email
        }, function(err, result) {
          var user = result[0];
          return res.status(200).json({
            error: false,
            token: auth.signJWT(user.email, user.privilege, user.staff_id),
            name: user.name,
            andrewid: user.andrewid,
            joined: user.joined
          });
        });
      }); // end sending response to user
    }); // end inserting user into database
  });

  router.post('/login', function(req, res, next){
    if (!req.body.email) 
      return res.status(400).json({
        error: true,
        message: 'Email is missing.'
      });
    if (!req.body.password) 
      return res.status(400).json({
        error: true,
        message: 'Password is missing.'
      });

    auth.authenticate(req.body.email, req.body.password, function(result) {
      if (result.success) {
        var user = result.user;
        return res.status(200).json({
          error: false,
          token: auth.signJWT(user.email, user.privilege, user.staff_id),
          name: user.name,
          andrewid: user.andrewid,
          joined: user.joined
        });
      } else {
        return res.status(403).json({
          error: true,
          message: result.message
        });
      }
    });
  });

  return router;
}

