/*******************************************************************************
 *
 * Configure database.
 *
 ******************************************************************************/

const mysql = require('mysql');

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
setTimeout(function () {
  connection.query('SELECT 1');
}, TIMEOUT);

module.exports = connection;
