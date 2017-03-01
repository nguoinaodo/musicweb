const mysql = require('mysql');
const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	connectionLimit: process.env.DB_CONN_LIMIT
});

console.log('Connected to database');
module.exports = pool;