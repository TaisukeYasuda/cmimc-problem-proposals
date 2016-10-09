var app = require('express');
var router = app.Router();
var mysql = require('mysql');
var passport = require('passport');
// security
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

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

function generateJWT() {
  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, process.env.JWT_SECRET);
};

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

  var sql = 'INSERT INTO staff SET ?';
  var query = connection.query(sql, user, function(err, result) {
    if(err) { return next(err); }

    return res.json({token: generateJWT()});
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
      return res.json({token: generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

module.exports = router
