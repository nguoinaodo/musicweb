'use strict';

const express = require('express');
const router = express.Router();
const songController = require(global.__base + 'app/controllers/song/index.js');
const deserialize = require(global.__base + 'app/controllers/middleware/deserialize.js');
const isAuthenticated = require(global.__base + 'app/controllers/middleware/is-authenticated.js');


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

router.post('/upload', upload.single("file"), songController.upload);
router.delete('/delete', songController.delete);
router.get('/:songId', songController.getSongId);
router.post('/find/authorname', songController.getSongAuthor);
router.post('/find/songname', songController.getSongByName);
module.exports = router;