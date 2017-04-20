'use strict';
const Artist = require(global.__base + 'app/models/artist.js');

let getSingerType = (req, res) => {

    let type = req.body.type === 'Singer' || req.body.type === 'singer' ? 0 : 1;
    console.log(type);
    Artist.findByType(type, (err, artist) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        }
        if (!artist) {
            return res.status(404).json({ errCode: -3, msg: 'Not found' });
        } else {
            let resData = [];
            artist.forEach(function(item) {
                item.toJSON((err, artistJSON) => {
                    if (err) {
                        return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                    } else {
                        resData.push(artistJSON);
                    }
                })
            });
            return res.status(200).json({ errCode: 0, msg: 'Success', data: resData });
        }

    });

}
module.exports = getSingerType;