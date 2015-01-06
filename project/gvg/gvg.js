/*
* Gvg.JS
* 2014-7-25
* control Gvg minisite
*/
var platform = navigator.platform;
var ua = navigator.userAgent;
var ios = /iPhone|iPad|iPod/.test(platform) && ua.indexOf( "AppleWebKit" ) > -1;
var andriod = ua.indexOf( "Android" ) > -1;


var imgJson={
	"first":[
		"http://hearthstone.nos.netease.com/3/touch/gvg/common_bg.jpg",	
		"http://hearthstone.nos.netease.com/3/touch/gvg/s1_logo.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s1_goblin.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s1_shark.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s1_rope.png"
	],
	"all":[
		"http://hearthstone.nos.netease.com/3/touch/gvg/s2_people.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s2_logo.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s2_btn_bg.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s2_btn.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/common_bg2.jpg",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s2_slogan.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s3_bg.jpg",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s3_top_bg.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s3_txt_bg.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s3_instrument.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s3_9.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s3_pointer.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s4_bg.jpg",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s3_li_bg.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s3_txt_active_bg.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s4_head.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s4_block_bg.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s4_person.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s4_person_hand.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s5_bg.jpg",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s5_eye.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s5_btn.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s5_btn_line.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s4_hand.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s6_block_bg.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s6_card.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s6_btn.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s6_txt2.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s6_txt1.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s6_rocket.png",
		"http://hearthstone.nos.netease.com/3/touch/gvg/s6_rocket_fire.png",
		"/images/s6_card_bg.png"
	]
};



var Gvg = {
	init: function() {		
		//this.setParallax($("#section_2>div"));
		//Gvg.s2_ctrl();
		this.setLoading();
		this.s3_ctrl();
		//this.s6_ctrl();
		//this.deviceMotion();
		//this.s5_ctrl();
		this.weixinShare();
	},
	setParallax:function(tar){ //tar为jquery对象
		for(var i=0; i<tar.length; i++){
			var This = tar.eq(i);
			This.addClass(This.attr("data-class"));
		}
	},
	isMobile:function(){
		var rule = /(Android|iPod|iTouch|iPhone|BlackBerry|SymbianOS|SymbOS|Windows Phone OS|WAP|pod)/ig;
		return rule.test(navigator.userAgent);
	},
	randomNum:function(num,length){
		var array = [];
		var ran_array = [];
		for(var i=0;i<length;i++){
			array.push(i);
		}
		for(var i=0;i<num;i++){
			var ran = Math.floor(Math.random()*(length-i));
			ran_array.push(array[ran]);
			array.splice(ran,1);
		}
		return ran_array;
	},
	setLoading:function(){
		var v = 0,
			self = this,
			all_img = imgJson["all"],
			len = imgJson["all"].length,
			val = 1,
			num = $("#loading_num"),
			first_img = imgJson["first"];
		var random = parseInt(Math.random()*30);
		var random_img = "http://hearthstone.nos.netease.com/1/gvgs/"+random+".png";
		all_img.push(random_img);
		var onEvent = "click";
		if(self.isMobile()){
			onEvent = "touchstart";
		}
		
	    $.imgpreload(first_img,{ //预先加载loading界面
	    	all: function(){
	    		$.imgpreload(all_img,{
			        each:function(){
			            v++;
			            val = parseInt(v/len*100)-5;
			            percent = parseInt(90-v/len*70)+"%";
			            //console.log(val)
			            $(".loading_num").text(val);
			            $(".s1_rope").css("height",percent);
			            //console.log(1-val);
			        },
			        all: function(){
			        	// $("#section_1").addClass("bigHidden");
			        	// $("#section_2").removeClass("dn");
			        	$("#s1_audio")[0].pause();
			        	$("#section_1").on(onEvent,function(){
							$("#section_1").addClass("bigHidden");
				        	$("#section_2").removeClass("dn");
				        	//$("#s1_audio")[0].pause();
				        	$("#s2_audio")[0].play();
						});
			        	// $("#s2_audio")[0].play();
			        	self.s2_ctrl();
						$(".s1_ld_txt").html("怎么还不发射，<strong>猛砸</strong>屏幕试试！");
			        	$("#s6_card_link").attr("src",random_img);
			        	$(".loading_num").text(99.99);						
						self.s6_ctrl();
						return;
			        }
			    })
	    	}
	    })
	},
	s2_ctrl:function(){
		this.setParallax($("#section_2>div"));
		var onEvent = "click";
		if(Gvg.isMobile()){
			onEvent = "touchstart";
		}
		$(".s2_btn").on(onEvent,function(){
			$("#section_2").addClass("bigHidden");
			$("#section_3").removeClass("dn");
			$("#s2_audio")[0].pause();
			$("#s3_audio")[0].play();
			//Gvg.s3_ctrl();
		})
	},
	s3_ctrl:function(){
		var ran_array = this.randomNum(5,20); //获取随机数
		var html = '';
		var q_data = gvgData.question;
		//console.log(q_data.length);
		//console.log(ran_array);
		for (var i=0;i<ran_array.length;i++){
			var q_html = [
				'<div class="s3_question">',
					'<div class="s3_title s3_txt">${title}</div>',
					'<ul class="s3_txt_box">',
						'{@each topic as item,index}',
						'<li>',
							'<img src="http://hearthstone.nos.netease.com/3/touch/gvg/s3_li_bg.png">',
							'<span class="s3_txt">${item}</span>',
						'</li>',
						'{@/each}',
					'</ul>',
				'</div>'
			].join("");
			var result = juicer(q_html,q_data[ran_array[i]]);
			html+=result;
		}
		$(".s3_question_box").html(html);
		var onEvent = "click";
		if(Gvg.isMobile()){
			onEvent = "touchstart";
		}
		var click_switch = 0;
		$(".s3_txt_box>li").on(onEvent,function(){
			var This = $(this);
			var index = $(".s3_question_box").data("index");
			This.addClass("active");
			$("#yaoyiyao")[0].play();
			if(index<5){
				This.parents(".s3_question").addClass("hidden");
				$(".s3_question_box").data("index",index+1);
			}else {
				if(click_switch==0){
					$("#section_3").addClass("bigHidden");
					$("#section_4").removeClass("dn").addClass("play");
					$("#s3_audio")[0].pause();
					$("#s4_audio")[0].play();
					click_switch = 1;
					Gvg.deviceMotion(); // 启动第四祯重力感应
				}
			}
		})
	},
	s4_ctrl:function(ran){
		if(ran>7){
			$("#section_4").addClass("dn");
			$("#section_5").removeClass("dn");
			$(".s5_btn").addClass("play");
			Gvg.s5_ctrl();
			$("#s5_audio1")[0].play();
			setTimeout(function(){
				$("#s5_audio2")[0].play();
			},500)
		}else {
			$(".s4_txt").text("嘿！什么东西掉了？！");
			$("#s4_head").addClass("play");
			//$(window).off('devicemotion'); 
			setTimeout(function(){
				$("#section_4").addClass("bigHidden");
				$("#section_6").removeClass("dn");
				$("#s6_audio")[0].play();
			},3000);
		}
		//alert(1);
	},
	//重力感应
	deviceMotion:function(){
		var x = y = z = last_x = last_y = last_z = 0; 
		var move_num = 0;
		var lastTime = 0;
		var max = 0;
		var self = this;
		var speed = 0;
		var speed_switch = 1;
		var self = this;
		//var t=0;
		function deviceMotionHandler(eventData) { 			
			console.log(1)
			var m = eventData.accelerationIncludingGravity;
			var currentTime = new Date().getTime();
			if((currentTime - lastTime)>100){
				var diffTime =  currentTime -lastTime;
				lastTime = currentTime;
				x =m.x;
				y =m.y; 
				z =m.z;
				speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;
				last_x = x;    
				last_y = y;    
				last_z = z;
				if(speed>1500&&speed_switch==1){
					speed_switch = 0;
					var ran = Math.random() * 10;
					self.s4_ctrl(ran);
					$(window).off('devicemotion', deviceMotionHandler, false);
				}	
			}
		}
		if (window.DeviceMotionEvent) {  
			$(window).on('devicemotion',deviceMotionHandler, false);
			console.log(2)
		}else {
			setTimeout(function(){
				//var ran = Math.random()*10;
				Gvg.s4_ctrl(1); //随机判断下一帧
				//alert(a++);
				return false;
			},10000)
		};

		this.s5_ctrl = function(){
			function return_s4(){
				$("#section_4").removeClass("dn");
				$("#section_5").addClass("dn");
				speed_switch = 1;
				$(window).on('devicemotion',deviceMotionHandler, false);
				//$(window).off('devicemotion'); 
				//Gvg.deviceMotion();
				//alert("a")
			}
			var timer = setTimeout(function(){
				return_s4();
			},5000)
			$(".s5_btn").on("click",function(){
				clearTimeout(timer);
				return_s4();
			})
		}
	},/*
	s5_ctrl:function(){
		//第5祯
		var self = this;
		function return_s4(){
			$("#section_4").removeClass("dn");
			$("#section_5").addClass("dn");
			//$(window).on('devicemotion',self.deviceMotionHandler, false);
			//$(window).off('devicemotion'); 
			Gvg.deviceMotion();
			alert("a")
		}
		var timer = setTimeout(function(){
			return_s4();
		},5000)
		$(".s5_btn").on("click",function(){
			clearTimeout(timer);
			return_s4();
		})
	},*/
	s6_ctrl:function(){
		var w_w =  $(window).width(),
			n_w = 330,
			n_h = 480;
		if(n_w<=640){
			n_w = w_w/640*330;
			n_h = w_w/640*480;
		}else {
			n_w = 330;
		}
		new JV.scratch({
            canvas:"#scratch",
            img:".s6_card img",
            w:n_w,
            h:n_h,
            fg:"/images/s6_card_bg.png",
            callback:function(){
            	$(".s6_rocket").addClass("play");
            	$("#s6_title2").removeClass("dn");
            	$("#s6_title1").addClass("bigHidden");
            	$("#scratch").remove();
            	$("#s6_audio")[0].play();
            }
        });

        new JV.animCanvas("#J_AnimCanvas",{
        	width:"100%",
        	height:"100%"
        }); 

	},
	weixinShare:function(){


    	window.shareData = {
	        "img_url":"http://hearthstone.nos.netease.com/3/touch/gvg/share_icon.jpg",
	        "img_width": "90",
			"img_height": "90",
	        "link":'http://www.hearthstone.com.cn//touch/minisite/gvg',
	        "desc":'地精大战侏儒”已经正式上线，测一测属于你的卡牌！',
	        "title":"《炉石传说》首个扩展包“地精大战侏儒”现已发布，快来测测你的专属卡牌！"
        };
		document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
	        // 发送给好友
	        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
	            WeixinJSBridge.invoke('sendAppMessage', shareData, function (res) {
	                _report('send_msg', res.err_msg);
	            })
	        });
	        // 分享到朋友圈
	        WeixinJSBridge.on('menu:share:timeline', function (argv) {
	            WeixinJSBridge.invoke('shareTimeline', shareData, function (res) {
	                _report('timeline', res.err_msg);
	            });
	        });
	 
	    }, false)
	}
}