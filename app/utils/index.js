'use strict';

const checkMail = require('./check-mail');
const checkKeysNotExists = require('./check-keys-not-exists');
const checkFileExist = require('./check-file-exists');
const checkKeysNaN = require('./check-keys-NaN');
const checkPhone = require('./check-phone');

const utils = {
	checkMail: checkMail,
	checkFileExist: checkFileExist,
	checkKeysNotExists: checkKeysNotExists,
	checkKeysNaN: checkKeysNaN,
	checkPhone: checkPhone
};

module.exports = utils;
