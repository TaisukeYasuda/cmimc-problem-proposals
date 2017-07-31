/*******************************************************************************
 *
 * Run server.
 *
 ******************************************************************************/

const express = require('express'),
      app = express(),
      server = require('http').Server(app),
      path = require('path'),
      favicon = require('serve-favicon'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      crypto = require('crypto'),
      jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* serve home page */
app.get('/', function (req, res) {
   res.sendFile( __dirname + '/' + 'index.html' );
})

/* start database connection and route endpoints */
const connection = require('./config/database'),
      routes = require('./routes')(connection),
      staffRoutes = require('./routes/staff')(connection),
      subjectsRoutes = require('./routes/subjects')(connection);
app.use('/', routes);
app.use('/staff', staffRoutes);
app.use('/subjects', subjectsRoutes);

/* start http server */
server.listen(process.env.PORT || 8000, function () {
  var port = server.address().port;
  console.log('CMIMC problem proposals running on port', port);
});

/* start socket.io server */
require('./config/socket')(server);
