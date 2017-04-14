'use strict';
const Song = require(global.__base + 'app/models/song.js');


//Trả về thông tin bài hát từ bảng song
let getSongName = (req, res) => {
    Song.findByName(req.body.name, (err, song) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ errCode: 500, msg: 'Interal error' });
        }
        if (!song) {
            return res.status(404).json({ errCode: 404, msg: 'Not found' });
        } else {
            let resData = [];
            song.forEach(function(item) {
                item.toJSON((err, songJSON) => {
                    resData.push(songJSON);
                });
            });
            return res.status(200).json({ errCode: 0, msg: 'Success', data: resData });
        }
    });
}

module.exports = getSongName;