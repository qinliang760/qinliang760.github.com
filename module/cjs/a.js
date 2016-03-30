var touch = {
	isIOS: function() {
		var rule = /(iPhone|iPad|iPod)/ig;
		return rule.test(navigator.userAgent);
	},
	isMobile: function() {
		var rule = /(android|iPhone|iPad|iPod|mobile)/ig;
		return rule.test(navigator.userAgent);
	}
};
module.exports = touch;