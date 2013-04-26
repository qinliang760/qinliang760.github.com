/*!
/*!
 * Base On jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 * Libs:Jay timeline
 * Copyright 2012, QinLiang
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: 2013.2.21
 */

(function($) {
	var timeline = {
		defaults: {
			showPic: 4, //默认显示时间点
			btnActive: false, //按钮是否一直处于激活状态
			auto: false,
			prevClass: "prev",
			nextClass: "next",
			imgWrapId: "imgList"
		}
	};

	function Timeline(root, defaults) {
		var self = this,
			boxObj = root,
			imgWrap = $("#" + defaults.imgWrapId),
			prevBtn = boxObj.find("." + defaults.prevClass),
			nextBtn = boxObj.find("." + defaults.nextClass),
			animate = false,
			timer, index;

		$.extend(this, {
			getScroll: function() {
				var imgList = imgWrap.children(); //图片数组对象


			},
			scrollAnimate: function(btn, range) {
				if (animate) return;
				animate = true;


				setTimeout(function() {
					imgWrap.animate({
						"margin-left": scrollType + range
					}, 500, function() {
						animate = false;
					});
				}, 100);
			},
			scrollRun: function() {
				prevBtn.click(function() {
					var options = self.getScroll();
					if (options.prevRun) {
						self.scrollAnimate("prev", options.prevScrollRange);
					}
					return false;
				})
				nextBtn.click(function() {
					var options = self.getScroll();
					if (options.nextRun) {
						self.scrollAnimate("next", options.nextScrollRange);
					}
					return false;
				})
			},
			auto: function() {
				timer = setInterval(function() {
					var options = self.getScroll();
					self.scrollAnimate("next", options.nextScrollRange)
				}, 3000);
			},
			stopAuto: function() {
				clearInterval(timer);
			},
			init: function() {
				if (defaults.auto) {
					self.auto()
					prevBtn.hover(function() {
						self.stopAuto();
					},

					function() {
						self.auto();
					})
					nextBtn.hover(function() {
						self.stopAuto();
					},

					function() {
						self.auto();
					})
					imgWrap.hover(function() {
						self.stopAuto();
					},

					function() {
						self.auto();
					})

				}
				this.scrollRun();
			}
		})
		self.init();

	}

	$.fn.timeline = function(defaults) {
		defaults = $.extend({},
		timeline.defaults, defaults);
		return this.each(function() {
			el = new Timeline($(this), defaults);
		})

	}

	$.sc2 = {
		timeline: function(defaults) {
			defaults = $.extend({},
			timeline.defaults, defaults);
			new Timeline(defaults);

		}

	}

})(jQuery);