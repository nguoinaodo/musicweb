'use strict';

require('dotenv').load();
const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('OK');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log('Server is listening at port ' + port);
});