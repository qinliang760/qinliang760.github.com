/*!
 * Base On jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 * Libs:Tooltip
 * Copyright 2011, Mediav
 */

(function($) {
	tooltip = {
		defaults: {
			tipWidth: 140
		}
	}

	function Tooltip(root, defaults) {
		var self = this,
		obj = root;
		$.extend(this, {
			setTip: function(leftV, topV) {

				$("#titleTip").css({
					"top": topV + "px",
					"left": leftV + "px"
				}).show("fast").stop(true, true);
			},
			appendTip: function() {

				obj.hover(function(e) {
					this.showTitle = this.title;
					this.title = "";
					var tooltip = "<div id='titleTip' style='width:" + defaults.tipWidth + "px'>" + this.showTitle + "</div>";
					$("body").append(tooltip);
					var ex = e.pageX,
					ey = e.pageY,
					tooltipW = $("#titleTip").width(),
					tooltipH = $("#titleTip").height(),
					wW = $(window).width(),
					wH = $(window).height(),
					leftV,
					topV;
					if (ex + tooltipW > wW) {
						leftV = ex - (ex + tooltipW - wW);
					} else {
						leftV = ex;
					}
					if (ey + tooltipH > wH) {
						topV = ey - (ey + tooltipH - wH);
					} else {
						topV = ey;
					}
					self.setTip(leftV, topV);
				},
				function() {
					$("#titleTip").remove();
				})
			}

		})
	}

	$.fn.tooltip = function(defaults) {
		defaults = $.extend({},
		tooltip.defaults, defaults);
		return this.each(function() {
			new Tooltip($(this), defaults);
		})
	}

})(jQuery);

