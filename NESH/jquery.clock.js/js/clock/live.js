var Live = {

	init: function() {
		this.videoShow();

	},
	videoShow: function() {
		var startTime=[2014, 01, 01, 00, 00, 00],
			endTime=[2014, 01, 01, 01, 00, 00],
			wrap=document.getElementById("timerShow");

		var clock = new Clock(wrap, startTime, endTime);

		if (typeof clock.hour == "undefined") {
			return;
		}
		var timer = setInterval(function() {

			var day = clock.tian.val,
				hour = clock.hour.val,
				munite = clock.munite.val,
				second = clock.second.val;

			if (day == 00 && hour == 00 && munite == 00 && second == 00) {
				clock.pause();
				clearInterval(timer);

			}
		}, 1000);
	}


}