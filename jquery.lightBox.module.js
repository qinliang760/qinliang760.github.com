/*!
 * Base On jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 * Libs:Jay lightBox
 * Copyright 2012, QinLiang
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: 2012.10.22
 */

(function($) {
	var lightBox = {
		defaults: {
			model: false,
			hasClose: true
		}
	};
	function LightBox(root, defaults) {
		var self = this,
		boxObj = root;

		$.extend(this, {
			setModel: function() {
				var modelHtml = "<div id='boxModel'></div>",
				wW = $(window).width(),
				bH = $("body").height();
				$("body").append(modelHtml);
				var boxModel = $("#boxModel");
				boxModel.width(wW).height(bH).css("opacity", 0.5).show();
			},
			setPosition: function() {
				var wW = $(window).width(),
				wH = $(window).height(),
				wScrollTop = $(window).scrollTop(),
				bW = boxObj.width(),
				bH = boxObj.height(),
				bLeft = (wW - bW) / 2,
				bTop = (wH - bH) / 2 + wScrollTop;

				boxObj.css({
					"left": bLeft + "px",
					"top": bTop + "px"
				}).show();

			},
			setClose: function() {
				var closeObj = "<a class='closeBtn' href='#'>关闭</a>";
				boxObj.append(closeObj);
				boxObj.find(".closeBtn").live("click", function() {
					boxObj.hide();
					if (defaults.model) {
						$("#boxModel").remove();
					}
					return false;
				})
			},
			init: function() {
				this.setPosition();
				defaults.model ? self.setModel() : "";
				defaults.hasClose ? self.setClose() : "";
			}
		})
		self.init();

	}

	$.fn.lightBox = function(defaults) {
		defaults = $.extend({},
		lightBox.defaults, defaults);
		return this.each(function() {
			el = new LightBox($(this), defaults);
		})

	}
	$.sc2 = {
		lightBox: function(obj, defaults) {
			new LightBox(obj, defaults);
		}
	}
	/*
	var defaults = $.extend({},
	lightBox.defaults, defaults);
	$.lightBox = function(obj, defaults) {
		$("#popBox").append(obj);
		new LightBox(obj, defaults);
	}*/
})(jQuery);

