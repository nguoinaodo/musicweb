const Admin = require(global.__base + 'app/models/admin.js');
let block = (req, res) => {
    Admin.Block(req.body.userId, (err) => {
        if (err) return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        return res.status(200).json({ errCode: 0, msg: 'Success' });
    });
}
module.exports = block;