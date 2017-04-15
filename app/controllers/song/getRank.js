const Song = require(global.__base + 'app/models/song.js');

let getRank = (req, res) => {
    Song.getRankTable(req.params.type, (err, song) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ errCode: 500, msg: 'Internal error' });
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
module.exports = getRank;