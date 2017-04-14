const Comment = require(global.__base + 'app/models/cmtSong.js');


let createCmtSong = (req, res) => {
    let info = {
        userId: req.session.userId,
        songId: req.body.songId,
        contents: req.body.contents,
        dateTime: new Date()
    }
    if (info.userId === null || info.userId === undefined) {
        return res.status(404).json({ errCode: -4, msg: 'Not found User!' });
    }
    if (info.contents === null) {
        return res.status(400).json({ errCode: -2, msg: 'Comment is empty!' });
    } else {
        let newCmt = new Comment(info);
        newCmt.save((err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ errCode: 500, msg: 'Internal error' });
            }
            newCmt.toJSON((err, newCmtJSSON) => {
                let resData = { comment: newCmtJSSON };
                return res.json({ errCode: 0, msg: 'Success', data: resData });
            });
        });
    }
}
module.exports = createCmtSong;