const router = require('express').Router(),
      async = require('async'),
      auth = require('../config/auth'),
      handler = require('../utils/handler'),
      { requestTypes, requestEnum } = require('../constants');
const { REQUEST, ACCEPT, REJECT } = requestTypes;

const User = require('../database/user'),
      Competition = require('../database/competition'),
      Request = require('../database/request');

router.post('/', auth.verifyJWT, (req, res) => {
  const { type, competition, userId } = req.body;
  if (!competition.name) {
    handler(false, 'Competition name must exist.', 400)(req, res);
  }
  switch(type) {
    case REQUEST:
      /* see if contest with same name exists */
      Competition.findOne({ 
        name: { 
          $regex: new RegExp('^' + competition.name.toLowerCase(), 'i')
        },
        valid: true
      }, (err, existingCompetition) => {
        if (err) {
          return handler(false, 'Database failed to load competitions.', 503)(req, res);
        } else if (existingCompetition) {
          return handler(false, 'A competition with that name already exists.', 400)(req, res);
        } else {
          /* find user who requested competition */
          User.findById(userId, (err, user) => {
            if (err) {
              return handler(false, 'Database failed to load author.', 503)(req, res);
            } else if (!user) {
              return handler(false, 'Author of competition request could not be found.', 400)(req, res);
            } else {
              /* create request */
              const request = Object.assign(new Request(), {
                author: user._id,
                body: `${user.name} requests to create the competition \"${competition.name}\".`,
                type: requestEnum.REQUEST
              });
              request.save(err => {
                if (err) {
                  handler(false, 'Database failed to create the request.', 503)(req, res);
                } else {
                  /* send request to admins of the site */
                  User.find({ admin: true }, (err, admins) => {
                    const tasks = admins.map(admin => {
                      return callback => {
                        admin.requests.push(request);
                        admin.save(err => {
                          if (err) callback(err, null);
                          else callback(null, null);
                        });
                      }
                    });
                    async.parallel(tasks, (err, results) => {
                      if (err) {
                        handler(false, 'Database failed to send request to admins.', 503)(req, res);
                      } else {
                        /* success */
                        handler(true, 'Successfully requested creation of competition.', 200)(req, res);
                      }
                    });
                  });
                }
              });
            }
          });
        }
      });
      break;
    default:
      handler(false, 'Invalid competition post.', 400)(req, res);
      break;
  }
});

module.exports = router;
