/*******************************************************************************
 *
 * Routing problem proposals.
 *
 ******************************************************************************/

module.exports = function(connection) {
  const router = require('express').Router(),
        auth = require('../config/auth')(connection),
        datetimeUtil = require('../utils/datetime'),
        mysql = require('mysql');

  /*****************************************************************************
   * URL params.
   ****************************************************************************/

  /* select proposals by problem id */
  router.param('prob_id', function(req, res, next, prob_id) {
    var sql = 'SELECT * FROM proposals WHERE ?';
    connection.query(sql, {prob_id: prob_id}, function(err, result) {
      if (err) {
        return res.status(503).json({
          error: true,
          message: 'Database failed to load proposal'
        });
      }
      if (!result) return res.status(400).json({message: 'Proposal not found.'});
      else req.prob = result[0];

      return next();
    });
  });

  /* select proposals by author staff id */
  router.param('staff_id', function(req, res, next, staff_id) {
    var sql = 'SELECT * FROM proposals WHERE ? ORDER BY updated';
    connection.query(sql, {staff_id: staff_id}, function(err, result) {
      if(err) {
        return res.status(503).json({
          error: true,
          message: 'Database failed to load proposals.'
        });
      }

      req.proposals = {
        proposals: result,
        staff_id: staff_id
      };
      return next();
    });
  });

  /*****************************************************************************
   * Routes.
   ****************************************************************************/

  /* get entire problem database
   *
   * @TODO
   *  - paginate the request
   */
  router.get('/', auth.verifyJWT, function(req, res, next) {
    // must be admin or secure member
    if (req.payload.privilege !== 'admin' && 
        req.payload.privilege !== 'secure') {
      return res.status(401).json({
        error: true,
        message: 'Problem bank is only accessible to admin and secure members.'
      });
    }
    var sql = 'SELECT * FROM proposals';
    connection.query(sql, function(err, result) {
      if(err) {
        return res.status(503).json({
          error: true,
          message: 'Database failed to load problem bank.'
        });
      }
      return res.status(200).json({
        error: false,
        content: result
      });
    });
  });

  /* post a problem proposal */
  router.post('/', auth.verifyJWT, function(req, res, next) {
    if (req.payload.staff_id != req.body.staff_id) {
      return res.status(401).json({
        error: true,
        message: 'Problem proposal author doesn\'t match the request owner.'
      });
    }
    var sql = 'INSERT INTO proposals SET ?',
        proposal = {
          subject: req.body.subject,
          difficulty: req.body.difficulty,
          problem: req.body.problem,
          answer: req.body.answer,
          solution: req.body.solution,
          staff_id: req.body.staff_id,
          created: new Date().toMySQL()
        };
    connection.query(sql, proposal, function(err, result) {
      if(err) { 
        return res.status(503).json({
          error: true,
          message: 'Database failed to insert the problem proposal.'
        });
      }
      return res.status(200).json({ error: false });
    });
  });


  router.get('/:staff_id', auth.verifyJWT, function(req, res, next) {
    if (req.payload.staff_id != req.proposals.staff_id) {
      return res.status(401).json({
        error: true,
        message: 'Request for proposals must be from the original author.'
      });
    }
    res.status(200).json({
      error: false,
      content: req.proposals.proposals
    });
  });

  router.get('/problem/:prob_id', auth.verifyJWT, function(req, res, next) {
    // must be proposer, admin, or secure member
    if (req.payload.privilege != 'admin' &&
        req.payload.privilege != 'secure' &&
        req.payload.staff_id != req.prob.staff_id) {
      return res.status(401).json({
        error: true,
        message: 'Must be admin, secure member, or author.'
      });
    }
    res.status(200).json({
      error: false,
      content: req.prob
    });
  });

  router.put('/problem/:prob_id', auth.verifyJWT, function(req, res, next) {
    // must be proposer
    if (req.payload.staff_id != req.prob.staff_id) {
      return res.status(401).json({
        error: true,
        message: 'Must be the author.'
      });
    }

    var sql = 'UPDATE proposals SET ? WHERE prob_id=' + 
      mysql.escape(req.prob.prob_id);
    connection.query(sql, req.body, function(err, result) {
      if (err) {
        return res.status(503).json({
          error: true,
          message: 'Database failed to update proposal.'
        });
      }
      if (!result) return res.status(400).json({
        error: true,
        message: 'Proposal not found.'
      });

      res.status(200).json({ error: false });
    });
  });

  router.put('/checked/:prob_id', auth.verifyJWT, function(req, res, next) {
    // must be admin
    if (req.payload.privilege != 'admin') {
      return res.status(401);
    }

    var sql = 'UPDATE proposals SET ? WHERE prob_id=' + 
      mysql.escape(req.prob.prob_id);
    connection.query(sql, {checked: req.body.checked}, function(err, result) {
      if (err) { return next(err); }
      if (!result) return res.status(400).json({message: 'Proposal not found.'});

      res.status(200);
    });
  });

  router.delete('/problem/:prob_id', auth.verifyJWT, function(req, res, next) {
    // must be proposer
    if (req.payload.staff_id != req.prob.staff_id) {
      return res.status(401).json({message: 'Must be the author.'});
    }
    var sql = 'DELETE FROM proposals WHERE ?';
    connection.query(sql, {prob_id: req.prob.prob_id}, function(err, result) {
      if (err) { return next(err); }
      if (!result) return res.status(400).json({message: 'Proposal not found.'});

      res.status(200);
    });
  });

  return router;
}

