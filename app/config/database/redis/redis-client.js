'use strict';

const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
    console.log(err);
});

client.on('connect', (connect) => {
    console.log('Connected to redis');
    client.select(2, () => {
        console.log('Use redis db2');
    });
});
module.exports = client;