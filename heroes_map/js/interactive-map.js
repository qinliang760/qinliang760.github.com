
define(["jquery", "lodash", "leaflet", "battlegrounds/tile-layers", "battlegrounds/markers"], function($, _, leaflet, TileLayers, Markers){
	'use strict';
	return function(options) {
		var that = {},
			my = {};

		that.getLeafletMap = function() {
			return my.map;
		};

		that.getMarkerGroup = function() {
			return my.markerGroup;
		};

		my.init = function(options) {
			my.map = leaflet.map("map", {
		 		attributionControl: false,
		 		zoomControl: false
			}).setView([options.map.center.lat, options.map.center.lng], options.map.initialZoom);

			// Create a Leaflet Feature Group to hold the markers
			my.markerGroup = leaflet.featureGroup();

			my.tileLayers = TileLayers(options.map, that);

			// Get the marker module and the layer groups
			my.markerModule = Markers(that, options.map.markers);
			my.filterTypes = my.markerModule.getFilters();

			// Add the Leaflet FeatureGroup to the map
			my.markerGroup.addTo(my.map);
			my.initializeMarkers();

			my.originalBounds = options.map.maxBounds;
			my.map.setMaxBounds(leaflet.latLngBounds(leaflet.latLng(options.map.maxBounds.northEast.lat, options.map.maxBounds.northEast.lng), leaflet.latLng(options.map.maxBounds.southWest.lat, options.map.maxBounds.southWest.lng)));

			my.map.on("popupopen popupclose", function(e) {

				if (e.type === "popupopen") {
					my.ignoreMaxBounds(true);

					// Delay centering a few ticks so the element has time to get an actual clientHeight value.
					_.delay(function() {
						var markerPoint = my.map.project(e.popup._latlng);
						markerPoint.y -= (e.popup._container.clientHeight + 128) / 2;
						my.map.panTo(my.map.unproject(markerPoint), {animate: true});
					}, 60);
				} else if (e.type === "popupclose") {
					my.ignoreMaxBounds(false);
				}
			});

			if (options.openPopup) {
				var activeMarker = my.markerModule.getMarker(options.openPopup);
				if(activeMarker != null) {
					$("body").addClass("battleground-popupopen");
					activeMarker.openPopup();
				}
			}
			// my.easterEggs = EasterEggs(options, that);
		};

		my.ignoreMaxBounds = function(ignoreBounds) {
			if (ignoreBounds) {
				my.map.setMaxBounds();
			} else {
				my.map.setMaxBounds(leaflet.latLngBounds(leaflet.latLng(my.originalBounds.northEast.lat, my.originalBounds.northEast.lng), leaflet.latLng(my.originalBounds.southWest.lat, my.originalBounds.southWest.lng)));
			}
		};

		my.initializeMarkers = function() {
			// We need to perform an initial filter because we allow linking to coordinate and zoom on the map
			my.markerModule.filterMarkers(my.tileLayers.getCurrentTileLayerSlug());
		};

        that.options = function() {
           return options;
        };

		that.on = function(type, handler) {
			my.map.on(type, handler);
		};

		that.zoom = function(delta) {
			if (delta > 0) {
				my.map.zoomIn(delta);
			} else {
				my.map.zoomOut(-delta);
			}
		};

		that.filterMarkers = function(type) {
			my.filterTypes[type] = (typeof type !== "undefined") ? !my.filterTypes[type] : my.filterTypes[type];
			var currentTile = my.tileLayers.getCurrentTileLayerSlug();
			my.markerModule.filterMarkers(currentTile, my.filterTypes);
		};

		that.changeLayers = function(tileSlug) {
			my.tileLayers.changeTileLayer(tileSlug);
			my.markerModule.filterMarkers();
		};

		that.getTileLayer = function(slug) {
			return my.tileLayers.getTileLayer(slug);
		};

		that.getCurrentTileLayerSlug = function() {
			return my.tileLayers.getCurrentTileLayerSlug();
		};

		my.init(options);

		my.map.on("zoomend", function(){
			that.filterMarkers();
		});

		return that;
	};
});
