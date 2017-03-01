"use strict";

let checkKeysNotExists = (obj, keys) => {
	if (Array.isArray(keys)) {
		for (let i = 0; i < keys.length; i++) {
			if (obj[keys[i]] === null || obj[keys[i]] === undefined) {
				return i;
			}
		}
	} else if (obj[keys] === null || obj[keys] === undefined) {
		return 0;
	}
	return -1;
} 

module.exports = checkKeysNotExists;