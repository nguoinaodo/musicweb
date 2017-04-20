'use strict';
const Song = require(global.__base + 'app/models/song.js');
const mediaserver = require('mediaserver');
let stream = (req, res) => {
    Song.findById(req.params.id, (err, song) => {
        if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        if (!song) return res.status(404).json({ errCode: -3, msg: 'Not found' });
        else {
            var file = global.__base + '/' + song.link;
            mediaserver.pipe(req, res, file);
        };
    });
}
module.exports = stream;