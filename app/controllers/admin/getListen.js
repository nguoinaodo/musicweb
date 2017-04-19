const Admin = require(global.__base + 'app/models/admin.js');

let getListen = (req, res) => {
    Admin.getListen((err, user) => {
        if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        else return res.status(200).json({ errCode: 0, msg: 'Success', data: user })
    });

}
module.exports = getListen;