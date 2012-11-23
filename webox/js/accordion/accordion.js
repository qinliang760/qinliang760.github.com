		   $(function(){
		   $(".accordionAreaHide").next().hide();
		   $(".accordionArea").click(function(){
											   if($(this).children(".accordionClick").text()=="点击收缩"){
												   $(this).children(".accordionClick").text("点击展开").css("background-position","right -20px");
												   }else{
												   $(this).children(".accordionClick").text("点击收缩").css("background-position","right 0");
													   }
											   $(this).next().toggle();
											   return false;
											   })
		   })