const express = require('express');
const router = express.Router();
const songController = require(global.__base + 'app/controllers/song/index.js');
const mediaserver = require('mediaserver');

router.get('/:id', songController.stream);
module.exports = router;