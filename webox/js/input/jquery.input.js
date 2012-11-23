/*!
 * Base On jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 * Libs:Input
 * Copyright 2011, Mediav
 */
 
(function($){
	$.fn.input=function(options){
		var defaults={
			disabled:false,
			tipTxt:false
		}
		var o=$.extend(defaults,options);
		return this.each(function(){
			var t=$(this);	
			if($(".tip_input").val()==this.defaultValue){
				$(".tip_input").css("color","#ccc");
			}else{
				$(".tip_input").css("color","#000");	
			}
			t.focus(function(){		  
				if(o.tipTxt){
					if(t.val()==this.defaultValue){
						t.val("").css("color","#000");
					}
				}			 
				t.addClass("focus");	
			}).blur(function(){
				if(o.tipTxt){			
					if(t.val()==""){
						t.val(this.defaultValue).css("color","#ccc");		
					}
				}
				t.removeClass("focus");			 
			})
			if(o.disabled){
				t.attr("disabled",true);	
			}else{
				t.removeAttr("disabled");	
			}

		})
	
	}	  
})(jQuery);