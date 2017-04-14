'use strict';
const Song = require(global.__base + 'app/models/song.js');

// Trả về thông tin bài hát kèm theo ca sĩ trình bày
let present = (req, res) => {
    Song.findPresent(req.body.name, (err, present) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        }
        if (!present) {
            return res.status(404).json({ errCode: 404, msg: 'Not found' });
        } else {
            console.log(present);
            return res.status(200).json({ errCode: 0, msg: 'Success', data: present });
        }
    })
}
module.exports = present;