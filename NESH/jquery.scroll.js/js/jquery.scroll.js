/*!
 * Base On jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 * Libs:Jay scroll
 * Copyright 2012, QinLiang
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: 2012.10.22
 */

(function($) {
	var scroll = {
		defaults: {
			dateShow:false,
			panels:".ui-scroll" 
		}
	};

	function Scroll(defaults) {
		var self = this,
			panels = $(defaults.panels),
			dateShow=defaults.dateShow;


		$.extend(this, {

			setup: function() {


			},
			init: function() {
				this.setup();

			}
		});
		self.init();

	}

	$.sc2 = {
		scroll: function(defaults) {
			defaults = $.extend({},
			scroll.defaults, defaults);
			new Scroll(defaults);
		}
	};
})(jQuery);