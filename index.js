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
      jwt = require('jsonwebtoken'),
      morgan = require('morgan');

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* start database connection and route endpoints */
const connection = require('./config/database'),
      authRouter = require('./routes/auth')(connection),
      proposalsRouter = require('./routes/proposals')(connection),
      commentsRouter = require('./routes/comments')(connection),
      solutionsRouter = require('./routes/solutions')(connection),
      staffRouter = require('./routes/staff')(connection),
      subjectsRouter = require('./routes/subjects')(connection);
app.use('/', authRouter);
app.use('/proposals', proposalsRouter);
app.use('/comments', commentsRouter);
app.use('/solutions', solutionsRouter);
app.use('/staff', staffRouter);
app.use('/subjects', subjectsRouter);

/* serve home page */
app.get('/*', function (req, res) {
   res.sendFile( __dirname + '/' + 'home.html' );
});

/* start http server */
server.listen(process.env.PORT || 8000, function () {
  var port = server.address().port;
  console.log('CMIMC problem proposals running on port', port);
});

/* start socket.io server */
require('./config/socket')(server);
