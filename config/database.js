const mysql = require('mysql'),
      connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
      });

connection.connect();

// refresh mysql connection every 30 min
const TIMEOUT = 1000 * 60 * 30;
setTimeout(function () {
  connection.query('SELECT 1');
}, TIMEOUT);

module.exports = connection;
