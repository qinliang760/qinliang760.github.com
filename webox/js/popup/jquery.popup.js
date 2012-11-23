//author qinliang
(function($){
	$.extend({
		popup:function(info){
			$("body").append("<div class='popup'>"+info+"</div>");
			var bodyWidth=$("body").width();
			var leftData=(bodyWidth-$(".popup").width())/2;
			$(window).scroll(function(){
				var topData=$(window).scrollTop();	
				//alert(topData);
				$(".popup").css({"top":topData,"left":leftData});
			}) 
			$(".popup").css({"top":$(window).scrollTop(),"left":leftData});
			setTimeout("$('.popup').fadeOut()",3000);
		}		 
	})
	$.fn.popup=function(options){
		var defaults={

		}
		var o=$.extend(defaults,options);
		return this.each(function(){
			var t=$(this);
			var str="";
			t.click(function(){
				$.ajax({
					type:"POST",
					url:"php/ajax_data.php",
					success:function(data){
						var arr=eval("["+data+"]");

						for(i=0;i<arr.length;i++){
							str+="合同编号"+arr[i].id+"客户名称"+arr[i].name+arr[i].type;		
						}
						$("#ajaxBox").html(str);	
					}
									
				})				 
			})
		})		
	}
})(jQuery);