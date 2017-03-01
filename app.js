'use strict';

require('dotenv').load();
global.__base  = process.cwd() + '/';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Body parser
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(bodyParser.json({ limit: '100mb' }));

// Routes
const apiRouter = require(global.__base + 'app/routes/api/index');
app.use('/api', apiRouter);
// Test
app.get('/', (req, res) => {
	res.send('OK');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log('Server is listening at port ' + port);
});