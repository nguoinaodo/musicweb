'use strict';
const logout = (req, res) => {
    req.session.destroy();
    return res.json({
        errCode: 0,
        msg: 'Success',
        data: {}
    });
};
module.exports = logout;