'use strict';

const express = require('express');
const router = express.Router();
const songController = require(global.__base + 'app/controllers/song/index.js');
const deserializeUser = require(global.__base + 'app/controllers/middleware/deserializeUser.js');
const isUser = require(global.__base + 'app/controllers/middleware/isUser.js');
const deserializeAdmin = require(global.__base + 'app/controllers/middleware/deserializeAdmin.js');
const isAdmin = require(global.__base + 'app/controllers/middleware/isAdmin.js');
const isAuthenticated = require(global.__base + 'app/controllers/middleware/isAuthenticated.js');
const deserialize = require(global.__base + 'app/controllers/middleware/deserialize.js');

var fs = require('fs');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

//Tạo bài hát mới
router.post('/upload', deserializeUser, isUser, upload.single("file"), songController.upload);


//Xóa một bài hát, chỉ có user hoặc admin mới có quyền
router.post('/delete', deserialize, isAuthenticated, songController.delete);


//Trả về một bài hát bằng ID
router.get('/:songId', songController.getSongId);


//Trả về bài hát bằng tên tác giả
router.post('/find/author', songController.getSongAuthor);


//Trả về bài hát bằng tên 
router.post('/find/name', songController.getSongByName);


//Trả về bài hát bằng tên ca sĩ
router.post('/find/artist', songController.getSongByArtist);


//Trả về thông tin về sự biểu diễn bài hát ( bao gồm bài hát + ca sĩ trình diễn)
router.post('/find/perform', songController.getPresent);


//Trả về thông tin bài hát từ category
router.post('/find/category', songController.getSongByCategory);


//Trả về thông tin bài hát từ zone
router.post('/find/zone', songController.getSongByZone);


//Trả về thông tin bài hát từ type
router.post('/find/type', songController.getSongByType);

//Trả về danh sách bài hát ở một playlist
router.post('/find/playlist', songController.getSongPlaylist);

//Cập nhật lượt nghe bài hát
router.put('/update/listen', songController.updateListening);

//Cập nhật lượt tải của bài hát
router.put('/update/download', songController.updateDownload);

//Download bài hát
router.get('/download/:id', songController.download);

module.exports = router;