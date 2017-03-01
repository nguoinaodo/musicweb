'use strict';

const regx = /^\d{8,15}$/;

let checkPhone = (phone) => {
	return regx.test(phone);
};

module.exports = checkPhone;