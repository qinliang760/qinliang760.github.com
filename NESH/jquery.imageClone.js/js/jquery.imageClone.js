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
				var smallList=smallPanel.children();//缩略图数组对象
				var el=smallList.eq(0);//选定一个图片
				var scrollW=el.width()+parseInt(el.css("margin-left"))+parseInt(el.css("margin-right"));//一次滚动的宽度				
				var imgL=smallList.length;//图片的个数

				//存储缩略图初始化索引值
				smallList.each(function(k,v){
					$(v).data("index",k);

				})


			
			},
			scrollAnimate:function(btn,range){
				if(animate)return;	
				animate=true;

		
				setTimeout(function(){
					imgWrap.animate({"margin-left":scrollType+range},500,function(){animate=false;});
				},100);					
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

				smallList.click(function(){
					var t=$(this);
					index=smallList.index(t);
					if(index>2){

						
					}

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

