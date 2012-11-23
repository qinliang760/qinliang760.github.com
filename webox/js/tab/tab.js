// JavaScript Document
$(function(){
		   $(".tabValue>div:gt(0)").hide();
		   $(".tabList li").click(function(){
			$(this).addClass("active").siblings().removeClass("active");
			var index=$(".tabList li").index(this);
			$(".tabValue>div").eq(index).show().siblings().hide();
			return false;
								})
})