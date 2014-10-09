define([], function() {
	return function(options) {
		var that = {},
			my = {};

		my.init = function(options) {
			my.map = options.map;
			my.useHistory = options.useHistory || false;
			my.title = document.title || "";
			my.layer = options.layer || "main";
			my.openPopup = options.openPopup;

			that.history = window.history || {
				replaceState: function() {}
			};
			my.hookEvents(my.map);
		};

		my.hookEvents = function(map) {
			if (my.useHistory) {
				map.on("moveend zoomend popupopen popupclose baselayerchange", function(e) {
					// If there is a tilelayer property on the event, change the internal tilelayer variable
					if (e.layer != null) {
						my.layer = e.layer;
					}

					var center = e.target.getCenter();
					var options = {
						lat: center.lat,
						lng: center.lng,
						zoom: e.target.getZoom(),
						layer: my.layer
					};

					if (e.type == "popupopen" && e.popup != null) {
						my.openPopup = e.popup._source.slug;
					}

					if (e.type == "popupclose") {
						my.openPopup = null;
					}

					if (my.openPopup) {
						options.marker = my.openPopup;
					}

					that.updateRoute(options);
				});
			}
		};

		that.updateRoute = function(options) {//debugger;
			that.history.replaceState({}, my.title, my.formatRoute(options.lat, options.lng, options.zoom, options.layer, options.marker));
		};

		my.formatRoute = function(lat, lng, zoom, tileset, marker) {
			var outString = "#" + lat.toFixed(4) + "," + lng.toFixed(4) + "," + zoom + "z," + tileset;
			if (marker != null) {
				outString += "?m=" + marker;
			}
			return outString;
		};

		my.init(options);
		return that;
	};
});
