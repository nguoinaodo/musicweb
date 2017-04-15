'use strict';
const cmtSong = require(global.__base + 'app/controllers/comment/cmtSong.js');
const cmtPlaylist = require(global.__base + 'app/controllers/comment/cmtPlaylist.js');
const rmSong = require(global.__base + 'app/controllers/comment/rmSong.js');
const rmPlaylist = require(global.__base + 'app/controllers/comment/rmPlaylist.js');
const createCmtSong = require(global.__base + 'app/controllers/comment/createCmtSong.js');
const createCmtPlaylist = require(global.__base + 'app/controllers/comment/createCmtPlaylist.js');

const controllerComment = {
    createCmtSong: createCmtSong,
    createCmtPlaylist: createCmtPlaylist,
    cmtSong: cmtSong,
    cmtPlaylist: cmtPlaylist,
    rmSong: rmSong,
    rmPlaylist: rmPlaylist
}

module.exports = controllerComment;