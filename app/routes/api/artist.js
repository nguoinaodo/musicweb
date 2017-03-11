'use strict';
const express = require('express');
const router = express.Router();
const artistController = require(global.__base + 'app/controllers/artist/index.js');

router.post('/create', artistController.newArtist);
module.exports = router;