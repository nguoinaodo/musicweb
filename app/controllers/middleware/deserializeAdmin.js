'use strict';

const Admin = require(global.__base + 'app/models/admin.js');

let deserialize = (req, res, next) => {
    let adminId = req.session.adminId;
    Admin.findById(adminId, (err, admin) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        }
        if (!admin) {
            return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        }

        req.admin = admin;
        next();
    });
};

module.exports = deserialize;