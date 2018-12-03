const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator/check');

const errors = require('restify-errors');

const { NODE_ENV = 'dev' } = process.env;

const { jwtSecret } = require('../../config/env')[NODE_ENV];

const User = require('../models/user');

module.exports = {
  register: async (req, res, next) => {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        res.status(422).json({ errors: validationErrors.array() });
        return;
      }

      const { email, password, name } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 8);

      const userData = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      const token = await jwt.sign({ id: userData._id }, jwtSecret, {
        expiresIn: 86400, // expires in 24 hours
      });
      res.status(200);
      return res.json({ user: userData, token });
    } catch (err) {
      return next(new errors.InternalError(err.message));
    }
  },

  login: async (req, res, next) => {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        res.status(422).json({ errors: validationErrors.array() });
        return;
      }

      const { email, password } = req.body;

      const userData = await User.findOne({ email });

      if (!userData) throw new errors.UnauthorizedError('Invalid Credentials');

      const isMatched = bcrypt.compare(password, userData.password);

      if (!isMatched) throw new errors.UnauthorizedError('Invalid Credentials');

      const token = await jwt.sign({ id: userData._id }, jwtSecret, {
        expiresIn: 86400, // expires in 24 hours
      });
      res.status(200);
      return res.json({ token });
    } catch (err) {
      return next(err);
    }
  },

  validate: method => {
    switch (method) {
      case 'register': {
        return [
          body('email')
            .exists()
            .isEmail(),
          body('name')
            .exists()
            .isString(),
          body('register')
            .exists()
            .isString(),
        ];
      }
      case 'login': {
        return [
          body('email')
            .exists()
            .isEmail(),
          body('password')
            .exists()
            .isString(),
        ];
      }
      default: {
        return [];
      }
    }
  },
};
