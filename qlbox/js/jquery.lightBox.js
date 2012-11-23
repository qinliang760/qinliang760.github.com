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

(function($){  
	lightBox={
		defaults: {
			model:false,
			hasClose:true		
		}
	}
	var Defaults=lightBox.defaults;
	function LightBox(root,defaults){
		var self=this,
			boxObj=root;debugger;
		
		$.extend(this,{
			setModel:function(){
				var modelHtml="<div id='boxModel'></div>",
					wW=$(window).width(),
				 	bH=$("body").height();
				$("body").append(modelHtml);
				$("#boxModel").width(wW);
				$("#boxModel").height(bH); 
				$("#boxModel").css("opacity",0.5).show();
			},
			setPosition:function(){
				var wW=$(window).width(),
					wH=$(window).height(),
					wScrollTop=$(window).scrollTop(),
					bW=boxObj.width(),
					bH=boxObj.height(),
					bLeft=(wW-bW)/2,
					bTop=(wH-bH)/2+wScrollTop;
				return [bLeft,bTop];
				
			},
			setClose:function(){
				var closeObj="<a class='closeBtn' href='#'>关闭</a>";
				boxObj.append(closeObj);
				boxObj.find(".closeBtn").live("click",function(){debugger;
					boxObj.hide();
					if(defaults.model){
					$("#boxModel").remove();}
					return false;	
				})	
			}
		})
		defaults.model?self.setModel():"";
		defaults.hasClose?self.setClose():"";
		var p=self.setPosition();
		boxObj.css({"left":p[0]+"px","top":p[1]+"px"}).show();
			
	
	}


	$.fn.lightBox = function(defaults){
		defaults=$.extend({},lightBox.defaults,defaults);		
		return this.each(function(){
			el = new LightBox($(this), defaults);
		})

	}
})(jQuery);