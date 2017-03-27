'use strict';

const upload = require(global.__base + 'app/controllers/song/upload.js');
const deleteSong = require(global.__base + 'app/controllers/song/delete.js');
const getSongId = require(global.__base + 'app/controllers/song/getSongId.js');
const getSongAuthor = require(global.__base + 'app/controllers/song/getSongAuthor.js');
const getSongByName = require(global.__base + 'app/controllers/song/getSongByName.js');
const getSongByArtist = require(global.__base + 'app/controllers/song/getSongByArtist.js');
const getPresent = require(global.__base + 'app/controllers/song/getPresent.js');
const getSongByCategory = require(global.__base + 'app/controllers/song/getSongByCategory.js');
const getSongByZone = require(global.__base + 'app/controllers/song/getSongByZone.js');
const getSongByType = require(global.__base + 'app/controllers/song/getSongByType.js');
const updateListening = require(global.__base + 'app/controllers/song/updateListening.js');
const updateDownload = require(global.__base + 'app/controllers/song/updateDownload.js');


const songController = {
    upload: upload,
    delete: deleteSong,
    getSongId: getSongId,
    getSongAuthor: getSongAuthor,
    getSongByName: getSongByName,
    getSongByArtist: getSongByArtist,
    getPresent: getPresent,
    getSongByCategory: getSongByCategory,
    getSongByZone: getSongByZone,
    getSongByType: getSongByType,
    updateListening: updateListening,
    updateDownload: updateDownload
};

module.exports = songController;