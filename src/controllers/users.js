const {
  body,
  param,
  query,
  validationResult,
} = require('express-validator/check');

const errors = require('restify-errors');

const User = require('../models/user');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        res.status(422).json({ errors: validationErrors.array() });
        return;
      }
      const { name = null, email = null } = req.query;
      const filter = {};

      if (name) filter.name = name;

      if (email) filter.email = email;

      const users = await User.find(filter);

      res.json(users);
    } catch (err) {
      return next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty())
        res.status(422).json({ errors: validationErrors.array() });

      const { id } = req.params;

      const userData = await User.findById(id);

      if (!userData) throw new errors.NotFoundError('User not found');

      Object.keys(req.body).forEach(el => {
        userData[el] = req.body[el];
      });

      const result = await userData.save();

      res.json(result);
    } catch (err) {
      return next(err);
    }
  },

  validate: method => {
    switch (method) {
      case 'getAll': {
        return [
          query('name')
            .optional()
            .isString(),
          query('email')
            .optional()
            .isEmail(),
        ];
      }
      case 'update': {
        return [
          param('id')
            .exists()
            .isMongoId(),
          body('name')
            .optional()
            .isString(),
          body('email')
            .optional()
            .isEmail(),
        ];
      }
      default: {
        return [];
      }
    }
  },
};
