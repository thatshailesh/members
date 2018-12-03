const jwt = require('jsonwebtoken');

const errors = require('restify-errors');

const { NODE_ENV = 'dev' } = process.env;

const { jwtSecret } = require('../../config/env')[NODE_ENV];

const authenticate = async (req, res, next) => {
  // check header or url parameters or post parameters for token
  let token =
    req.body.token || req.params.token || req.headers['x-access-token'];

  if (
    !token &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  )
    [, token] = req.headers.authorization.split(' ');
  else if (!token && req.query && req.query.token) ({ token } = req.query);

  // decode token

  if (!token)
    return next(new errors.ForbiddenError('No authorization token was found'));

  try {
    await jwt.verify(token, jwtSecret);

    req.token = token;

    return next();
  } catch (err) {
    return next(new errors.UnauthorizedError('Failed to authenticate'));
  }
};

module.exports = authenticate;
