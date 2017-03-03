"use strict";

let CheckKeysNaN = (obj, keys) => {
	if (Array.isArray(keys)) {
		for (let i = 0; i < keys.length; i++) {
			if (isNaN(obj[keys[i]])) {
				return i;
			}
		}
	} else if (isNaN(obj[keys])) {
		return 0;
	}
	return -1;
} 

module.exports = CheckKeysNaN;