/*!
 * Base On jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 * Libs:Jay scrollTo
 * Copyright 2012, QinLiang
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: 2013.2.21
 */

(function($) {
	var scrollTo = {
		defaults: {
			imgWrap: "#ui-imgclone",
			bigPanel: ".ui-img-big",
			smallPanel: ".ui-img-small"
		}
	};

	function ScrollTo(defaults) {
		var self = this;

		$.extend(this, {

			init: function() {

				this.imgInit();
				this.scrollRun();
			}
		})
		self.init();

	}

	$.sc2=$.sc2 || {};
	$.sc2.scrollTo =function(defaults) {
			defaults = $.extend({},
			scrollTo.defaults, defaults);
			new ScrollTo(defaults);
	}


})(jQuery);