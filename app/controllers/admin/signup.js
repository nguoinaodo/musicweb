'use strict';
const Admin = require(global.__base + 'app/models/admin');
const utils = require(global.__base + 'app/utils/index');


let signup = (req, res) => {
    let keys = ['username', 'priority', 'email', 'password'];
    let notExists = utils.checkKeysNotExists(req.body, keys);
    if (notExists !== -1) {
        return res.status(400).json({
            errCode: -1,
            msg: 'Missing argument ' + keys[notExists]
        });
    }

    if (!utils.checkMail(req.body.email)) {
        return res.status(400).json({ errCode: -1, msg: 'Invalid email format' });
    }
    let info = {
        username: req.body.username,
        priority: req.body.priority,
        email: req.body.email,
        password: req.body.password
    };

    Admin.findByEmail(info.email, (err, admin) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ errCode: 500, msg: 'Internal error' });
        }
        if (admin) {
            return res.status(400).json({ errCode: 400, msg: 'Admin already exists' });
        } else {
            let newAdmin = new Admin(info);
            newAdmin.save((err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                } else {
                    newAdmin.toJSON((err, newAdminJSON) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({ errCode: 500, msg: 'Internal error' });
                        } else {
                            let resData = { admin: newAdminJSON };
                            return res.status(200).json({ errCode: 0, msg: 'Success', data: resData });
                        }

                    });
                }
            });
        }
    })



}
module.exports = signup