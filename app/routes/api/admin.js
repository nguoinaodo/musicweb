'use strict';

const express = require('express');
const router = express.Router();
const adminController = require(global.__base + 'app/controllers/admin/index');
const deserializeAdmin = require(global.__base + 'app/controllers/middleware/deserializeAdmin.js');
const isAdmin = require(global.__base + 'app/controllers/middleware/isAdmin.js');

router.post('/signup', adminController.signup);
router.post('/login', adminController.login);
router.get('/logout', deserializeAdmin, isAdmin, adminController.logout);

//Block user bằng cách post userId đến địa chỉ này, nếu chưa block sẽ bị block, block sẽ đc bỏ block
router.post('/block', deserializeAdmin, isAdmin, adminController.block);
//Trả về thông tin của tất cả các user trong hệ thống
router.get('/alluser', deserializeAdmin, isAdmin, adminController.getUser);
//Trả về tất cả bài hát/video có trong hệ thống theo lượt nghe giảm dần
router.get('/listen', deserializeAdmin, isAdmin, adminController.getListen);
//Trả về tất cả bài hát/video có trong hệ thống theo lượt tải giảm dần
router.get('/download', deserializeAdmin, isAdmin, adminController.getDownload);

module.exports = router;