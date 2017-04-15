'use strict';

const deserializeUser = require('./deserializeUser');
const isUser = require('./isUser');
const log = require('./log');

const middleware = {
    deserializeUser: deserializeUser,
    isAuthenticated: isUser,
    log: log
};

module.exports = middleware;