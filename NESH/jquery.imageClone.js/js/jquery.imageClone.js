/*!
 * Base On jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 * Libs:Jay imageClone
 * Copyright 2012, QinLiang
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: 2013.2.21
 */

(function($) {
	var imageClone = {
		defaults: {
			showPic: 5, //默认可见图片数
			auto: true,
			imgWrap: "#ui-imgclone",
			bigPanel: ".ui-img-big",
			smallPanel: ".ui-img-small",
			afterClone: function() {}
		}
	};

	function ImageClone(defaults) {
		var self = this,
			imgWrap = $(defaults.imgWrap),
			bigPanel = imgWrap.find(defaults.bigPanel),
			smallPanel = imgWrap.find(defaults.smallPanel),
			num = defaults.showPic,
			autoPlay = defaults.auto,
			animate = false,
			timer, index, cloneIndex = 0;

		$.extend(this, {
			imgInit: function() {
				var smallList = smallPanel.children();
				//存储缩略图初始化索引值
				smallList.each(function(k, v) {
					$(v).data("index", k);
					$(v).attr("data-index", k);

				})

			},
			getScrollW: function() {
				var smallList = smallPanel.children(); //缩略图数组对象
				var el = smallList.eq(0); //选定一个图片
				var scrollW = el.width() + parseInt(el.css("margin-left")) + parseInt(el.css("margin-right")); //一次滚动的宽度	
				return scrollW;
			},
			scrollShow: function(index) {
				if (animate) return;
				animate = true;
				bigPanel.children().fadeOut("fast").stop(true, true).eq(index).fadeIn("fast", function() {
					animate = false
				});

			},
			scrollRun: function() {
				var smallList = smallPanel.children();
				smallList.click(function() {

					var t = $(this);
					index = smallPanel.children().index(t); //重新选择生成索引
					var w = self.getScrollW();


					var middleIndex = Math.floor(num / 2);

					var rangeIndex = middleIndex - index; //其它图片索引距中间索引差值

					var imgL = smallList.length;



					if (rangeIndex > 0) { //左侧小图点击
						cloneIndex = imgL - rangeIndex - 1;
						var cloneObj = smallPanel.find("li:gt(" + cloneIndex + ")").clone(true);
						smallPanel.find("li:gt(" + cloneIndex + ")").remove();
						cloneObj.fadeIn("fast").prependTo(smallPanel);
					} else {
						cloneIndex = Math.abs(rangeIndex);
						self.scrollPlay(cloneIndex, false)
					}
					self.scrollShow(self.getMiddleIndex());
					self.setActive();
					defaults.afterClone();
				})

			},
			getMiddleIndex: function() {
				return smallPanel.children().eq(2).attr("data-index");
			},
			setActive: function() {
				smallPanel.children().eq(2).addClass("active").siblings().removeClass("active");
			},
			scrollPlay: function(cloneIndex, auto) {
				if (auto) {
					cloneIndex++;
				}
				var cloneObj = smallPanel.find("li:lt(" + cloneIndex + ")").clone(true);
				smallPanel.find("li:lt(" + cloneIndex + ")").remove();
				cloneObj.appendTo(smallPanel);
			},
			auto: function() {
				timer = setInterval(function() {
					self.scrollPlay(cloneIndex, true);
					var index = self.getMiddleIndex();
					self.scrollShow(index);
					self.setActive();
					defaults.afterClone();

				}, 2000);
			},
			stopAuto: function() {
				clearInterval(timer);
			},
			init: function() {
				if (defaults.auto) {
					self.auto()

					bigPanel.hover(function() {
						self.stopAuto()
					}, function() {
						cloneIndex = 0;
						self.auto()
					})

					smallPanel.hover(function() {
						self.stopAuto()
					}, function() {
						cloneIndex = 0;
						self.auto();
					})
				}
				this.imgInit();
				this.scrollRun();
			}
		})
		self.init();

	}

	$.sc2 = {
		imageClone: function(defaults) {
			defaults = $.extend({},
			imageClone.defaults, defaults);
			new ImageClone(defaults);

		}
	}


})(jQuery);