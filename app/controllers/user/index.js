'use strict';

const signup = require(global.__base + 'app/controllers/user/signup');
const login = require(global.__base + 'app/controllers/user/login');
const logout = require(global.__base + 'app/controllers/user/logout');

const userController = {
	login: login,
	signup: signup,
	logout: logout
};

module.exports = userController;