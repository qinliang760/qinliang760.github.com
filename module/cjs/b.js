var touch = require("touch");


var getToken = function() {
	if (touch.isIOS()) {
		alert("yes i am a ios");
	} else {
		alert("i am a pc");
	}
}

module.exports = getToken;