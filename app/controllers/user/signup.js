'use strict';

/*
	POST: /api/user/signup
	Body: {
		username: String,
		email: String,
		displayName: String,
		password: String,
		birthday: String, (YYYY-MM-DD)
		livingIn: String
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
		-2: User already exists
*/

const User = require(global.__base + 'app/models/user');
const utils = require(global.__base + 'app/utils/index');
const moment = require('moment');

let signup = (req, res) => {
    // Check key not exists
    let keys = ['username', 'email', 'password', 'displayName', 'birthday', 'livingIn'];
    let notExists = utils.checkKeysNotExists(req.body, keys);
    if (notExists !== -1) {
        return res.status(400).json({
            errCode: -1,
            msg: 'Missing argument ' + keys[notExists]
        });
    }
    // Check mail
    if (!utils.checkMail(req.body.email)) {
        return res.status(400).json({ errCode: -1, msg: 'Invalid email format' });
    }
    // Check date
    if (!moment(req.body.birthday).isValid()) {
        return res.status(400).json({ errCode: -1, msg: 'Invalid date format' });
    }
    // Check district exist
    let info = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        displayName: req.body.displayName,
        birthday: moment(req.body.birthday).format('YYYY-MM-DD'),
        livingIn: req.body.livingIn,
        gender: req.body.gender === 'Nam' ? 0 : 1,
        isBlock: 1
    };
    // Check user exist
    User.findByUsername(info.username, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        }
        if (user) {
            return res.status(400).json({ errCode: -2, msg: 'User already exists' });
        }
        User.findByEmail(info.email, (err, user) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ errCode: 500, msg: 'Internal error' });
            }
            if (user) {
                return res.status(400).json({ errCode: -2, msg: 'User already exists' });
            }

            // Create new user
            let newUser = new User(info);
            // Save to database
            newUser.save((err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                }

                // Response
                newUser.toJSON((err, newUserJSON) => {
                    let resData = { user: newUserJSON };

                    // Set session
                    req.session.userId = newUserJSON.userId;

                    return res.json({ errCode: 0, msg: 'Success', data: resData })
                });
            });
        });
    });
};

module.exports = signup;