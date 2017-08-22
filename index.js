/* import environmental variables */
require('dotenv').config();

const express = require('express'),
      app = express(),
      server = require('http').Server(app),
      path = require('path'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      mongoose = require('mongoose');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

/* start database connection */
mongoose.connect(process.env.DB_URL, { 
  useMongoClient: true,
  promiseLibrary: require('bluebird') 
});

/* route endpoints */
const authRouter = require('./routes/auth');
app.use('/', authRouter);
/*app.use('/api/proposals', proposalsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/solutions', solutionsRouter);
app.use('/api/staff', staffRouter);
app.use('/api/subjects', subjectsRouter);*/

/* serve home page */
app.get('/*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

/* start http server */
server.listen(process.env.PORT, () => {
  const port = server.address().port;
  console.log('USMCA running on port', port);
});

/* start socket.io server */
require('./config/socket')(server);
