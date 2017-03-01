"use strict";
const fs = require('fs');

let checkFileExists = (file, cb) => {
    fs.stat(file, (err, stats) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return cb(null, false);
            } else {
                return cb(err);
            }
        }
        return cb(null, stats.isFile());
    });
}

module.exports = checkFileExists;