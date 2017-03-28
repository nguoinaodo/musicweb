'use strict';
const createArtist = require(global.__base + 'app/controllers/artist/create.js');
const getArtistName = require(global.__base + 'app/controllers/artist/getSingerByName.js');
const getArtistType = require(global.__base + 'app/controllers/artist/getSingerByType.js');

const artistController = {
    newArtist: createArtist,
    getArtistName: getArtistName,
    getArtistType: getArtistType
}
module.exports = artistController;