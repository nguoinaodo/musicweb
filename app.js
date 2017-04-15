'use strict';

require('dotenv').load();
global.__base = process.cwd() + '/';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const deserializeUser = require(global.__base + 'app/controllers/middleware/deserializeUser.js');
const isUser = require(global.__base + 'app/controllers/middleware/isUser.js');
const deserializeAdmin = require(global.__base + 'app/controllers/middleware/deserializeAdmin.js');
const isAdmin = require(global.__base + 'app/controllers/middleware/isAdmin.js');
const session4 = require(global.__base + 'app/config/session/session.js')
const RedisStore = require('connect-redis')(session);
const redisClient = require(global.__base + 'app/config/database/redis/redis-client');
const isAuthenticated = require(global.__base + 'app/controllers/middleware/isAuthenticated.js');
const deserialize = require(global.__base + 'app/controllers/middleware/deserialize.js');

// Body parser
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 604800 }
}));

// Log
const log = require(global.__base + 'app/controllers/middleware').log;
app.use('/', log);
// Routes
const apiRouter = require(global.__base + 'app/routes/api/index');
const song = require(global.__base + 'app/routes/index/song.js');
app.use('/api', apiRouter);
app.use('/song', song);

// Test stream audio/video
app.get('/', (req, res) => {
    res.sendFile(global.__base + 'app/routes/api/index.html');
});
app.get('/u', (req, res) => {
    res.sendFile(global.__base + 'app/routes/api/index1.html');
});
app.get('/hi', isAuthenticated, deserialize, (req, res) => {
    res.sendFile(global.__base + 'app/routes/api/delete.html');
});
app.get('/he', isUser, deserializeUser, (req, res) => {
    console.log(req.user.userId);
    res.sendFile(global.__base + 'app/routes/api/song.html');
});
app.get('/cmt', isAuthenticated, deserialize, (req, res) => {
    res.sendFile(global.__base + 'app/routes/api/comment.html');
});
app.get('/crpl', isAuthenticated, deserialize, (req, res) => {
    res.sendFile(global.__base + 'app/routes/api/playlist.html');
});
app.get('/bl', isAdmin, deserializeAdmin, (req, res) => {
    res.sendFile(global.__base + 'app/routes/api/block.html');

});
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server is listening at port ' + port);
});