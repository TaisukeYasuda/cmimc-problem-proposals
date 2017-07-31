const express = require('express'),
      app = express(),
      server = require('http').Server(app),
      io = require('socket.io')(server),
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

/* home page */
app.get('/', function (req, res) {
   res.sendFile( __dirname + '/' + 'index.html' );
})

const connection = require('./config/database');

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
