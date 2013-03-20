/*!
 * Base On jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 * Libs:Jay accordion
 * Copyright 2012, QinLiang
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: 2012.10.22
 */

(function($) {
	var accordion = {
		defaults: {
			trigger: ".ui-accordion-trigger",
			panels: ".ui-accordion-panel",
			effect: "slide", //
			event:"click",
			triggerClass:"ui-accordion-trigger-current"
		}
	};

	function Accordion(defaults) {
		var self = this,
			trigger = $(defaults.trigger),
			panels = $(defaults.panels),
			effect = defaults.effect,
			triggerClass=defaults.triggerClass,
			event=defaults.event;

		$.extend(this, {
			effect: function(effect, index) {
				switch (effect) {
					case "normal":
						panels.eq(index).show().siblings(defaults.panels).hide();
						break;
					case "fade":
						panels.eq(index).siblings(defaults.panels).hide().stop(true,true).end().fadeIn();
						break;
					case"slide":
						panels.eq(index).siblings(defaults.panels).hide().stop(true,true).end().slideDown();
				}

			},
			setup: function() {
				trigger.bind(event,function() {
					var t=$(this);
					var index=trigger.index(t);
					t.addClass(triggerClass).siblings(defaults.trigger).removeClass(triggerClass);
					self.effect(effect, index);
				});

			},
			init: function() {
				this.setup();

			}
		});
		self.init();

	}

	$.fn.accordion = function(defaults) {
		defaults = $.extend({},
		accordion.defaults, defaults);
		return this.each(function() {
			el = new Accordion($(this), defaults);
		});

	};
	$.sc2 = {
		accordion: function(defaults) {
			defaults = $.extend({},
			accordion.defaults, defaults);
			new Accordion(defaults);
		}
	};
})(jQuery);