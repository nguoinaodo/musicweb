'use strict';

const express = require('express');
const router = express.Router();
const userController = require(global.__base + 'app/controllers/user/index');
const deserializeUser = require(global.__base + 'app/controllers/middleware/deserializeUser.js');
const isUser = require(global.__base + 'app/controllers/middleware/isUser.js');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/logout', isUser, deserializeUser, userController.logout);

module.exports = router;