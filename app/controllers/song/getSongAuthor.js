'use strict';
const Song = require(global.__base + 'app/models/song.js');

let getSongAuthor = (req, res) => {
    Song.findByAuthor(req.body.name, (err, song) => {
        if (err) {
            return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        }
        if (!song) {
            return res.status(404).json({ errCode: 404, msg: 'Not found' });
        } else {
            console.log(song);
            let resData = [];
            song.forEach(function(item) {
                item.toJSON((err, songJson) => {
                    resData.push(songJson);
                });
            });
            return res.status(200).json({ errCode: 0, msg: 'Success', data: resData });

        }
    });
}
module.exports = getSongAuthor;