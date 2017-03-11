'use strict';
const createArtist = require(global.__base + 'app/controllers/artist/create.js');

const artistController = {
    newArtist: createArtist
}
module.exports = artistController;