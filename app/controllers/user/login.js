'use strict';

/*
	POST: /api/user/login
	Body: {
		username: String, (email || username)
		password: String
	}
	Response:
	Success: { 
		errCode: 0,
		msg: String, 
		data: {
			user: {
				userId: Number,
				username: String,
				email: String,
				displayName: String,
				password: String,
				birthday: String, (YYYY-MM-DD)
				livingIn: String
			}
		}
	}
	Failed: errCode:
		500: Internal error
		-1: Missing argument/ invalid argument type
		-3: User not exists
		-4: Password mismatch
*/

const User = require(global.__base + 'app/models/user');
const utils = require(global.__base + 'app/utils/index');

let login = (req, res) => {
    // Check key not exists
    let keys = ['username', 'password'];
    let notExists = utils.checkKeysNotExists(req.body, keys);
    if (notExists !== -1) {
        return res.status(400).json({
            errCode: -1,
            msg: 'Missing argument ' + keys[notExists]
        });
    }

    let username = req.body.username;
    let password = req.body.password;
    // Check user exists
    // By username
    User.findByUsername(username, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        }
        if (user) {
            if (user.isBlock === 1) {
                return res.status(413).json({ errCode: -5, msg: 'Access Denied' });
            }
            if (!user.comparePassword(password)) {
                // Password mismatch
                return res.status(400).json({ errCode: -6, msg: 'Password mismatch' });
            }

            user.toJSON((err, userJSON) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                }

                // Set session
                req.session.userId = userJSON.userId;
                // Response
                let resData = { user: userJSON };

                return res.json({ errCode: 0, msg: 'Success', data: resData });
            });
        } else {
            // By email
            User.findByEmail(username, (err, user) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                }

                if (!user) {
                    return res.status(404).json({ errCode: -3, msg: 'User not found' });
                }

                if (!user.comparePassword(password)) {
                    // Password mismatch
                    return res.status(400).json({ errCode: -6, msg: 'Password mismatch' });
                }
                user.toJSON((err, userJSON) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                    }

                    // Set session
                    req.session.userId = userJSON.userId;
                    // Response
                    let resData = { user: userJSON };

                    return res.json({ errCode: 0, msg: 'Success', data: resData });
                });
            });
        }
    });
};

module.exports = login;