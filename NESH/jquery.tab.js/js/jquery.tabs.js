/*!
 * Base On jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 * Libs:Jay tabs
 * Copyright 2012, QinLiang
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: 2012.10.22
 */

(function($) {
	var tabs = {
		defaults: {
			tabs: "",
			panels: "",
			effect: "normal", //
			event:"click",
			triggerClass:"ui-tab-item-current"
		}
	};

	function Tabs(defaults) {
		var self = this,
			tabs = $(defaults.tabs),
			panels = $(defaults.panels),
			effect = defaults.effect,
			triggerClass=defaults.triggerClass,
			event=defaults.event;

		$.extend(this, {
			effect: function(effect, index) {
				switch (effect) {
					case "normal":
						panels.eq(index).show().siblings().hide();
						break;
					case "fade":
						panels.eq(index).siblings().hide().stop(true,true).end().fadeIn();
						break;
				}

			},
			setup: function() {
				tabs.bind(event,function() {
					var t=$(this);
					var index = tabs.index(t);
					t.addClass(triggerClass).siblings().removeClass(triggerClass);
					self.effect(effect, index);
				});

			},
			init: function() {
				this.setup();

			}
		});
		self.init();

	}

	$.fn.tabs = function(defaults) {
		defaults = $.extend({},
		tabs.defaults, defaults);
		return this.each(function() {
			el = new Tabs($(this), defaults);
		});

	};
	$.sc2 = {
		tabs: function(defaults) {
			defaults = $.extend({},
			tabs.defaults, defaults);
			new Tabs(defaults);
		}
	};
})(jQuery);