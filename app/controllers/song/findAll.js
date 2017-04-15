const Song = require(global.__base + 'app/models/song.js');

// Hàm truy vấn trên nhiều trường
let findAll = (req, res) => {
    Song.find(req.body, (err, info) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ errCode: 500, msg: 'Internall error' });
        } else return res.status(200).json({ errCode: 0, msg: 'Success', data: info });
    });
}
module.exports = findAll;