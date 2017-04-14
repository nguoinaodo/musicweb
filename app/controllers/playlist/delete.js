const Playlist = require(global.__base + 'app/models/playlist.js');

let deletePlaylist = (req, res) => {
    Playlist.deletePlaylist(req.body.playlistId, (err, info) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        }
        if (info.affectedRows == 0) {
            return res.status(404).json({ errCode: 404, msg: "Not found" });
        } else return res.status(200).json({ errCode: 0, msg: "Success" });
    });
}
module.exports = deletePlaylist;