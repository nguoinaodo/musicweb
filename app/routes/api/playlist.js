'use strict';
const express = require('express');
const router = express.Router();
const playlistController = require(global.__base + 'app/controllers/playlist/index.js');
const deserializeUser = require(global.__base + 'app/controllers/middleware/deserializeUser.js');
const isUser = require(global.__base + 'app/controllers/middleware/isUser.js');

//Tạo playlist mới
router.post('/create', isUser, playlistController.create);

//Thêm bài hát vào một playlist đã có
router.post('/add', isUser, playlistController.add);

//Remove một bài hát khỏi 1 playlist
router.delete('/remove', isUser, playlistController.remove);

//Delete 1 playlist
router.delete('/delete', isUser, playlistController.delete);
module.exports = router;