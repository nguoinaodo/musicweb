const deleteJSON = function(url, data, callback) {
    let request = new XMLHttpRequest();
    request.open('DELETE', url, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onload = function() {
    	if (request.readyState === 4) {
        	try {
                const JSONRes = JSON.parse(request.responseText);
                return callback(null, request.status, JSONRes);
            } catch (err) {
                return callback(err);
            }
    	}
    }
    request.onerror = function(err) {
        return callback(err);
    }
    request.send(JSON.stringify(data));
}

export default deleteJSON;
