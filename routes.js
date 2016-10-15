var app = require('express');
var router = app.Router();
var mysql = require('mysql');
var passport = require('passport');
// security
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var client_jwt = require('express-jwt');
var auth = client_jwt({secret: process.env.JWT_SECRET, userProperty: 'payload'});

var mysql_password = process.env.MYSQL_PASSWORD;
var connection = mysql.createConnection({
  // host: "fdb7.biz.nf:3306",
  // user: "1991601_cmimc",
  // password: mysql_password,
  // database: "1991601_cmimc"
  host: "localhost",
  user: "root",
  database: "cmimc"
});
connection.connect();

/* GET home page. */
router.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

function generateJWT (name, email, type, id) {
  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    email: email,
    name: name,
    type: type,
    id: id,
    exp: parseInt(exp.getTime() / 1000),
  }, process.env.JWT_SECRET);
};

// routes for login and signup

router.post('/signup', function(req, res, next){
  if (!req.body.email || !req.body.password1 || !req.body.password2) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  if (req.body.password1 !== req.body.password2) {
    return res.status(400).json({message: 'The two passwords do not match'});
  }

  var salt = crypto.randomBytes(16).toString('hex');
  var user = {
    email: req.body.email,
    password: crypto.pbkdf2Sync(req.body.password1, salt, 1000, 64).toString('hex'),
    type: "Member",
    name: req.body.name,
    andrewid: req.body.andrewid,
    salt: salt
  };

  var sql = 'SELECT * FROM staff WHERE ?';
  var query = connection.query(sql, {email: user.email}, function(err, result) {
    if (err) {return next(err); }

    if (result.length > 0) {
      return res.status(400).json({message: 'This email is already taken'})
    }
    var sql = 'INSERT INTO staff SET ?';
    var query = connection.query(sql, user, function(err, result) {
      if (err) { return next(err); }
      var sql = 'SELECT * FROM staff WHERE ?'
      var query = connection.query(sql, {email: user.email}, function(err, result) {
        var user = result[0];
        return res.json({token: generateJWT(user.name, user.email, user.type, user.staffid)});
      });
    });
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.email || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  req.body.username = req.body.email

  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }

    if (user){
      return res.json({token: generateJWT(user.name, user.email, user.type, user.staffid)});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

// routes for problem proposals

router.get('/proposals/bank/', auth, function(req, res, next) {
  if (req.payload.type !== 'Admin' && req.payload.type !== 'Secure Member') {
    res.status(401).json({message: 'Unauthorized access to problem bank'});
  }
  var sql = 'SELECT probid, problem, topic FROM proposals';
  var query = connection.query(sql, function(err, result) {
    if(err) { return next(err); }

    res.json(result);
  });
});

router.post('/proposals/', auth, function(req, res, next) {
  if (req.payload.staffid != req.body.staffid) {
    res.status(401).json({message: 'Unauthorized post to problem proposals'});
  }
  var sql = 'INSERT INTO proposals SET ?';
  var query = connection.query(sql, req.body, function(err, result) {
    if(err) { return next(err); }

    res.json(result[0]);
  });
});

router.param('staffid', function(req, res, next, id) {
  var sql = 'SELECT probid, problem, topic FROM proposals WHERE ? ORDER BY topic';
  var query = connection.query(sql, {staffid: id}, function(err, result) {
    if(err) { return next(err); }
    if(!result) { return next(new Error('can\'t find staffid')); }

    req.proposals = result;
    return next();
  });
});

router.param('probid', function(req, res, next, id) {
  var sql = 'SELECT * FROM proposals WHERE ?';
  var query = connection.query(sql, {probid: id}, function(err, result) {
    if(err) { return next(err); }
    if(!result) { return next(new Error('can\'t find probid')); }

    req.prob = result;
    return next();
  });
});

router.get('/proposals/:staffid', auth, function(req, res, next) {
  if (req.payload.staffid != req.proposals.staffid) {
    res.status(401).json({message: 'Unauthorized access to problem proposals'})
  }
  res.json(req.proposals);
});

router.get('/proposals/problem/:probid', auth, function(req, res, next) {
  if (req.payload.staffid != req.prob.staffid) {
    res.status(401).json({message: 'Unauthorized access to problem proposals'})
  }
  res.json(req.prob);
});

router.put('/proposals/problem/:probid', auth, function(req, res, next) {
  if (req.payload.staffid != req.prob.staffid) {
    res.status(401).json({message: 'Unauthorized modification to problem proposals'})
  }
  var sql = 'UPDATE proposals SET ? WHERE probid='+mysql.escape(req.prob[0].probid);
  var query = connection.query(sql, req.body, function(err, result) {
    if (err) { return next(err); }
    if (!result) { return next(new Error('can\'t find probid')); }

    res.sendStatus(200);
  });
});

router.delete('/proposals/problem/:probid', auth, function(req, res, next) {
  if (req.payload.staffid != req.prob.staffid) {
    res.status(401).json({message: 'Unauthorized deletion of problem proposals'})
  }
  var sql = 'DELETE FROM proposals WHERE ?';
  var query = connection.query(sql, {probid: req.prob[0].probid}, function(err, result) {
    if (err) { return next(err); }
    if (!result) { return next(new Error('can\'t find probid')); }

    res.sendStatus(200);
  });
});

// routes for comments and alternate solutions

router.get('/comments/:probid', auth, function(req, res, next) {
  var sql = 'SELECT * FROM comments WHERE ?';
  var query = connection.query(sql, {probid: req.prob[0].probid}, function(err, result) {
    if (err) { return next(err); }
    if (!result) { return next(new Error('can\'t find probid')); }

    res.status(200).json(result);
  });
});

router.post('/comments/', auth, function(req, res, next) {
  var sql = 'INSERT INTO proposals SET ?';
  var query = connection.query(sql, req.body, function(err, result) {
    if (err) { return next(err); }
    if (!result) { return next(new Error('can\'t find probid')); }

    res.sendStatus(200).json(req.body);
  });
});

module.exports = router
