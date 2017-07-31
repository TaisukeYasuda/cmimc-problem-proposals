module.exports = function(connection) {
  const router = require('express').Router();

  router.get('/', function(req, res, next) {
    var sql = 'SELECT * FROM subjects';
    connection.query(sql, function(err, result) {
      if (err) {
        return res.status(503).json({
          message: 'Database failed to load subjects.'
        });
      }
      res.status(200).json(result);
    });
  });

  return router;
};
