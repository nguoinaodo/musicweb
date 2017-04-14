'use strict';

const signup = require(global.__base + 'app/controllers/admin/signup');
const login = require(global.__base + 'app/controllers/admin/login');
const logout = require(global.__base + 'app/controllers/admin/logout');
const deserializeAdmin = require(global.__base + 'app/controllers/middleware/deserializeAdmin.js');
const isAdmin = require(global.__base + 'app/controllers/middleware/isAdmin.js');
const adminController = {
    login: login,
    signup: signup,
    logout: logout
};

module.exports = adminController;