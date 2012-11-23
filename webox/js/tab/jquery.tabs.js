/*!
 * Base On jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 * Libs:Tabs
 * Copyright 2011, Mediav
 */

(function($){
	$.fn.tabs=function(options){
		//default options
		var defaults={
				event:'click',
				initialIndex:0,
				effect:null,
				horizontal:false
		};
		var o=$.extend(defaults,options);
		
		//effects style
		function effects(e,index,p){
			switch(e){
				case 'fade':
					p.eq(index).fadeIn().siblings().fadeOut();
					break;
				case 'slide':
					p.eq(index).slideDown().siblings().slideUp();
					break;
				default:
					p.eq(index).show().siblings().hide();
			}	
		}
		return this.each(function(){
			var t=$(this);
			var p=t.next().children();
			
			//horizontal tabs
			if(o.horizontal){
				t.css({"float":"none","width":"auto"}).addClass("clearFix").children("li").css("float","left");
				p.parent().css("float","none");
			}
			
			//init
			t.children().eq(o.initialIndex).addClass('active');
			p.eq(o.initialIndex).show().siblings().hide();
			
			//tabs event
			t.children().bind(o.event,function(){
				var index=t.children().index(this);
				$(this).addClass('active').siblings().removeClass('active');	
				effects(o.effect,index,p);
				return false;
			})
		})
	}

})(jQuery);