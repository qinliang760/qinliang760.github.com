define(["jquery", "lodash", "leaflet"], function($, _, leaflet) {
	return function(map) {
		var that = {};
		var $body = $(".battleground");
		var $window = $(window);
		var $intro = $(".battleground-intro");
		var OPEN_CLASS = "intro-open";

		var setupMapIntro = function() {
			if ($body.hasClass(OPEN_CLASS)) {
				map.getLeafletMap().scrollWheelZoom.disable();
			}

			map.on("dragstart zoomstart click", function(e) {
				that.hideIntro();
			});

			$(".battleground-intro__explore").on("click", function(e) {
				e.preventDefault();
				that.hideIntro();
			});

			map.on("popupopen", function(e) {
				if ($body.hasClass(OPEN_CLASS)) {
					that.hideIntro();
				}
			});
		};

		that.hideIntro = function() {
			if ($body.hasClass(OPEN_CLASS)) {
				_.delay(function() {
					map.getLeafletMap().scrollWheelZoom.enable();
				}, 1000);
            	window.Core.trackEvent('heroes - Battlegrounds', 'Hide Intro', window.Core.locale + ' - ' + map.options().slug);
				$body.removeClass(OPEN_CLASS);
			}
		};

		that.toggleIntro = function() {
			$body.toggleClass(OPEN_CLASS);
			// If the intro is opening...
			if ($body.hasClass(OPEN_CLASS)) {
				map.getLeafletMap().scrollWheelZoom.disable();
                window.Core.trackEvent('heroes - Battlegrounds', 'Show Intro', window.Core.locale + ' - ' + map.options().slug);
			}
		};

		var buffer = 100;
		$window.on("scroll", _.throttle(function(e) {
			if ($body.hasClass(OPEN_CLASS)) {
				if ($window.scrollTop() > $intro.height() - buffer) {
					that.hideIntro();
				}
			}
		}, 10));

		setupMapIntro();
		return that;
	}
});
