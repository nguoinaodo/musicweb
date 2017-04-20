'use strict';
const Admin = require(global.__base + 'app/models/admin');
const utils = require(global.__base + 'app/utils/index');


let login = (req, res) => {
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

    Admin.findByUsername(username, (err, admin) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                errCode: 500,
                msg: "Internal error"
            });
        }
        if (admin) {
            if (!admin.comparePassword(password)) {
                return res.status(400).json({
                    errCode: -4,
                    msg: "Password mismatch"
                })
            }
            admin.toJSON((err, adminJSON) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        errCode: 500,
                        msg: "Internal error"
                    });
                }
                req.session.adminId = adminJSON.adminId;
                console.log(req.session.adminId);
                let resData = { admin: adminJSON }
                return res.status(200).json({
                    errCode: 0,
                    msg: "success",
                    data: resData
                });
            })
        } else {
            Admin.findByEmail(username, (err, admin) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        errCode: 500,
                        msg: 'Internal error'
                    });
                }
                if (!admin) {
                    return res.status(404).json({
                        errCode: -3,
                        msg: "Admin not found !"
                    });
                }
                if (!admin.comparePassword(password)) {
                    return res.status(400).json({ errCode: -4, msg: 'Password mismatch' });

                }
                admin.toJSON((err, adminJSON) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            errCode: 500,
                            msg: 'internal error'
                        });
                    }
                    req.session.adminId = adminJSON.adminId;
                    let resData = { admin: adminJSON }
                    return res.json({
                        errCode: 0,
                        msg: 'Success',
                        data: resData
                    })
                });
            })
        }
    })

}
module.exports = login;