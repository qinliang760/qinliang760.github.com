/*!
 * Base On jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 * Libs:Tooltip
 * Copyright 2011, Mediav
 */
 
(function($){
	$.fn.tooltip=function(options){
		//default options
		var defaults={
			tipWidth:140
		}
		var o=$.extend(defaults,options);
		return this.each(function(){
			var t=$(this);
			t.hover(function(e){
				this.showTitle=this.title;
				this.title="";
				var tooltip="<div id='titleTip' style='width:"+o.tipWidth+"px'>"+this.showTitle+"</div>";
				$("body").append(tooltip);
				
				//tooltip position and fx
				$("#titleTip").css({"top":(e.pageY+10)+"px","left":(e.pageX+10)+"px"}).show("fast").stop(true,true);
				
				//width adapt window
				if($(window).width()<$(document).width()){	
					$("#titleTip").css({"top":(e.pageY+10)+"px","left":(e.pageX-150)+"px"}).show("fast").stop(true,true);	
				}
			},function(){
				this.title=this.showTitle;
				$("#titleTip").remove();
			})
		})
	}	  


})(jQuery);