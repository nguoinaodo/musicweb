'use strict';

const express = require('express');
const router = express.Router();
const adminController = require(global.__base + 'app/controllers/admin/index');

router.post('/signup', adminController.signup);
router.post('/login', adminController.login);
router.get('/logout', adminController.logout);

module.exports = router;