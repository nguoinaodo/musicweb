'use strict';
const express = require('express');
const router = express.Router();
const artistController = require(global.__base + 'app/controllers/artist/index.js');
const deserializeUser = require(global.__base + 'app/controllers/middleware/deserializeUser.js');
const isUser = require(global.__base + 'app/controllers/middleware/isUser.js');

router.post('/create', isUser, artistController.newArtist);
router.post('/find/name', artistController.getArtistName);
router.post('/find/type', artistController.getArtistType);
module.exports = router;