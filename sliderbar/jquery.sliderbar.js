/*!
 * Base On jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 * Libs:mediav qSlider
 * Copyright 2012, QinLiang
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: 2012.2.6
 */
var QL=QL || {};
(function($){
	QL.sliderbar={
		defaults: {
			sliderId:"slider",//滑动容器ID
			sliderCon:'<p class="sliderBg"><span class="sliderBar"></span></p>',
			initObjW:300//设置元素的宽度
			
		}
	}
	Defaults=QL.sliderbar.defaults;


	function QSlider(root,defaults){
		var self=this,
			sliderObj=root,//滑动块控制的对象
			sliderObjW=sliderObj.children().first().width(),//滑动块控制的img对象宽度
			sliderBox=$("#"+Defaults.sliderId),//滑动块容器
			sliderBg,//滑动背景色
			sliderBar;//滑动块
			
		$.extend(this,{
			init:function(){//初始化
				sliderBox.append(Defaults.sliderCon);
				sliderBg=sliderBox.find(".sliderBg");//滑动背景色
				sliderBar=sliderBox.find(".sliderBar");//滑动块
				sliderObj.width(Defaults.initObjW);
				this.noDrag();
			},
			getScale:function(){//比例
				var w=sliderObjW-Defaults.initObjW;//将要展现的实现创意宽度
				var scale=parseFloat(w/(sw-bw));
				return scale;
			},
			noDrag:function(){//禁止滑动块选中拖动
				var noDrag=sliderBar[0];
				noDrag.ondragstart=function(){return false};				
			},
			move:function(obj,currentX,initX){//鼠标拖动控制
					var leftMin=Math.max(parseFloat(currentX-initX)+sliderBarLeft,limitedRange.min);
					var leftRange=Math.min(leftMin,limitedRange.max);
					obj.css("left",leftRange+"px");
					sliderBg.css("width",leftRange+"px");

					//var sliderTrueW=parseFloat(leftRange*scale);debugger;
					sliderObj.css("width",parseFloat(Defaults.initObjW)+parseFloat(leftRange*self.getScale())+"px");
			}
		})//$.extend	 
		self.init();
		var sliderBarStart=0,
			sliderBarLeft,//滑动块距离父容器的位置
			sw=sliderBox.width(),
			bw=sliderBar.width(),
			limitedRange={min:0,max:sw-bw};
					
		sliderBar.bind("mousedown",function(e){
			sliderBarStart=1;								
			var initPosition=parseFloat(e.pageX);//点击滑动块时鼠标初始化位置
			sliderBarLeft=parseFloat(sliderBar.position().left);
			$("body").bind("mousemove",function(e){//debugger;
				if(sliderBarStart){//鼠标按下后开始move事件
					self.move(sliderBar,parseFloat(e.pageX),initPosition);
				}					  
			}).bind("mouseup",function(e){
				sliderBarStart=0;
				$("body").unbind("mousemove").unbind("mouseup");
			})								
		})				
	}

	$.fn.sliderbar = function(defaults){
		var o=$.extend(Defaults,defaults);		
		return this.each(function(){		   
			el = new QSlider($(this), defaults);
			//el.init();
		})

	}
})(jQuery);