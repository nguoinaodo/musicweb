const Artist = require(global.__base + 'app/models/artist.js');

let createArtist = (req, res) => {
    let name = req.body.name;
    if (!name) name = 'Unknown';
    let info = {
        name: name,
        type: req.body.type,
        description: req.body.description
    }
    let newArtist = new Artist(info);
    newArtist.save((err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        }
        newArtist.toJSON((err, newArtistJSON) => {
            let resData = { artist: newArtistJSON };
            return res.status(200).json({ errCode: 0, msg: 'Succsess', data: resData });
        });
    });

}
module.exports = createArtist;