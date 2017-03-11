'use strict';
const Song = require(global.__base + 'app/models/song.js');

let deleteSong = (req, res) => {

    let info = {
        userId: req.body.userId,
        songId: req.body.songId
    };
    if (info.userId === null) {
        return res.status(403).json({ errCode: 403, msg: 'Access is Denied' });
    }
    Song.findById(info.songId, (err, song) => {
        if (err) {
            return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        }
        if (song) {
            Song.deleteSong(info.userId, info.songId, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                }

                return res.status(200).json({ errCode: 0, msg: 'Success' });


            });
        } else return res.status(404).json({ errCode: 404, msg: 'Not Found' });

    });



}

module.exports = deleteSong;