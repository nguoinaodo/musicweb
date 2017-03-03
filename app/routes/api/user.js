'use strict';

const express = require('express');
const router = express.Router();
const userController = require(global.__base + 'app/controllers/user/index');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

module.exports = router;