'use strict';
const Song = require(global.__base + 'app/models/song.js');

let updateListening = (req, res) => {
    if (!req.body.songId) {
        return res.status(404).json({ errCode: -3, msg: 'Not found' });
    } else {
        Song.updateListening(req.body.songId, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ errCode: 500, msg: 'Internal error' });
            } else {
                return res.json({ errCode: 0, msg: 'Success' });
            }
        });
    }

}
module.exports = updateListening;