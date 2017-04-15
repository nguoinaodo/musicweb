'use strict';
const Song = require(global.__base + 'app/models/song.js');
const fs = require('fs');
let deleteSong = (req, res) => {

    let info = {
        userId: req.session.userId,
        songId: req.body.songId
    };
    if (info.userId === null && req.session.adminId === null) {
        return res.status(403).json({ errCode: -3, msg: 'Access is Denied' });
    }
    Song.findById(info.songId, (err, song) => {
        if (err) {
            return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        }
        if (!song) return res.status(404).json({ errCode: 404, msg: 'Not Found' });

        else {
            var path = global.__base + '/' + song.link;
            if (req.session.adminId !== null && req.session.adminId !== undefined) {
                console.log(req.session);
                Song.deleteSongAdmin(info.songId, (err, info) => {
                    if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                    if (info.affectedRows === 0) return res.status(404).json({ errCode: -4, msg: "Not found" });
                    else {
                        return res.status(200).json({ errCode: 0, msg: "Success" });
                        fs.unlinkSync(path);
                    }
                });
            } else {
                Song.deleteSong(info.userId, info.songId, (err, info) => {
                    console.log(req.session);
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                    }
                    if (info.affectedRows === 0) return res.status(404).json({ errCode: -4, msg: "Not found" });
                    else {
                        fs.unlinkSync(path);
                        return res.status(200).json({ errCode: 0, msg: 'Success' });
                    }
                });
            }
        }

    });



}

module.exports = deleteSong;