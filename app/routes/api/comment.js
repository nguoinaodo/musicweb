'use strict';
const express = require('express');
const router = express.Router();
const commentController = require(global.__base + 'app/controllers/comment/index.js');
const isAuthenticated = require(global.__base + 'app/controllers/middleware/isAuthenticated.js');
const deserialize = require(global.__base + 'app/controllers/middleware/deserialize.js');
const deserializeUser = require(global.__base + 'app/controllers/middleware/deserializeUser.js');
const isUser = require(global.__base + 'app/controllers/middleware/isUser.js');
//Tạo cmt trong bài hát
router.post('/song/create', isUser, deserializeUser, commentController.createCmtSong);

//Tạo cmt trong playlist
router.post('/playlist/create', isUser, deserializeUser, commentController.createCmtPlaylist);

//Get cmt trong bài hát
router.get('/song/:songId', commentController.cmtSong);

//Get cmt trong playlist
router.get('/playlist/:playlistId', commentController.cmtPlaylist);

//Xóa cmt trong bài hát
router.delete('/song/remove', isAuthenticated, deserialize, commentController.rmSong);

//Xóa cmt trong playlist
router.delete('/playlist/remove', isAuthenticated, deserialize, commentController.rmPlaylist);

module.exports = router;