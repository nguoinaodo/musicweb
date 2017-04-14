'use strict';

const User = require(global.__base + 'app/models/user');

let isAuthenticated = (req, res, next) => {
    if (req.session.userId === null || req.session.userId === undefined) {
        if (req.session.adminId === null || req.session.adminId === undefined) {
            req.session.destroy();
            return res.status(400).json({ errCode: -4, msg: 'User not login yet' });
        }
        next();
    } else {
        next();
    }


};

module.exports = isAuthenticated;