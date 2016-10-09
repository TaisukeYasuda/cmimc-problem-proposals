var passport = require('passport');
var LocalStrategy = require("passport-local").Strategy;
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mysql = require('mysql');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes');
app.use('/', routes);

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

// refresh connection every 30 min
setTimeout (function () {
  connection.query('SELECT 1');
},1000*60*30);

passport.use(new LocalStrategy(
  function(username, password, done) {
    var email = username;
    connection.query("SELECT * FROM staff WHERE email='"+email+"' LIMIT 1", function(err, rows, fields) {
      if(rows.length == 0)
      {
        return done(null, false, { message: 'Incorrect username.' });
      }
      else
      {
        var submitPassword = rows[0].password;
        bcrypt.hash(submitPassword, 10, function(err, hash) {
           if(hash === submitPassword)
           {//if the password is correct
             return done(null, userinfo);
           }
           else
           {//if the password is not correct
             return done(null, false, { message: 'Incorrect password.' });
           }
        });
        if (submitPassword === password) {
          console.log('good');
          return done(null, userinfo);
        } else {
          return (null, false , { message: 'Incorrect password.' });
        }
      }
      });
    }));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());


app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log("authentication success");
  });

var server = app.listen(3000, function () {
   console.log("Server running at http://localhost:3000/")
});
