const Playlist = require(global.__base + 'app/models/playlist.js');

let addPlaylist = (req, res) => {
    Playlist.findByName(req.body.playlistName, (err, playlist) => {
        if (err) {
            return res.status(500).json({ errCode: 500, msg: "Internal error" });
        }

        if (!playlist) {
            return res.status(404).json({ errCode: -3, msg: "Not found playlist" });
        } else {
            if (playlist.userId === req.user.userId) {
                Playlist.addSong(req.body.songId, req.body.playlistName, req.user.userId, (err) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({ errCode: 500, msg: "Internal error" });
                    }
                    return res.status(200).json({ errCode: 0, msg: "Success" });
                });
            } else return res.status(413).json({ errCode: -5, msg: "Access Denied" });

        }
    });
}
module.exports = addPlaylist;