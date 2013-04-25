var Live = {

	init: function() {
		this.clockShow();
		//this.videoListShow();
	},

	clockInitShow: function(startTime, endTime) {
		var s = startTime,
			e = endTime;
		var current = new Date().getTime();
		
		var st = new Date(s[0], s[1], s[2],00,00,00).getTime();
		var et = new Date(e[0], e[1], e[2],23,59,59).getTime();
		if (current >= st && current <= et) {
			return true;
		}else{
			return false;
		}

	},
	clockShow: function(index) {

		var startTime = [2013, 03, 24, 22, 00, 00]; //月份值减1
		var endTime = [2013, 03, 25, 22, 00, 00];
		if(!this.clockInitShow(startTime, endTime)){
			return;
		}
		var wrap = document.getElementById("timerShow");
		var clock = new Clock(wrap, startTime, endTime);
		if (typeof clock.hour == "undefined") {
			return;
		}


		var timer = setInterval(function() {

			var hour = clock.hour.val,
				munite = clock.munite.val,
				second = clock.second.val;

			if (hour == 00 && munite == 00 && second == 00) {
				clock.pause();
				$(wrap).find(".clock").remove();
				clearInterval(timer);

			}
		}, 1000);
	}

}