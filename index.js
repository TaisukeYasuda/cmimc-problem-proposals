var http = require("http");
var passport = require('passport');
var localStrategy = require("passwort-local").Strategy;
var something = true;
var mysql = require("mysql");

var mysql_password = process.env.MYSQL_PASSWORD;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var connection = mysql.createConnection({
  host: "fdb7.biz.nf:3306",
  user: "1991601_cmimc",
  password: mysql_password,
  database: "1991601_cmimc"
});

connection.connect();


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username}, function(err, user) {
      if (err) { return done(err); }
      if (!user)


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
