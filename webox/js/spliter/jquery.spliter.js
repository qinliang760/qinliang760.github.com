// JavaScript Document
(function($){
	$.fn.spliter=function(panels,options){
		var defaults={
			show:true
		};		
		var o=$.extend({},defaults,options);
		return this.each(function(){
			var t=$(this);
			if(o.show){
				t.prepend("<a class='spliterArea' href='#'></a>");
				var pad=$(panels).parent().css("padding-left");
				t.children(".spliterArea").toggle(
					function(){
	//$(panels).animate({width:0,opacity:0},"slow").stop(true,true).parent().animate({"padding-left":0},"slow");
						$(panels).hide().parent().css("padding-left",0);
						$(this).addClass("spliterAreaClick").parent().css("float","none");
						if($("body").find(".lstSearch")){
							$(".lstSearch").width($(".lstSearch").next().width()-25);
						}
					},
					function(){
						$(panels).show().parent().css("padding-left",pad);
						$(this).removeClass("spliterAreaClick").parent().css("float","right");
						if($("body").find(".lstSearch")){
							$(".lstSearch").width($(".lstSearch").next().width()-25);
						}
					}
				)
			}
		})
	}
})(jQuery);
$(function(){
$("#main").spliter("#sidebar");
})