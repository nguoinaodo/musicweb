'use strict';

const Admin = require(global.__base + 'app/models/admin.js');
const User = require(global.__base + 'app/models/user');

let deserialize = (req, res, next) => {
    let adminId = req.session.adminId;
    let userId = req.session.userId;

    if (adminId !== null && adminId !== undefined) {
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
    } else {
        User.findById(userId, (err, user) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ errCode: 500, msg: 'Internal error' });
            }
            if (!user) {
                return res.status(500).json({ errCode: 500, msg: 'Internal error' });
            }

            req.user = user;
            next();
        });
    }

};

module.exports = deserialize;