/*!
 * Base On jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 * Libs:Jay fixed
 * Copyright 2012, QinLiang
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: 2012.10.22
 
 
 */

(function($) {
	var fixed = {
		defaults: {
			autoWin: true,
			//自适应屏幕
			autoDir: "right",
			easing: false,
			//是否要动画过渡
			autoHide: true //到可视范围隐藏
		}
	}
	function Fixed(root, defaults) {
		var self = this,
		obj = root,
		dir = defaults.autoDir,
		initVal=obj.css(dir);

		$.extend(this, {
			startFixed: function() {
				var top = parseInt(obj.css("top"));

				$(window).scroll(function() {
					var topScroll = parseInt($(document).scrollTop());
					if (defaults.autoHide) {

						var objTop = parseInt(obj.offset().top);
						var winH = $(window).height();
						if (objTop < winH) {
							obj.hide();
						} else {
							obj.show();
						}
					}
					if (defaults.easing) {
						setTimeout(function() {
							obj.stop(true, true).animate({
								"top": top + topScroll
							},
							500)
						},
						100);
					} else {
						obj.css("top", top + topScroll + "px");
					}

				})

				$(window).resize(function() {
					defaults.autoWin ? self.autoWin() : "";
				})
			},
			autoWin: function() {
				var winW = $(window).width();
				var objW = obj.width();
				var objPW = obj.parent().width();
				var winLeave = (winW - objPW) / 2;
					
				if (objW > winLeave) {
					var space = - (objW - (objW - winLeave));
					obj.css(dir, space + "px");
				}else{
					obj.css(dir,initVal);	
				}
			},
			init: function() {
				self.startFixed();
				defaults.autoWin ? self.autoWin() : "";
			}
		})
		self.init();
	}

	$.fn.fixed = function(defaults) {
		defaults = $.extend({},
		fixed.defaults, defaults);
		return this.each(function() {
			el = new Fixed($(this), defaults);
		})

	}
})(jQuery);

