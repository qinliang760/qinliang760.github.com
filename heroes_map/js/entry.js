require([
	"jquery",
	"battlegrounds/interactive-map",
	"battlegrounds/edit",
	"battlegrounds/intro",
	"battlegrounds/toolbar",
	"battlegrounds/router",
	"modal/main"
], function(
	$,
	Battleground,
	BattlegroundsEditor,
	BattlegroundIntro,
	BattlegroundToolbar,
	BattlegroundRouter,
	modal
) {

	var $editButton = $("#edit-button");
	var editor = {};
	var init = function(data) {
		if (window.initialLoc != null) {
			data.map.initialZoom = window.initialLoc.zoom;
			data.map.center.lat = window.initialLoc.lat;
			data.map.center.lng = window.initialLoc.lng;
			data.map.initialTileset = window.initialLoc.layer;

			if ( window.initialLoc.marker != null ) {
				data.openPopup = encodeURI(window.initialLoc.marker);
			}
		}

		// Set CDN path
		data.map.cdnPath = window.cdnPath;

		var map = Battleground(data);

		$(".marker-filter").on("click", function(e){
			map.filterMarkers($(this).data("type"));
		});

		modal.init({
			$modalElem: $("#modal"),
			modalTrigger: ".modal-container"
		});

		// Setup the intro
		var intro = BattlegroundIntro(map);
		var toolbar = BattlegroundToolbar({
			map: map,
			$el: $(".battleground-toolbar"),
			$zoomBtnIn: $(".zoom-control__in"),
			$zoomBtnOut: $(".zoom-control__out"),
			touch: window.Modernizr.touch
		});

		map.on("click", function() {
			toolbar.clearMenus();
		});

		map.on("popupclose popupopen", function(e) {
			$("body").toggleClass("battleground-popupopen");
		});

		// Bind analytics to popup when it opens.
		map.on("popupopen", function(e) {
			var $target = $(e.target._container).find(".modal-container");
			$target.on("click", function (e) {
				window.Core.trackEvent("heroes - Video Click", $target.attr("data-action"), $target.attr("data-label"));
			});
		});

		// Remove the intro if the user clicks on the triangle glow below "Explore the Battleground".
		$(".triangle-down").on("mousedown touchstart", function(e) {
			e.preventDefault();
			intro.toggleIntro();
		});

		// Show the intro when the "i" icon is clicked in the toolbar.
		toolbar.on("introClick", function(e) {
			e.preventDefault();
			toolbar.clearMenus();
			intro.toggleIntro();
		});

		// Update the markers when the filters change in the toolbar.
		toolbar.on("filterChange", function(e) {
			var $target = $(e.currentTarget);
			map.filterMarkers($target.data("option"));
			$target.toggleClass("is-active");
		});

		toolbar.on("tileChange", function(e) {
			var $target = $(e.currentTarget);
			map.changeLayers($target.data("option"));
			$(".toolbar__tile-control__button.is-active").removeClass("is-active");
			$target.toggleClass("is-active");
		});

		toolbar.on("zoomInClick", function(e) {
			map.zoom(1);
		});

		toolbar.on("zoomOutClick", function(e) {
			map.zoom(-1);
		});

		// Initialize the router
		var router = BattlegroundRouter({
			map: map,
			useHistory: Modernizr.history,
			openPopup: data.openPopup,
			layer: data.map.initialTileset
		});

		// Dirty Hack to get the nav and explore menu to work on older versions of webkit
		// 534.30 is the Webkit version used by stock Android browsers from 4.0.1 to 4.3
		var webkitVersion = /AppleWebKit\/([\d.]+)/.exec(navigator.userAgent);
		if (webkitVersion) {
			if (parseFloat(webkitVersion[1]) <= 534.30) {
				$(".interactive-map").addClass("old-webkit");
			}
		}
	};

	var staticUrl = window.Core.staticUrl != "" ? window.Core.staticUrl : "/heroes/static";

	init(window.battlegroundJson);
	require(['//connect.facebook.net/' + window.langCode + '/all.js#xfbml=1'], function(){});
});
