require.config({
	baseUrl: "js/",
	paths: {
		"leaflet": "leaflet",
		lodash: "lodash",
/*		jquery: "../vendor/jquery/jquery",
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
		text: '../vendor/requirejs-text/text'*/
	},
  	shim: {
	    leaflet: {
	      exports: "L"
	    }
  	}	
});

