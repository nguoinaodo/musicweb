'use strict';

const expressSession = require('express-session');
const RedisStore = require('connect-redis')(expressSession);
const redisClient = require(global.__base + 'app/config/database/redis/redis-client');

const ttl = 3600 * 24 * 7; // 7 days

const options = {
    client: redisClient,
    ttl: ttl
};

const session = expressSession({
    store: new RedisStore(options),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * ttl
    }
});
console.log('Session');

module.exports = session;