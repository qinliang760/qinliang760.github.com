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
			showPic: 5,//默认可见图片数
			btnActive:true,//按钮是否一直处于激活状态
			auto:false,
			prev:".prev",
			next:".next",
			imgWrap:"#ui-imgclone",
			bigPanel:".ui-img-big",
			smallPanel:".ui-img-small"
		}
	};
	function ImageClone(defaults) {
		var self = this,
		imgWrap=$(defaults.imgWrap),
		prevBtn=imgWrap.find(defaults.prev),
		nextBtn=imgWrap.find(defaults.next),
		bigPanel=imgWrap.find(defaults.bigPanel),
		smallPanel=imgWrap.find(defaults.smallPanel),
		num=defaults.showPic,
		animate=false,timer,index;

		$.extend(this, {
			imgInit:function(){
				var smallList=smallPanel.children();
				//存储缩略图初始化索引值
				smallList.each(function(k,v){
					$(v).data("index",k);
					$(v).attr("data-index",k);

				})
				smallList.clone(true).appendTo(smallPanel);
		
			},
			getScrollW:function(){
				var smallList=smallPanel.children();//缩略图数组对象
				var el=smallList.eq(0);//选定一个图片
				var scrollW=el.width()+parseInt(el.css("margin-left"))+parseInt(el.css("margin-right"));//一次滚动的宽度	
				return scrollW;
			},
			scrollAnimate:function(range){
				if(animate)return;	
				animate=true;

		
				setTimeout(function(){
					smallPanel.animate({"margin-left":range},500,function(){animate=false;});
				},100);					
			},
			scrollShow:function(index){
				bigPanel.children().fadeOut("fast").stop(true,true).eq(index).fadeIn();

			},
			scrollRun:function(){				
				prevBtn.click(function(){
					var options=self.getScroll();		   
					if(options.prevRun){
						self.scrollAnimate("prev",options.prevScrollRange);
					}				   
					return false;
				})
				nextBtn.click(function(){
					var options=self.getScroll();				   
					if(options.nextRun){
						self.scrollAnimate("next",options.nextScrollRange);
					}				   
					return false;
				})
				var smallList=smallPanel.children();
				smallList.click(function(){
					var t=$(this);
					index=smallPanel.children().index(t);//重新选择生成索引
					var w=self.getScrollW();


					t.addClass("ui-img-current").siblings().removeClass("ui-img-current");
					//var middleObj=smallPanel.find(".ui-img-current");
					//var middleIndex=smallList.index(middleObj);//中间图片索引
					var middleIndex=Math.floor(num/2);

					var rangeIndex=middleIndex-index;//其它图片索引距中间索引差值
					var range=rangeIndex*w;//需要滚动的距离

					var imgL=smallList.length;
					

					//self.scrollAnimate(range);

					/*if(rangeIndex>0){//左侧小图点击
						var cloneIndex=imgL-rangeIndex-1;
						var cloneObj=smallPanel.find("li:gt("+cloneIndex+")").clone(true);
						smallPanel.find("li:gt("+cloneIndex+")").remove();
						cloneObj.fadeIn("fast").prependTo(smallPanel);
					}else{
						var cloneIndex=Math.abs(rangeIndex);
						var cloneObj=smallPanel.find("li:lt("+cloneIndex+")").clone(true);
						smallPanel.find("li:lt("+cloneIndex+")").remove();
						cloneObj.appendTo(smallPanel);
					}*/
					var bigIndex=t.attr("data-index");
					self.scrollShow(bigIndex);
					self.scrollAnimate(range);
					//self.scrollClone(rangeIndex);
						

				})

			},
			auto:function(){
				timer = setInterval(function(){var options=self.getScroll();self.scrollAnimate("next",options.nextScrollRange)}, 3000);
			},
			stopAuto:function(){
				clearInterval(timer);
			},
			init: function() {
				if(defaults.auto){
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
					numList.hover(function() {
						self.stopAuto();
					},
					function() {
						self.auto();
					})				
					
				}
				this.imgInit();
				this.scrollRun();
			}
		})
		self.init();

	}

	$.fn.imageClone = function(defaults) {
		defaults = $.extend({},
		imageScroll.defaults, defaults);
		return this.each(function() {
			el = new ImageClone($(this), defaults);
		})

	}

	$.sc2={
		imageClone: function(defaults) {
			defaults = $.extend({},
			imageClone.defaults, defaults);
			new ImageClone(defaults);

		}		
	}


})(jQuery);

