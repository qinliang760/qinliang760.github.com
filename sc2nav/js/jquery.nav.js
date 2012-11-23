var Nav={
	
	init:function(){
		this.navInit();
		this.navOver();
	},
	getNavLi:function(){
		var nav=$("#topBox").find(".nav li");
		return nav;
	},
	getSubLi:function(){
		var subnav=$("#topBox").find(".subNav li.subNavLi");	
		return subnav;
	},
	navMove:function(index,move){
		var blueSpan=$("#topBox").find(".blueSpan");
		var nav=this.getNavLi();
		if(move){
			var moveL=nav.eq(index).attr("rel");
			blueSpan.stop().animate({"left":moveL},100);
		}else{
			var rel=nav.eq(index).attr("rel");
			blueSpan.css("left",rel);
		}
		blueSpan.css("display","block");			   		
	},
	navInit:function(){
		var nav=this.getNavLi();
		nav.each(function(k,v){
			switch(k){
				case 0:
					$(v).attr("rel","285px");					
					break;
				case 1:
					$(v).attr("rel","392px");
					break;
				case 2:
					$(v).attr("rel","511px");
					break;
				case 3:
					$(v).attr("rel","630px");
					break;
				case 4:
					$(v).attr("rel","748px");
					break;
				case 5:
					$(v).attr("rel","871px");
					break;				
				
			}					  
		})
	},
	navOver:function(){
		var nav=this.getNavLi();
		var subnav=this.getSubLi();
		var blueSpan=$("#topBox").find(".blueSpan");
		var self=this;
		var timer;
		nav.hover(function(){
			var t=$(this);
			var index=nav.index(t);			
			clearTimeout(timer);
			self.overHandler(t,index,nav,subnav);
			$("#search_kw").blur();
			
		},function(){
		})
		subnav.hover(function(){
			var t=$(this);
			var index=subnav.index(t);
			clearTimeout(timer);
			self.overHandler(t,index,nav,subnav);
			
			
		},function(){
				
		})
		$(".nav").hover(function(){
			subnav.parent().slideDown("slow");
			$(".arrowM").stop().animate({"top":"12px"},100).hide();
		},function(){
			timer=setTimeout(function(){subnav.parent().slideUp('slow');blueSpan.hide()},100);
		})
		$(".subNav").mouseleave(function(){
			timer=setTimeout(function(){subnav.parent().slideUp('slow');blueSpan.hide()},100);							   
		})
		
		subnav.find("li").hover(function(){
			var index=$(this).parent().find("li").index($(this));
			var subIndex=subnav.index($(this).parents(".subNavLi"));
			$(".arrowM").hide();
			$(this).parent().prev().show();
			self.arrowHandler(index,subIndex);							 										 
		})
	},
	overHandler:function(t,index,nav,subnav){
		var move=false;
		var blue=$("#topBox").find(".blueSpan");
		if(blue.is(":visible")){
			move=true;				
		}
		subnav.eq(index).addClass("active").siblings().removeClass("active");
		this.navMove(index,move);//当前index;是否要移动		
	},
	arrowHandler:function(index,subIndex){
		var arrow=this.getSubLi().eq(subIndex).find(".arrowM");
		var speed=100;
		switch(index){
			case 0:
				arrow.stop().animate({"top":"12px"},speed);					
				break;
			case 1:
				arrow.stop().animate({"top":"38px"},speed);
				break;
			case 2:
				arrow.stop().animate({"top":"62px"},speed);
				break;
			case 3:
				arrow.stop().animate({"top":"87px"},speed);
				break;
			case 4:
				arrow.stop().animate({"top":"113px"},speed);
				break;			
			
		}			
		
	},
	initSearch:function(){
		if(!$(".w-search"))return;
		$(".w-search .btnbg").hover(function(){
			$(this).toggleClass("hover",true);
		},function(){
			$(this).toggleClass("hover",false);
		});
		$(".w-search .btnbg").click(Search.submitForm);
		$("#topSearch #search_kw").focus(function(){
			if($(this).val()=="搜索《星际争霸II》")$(this).val("");
			$("#topSearch .inputbg").toggleClass("focus",true);
		});
		$("#topSearch #search_kw").blur(function(){
			if($(this).val()=="")$(this).val("搜索《星际争霸II》");
			$("#topSearch .inputbg").toggleClass("focus",false);
		});
		$("#topSearch #search_kw").val("搜索《星际争霸II》");
	}
	
}