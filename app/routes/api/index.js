'use strict';

const express = require('express');
const router = express.Router();
const session = require(global.__base + 'app/config/session/session');

const userRouter = require('./user');
const songRouter = require('./song');
const artistRouter = require('./artist');
// Set session
router.use(session);
router.use('/user', userRouter);
router.use('/song', songRouter);
router.use('/artist', artistRouter);
module.exports = router;