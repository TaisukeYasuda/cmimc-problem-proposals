const express = require('express'),
      app = express(),
      server = require('http').Server(app),
      io = require('socket.io')(server),
      path = require('path'),
      favicon = require('serve-favicon'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      mysql = require('mysql'),

      // security

      passport = require('passport'),
      LocalStrategy = require("passport-local").Strategy,
      crypto = require('crypto'),
      jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*******************************************************************************
 *
 * Database setup.
 *
 ******************************************************************************/

if (process.env.NODE_ENV!='production') {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'cmimcdb'
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

// refresh mysql connection every 30 min
const TIMEOUT = 1000 * 60 * 30;
setTimeout (function () {
  connection.query('SELECT 1');
}, TIMEOUT);

/*******************************************************************************
 *
 * Passport authentication setup.
 *
 ******************************************************************************/

passport.use(new LocalStrategy(
  function(email, password, done) {
    var sql = 'SELECT * FROM staff WHERE email=?';
    connection.query(sql, [email], function(err, rows, fields) {
      if (err) return done(err);

      if(rows.length == 0) {
        return done(null, false, {message: 'Email not found.'});
      } else {
        var user = rows[0],
            salt = user.salt,
            hash = crypto.pbkdf2Sync(password, salt, 1000, 64).toString('hex');
        if (user.password !== hash) {
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

/*******************************************************************************
 *
 * Run server. 
 *
 ******************************************************************************/

const routes = require('./routes')(connection),
      staffRoutes = require('./routes/staff')(connection),
      subjectsRoutes = require('./routes/subjects')(connection);
app.use('/', routes);
app.use('/staff', staffRoutes);
app.use('/subjects', subjectsRoutes);

server.listen(process.env.PORT || 8000, function () {
  var port = server.address().port;
  console.log('CMIMC problem proposals running on port', port);
});

/*******************************************************************************
 *
 * Socket IO server. 
 *
 ******************************************************************************/

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });

  socket.on('my other event', function(data) {
    console.log(data);
  });

  socket.on('ailee', function(data) {
    console.log(data);
  });
});
