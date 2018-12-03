const express = require('express');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');

const router = express.Router();

router.use('/users', usersRoute);
router.use('/auth', authRoute);

module.exports = router;
