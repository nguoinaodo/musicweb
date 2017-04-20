const Comment = require(global.__base + 'app/models/cmtPlaylist.js');

let rmPlaylist = (req, res) => {
    if (req.user === undefined) {
        return res.status(413).json({ errCode: -5, msg: ' Access Denied' });
    }
    Comment.rmCmt(req.body.cmtId, req.user.userId, (err, info) => {
        if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        if (info.affectedRows === 0) {
            //Không xóa do user ko có quyền xóa
            return res.status(413).json({ errCode: -5, msg: 'Access Denied' });
        } else {
            return res.status(200).json({ errCode: 0, msg: 'Success' });
        }
    });
}
module.exports = rmPlaylist;