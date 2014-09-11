require.config({
	baseUrl: "/heroes/static/heroes-js",
	paths: {
		jquery: "../vendor/jquery/jquery",
		lodash: "../vendor/lodash/dist/lodash",
		angular: "../vendor/angular/angular.min",
		"angular-animate": "../vendor/angular-animate/angular-animate.min",
		cms: "../cms-overlay/js/build/cms.min",
		cookie: "../local-common/js/common/cookie.min",
		"bnet-modal": "../js/toolkit/toolkit-modal",
		"common-app": "../local-common/js/common/app.min",
		"marketing": "../local-common/js/common/marketing.min",
		"toggle": "../local-common/js/common/toggle.min",
		"tickets": "../local-common/js/common/tickets.min",
		"common-core": "../local-common/js/common/core.min",
		"common-locale": "../local-common/js/common/locale.min",
		"deferred": "./deferred-calls",
		"char-select": "../local-common/js/common/char-select.min",
		"input": "../local-common/js/common/input.min",
		"leaflet": "../vendor/leaflet/dist/leaflet",
		text: '../vendor/requirejs-text/text'
	},
  	shim: {
  		angular: {
	      exports: "angular"
	    },
	    leaflet: {
	      exports: "L"
	    },
	    "angular-animate": ["angular"],
	    "common-app": ["jquery", "marketing", "toggle", "cookie", "core-shim"],
	    "common-core": ["jquery", "marketing", "cookie"],
	    "core-shim": ["jquery", "marketing", "cookie"],
	    cms: ["jquery", "cookie", "core-shim"],
	    "core-vars": ["common-core"],
	    "common-locale": ["core-shim"],
	    "deferred": ["core-shim", "common-core", "common-app", "cms", "core-vars"],
	    "tickets": ["core-shim", "common-core"],
	    "char-select": ["input"]
  	}
});
require(["jquery", "nav", "deferred", "core-shim"], function($, nav, deferred) {
	// Virtual pageview
	$(".js-beta-sign-up").on('click', function() {
		window._gaq.push(['_trackPageview', "/heroes/heroes-beta-sign-up-clicked-TRACKING"]);
	});
	window.Core.bindTrackEvent('.js-beta-sign-up', null, null, window.Core.locale);
	// Tracking for clicks on the nav
	window.Core.bindTrackEvent('.primary-nav-link', 'heroes - Main Nav');
	// Setup GA event for video views
	window.Core.bindTrackEvent('.js-video-click', 'heroes - Video Click');
	require(["common-app", "tickets", "common-locale"]);
	deferred();

	// Fix for missing login function
	Login.open = function() {
		window.location = "?login";
	};

	// Shortcut that Battle.net modules require
	if (!jQuery.Event.prototype.stop) {
		jQuery.Event.prototype.stop = function() {
			this.preventDefault();
			this.stopPropagation();
		};
	}
});
