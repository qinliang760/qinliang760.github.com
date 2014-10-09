define(["lodash", "leaflet"], function(_, leaflet){
	"use strict";
	return function(config, map){
		var that = {};
		var my = {};
		var DEFAULT_TILESET = "main";

		my.init = function(config, map){
			my.tileLayers = {};
			my.leafletMap = map.getLeafletMap();
			my.currentTileLayerSlug = config.initialTileset || DEFAULT_TILESET;
			_.forEach(config.tilesets, function(t, i) {
				var options = {
					id: t.slug,
					minZoom: config.minZoom,
					maxZoom: config.maxZoom,
					noWrap: true,
					tms: true
				};
				var layer = leaflet.tileLayer(config.cdnPath + t.tileset, options);
				my.tileLayers[t.slug] = layer;
			});

			// Add the preferred tileset to the map, or load the default if preferred is not found.
			if (my.tileLayers[my.currentTileLayerSlug] != null) {
				my.tileLayers[my.currentTileLayerSlug].addTo(my.leafletMap);
			} else {
				my.tileLayers[DEFAULT_TILESET].addTo(my.leafletMap);
			}
		};

		my.init(config, map);

		that.getTileLayer = function(slug) {
			return my.tileLayers[slug];
		};

		that.changeTileLayer = function(slug) {
			if (slug != my.currentTileLayerSlug) {
				my.leafletMap.closePopup();

				if(my.tileLayers[my.currentTileLayerSlug] == null) {
					my.currentTileLayerSlug = DEFAULT_TILESET;
				}

				my.tileLayers[my.currentTileLayerSlug].setOpacity(0);
				if (that.setCurrentTileLayerSlug(slug)) {
					if (!my.leafletMap.hasLayer(my.tileLayers[my.currentTileLayerSlug])) {
						my.tileLayers[my.currentTileLayerSlug].addTo(my.leafletMap);
					}
					my.tileLayers[my.currentTileLayerSlug].setOpacity(1);
				}
				my.leafletMap.fireEvent("baselayerchange", {
					layer: slug,
					target: my.leafletMap
				});
			}
		};

		that.setCurrentTileLayerSlug = function(slug) {
			if (my.tileLayers[slug]) {
				my.currentTileLayerSlug = slug;
				return true;
			}
			return false;
		};

		that.getCurrentTileLayerSlug = function() {
			return my.currentTileLayerSlug;
		};

		that.getCurrentTileLayer = function() {
			return my.tileLayers[my.currentTileLayerSlug];
		};

		that.getTileLayers = function() {
			return my.tileLayers;
		};

		that.getTileLayer = function(slug) {
			return my.tileLayers[slug];
		};

		return that;
	};
});
