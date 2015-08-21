var Confer = {
	init:function(){
		this.setLoading();	
		this.playMusic();
		this.setPageClick();
			
	},
	setFullpage:function(){
		var a = new JV.fullpage('.wp-inner', {
			afterChange: function(e) {
				/*if(e.cur==2){
				    a.stop();
				}*/
			}
		});

		var focus_page2=$(".w-focus1 li");
		Confer.b = new JV.fullpage('.wp-page2-wp', {
			dir: "h",
			loop:false,
			page: ".page2-sub",
			afterChange: function(e) {
				var cur=e.cur;
				if(cur==0){
					$(".page3 .common_arrow_l").hide();		
				}else if(cur>=1 && cur<4){
					$(".page3 .common_arrow_l").show();	
					$(".page3 .common_arrow_r").show();
				}else{
					$(".page3 .common_arrow_r").hide();
				}
			
				focus_page2.eq(cur).addClass("active").siblings().removeClass("active");
			}
		});

		var focus_page4=$(".w-focus2 li");
		Confer.c = new JV.fullpage('.wp-page4-wp', {
			dir: "h",
			loop:false,
			page: ".page4-sub",
			afterChange: function(e) {
				var cur=e.cur;
				if(cur==0){
					$(".page4 .common_arrow_r").show();
					$(".page4 .common_arrow_l").hide();		
				}else if(cur==1){
					$(".page4 .common_arrow_l").show();
					$(".page4 .common_arrow_r").hide();
				}				
				focus_page4.eq(cur).addClass("active").siblings().removeClass("active");
			}
		});
	},	  
	setLoading:function(){
			var imgJson=[
				"http://heroes.nos.netease.com/1/images/touch/minisite/conference/bg.jpg",
				"http://heroes.nos.netease.com/1/images/touch/minisite/conference/1.jpg",
				"http://heroes.nos.netease.com/1/images/touch/minisite/conference/2.jpg",
				"http://heroes.nos.netease.com/1/images/touch/minisite/conference/3.jpg",
				"http://heroes.nos.netease.com/1/images/touch/minisite/conference/4.jpg",
				"http://heroes.nos.netease.com/1/images/touch/minisite/conference/5.jpg",
				"http://heroes.nos.netease.com/1/images/touch/minisite/conference/star1.png",
				"http://heroes.nos.netease.com/1/images/touch/minisite/conference/star2.png",
				"http://heroes.nos.netease.com/1/images/touch/minisite/conference/star3.png",
				"http://heroes.nos.netease.com/1/images/touch/minisite/conference/star4.png",
				"http://heroes.nos.netease.com/1/images/touch/minisite/conference/star5.png",
				"http://heroes.nos.netease.com/1/images/touch/minisite/conference/team1.jpg",
				"http://heroes.nos.netease.com/1/images/touch/minisite/conference/team2.jpg"
			];		
		    /*$.imgpreload(imgJson,{
		        all: function(){
		        	$(".page2 .loading").css("background-image","url(http://heroes.nos.netease.com/1/images/touch/minisite/conference/bg.jpg)");
		        	$(".u-loading").addClass("fadeOutTop").remove();
		        	$(".u-logo").addClass("fadeInBottom");
		        	setTimeout(function(){
		        		$(".page2 .loading").fadeOut();
		        	},1000);

		    		

		        	
		        }
		    })*/
		    Confer.setFullpage();		
	},
	playMusic:function(){
		var music = document.getElementById('play_music');		
		music.play();
		$(".s1_playmusic").click(function(){
			var This = $(this);
			var val = This.attr("data-play")
			if(val=="y"){
				music.pause();
				This.attr("data-play","n").removeClass("s1_ani_playmusic");
			}else if(val=="n"){
				music.play();
				This.attr("data-play","y").addClass("s1_ani_playmusic");
			}
		})
	},
	setPageClick:function(){//for pc 兼容
		var curIndex1=0,curIndex2=0;
		$(".page3 .common_arrow_r").click(function(){

			curIndex1++
			Confer.b.moveTo(curIndex1, true)
		})
		$(".page3 .common_arrow_l").click(function(){

			curIndex1--
			Confer.b.moveTo(curIndex1, true)
		})
		$(".page4 .common_arrow_r").click(function(){

			curIndex2++
			Confer.c.moveTo(curIndex2, true)
		})
		$(".page4 .common_arrow_l").click(function(){

			curIndex2--
			Confer.c.moveTo(curIndex2, true)
		})						
	}
	
}