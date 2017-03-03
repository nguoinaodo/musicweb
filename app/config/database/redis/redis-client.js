'use strict';

const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
	console.log(err);
});

client.on('connect', (connect) => {
	console.log('Connected to redis');
<<<<<<< HEAD
	client.select(2, () => {
		console.log('Use redis db2');
=======
	client.select(3, () => {
		console.log('Use redis db3');
>>>>>>> 885448564faf7a90013c1acf66cfc69cb4fa7913
	});
});

module.exports = client;