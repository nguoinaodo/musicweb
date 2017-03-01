"use strict";

let logging = (req, res, next) => {
	console.log('===================' + new Date());
	console.log(req.method, req.url);
	console.log("Header: {");
	console.log("    X-Auth-Token:", req.get('X-Auth-Token'));
	console.log("}");
	if (req.method === 'GET') {
		console.log('Query:', req.query);
	}
	else {
		console.log('Body:');
		console.log('{');
		for (var k in req.body) {
			if (req.body[k].length > 50) {
				console.log('    ' + k + ': ' + 
					req.body[k].substr(0, 50) + '...' + '[' + (req.body[k].length - 50) + ']');
			}
			else {
				console.log('    ' + k + ': ' + req.body[k]);
			}
		}
		console.log('}');
	}
	next();
}

module.exports = logging;