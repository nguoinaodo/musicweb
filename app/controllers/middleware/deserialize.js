'use strict';

const User = require(global.__base + 'app/models/user');

let deserialize = (req, res, next) => {
	let userId = req.session.userId;
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
};

module.exports = deserialize;