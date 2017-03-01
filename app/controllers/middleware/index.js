'use strict';

const deserialize = require('./deserialize');
const isAuthenticated = require('./is-authenticated');
const log = require('./log');

const middleware = {
	deserialize: deserialize,
	isAuthenticated: isAuthenticated,
	log: log
};

module.exports = middleware;