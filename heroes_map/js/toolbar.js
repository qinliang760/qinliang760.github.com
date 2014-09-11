define(["jquery", "lodash", "mediator"], function($, _, Mediator) {
	return function(options) {
		var my = {},
			that = Mediator();
		var ACTIVE_CLASS = "is-active";

		my.init = function(options) {
			my.intro = options.intro;
			my.map = options.map;
			my.$el = options.$el;
			my.touchDevice = options.touch || false;

			// Cache UI elements
			my.$filtersBtn = my.$el.find(".toolbar__filters__menu");
			my.$currentMap = my.$el.find(".toolbar__map-current")
			my.$mapSelectBtn = my.$el.find(".toolbar__map-select");
			my.$filterOptions = my.$el.find(".toolbar__filters__option");
			my.$tileSelectBtn = my.$el.find(".toolbar__tile-control__button");
			my.$zoomIn = options.$zoomBtnIn;
			my.$zoomOut = options.$zoomBtnOut;

			my.$filterOptions.on(my.getInteractionEvent(), function(e) {
				that.trigger("filterChange", e);
			});

			my.$tileSelectBtn.on(my.getInteractionEvent(), function(e) {
				that.trigger("tileChange", e);
			});

			my.menus = [
				my.$filtersBtn,
				my.$currentMap,
				my.$mapSelectBtn
			];


			// Hook up the mobile filter button
			my.$el.find(".toolbar__filters__btn").on(my.getInteractionEvent(), _.throttle(function(e) {
				e.preventDefault();
				that.clearMenus(my.$filtersBtn);
				my.$filtersBtn.toggleClass(ACTIVE_CLASS);
			}, 200));

			// Hook up the map selector
			my.$el.find(".toolbar__map-current").on(my.getInteractionEvent(), _.throttle(function(e) {
				e.preventDefault();
				that.clearMenus(my.$mapSelectBtn);
				my.$mapSelectBtn.toggleClass(ACTIVE_CLASS);
			}, 200));

			// Hook up the intro button
			my.$el.find(".toolbar__info").on("click", function(e) {
				that.clearMenus();
				that.trigger("introClick", e);
			});

			my.$mapSelectBtn.on("click", function(e) {
				that.clearMenus();
			});

			my.$zoomIn.on(my.getInteractionEvent(), function(e) {
				that.trigger("zoomInClick", e);
			});

			my.$zoomOut.on(my.getInteractionEvent(), function(e) {
				that.trigger("zoomOutClick", e);
			});
		};

		my.getInteractionEvent = function() {
			if (my.touchDevice) {
				return "touchstart";
			}
			return "click";
		};

		that.clearMenus = function(except) {
			for (var i = 0; i < my.menus.length; i += 1) {
				if (except == null || my.menus[i] !== except) {
					my.menus[i].removeClass(ACTIVE_CLASS);
				}
			}
		};

		my.init(options);
		return that;
	}
});
