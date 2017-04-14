const Song = require(global.__base + 'app/models/song.js');

let getSongId = (req, res) => {
    let id = req.params.songId;
    Song.findById(id, (err, song) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        }
        if (!song) {
            return res.status(404).json({ errCode: 404, msg: 'Not found' });
        } else {
            console.log(song);
            song.toJSON((err, songJSON) => {
                let resData = { song: songJSON };
                return res.status(200).json({ errCode: 200, msg: 'Success', data: resData });
            });
        }
    });
}

module.exports = getSongId;