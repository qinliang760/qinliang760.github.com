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
			trigger: "#ui-anchor a",
			triggerIndex: 0,
			speed: 500,
			animateType: "easeInOutExpo",
			prev: ".ui-anchor-prev",
			next: ".ui-anchor-next",
			scrollActive:false
		}
	};

	function ScrollTo(defaults) {
		var self = this,
			trigger = $(defaults.trigger),
			speed = defaults.speed,
			animateType = defaults.animateType,
			prev = $(defaults.prev),
			next = $(defaults.next);

		$.extend(this, {
			triggerInit: function() {
				trigger.each(function(k, v) {
					$(v).data("index", k);
				})
				var triggerIndex = defaults.triggerIndex;
				this.triggerActive(triggerIndex);
				this.panelScroll(triggerIndex);
			},
			triggerActive: function(index) {
				var current = trigger.eq(index);
				trigger.removeClass("active");
				current.addClass("active");
			},
			getIndex: function() {
				return trigger.filter(".active").data("index");
			},
			triggerEvent: function() {

				trigger.click(function(e) {
					e.preventDefault();
					var t = $(this),
						index = t.data("index");
					self.triggerActive(index);
					self.panelScroll(index);

				})

				prev.click(function() {
					var l = trigger.length;
					var index = self.getIndex();

					if (index == 0) {
						//index = l;
						return;
					}
					index--;
					self.triggerActive(index);
					self.panelScroll(index);
				})
				next.click(function() {
					var l = trigger.length;
					var index = self.getIndex();

					index++;
					if (index == l) {
						//index=0;
						return;
					}

					self.triggerActive(index);
					self.panelScroll(index);
				})
			},
			panelScroll: function(index) {
				var current = trigger.eq(index),
					currentAnchor = current.attr("href"),
					oft = $(currentAnchor).offset().top;
				$("body,html").stop(true, false).animate({
					scrollTop: oft + "px"
				}, speed, animateType);
			},
			wScroll: function() {
				var w = $(window),
					wh = w.height(),
					oftArr = [];

				/*trigger.each(function(k, v) {
					var anchor = $(v).attr("href"),
						oft = $(anchor).offset().top;
					oftArr.push(oft);

				})

				w.scroll(function() {
					var st = w.scrollTop(); //窗口距滚动条顶部依稀
					//console.log($(document).scrollTop());滚动条距滚动条顶部
					for (var i = 0; i < oftArr.length; i++) {
						if (i == oftArr.length - 1) {
							if (st > oftArr[i]) {
								self.triggerActive(i);
							}
							break;
						}
						if (st >= oftArr[i] && st <= oftArr[i + 1]) {
							self.triggerActive(i);

						}
					}

				})*/
				$("#ui-anchor-show > div").each(function(k,v){

					var sectionWatcher = scrollMonitor.beget(v);
					var sectionMinusBottomHeadline = scrollMonitor.create(v);

					sectionMinusBottomHeadline.stateChange( function() {
						
						if (!sectionWatcher.isInViewport) {
						 	trigger.eq(k).attr("class","");
						} else if (sectionMinusBottomHeadline.isInViewport && sectionMinusBottomHeadline.isAboveViewport) {
							//console.log(k);
							//trigger.eq(k).className = 'active';
							trigger.eq(k).attr("class","active");
						} else if (sectionMinusBottomHeadline.isAboveViewport) {
							//v.className = 'bottom';
							trigger.eq(k).attr("class","");
						} else {
						 	//v.className = '';
						 	trigger.eq(k).attr("class","");
						}
						
					} )					
				})
			},
			init: function() {
				this.triggerInit();
				this.triggerEvent();
				if(defaults.scrollActive){
					this.wScroll();
				}
				
			}
		})
		self.init();

	}

	$.sc2 = $.sc2 || {};
	$.sc2.scrollTo = function(defaults) {
		defaults = $.extend({},
		scrollTo.defaults, defaults);
		new ScrollTo(defaults);
	}


})(jQuery);