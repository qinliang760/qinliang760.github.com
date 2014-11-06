/*
* naxx.JS
* 2014-7-25
* control naxx minisite
*/
var platform = navigator.platform;
var ua = navigator.userAgent;
var ios = /iPhone|iPad|iPod/.test(platform) && ua.indexOf( "AppleWebKit" ) > -1;
var andriod = ua.indexOf( "Android" ) > -1;

var Naxx = {
	init: function() {
		this.styleInit();
		this.ctrlScreen($("#content"));
		this.playVideo($("#s4_play"),$("#content"));
		this.ctrlS6_cover();  //S6页面弹出分享详情
		this.ctrlS3_card_leave(); //S3 页面卡牌飞出
		this.playMusic();
		FastClick.attach(document.body);
		this.setParallax($("#screen_1>div")); //启动第一祯
	},
	ctrlScreen:function(tar){
		var index = 1,
        touchs = 0,
        touchm = 0,
        touche = 0,
        move_timer = 200, //自动补全动画
        cooldown = false,
        timer,
        scale = 0,
        h_change = 0,
        move = 0,
        index = 0,
        switchs = true;
        var w_h = $(window).height();
        var w_w = $(window).width();
        var cont = tar[0];
        var len = tar.children("section").length;
        cont.addEventListener('touchstart', function(event) {
	        //event.preventDefault();
	        var touch = event.targetTouches[0];
	        touchs = touch.pageY;
	    })
	    cont.addEventListener('touchmove', function(event) {
	        event.preventDefault();
	        if(!switchs){
	        	return;
	        }
	        var touch_m = event.targetTouches[0];
	        touchm = touch_m.pageY;
	        move = Math.abs(touchs-touchm);
	        index = parseInt(tar.attr("data-index"));
	        scale = 1- (move)/w_h;
			h_change = w_h*scale;
	        //alert(touchs-touchm)	        
	        if(move<=w_h){
	        	if(touchs-touchm>=0){
	        		if(index<len){	        			
			        	$("#screen_"+index).css({
			        		"-webkit-transform-origin":"50% 0px",
			        		"-webkit-transform":"scale("+scale+")"
			        	})
			        	$("#screen_"+(index+1)).css({
			        		"-webkit-transform":"translateY("+h_change+"px)"
			        	})
	        		}else {
	        			return false;
	        		}	        		
	        	}else{
	        		if(index!=1){
			        	$("#screen_"+index).css({
			        		"-webkit-transform-origin":"50% 100%",
			        		"-webkit-transform":"scale("+scale+")"
			        	})
			        	$("#screen_"+(index-1)).css({
			        		"-webkit-transform":"translateY(-"+h_change+"px)"
			        	})
	        		}
	        	}	        	
	        }
	    })
	    cont.addEventListener('touchend', function(event) {
	        //event.preventDefault();
	        if(!switchs){
	        	return;
	        }
	        switchs = false;
	        timer = setTimeout(function(){
	        	switchs = true;
	        },1000)
	        var touch = event.changedTouches[0];
	        touche = touch.pageY;
	        var move_end = Math.abs(touchs-touche);
	        index = parseInt(tar.attr("data-index"));
	        //下一帧动画
	        if(move_end>=w_h/4){
	        	if(touchs-touche>=0){ //向上滑动
	        		if(index<len){
	        			$("#screen_"+index).animate({"-webkit-transform":"scale(0)"},move_timer,function(){
		        			$(this).css({"-webkit-transform":"scale(1) translateY(-"+w_h+"px)"});
		        			Naxx.setParallax($("#screen_"+(index+1)+">div"));
		        			Naxx.setRemoveParallax($("#screen_"+index+">div"));
		        			if(index==3){
		        				$(".s3_cardbox img").removeClass("s3_card_live");
		        			}	        			
		        			tar.attr("data-index",index+1);
		        		});
		        		$("#screen_"+(index+1)).animate({"-webkit-transform":"translateY(0px)"},move_timer);
		        		if(index>1){
		        			$("#screen_"+(index-1)).css("-webkit-transform","translateY(-"+w_h+"px)")
		        		}		        		
	        		}	        		
	        	}else {	//向下滑动
	        		if(index!=1){
	        			$("#screen_"+index).animate({"-webkit-transform":"scale(0)"},move_timer,function(){
		        			$(this).css({"-webkit-transform":"scale(1) translateY("+w_h+"px)"});
		        			Naxx.setParallax($("#screen_"+(index-1)+">div"));
		        			Naxx.setRemoveParallax($("#screen_"+index+">div"));
		        			if(index==3){
		        				$(".s3_cardbox img").removeClass("s3_card_live");
		        			}
		        			tar.attr("data-index",index-1);
		        		});
		        		$("#screen_"+(index-1)).animate({"-webkit-transform":"translateY(0px)"},move_timer);
		        		if(index>len){
		        			$("#screen_"+(index+1)).css("-webkit-transform","translateY("+w_h+"px)");
		        		}
	        		}   		
	        	}
	        //位置重置动画
	        }else{
	        	if(touchs-touche>=0){ //向上滑动
	        		if(index<len){
	        			$("#screen_"+index).animate({"-webkit-transform":"scale(1)"},move_timer,function(){
		        			$(this).css({"-webkit-transform":"scale(1) translateY(0px)"})
		        			//switchs = true;
		        			//tar.attr("data-index",index+1)
		        		});
		        		$("#screen_"+(index+1)).animate({"-webkit-transform":"translateY("+w_h+"px)"},move_timer);
		        		if(index>1){
		        			$("#screen_"+(index-1)).css("-webkit-transform","translateY(-"+w_h+"px)")
		        		}
	        		}	        		
	        	}else {	//向下滑动
	        		if(index!=1){
	        			$("#screen_"+index).animate({"-webkit-transform":"scale(1)"},move_timer,function(){
		        			$(this).css({"-webkit-transform":"scale(1) translateY(0px)"})
		        			//switchs = true;
		        			//tar.attr("data-index",index-1)
		        		});
		        		$("#screen_"+(index-1)).animate({"-webkit-transform":"translateY(-"+w_h+"px)"},move_timer);
	        			if(index>len){
		        			$("#screen_"+(index+1)).css("-webkit-transform","translateY("+w_h+"px)");
		        		}
	        		}	        		
	        	}
	        }
	    });
	},
	styleInit:function(){
		var w_h = $(window).height();
		$("#screen_1").siblings("section").css({
			"-webkit-transform":"translateY("+w_h+"px)",
			"-moz-transform":"translateY("+w_h+"px)"
		})
	},
	setParallax:function(tar){ //tar为jquery对象
		for(var i=0; i<tar.length; i++){
			var This = tar.eq(i);
			This.addClass(This.attr("data-class"));
		}
	},
	setRemoveParallax:function(tar){ //tar为jquery对象
		for(var i=0; i<tar.length; i++){
			var This = tar.eq(i);
			This.removeClass(This.attr("data-class"));
		}
	},
	ctrlS3_card_leave:function(){
		$(".s3_cardbox>img").click(function(){
			$(this).addClass("s3_card_live");
			if($(".s3_cardbox>.s3_card_live").length==3){
				$(".s3_hidden_show img").addClass("s3_card_live")
			}
		})
	},
	ctrlS6_cover:function(){
		$("#s6_box").click(function(){
			$("#s6_cover").addClass("s6_ani_cover");
		})
		$("#s6_close").click(function(e){
			e.stopPropagation();
			$("#s6_cover").removeClass("s6_ani_cover");
		})
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
	playVideo:function(tar,this_window){
		tar.on('click',function(){
			var mp4=$(this).attr('data-mp4');
			if(ios){
				var playerHolder='<video id="video" src="' + mp4 + '" width="100%" height="auto" controls autoplay preload="auto">您的浏览器不支持该视频！</video>'
				this_window.append(playerHolder);
				var video = $('#video'),
					h = window.innerHeight,
					scrollTop = $(window).scrollTop();
				video[0].play();
				video.css({
					'width': '100%',
					'height': h,
					'position': 'absolute',
					'top': scrollTop,
					'left': 0
				})
				//video[0].addEventListener('webkitbeginfullscreen', onVideoBeginsFullScreen, false);
				//../../images/touch/testvideo.mp4
				video[0].addEventListener('webkitendfullscreen', onVideoEndsFullScreen, false);
				function onVideoEndsFullScreen(){
					$('#video').remove();
				}
			}else {
				var playerHolder = [
					'<div id="playerHolder">',
					'<video id="video" src="' + mp4 + '" width="100%" height="auto" controls autoplay preload="auto">您的浏览器不支持该视频！</video>',
					'<a href="javascript:void(0);" class="video_close"></a>',
					'</div>'
				].join('');
				this_window.append(playerHolder);
				var videoWrapper = $('#playerHolder'),
					video = $('#video'),
					h = window.innerHeight,
					scrollTop = $(window).scrollTop();
				video[0].play();
				document.ontouchmove = function(e) {
					e.preventDefault();
				}
				videoWrapper.css({
					'width': '100%',
					'height': h,
					'position': 'absolute',
					'top': scrollTop,
					'left': 0
				})
				video.attr('height', h);
				$(window).on('resize', function() {
					h = window.innerHeight;
					scrollTop = $(window).scrollTop();
					videoWrapper.css({
						'width': '100%',
						'height': h,
						'position': 'absolute',
						'top': scrollTop,
						'left': 0
					})
					video.attr('height', h);
				})

				$('.video_close').on('click', function() {
					$('#playerHolder').remove();
					document.ontouchmove = function(e) {
						e.default();
					}
				})
			}
			
		})
	}
}