'use strict';

const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
	console.log(err);
});

client.on('connect', (connect) => {
	console.log('Connected to redis');
	client.select(3, () => {
		console.log('Use redis db3');
	});
});

module.exports = client;