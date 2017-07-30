var passport = require('passport'),
    LocalStrategy = require("passport-local").Strategy,
    express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mysql = require('mysql'),
    app = express();
// security
var crypto = require('crypto'),
    jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

// refresh connection every 30 min
setTimeout (function () {
  connection.query('SELECT 1');
},1000*60*30);

passport.use(new LocalStrategy(
  function(email, password, done) {
    var sql = 'SELECT * FROM staff WHERE email=?';
    connection.query(sql, [email], function(err, rows, fields) {
      if (err) return done(err);

      if(rows.length == 0) {
        return done(null, false, {message: 'Email not found.'});
      } else {
        var user = rows[0],
            submitPassword = user.password,
            salt = user.salt,
            hash = crypto.pbkdf2Sync(password, salt, 1000, 64).toString('hex');
        if (submitPassword !== hash) {
          return done(null, false, {message: 'Incorrect password.'});
        }
        return done(null, user);
      }
    }); // end searching for user
  }));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

var routes = require('./routes');
app.use('/', routes);

var server = app.listen(process.env.PORT || 8000, function () {
    var port = server.address().port;
    console.log("CMIMC problem proposals running on port", port);
});
