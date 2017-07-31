var app = require('express'),
    router = app.Router(),
    mysql = require('mysql'),
    passport = require('passport');
// security
var crypto = require('crypto'),
    jwt = require('jsonwebtoken'),
    client_jwt = require('express-jwt'),
    auth = client_jwt({secret: process.env.JWT_SECRET, userProperty: 'payload'});

if (process.env.NODE_ENV!='production') {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "cmimcdb"
  });
} else {
  var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });
}

connection.connect();

/*******************************************************************************
 *
 * Utilities.
 *
 ******************************************************************************/
function twoDigits(d) {
  if(0 <= d && d < 10) return "0" + d.toString();
  if(-10 < d && d < 0) return "-0" + (-1*d).toString();
  return d.toString();
}

Date.prototype.toMySQL = function() {
  var timestamp = this.getUTCFullYear() + "-" + 
    twoDigits(1 + this.getUTCMonth()) + "-" + 
    twoDigits(this.getUTCDate()) + " " + 
    twoDigits(this.getUTCHours()) + ":" + 
    twoDigits(this.getUTCMinutes()) + ":" + 
    twoDigits(this.getUTCSeconds());
  return timestamp;
};

function generateJWT (email, privilege, staff_id) {
  // set expiration to 60 days
  var today = new Date(),
      exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    email: email,
    privilege: privilege,
    staff_id: staff_id,
    exp: parseInt(exp.getTime() / 1000),
  }, process.env.JWT_SECRET);
};

/*******************************************************************************
 *
 * Routes.
 *
 ******************************************************************************/

/* home page */
router.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

/*******************************************************************************
 * Authentication routes.
 ******************************************************************************/

router.post('/signup', function(req, res, next){
  if (!req.body.email) 
    return res.status(400).json({message: 'Email is missing.'});
  if (!req.body.password) 
    return res.status(400).json({message: 'Password is missing.'});

  // encrypt password with salt
  var salt = crypto.randomBytes(16).toString('hex');
  var user = {
    name: req.body.name,
    password: crypto.pbkdf2Sync(req.body.password, salt, 1000, 64).toString('hex'),
    email: req.body.email,
    privilege: 'member',
    joined: new Date().toMySQL(),
    salt: salt
  };

  var sql = 'SELECT * FROM staff WHERE ?';
  connection.query(sql, {email: user.email}, function(err, result) {
    if (err) return next(err);

    if (result.length > 0)
      return res.status(400).json({message: 'Email is already taken.'});

    var sql = 'INSERT INTO staff SET ?';
    connection.query(sql, user, function(err, result) {
      if (err) 
        return res.status(503).json({message: 'Database failed to add user.'});
      // query again to get staff_id
      var sql = 'SELECT * FROM staff WHERE ?';
      connection.query(sql, {
        email: user.email
      }, function(err, result) {
        var user = result[0];
        return res.status(200).json({
          token: generateJWT(user.email, user.privilege, user.staff_id),
          name: user.name,
          joined: user.joined
        });
      });
    }); // end sending response to user
  }); // end inserting user into database
});

router.post('/login', function(req, res, next){
  if (!req.body.email) 
    return res.status(400).json({message: 'Email is missing.'});
  if (!req.body.password) 
    return res.status(400).json({message: 'Password is missing.'});

  req.body.username = req.body.email

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.status(503).json({
        message: 'Database failed to authenticate user.'
      });
    }

    if (user) {
      return res.json({
        token: generateJWT(user.email, user.privilege, user.staff_id),
        name: user.name,
        joined: user.joined
      });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

/*******************************************************************************
 * Problem proposal routes.
 ******************************************************************************/

router.get('/proposals/bank/', auth, function(req, res, next) {
  // must be admin or secure member
  if (req.payload.privilege !== 'admin' && req.payload.privilege !== 'secure') {
    return res.status(401).json({
      message: 'Problem bank can only be accessed by admin and secure members.'
    });
  }
  var sql = 'SELECT * FROM proposals';
  connection.query(sql, function(err, result) {
    if(err) {
      return res.status(503).json({
        message: 'Database failed to load problem bank.'
      });
    }

    return res.status(200).json(result);
  });
});

router.post('/proposals/', auth, function(req, res, next) {
  if (req.payload.staff_id != req.body.staff_id) {
    return res.status(401).json({
      message: 'Problem proposal author doesn\'t match the request owner.'
    });
  }
  var sql = 'INSERT INTO proposals SET ?',
      proposal = {
        subject: req.body.subject,
        difficulty: req.body.difficulty,
        problem: req.body.problem,
        answer: req.body.answer,
        solution: req.body.solution,
        staff_id: req.body.staff_id,
        created: new Date().toMySQL()
      };
  connection.query(sql, proposal, function(err, result) {
    if(err) { 
      return res.status(503).json({
        message: 'Database failed to insert the problem proposal.'
      });
    }

    res.status(200).json(result[0]);
  });
});

router.param('prob_staff_id', function(req, res, next, staff_id) {
  var sql = 'SELECT * FROM proposals WHERE ? ORDER BY updated';
  var query = connection.query(sql, {staff_id: staff_id}, function(err, result) {
    if(err) {
      return res.status(503).json({
        message: 'Database failed to load proposals.'
      });
    }

    req.proposals = {
      proposals: result,
      staff_id: staff_id
    };
    return next();
  });
});

router.param('prob_id', function(req, res, next, prob_id) {
  var sql = 'SELECT * FROM proposals WHERE ?';
  var query = connection.query(sql, {prob_id: prob_id}, function(err, result) {
    if (err) {
      return res.status(503).json({
        message: 'Database failed to load proposal'
      });
    }
    if (!result) return res.status(400).json({message: 'Proposal not found.'});
    else req.prob = result[0];

    return next();
  });
});

router.get('/proposals/:prob_staff_id', auth, function(req, res, next) {
  if (req.payload.staff_id != req.proposals.staff_id) {
    return res.status(401).json({
      message: 'Request for proposals must be from the original author.'
    });
  }
  res.status(200).json(req.proposals.proposals);
});

router.get('/proposals/problem/:prob_id', auth, function(req, res, next) {
  // must be proposer, admin, or secure member
  if (req.payload.privilege != 'admin' &&
      req.payload.privilege != 'secure' &&
      req.payload.staff_id != req.prob.staff_id) {
    return res.status(401).json({
      message: 'Must be admin, secure member, or author.'
    });
  }
  res.status(200).json(req.prob);
});

router.put('/proposals/problem/:prob_id', auth, function(req, res, next) {
  // must be proposer
  if (req.payload.staff_id != req.prob.staff_id) {
    return res.status(401).json({message: 'Must be the author.'});
  }

  var sql = 'UPDATE proposals SET ? WHERE prob_id=' + 
    mysql.escape(req.prob.prob_id);
  connection.query(sql, req.body, function(err, result) {
    if (err) {
      return res.status(503).json({
        message: 'Database failed to update proposal.'
      });
    }
    if (!result) return res.status(400).json({message: 'Proposal not found.'});

    res.status(200);
  });
});

router.put('/proposals/checked/:prob_id', auth, function(req, res, next) {
  // must be admin
  if (req.payload.privilege != 'admin') {
    return res.status(401);
  }

  var sql = 'UPDATE proposals SET ? WHERE prob_id=' + 
    mysql.escape(req.prob.prob_id);
  connection.query(sql, {checked: req.body.checked}, function(err, result) {
    if (err) { return next(err); }
    if (!result) return res.status(400).json({message: 'Proposal not found.'});

    res.status(200);
  });
});

router.delete('/proposals/problem/:prob_id', auth, function(req, res, next) {
  // must be proposer
  if (req.payload.staff_id != req.prob.staff_id) {
    return res.status(401).json({message: 'Must be the author.'});
  }
  var sql = 'DELETE FROM proposals WHERE ?';
  connection.query(sql, {prob_id: req.prob.prob_id}, function(err, result) {
    if (err) { return next(err); }
    if (!result) return res.status(400).json({message: 'Proposal not found.'});

    res.status(200);
  });
});

/*******************************************************************************
 * Comments and alternate solutions routes.
 ******************************************************************************/

router.get('/comments/problem/:prob_id', auth, function(req, res, next) {
  var sql = 'SELECT * FROM comments WHERE ?';
  connection.query(sql, {prob_id: req.prob.prob_id}, function(err, result) {
    if (err) {
      return res.status(503).json({
        message: 'Database failed to load comments.'
      });
    }

    res.status(200).json(result);
  });
});

router.post('/comments', auth, function(req, res, next) {
  var sql = 'INSERT INTO comments SET ?';
  connection.query(sql, req.body, function(err, result) {
    if (err) {
      return res.status(503).json({
        message: 'Database failed to create comment.'
      });
    }

    res.status(200);
  });
});

router.get('/solutions/problem/:prob_id', auth, function(req, res, next) {
  var sql = 'SELECT * FROM alternate_solutions WHERE ?';
  connection.query(sql, {prob_id: req.prob.prob_id}, function(err, result) {
    if (err) {
      return res.status(503).json({
        message: 'Database failed to load alternate solutions.'
      });
    }

    res.status(200).json(result);
  });
});

router.post('/solutions', auth, function(req, res, next) {
  var sql = 'INSERT INTO alternate_solutions SET ?';
  connection.query(sql, req.body, function(err, result) {
    if (err) {
      return res.status(503).json({
        message: 'Database failed to insert alternate solution.'
      });
    }

    res.status(200);
  });
});

/*******************************************************************************
 * Staff routes.
 ******************************************************************************/

router.get('/staff', auth, function(req, res, next) {
  var sql = 'SELECT staff_id, name, email, privilege FROM staff';
  connection.query(sql, function(err, result) {
    if (err) { 
      return res.status(503).json({
        message: 'Database failed to load staff list.'
      });
    }

    res.status(200).json(result);
  });
});

router.param('staff_id', function(req, res, next, staff_id) {
  var sql = 'SELECT * FROM staff WHERE ?';
  connection.query(sql, {staff_id: staff_id}, function(err, result) {
    if(err) {
      return res.status(503).json({
        message: 'Database failed to load staff data.'
      });
    }
    if (!result) return res.status(400).json({message: 'Staff not found.'});
    else req.staff = result[0];

    return next();
  });
});

router.get('/staff/:staff_id', function(req, res, next) {
  res.status(200).json({name: req.staff.name}); 
});

router.put('/staff/privilege/:staff_id', auth, function(req, res, next) {
  // must be admin
  if (req.payload.privilege !== 'admin') { 
    return res.status(401).json({
      message: 'Must be admin to change privileges.'
    });
  }
  // cannot change own status (so that there will always be at least one admin)
  if (req.payload.staff_id === req.staff.staff_id) {
    return res.status(401).json({
      message: 'One cannot change their own status.'
    });
  }

  var sql = 'UPDATE staff SET ? WHERE staff_id=' + 
    mysql.escape(req.staff.staff_id);
  connection.query(sql, {privilege: req.body.privilege}, function(err, result) {
    if (err) {
      return res.status(503).json({
        message: 'Database failed to update staff privilege.'
      });
    }
    if (!result) {
      return res.status(400).json({message: 'Staff not found.'});
    }

    res.status(200);
  });
});

router.delete('/staff/:staff_id', auth, function(req, res, next) {
  // must be admin
  if (req.payload.privilege !== 'admin') { 
    return res.status(401).json({message: 'Must be admin to delete staff.'});
  }
  var sql = "DELETE FROM staff WHERE ?";
  connection.query(sql, {staff_id: req.staff.staff_id}, function(err, result) {
    if (err) {
      return res.status(503).json({
        message: 'Database failed to delete staff.'
      });
    }
    res.status(200);
  });
});

/*******************************************************************************
 * Subject routes.
 ******************************************************************************/

router.get('/subjects', function(req, res, next) {
  var sql = 'SELECT * FROM subjects';
  connection.query(sql, function(err, result) {
    if (err) {
      return res.status(503).json({
        message: 'Database failed to load subjects.'
      });
    }
    res.status(200).json(result);
  });
});

module.exports = router
