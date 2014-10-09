define([], function() {
	return function(inject) {
		var my = {
			channels: {}
		};

		var that;
		if (inject != null) {
			that = inject;
		} else {
			that = {};
		}

		that.on = function(channel, fn) {
			if (!my.channels[channel]) {
				my.channels[channel] = [];
			}
			my.channels[channel].push({context: this, callback: fn});
			return that;
		};

		that.trigger = function(channel) {
			if (!my.channels[channel]) {
				return;
			}

			var args = Array.prototype.slice.call(arguments, 1);
			for (var i = 0; i < my.channels[channel].length; i += 1) {
				var sub = my.channels[channel][i];
				sub.callback.apply(sub.context, args);
			}
			return that;
		};

		return that;
	}
});
