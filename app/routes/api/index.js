'use strict';

const express = require('express');
const router = express.Router();

const userRouter = require('./user');

router.use('/router', userRouter);

module.exports = router;