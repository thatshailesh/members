const express = require('express');

const { getAll, update } = require('../controllers/users');

const authenticate = require('../middleware/auth');

const router = express.Router();

router.put('/:id', authenticate, update);

router.get('/', authenticate, getAll);

module.exports = router;
