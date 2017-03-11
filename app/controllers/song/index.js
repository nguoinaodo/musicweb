'use strict';

const upload = require(global.__base + 'app/controllers/song/upload.js');
const deleteSong = require(global.__base + 'app/controllers/song/delete.js');
const getSongId = require(global.__base + 'app/controllers/song/getSongId.js');
const getSongAuthor = require(global.__base + 'app/controllers/song/getSongAuthor.js');
const getSongByName = require(global.__base + 'app/controllers/song/getSongByName.js');
const songController = {
    upload: upload,
    delete: deleteSong,
    getSongId: getSongId,
    getSongAuthor: getSongAuthor,
    getSongByName: getSongByName
};

module.exports = songController;