define(["jquery", "leaflet", "lodash"], function($, leaflet, _){
	"use strict";

	return function(map){
		var that = {},
			my = {};

		my.init = function(leafletMap){
			that.map = leafletMap.map;
			my.markers = {
				"legendary-event": {name: "Legendary Event"},
				"mercenary-camp": {name: "Mercenary Camp"},
				"tower": {name: "Tower"}
			};
			my.currentMarker = '';
			my.setupEditor();
			my.markersToAdd = {};
			my.markerId = 1;
		};

		my.setupEditor = function(){
			$("<div class='marker-legend' style='position:absolute;top:100px;left:50px;z-index:10;'></div>").appendTo(".container");
			$.each(my.markers, function(i, m){
				$("<div class='marker-type' data-type='" + i + "'>" + m.name + "</div>").appendTo(".marker-legend");
			});
			$(".marker-type").on("click", function(){
				my.setCurrentMarker($(this).data("type"));
				that.map.on("click", function(e){
					my.addMarker(e);
				});
			})
			$(".container").on("click", ".delete", function(){
				var $self = $(this);
				my.deleteMarker($self.data("id"));
			});
		};

		my.addMarker = function(e) {
			var lat = e.latlng.lat;
			var lng = e.latlng.lng;
			var name = _.escape(prompt("Name this marker"));
			var marker = leaflet.marker([e.latlng.lat, e.latlng.lng]).addTo(that.map);
			marker.bindPopup("<div class='title' data-type='" + my.currentMarker + "' data-lat='" + lat + "' data-lng='" + lng + "'>" + name + " (" +  my.markers[my.currentMarker].name + ")</div><div class='delete' data-id='" + my.markerId + "'>Delete</div>");
			my.markersToAdd[my.markerId] = {marker: marker, name: name};
			my.markerId = my.markerId + 1;
			console.log(my.markersToAdd);
		};

		my.deleteMarker = function(id){
			// Remove it from the map
			that.map.removeLayer(my.markersToAdd[id].marker);
			// Delete it from the markers that we wanted to add
			delete my.markersToAdd[id];
			console.log(my.markersToAdd);
		};

		my.setCurrentMarker = function(marker){
			my.currentMarker = marker;
		};

		my.init(map);

		return that;
	};
});
