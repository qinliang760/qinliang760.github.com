/*!
 * Base On jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 * Libs:Combox
 * Copyright 2011, Mediav
 */
 
(function($){
	$.fn.combox=function(panels,options){
		//default options
		var defaults={
			selectWidth:150,
			backFun:function(){}
		}
		var o=$.extend({},defaults,options);
		return this.each(function(){
			var t=$(this);
			var p=$(panels);
			t.click(function(){
				p.toggle();
				return false;
			})
			
			//select value
			p.children().find("a").click(function(){
				var value = $(this).attr("title");
				var txt = $(this).text();
				t.children().text(txt).attr('title',value);
				p.children().find("a").removeClass("selected");
				$(this).addClass("selected");
				p.hide();
				o.backFun();
				return false;
			})
			t.children().css("width",o.selectWidth);
			var padWidth=parseInt(t.children().css("padding-left"))+parseInt(t.children().css("padding-right"));
			p.width(t.width()+padWidth);
			$(document).click(function(event){
				$(panels).hide();					   
			})
		})
	
	}	  
})(jQuery);