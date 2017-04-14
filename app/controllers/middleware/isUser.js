'use strict';

const User = require(global.__base + 'app/models/user');

let isAuthenticated = (req, res, next) => {
	let userId = req.session.userId;
	if (userId === null || userId === undefined) {
		req.session.destroy();

		return res.status(400).json({ errCode: -4, msg: 'User not login yet' });
	}

	next();
};

module.exports = isAuthenticated;