'use strict';
const createPlaylist = require(global.__base + 'app/controllers/playlist/create.js');
const addPlaylist = require(global.__base + 'app/controllers/playlist/add.js');
const removePlaylist = require(global.__base + 'app/controllers/playlist/remove.js');
const deletePlaylist = require(global.__base + 'app/controllers/playlist/delete.js');
const playlistController = {
    create: createPlaylist,
    add: addPlaylist,
    remove: removePlaylist,
    delete: deletePlaylist

}

module.exports = playlistController;