var http = require("http");
var passport = require('passport');
var localStrategy = require("passport-local").Strategy;
var mysql = require("mysql");
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();

var mysql_password = process.env.MYSQL_PASSWORD;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

passport.use(new LocalStrategy(
  function(email, password, done) {
    var userinfo = connection.query("SELECT staffid, email, password, type, name, andrewid"+
      " FROM staff WHERE email='"+email+"' LIMIT 1");
    if(userinfo.length == 0)
    {//if the email is valid
       return done(null, false, { message: 'Incorrect username.' });
    }
    else
    {
       var submitPassword = userinfo[2];
       bcrypt.hash(password, 10, function(err, hash) {
         if(hash === submitPassword)
         {//if the password is correct
           return done(null, userinfo);
         }
         else
         {//if the password is not correct
           return done(null, false, { message: 'Incorrect password.' });
         }
      });
   }
));

app.configure(function() {
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username}, function(err, user) {
//       if (err) { return done(err); }
//       if (!user)
app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log("authentication success");
  });

http.createServer(function (request, response) {
   // Send the HTTP header
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'html'});

   // Send the response body as "Hello World"
   response.end('<h1>The CMIMC website is under construction!</h1>')
}).listen(8081);
// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
