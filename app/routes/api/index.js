'use strict';

const express = require('express');
const router = express.Router();
const session = require(global.__base + 'app/config/session/session');
const adminRouter = require('./admin');
const userRouter = require('./user');
const songRouter = require('./song');
const artistRouter = require('./artist');
const playlistRouter = require('./playlist');
const commentRouter = require('./comment');
// Set session
router.use(session);
router.use('/admin', adminRouter);
router.use('/user', userRouter);
router.use('/song', songRouter);
router.use('/artist', artistRouter);
router.use('/playlist', playlistRouter);
router.use('/comment', commentRouter);
module.exports = router;