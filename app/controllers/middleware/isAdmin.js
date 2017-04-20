'use strict';

const Admin = require(global.__base + 'app/models/admin.js');

let isAuthenticated = (req, res, next) => {
    let adminId = req.session.adminId;
    if (adminId === null || adminId === undefined) {
        req.session.destroy();

        return res.status(400).json({ errCode: -4, msg: 'Admin not login yet' });
    }

    next();
};

module.exports = isAuthenticated;