/*!
 * Base On jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 * Libs:Accordion
 * Copyright 2011, Mediav
 */
 
(function($){
	$.fn.accordion=function(options){
		//default options
		var defaults={
			event:"click",
			initialIndex:0,
			nav:false
		}
		var o=$.extend(defaults,options);
		return this.each(function(){
			var t=$(this);
			var status=t.find(".clickStatus");
			
			//nav style
			if(o.nav){
				t.parent().find("dd").eq(o.initialIndex).show();	
			}
			
			//element event
			t.bind(o.event,function(){
				if(o.nav){					
					t.addClass("active").siblings("dt").removeClass("active").end().next().slideDown().siblings("dd").slideUp();
				}else{
					t.find(".accordionTitle").toggleClass("active").end().next().toggle();	
					if(status.text()=="点击收缩"){
						status.text("点击展开");
					}else{
						status.text("点击收缩");	
					}
				}										
			})
		})
	}		  
		  
})(jQuery);