var Live = {

	init: function() {
		this.videoShow();
		this.clockShow();
		//this.videoListShow();
	},
	videoShow: function() {
		var videoTab = $(".videoBox li");
		Live.isShow=false;
		videoTab.click(function() {
			var t = $(this);
			var index = videoTab.index(t);
			videoTab.children().removeClass("active").eq(index).addClass("active");
			Live.videoInsert(index);
			return false;
		})
	},
	videoInsert: function(index) {

		if (!Live.isShow) return;
		alert("有直播");
		var videoWrap = $("#videoShow");
		var vidoeVar = {
			width: 636,
			height: 428,
			url: ""
		}

		switch (index) {
			case 0:
				vidoeVar.url = "http://yy.com/s/90163/1198442496/mini.swf";
				break;
			case 1:
				vidoeVar.url = "http://cgi.v.cc.163.com/redirect/swf/12383200";
				break;
			case 2:
				vidoeVar.url = "http://yy.com/s/90163/1198442496/mini.swf";
				break;
		}
		var videoHtml = '<embed autostart="false" allowfullscreen="true" allowscriptaccess="always" height="' + vidoeVar.height + '" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" src="' + vidoeVar.url + '" type="application/x-shockwave-flash" width="' + vidoeVar.width + '"></embed>';
		videoWrap.html(videoHtml);
	},
	clockInitShow: function(startTime, endTime) {
		var s = startTime,
			e = endTime;
		var current = new Date().getTime();
		var currentDay = new Date(s[0], s[1], s[2], 00, 00, 00).getTime();
		var st = new Date(s[0], s[1], s[2], s[3], s[4], s[5]).getTime();
		var et = new Date(e[0], e[1], e[2], e[3], e[4], e[5]).getTime();
		if (current >= st && current <= et) {
			Live.isShow=true;
			Live.videoInsert(0);
		}

	},
	clockShow: function(index) {

		var startTime = [2013, 03, 10, 10, 35, 00]; //月份值减1
		var endTime = [2013, 03, 10, 10, 45, 00];
		this.clockInitShow(startTime, endTime);
		var wrap = document.getElementById("timerShow");
		var clock = new Clock(wrap, startTime, endTime);
		if (typeof clock.hour == "undefined") {
			return;
		}


		var timer = setInterval(function() {

			var hour = clock.hour.val,
				munite = clock.munite.val,
				second = clock.second.val;
			console.log(second);
			if (hour == 00 && munite == 00 && second == 00) {
				clock.pause();
				$(wrap).find(".clock").remove();
				clearInterval(timer);
				Live.isShow=true;
				Live.videoInsert(0);

			}
		}, 1000);
	},
	videoListShow: function() {
		var currentH = parseInt($(".videoList dl").outerHeight());
		if (currentH > 396) {
			$(".bar").show();
			$(".videoList").tinyscrollbar({
				scrollbarSelector: '.bar',
				thumbSelector: ".trackBar",
				viewportSelector: '.listShow',
				overviewSelector: ".listShow dl"
			});
		}
	}

}