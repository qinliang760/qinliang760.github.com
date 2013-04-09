var Live = {

	init: function() {
		this.videoShow();
		this.clockShow();
		this.videoListShow();
	},
	videoShow: function() {
		var videoTab = $(".videoBox li");
		videoTab.click(function() {
			var t = $(this);
			var index = videoTab.index(t);
			videoTab.children().removeClass("active").eq(index).addClass("active");
			Live.videoInsert(index);
			return false;
		})
	},
	videoInsert: function(index) {

		if(window.clock!=null)return;
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
	clockShow: function(index) {
		var wrap = document.getElementById("timerShow");
		var d = new Date(),
			year = d.getFullYear(),
			month = d.getMonth() + 1,
			day = d.getDate(),
			h=d.getHours(),
			m=d.getMinutes(),
			s=d.getSeconds();			;
		var date = year + '.' + month + '.' + day;
		//if (date == "2013.4.9") return;
		if (typeof window.clock == "undefined") {
			window.clock = new Clock(wrap);
		}

		var timer = setInterval(function() {
			var hour = clock.hour.val,
				munite = clock.munite.val,
				second = clock.second.val;
				console.log(second);
			if (hour == 00 && munite == 07 && second == 40) {
				clock.pause();
				$(wrap).find(".clock").remove();			
				window.clock=null;
				clearInterval(timer);
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