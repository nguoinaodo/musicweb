'use strict';

const signup = require(global.__base + 'app/controllers/admin/signup');
const login = require(global.__base + 'app/controllers/admin/login');
const logout = require(global.__base + 'app/controllers/admin/logout');

const adminController = {
    login: login,
    signup: signup,
    logout: logout
};

module.exports = adminController;