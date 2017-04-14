const Playlist = require(global.__base + 'app/models/playlist.js');

let addPlaylist = (req, res) => {
    Playlist.findByName(req.body.playlistName, (err, playlist) => {
        console.log(playlist);
        if (err) {
            return res.status(500).json({ errCode: 500, msg: "Internal error" });
        }

        if (!playlist) {
            return res.status(404).json({ errCode: -1, msg: "Not found playlist" });
        } else {
            Playlist.addSong(req.body.songId, req.body.playlistName, (err) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({ errCode: 500, msg: "Internal error" });
                }
                return res.status(200).json({ errCode: 0, msg: "Success" });
            })
        }
    });
}
module.exports = addPlaylist;