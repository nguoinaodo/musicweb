'use strict';

const express = require('express');
const router = express.Router();
const session = require(global.__base + 'app/config/session/session');

const userRouter = require('./user');

// Set session
router.use(session);

router.use('/router', userRouter);

module.exports = router;