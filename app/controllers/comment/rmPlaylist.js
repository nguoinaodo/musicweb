const Comment = require(global.__base + 'app/models/cmtPlaylist.js');

let cmtPlaylist = (req, res) => {
    Comment.findCmtSong(req.params.songId, (err, cmt) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        } else {
            return res.status(200).json({ errCode: 0, msg: ' Success', data: cmt });
        }
    });
}
module.exports = cmtPlaylist;