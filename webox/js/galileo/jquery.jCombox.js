/*!
 * Base On jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 * Libs:mediav jCombox
 * Copyright 2011, QinLiang
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: Mon Oct 17 15:45:48 2011 -0400
 */
(function($){
	$.mediav = $.mediav || {};	  
	$.mediav.jCombox={
		defaults: {
			width:180,
			event:"click",
			confirmClass:"confirmBox",
			comboxListThClass:"comboxListTh"
			
		}
	}
	$.defaults=$.mediav.jCombox.defaults;


	function JCombox(root,defaults){
		var self = this,
			comboxLink = root,
			comboxPane = root.next(),
			comboxList = comboxPane.find("ul"),
			comboxTitle = comboxPane.prepend('<p><input class='+$.defaults.comboxListThClass+' type="checkbox" name=""/><span class="font_bold">约占流量</span><span class="font_bold">创意尺寸</span></p>'),
			confirmBox = comboxPane.append('<p class='+$.defaults.confirmClass+'><a href="#">确定</a></p>'),			
			confirmLink = comboxPane.find("."+$.defaults.confirmClass).children().first();
		$.extend(this,{
			init:function(){
				comboxLink.css("width",$.defaults.width);
				comboxPane.css("width",$.defaults.width+12);//add comboxLink padding
				comboxPane.hide();
				comboxList.find("input").attr("checked","");
				comboxList.find("li:odd").css("background-color","#D5D5D5");
			},	 
			comboxLinkEvent:function(t){
				comboxPane.toggle();
			}
		})
		comboxLink.each(function() {			   
			$(this).bind($.defaults.event, function() {
				var t=this;											 
				self.comboxLinkEvent(t);
				return false;
			});			
		});
		confirmLink.bind("click",function(){										  
			var l = comboxList.find("input:checked").length;
			comboxPane.hide();
			comboxLink.html("已经选择了"+l+"个尺寸");
			var checkArr = [];
			for(i=0;i<l;i++){
				checkArr.push(comboxList.find("input:checked").attr("id"));	
			}
			if(checkArr.length>0){
				$.ajax({
				   type: "POST",
				   url: "json.php?id="+checkArr,
				   success: function(){
				   }					   
				})
			}
			return false;
		})
		comboxPane.find("."+$.defaults.comboxListThClass).bind("click",function(){
			var thisCheck = $(this).attr("checked");																	
			comboxList.find("input").attr("checked",thisCheck);																					  	
		})		
		
	}

	$.fn.jCombox = function(defaults){
		var o=$.extend($.defaults,defaults);		
		return this.each(function(){		   
			el = new JCombox($(this), defaults);
			el.init();
		})

	}
})(jQuery);