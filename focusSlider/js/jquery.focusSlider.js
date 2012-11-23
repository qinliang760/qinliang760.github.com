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
	QL.focusSlider={
		defaults: {
			picClass:"picList",	
			numClass:"numList",
			dotClass:"dotList",
			prevClass:"prev",
			nextClass:"next",
			auto:true,
			speed:2000,
			showBtn:true,
			showNum:true,
			showDot:true			
		}
	}
	Defaults=QL.focusSlider.defaults;
	function focusSlider(root,defaults){
		var self=this,timer,
			pic=root.find("."+Defaults.picClass),
			num=root.find("."+Defaults.numClass+" li"),
			dot=root.find("."+Defaults.dotClass+" li"),
			prevBtn=root.find("."+Defaults.prevClass),
			nextBtn=root.find("."+Defaults.nextClass);
		
		$.extend(this,{
			picInit:function(picW){
				pic.css("width",self.getPic().TW+"px");									
			},
			getPic:function(){
				var picW=pic.find("img").width();
				var picL=pic.find("li").length;
				var picTW=picW*picL;
				var options={
					W:picW,//单张图片的宽度
					L:picL,//总的图片张数
					TW:picTW//总的图片长度
				}
				
				return options;
			},
			dotMove:function(index){
				dot.eq(index).addClass("active").siblings().removeClass("active");
			},
			picMove:function(movePx){
				//stop()
				pic.not(":animated").animate({"left":movePx+"px"},500);//not(":animated")用来防止鼠标快速点击时，动画未执行完			
			},
			focusMove:function(index){
				num.eq(index).addClass("active").siblings().removeClass("active");
				
			},
			moveFun:function(){
				var picLeft=parseInt(pic.css("left"));
				var TW=self.getPic().TW;
				var W=self.getPic().W;			
				var movePx=picLeft-W;
				if(Math.abs(picLeft)==TW-W){
					movePx=0;	
				}
				var index=Math.abs(picLeft)/W;
				index++;			
				index==self.getPic().L?index=0:"";
				self.picMove(movePx);						
				self.focusMove(index);
				self.dotMove(index);				
			},
			auto:function(){
				timer=setInterval(self.moveFun,1000);
			},
			stopAuto:function(){
				clearInterval(timer);
			}
		})	
		num.hover(function(){
			var t=$(this);
			var index=num.index(t);
			var picW=self.getPic().W;
			self.picInit(picW);			
			var movePx=-(picW*index);
			self.focusMove(index);
			self.picMove(movePx);
			self.dotMove(index);
			self.stopAuto();
		},function(){
			self.auto();	
		})
		
		//Btn
		prevBtn.click(function(){
			var picLeft=parseInt(pic.css("left"));
			var TW=self.getPic().TW;
			var W=self.getPic().W;
			var movePx=picLeft+W;
			if(picLeft==0){
				movePx=-(TW-W);	
			}
			
			var index=Math.abs(picLeft)/W;
			index--;			
			index<0?index=self.getPic().L-1:"";			
			self.picMove(movePx);	
			self.focusMove(index);
			self.dotMove(index);
				
		})
		nextBtn.click(function(){
			self.moveFun();				
		})		
		prevBtn.hover(function(){
			self.stopAuto();
		},function(){
			self.auto();
		})
		nextBtn.hover(function(){
			self.stopAuto();
		},function(){
			self.auto();
		})
		pic.hover(function(){
			self.stopAuto();
		},function(){
			self.auto();
		})		
		this.picInit();
		self.auto();		
	}


	$.fn.focusSlider = function(defaults){
		var o=$.extend(Defaults,defaults);		
		return this.each(function(){	   
			el = new focusSlider($(this), defaults);
		})

	}
})(jQuery);