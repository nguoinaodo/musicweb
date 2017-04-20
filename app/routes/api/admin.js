'use strict';

const express = require('express');
const router = express.Router();
const adminController = require(global.__base + 'app/controllers/admin/index');
const deserializeAdmin = require(global.__base + 'app/controllers/middleware/deserializeAdmin.js');
const isAdmin = require(global.__base + 'app/controllers/middleware/isAdmin.js');

router.post('/signup', adminController.signup);
router.post('/login', adminController.login);
router.get('/logout', isAdmin, adminController.logout);

module.exports = router;