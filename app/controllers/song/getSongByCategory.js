'use strict';
const Song = require(global.__base + 'app/models/song.js');
// Trả về bài hát ở cùng một category

let findSongByCategory = (req, res) => {
    Song.findByCategory(req.body.name, (err, song) => {
        if (err) return callback(err);
        if (!song) {
            return res.status(404).json({ errCode: 404, msg: 'Not found' });
        } else {
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
module.exports = findSongByCategory;