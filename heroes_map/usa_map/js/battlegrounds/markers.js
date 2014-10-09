define([
	"jquery",
	"leaflet",
	"lodash"
], function(
	$,
	leaflet,
	lodash
) {
	return function(map, markers) {
		var that = {};
		var my = {};

		my.init = function(map, markers) {
			my.compiledTemplates = my.compileTemplates();
			my.map = map;
			my.leafletMap = map.getLeafletMap();
			my.markerGroup = map.getMarkerGroup();
			my.markerSelector = ".battlegrounds__marker-icon";
			my.popupSelector = ".leaflet-popup-pane";
			my.markers = {};

			my.filters = {};
			my.currentTileLayerSlug = map.getCurrentTileLayerSlug();
			if (markers != null) {
				my.createMarkers(markers);
			}
		};

		my.compileTemplates = function() {
			var popHtml=['<div class="content-container clearfix">',
	'<div class="modal-container active" data-type="video" data-src="RDR6aipAT5k" data-action="YouTube RDR6aipAT5k" data-label="blackhearts bay - skeletons">',
		'<img class="image-thumbnail" src="http://us.battle.net/heroes/static/images/battlegrounds/blackhearts-bay/video-thumbnails/mercskeletonpirates.jpg"/>',
		'<div class="battleground-video-btn"></div>',
	'</div>',
	'<div class="text-content">',
		'<h4>Skeletons</h4>',
		'<p> Looks like some of Blackheart’s crew have taken some unscheduled shore leave. Send them howling back to Davy Jones’ locker and collect their doubloons. </p>',
	'</div>',
'</div>'];


			return {
				//"text-video": _.template(videoMarkerHtml)
				"text-video": popHtml.join("")
			};
		};

		my.getTemplate = function(slug) {
			return my.compiledTemplates[slug];
		}

		my.createMarkers = function(markers) {
			var markerMinimumZoom = 0;
			// Create the markers
			var mapSlug = my.formatAnalyticsName(map.options().slug);

			_.each(markers, function(m, i){
				if (typeof my.filters[m.typeSlug] === "undefined") {
					my.filters[m.typeSlug] = true;
				};

				var zoomLevel = (m.minZoomLevel) ? m.minZoomLevel : markerMinimumZoom;

				var marker = leaflet.marker(leaflet.latLng(m.position.lat, m.position.lng), {icon: markerIcon});
				var markerIcon = leaflet.divIcon({ className: "battlegrounds__marker-icon " + m.markerId + " small type_" + m.typeSlug });
				marker.setIcon(markerIcon);
				var customClass = "battleground__popup";
				var hasParagraph = m.content.body && m.content.body.length > 0;
				var hasImage = m.content.image && m.content.image.length > 0;
				var hasVideo = m.content.video && m.content.video.length > 0;

				if (hasParagraph && (hasImage || hasVideo)) {
					customClass = customClass + " content-description";
				}

				//modify by jay
				//customClass="battleground__popup content-description leaflet-zoom-animated";
				

				// Bind popup content
				//debugger;
				
				//debugger;
				marker.bindPopup(my.getTemplate(m.templateSlug),({
					title: m.content.title,
					body: m.content.body,
					image: m.content.image || "",
					video: m.content.video || "",
					mapSlug: mapSlug,
					slug: my.formatAnalyticsName(m.markerId),
					className: customClass,
				}), {className: customClass, autoPan: false});

				marker.slug = m.markerId;

				var markerObj = {
					id: m.markerId,
					marker: marker,
					typeSlug: m.typeSlug,
					tileset: m.tilesetSlug,
					minZoomLevel: zoomLevel
				};

				my.markerGroup.addLayer(marker);
				my.markers[m.markerId] = markerObj;
			});
		};

		that.getFilters = function() {
			return my.filters;
		};

		that.filterMarkers = function(tile, types, zoom) {
			var tile = tile || my.map.getCurrentTileLayerSlug(); // Default to main tileset
			var types = types || my.filters;
			var zoom = zoom || my.leafletMap.getZoom(); // Default to current zoom level
			_.forEach(my.markers, function(m, i) {
				if ( tile == m.tileset && types[m.typeSlug] && zoom >= m.minZoomLevel ) {
					$("." + m.id).addClass("is-active");
				} else {
					$("." + m.id).removeClass("is-active");
				}
			});
			that.resizeMarkers();
		};

		that.resizeMarkers = function() {
			// Resize markers to larger size at zoom level of 4 or more
			if (my.leafletMap.getZoom() <= 4 ) {
				$(my.markerSelector).not(".small").addClass("small");
				$(my.popupSelector).not(".small").addClass("small");
			} else {
				$(my.markerSelector + ".small").removeClass("small");
				$(my.popupSelector + ".small").removeClass("small");
			}
		};

		that.getMarker = function(slug) {
			if (my.markers[slug] == null) {
				return null;
			}
			return my.markers[slug].marker;
		}

		my.formatAnalyticsName = function(str) {
			return str.replace(/-\d$/g, "").replace(/-/g, " ");
		};

		that.getMarkers = function() {
			return my.markers;
		};

		my.init(map, markers);

		my.leafletMap.on('zoomend', function(){
			that.resizeMarkers();
		});

		return that;
	}
});
