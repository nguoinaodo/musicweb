'use strict';
const Song = require(global.__base + 'app/models/song.js');

let updateListening = (req, res) => {
    if (parseInt(req.body.status) === 1) {
        if (!req.body.songId) {
            return res.status(404).json({ errCode: 404, msg: 'Not found' });
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
    } else {
        return res.json({ errCode: 0, msg: 'No change' });
    }
}
module.exports = updateListening;