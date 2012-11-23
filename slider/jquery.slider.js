/*!
 * Base On jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 * Libs:Jay Slider
 * Copyright 2012, QinLiang
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: 2012.3.14
 */
var QL=QL || {};
(function($){  
	QL.slider={
		defaults: {
			sliderId:"slider",	
			initialIndex:0,
			auto:true,
			speed:2000			
		}
	}
	Defaults=QL.slider.defaults;


	function Slider(root,defaults){
		var self = this,//slider tab
			sliderObj = $("#"+Defaults.sliderId),
			sliderTab = root.children(),
			sliderObjList=sliderObj.children(),
			currentIndex=Defaults.initialIndex,
			timer;
		$.extend(this,{
			init:function(){
				var tt=sliderTab.eq(currentIndex);
				var st=sliderObjList.eq(currentIndex);
				self.tabFx(tt);
				self.sliderFx(st);	
			},
			tabFx:function(t){
				t.addClass("active").siblings().removeClass("active");	
			},
			sliderFx:function(t){
				t.show().siblings().hide();	
			},
			auto:function(){
				var tabL=sliderTab.length;
				currentIndex++;				
				if(currentIndex==tabL){//如果到最后一个tab
					currentIndex=0;	
				}					
				self.init();																		
			},
			setTimer:function(){
				timer=setInterval(self.auto,Defaults.speed);
			}
		})
		self.init();
		self.setTimer();
		//tab mouseover
		sliderTab.hover(function(){
			clearTimeout(timer);							  
			var t=$(this);
			currentIndex=sliderTab.index(t);						
			self.tabFx(t);
			self.sliderFx(sliderObjList.eq(currentIndex));							
		},function(){
			self.setTimer();
		})
		
		//slider obj
		sliderObjList.hover(function(){
			clearTimeout(timer);									
		},function(){
			self.setTimer();
		})

	}

	$.fn.slider = function(defaults){
		var o=$.extend(Defaults,defaults);		
		return this.each(function(){	   
			el = new Slider($(this), defaults);
		})

	}
})(jQuery);