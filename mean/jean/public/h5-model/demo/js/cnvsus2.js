/*
 * cn-vs-us.JS
 * 2014-7-25
 * control cn-vs-us minisite
 */
var platform = navigator.platform;
var ua = navigator.userAgent;
var ios = /iPhone|iPad|iPod/.test(platform) && ua.indexOf("AppleWebKit") > -1;
var andriod = ua.indexOf("Android") > -1;

var questionData = [{
	"q":"吃饭的时候，<br>你是喜欢用筷子还是刀叉?",
	"cn_img":"http://hearthstone.nos.netease.com/3/touch/cnvsus/question/q1_cn.png",
	"us_img":"http://hearthstone.nos.netease.com/3/touch/cnvsus/question/q1_us.png"
},{
	"q":"你喜欢住在高大上的市区CBD还是清新恬静的郊区小镇?",
	"cn_img":"http://hearthstone.nos.netease.com/3/touch/cnvsus/question/q2_cn.png",
	"us_img":"http://hearthstone.nos.netease.com/3/touch/cnvsus/question/q2_us.png"
},{
	"q":"平时出行<br>你是骑车还是开车？",
	"cn_img":"http://hearthstone.nos.netease.com/3/touch/cnvsus/question/q3_cn.png",
	"us_img":"http://hearthstone.nos.netease.com/3/touch/cnvsus/question/q3_us.png"
},{
	"q":"茶和咖啡<br>你更偏爱哪种口味的饮料？",
	"cn_img":"http://hearthstone.nos.netease.com/3/touch/cnvsus/question/q4_cn.png",
	"us_img":"http://hearthstone.nos.netease.com/3/touch/cnvsus/question/q4_us.png"
},{
	"q":"你是白天洗澡还是<br>晚上洗澡？",
	"cn_img":"http://hearthstone.nos.netease.com/3/touch/cnvsus/question/q5_cn.png",
	"us_img":"http://hearthstone.nos.netease.com/3/touch/cnvsus/question/q5_us.png"
},{
	"q":"你更向往哪种老年生活？",
	"cn_img":"http://hearthstone.nos.netease.com/3/touch/cnvsus/question/q6_cn.png",
	"us_img":"http://hearthstone.nos.netease.com/3/touch/cnvsus/question/q6_us.png"
},{
	"q":"在游戏展上，你更喜欢看美女<br>showgirl还是体验新游？",
	"cn_img":"http://hearthstone.nos.netease.com/3/touch/cnvsus/question/q7_cn.png",
	"us_img":"http://hearthstone.nos.netease.com/3/touch/cnvsus/question/q7_us.png"
},{
	"q":"旅行的时候,你喜欢拍照<br>还是用眼睛看风景？",
	"cn_img":"http://hearthstone.nos.netease.com/3/touch/cnvsus/question/q8_cn.png",
	"us_img":"http://hearthstone.nos.netease.com/3/touch/cnvsus/question/q8_us.png"
},{
	"q":"周末，你是宅着玩游戏<br>还是去户外运动？",
	"cn_img":"http://hearthstone.nos.netease.com/3/touch/cnvsus/question/q9_cn.png",
	"us_img":"http://hearthstone.nos.netease.com/3/touch/cnvsus/question/q9_us.png"
}]


var CnVsUs = {
	init: function() {
		FastClick.attach(document.body);
		this.setScreen();
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
	setShare:function(){
		$(".s7_select_box").click(function(){
			var This = $(this);
			var num = $(".select_cn").length;
			var name = "";
			This.addClass("active").siblings().removeClass("active");
			console.log(num)
			if(num>2){
				name = "cn";
				document.title = "经测试，我是崇尚传统的中式生活方式，你是同道中人吗？"
			}else {
				name = "us";
				document.title = "经测试，我是崇尚自由的美式生活方式，你是同道中人吗？"
			}
			//显示分享结果
			$("#last_screen").addClass(name);
			$(".share_box_"+name).addClass("share_show");
		})
	},
	setSlide:function(){
		var h = $(window).height();
		$(".s1_play").click(function(){
			$("#content").css("top",-h+"px");
			//$("#content").css("-webkit-transform","translateY(-"+h+"px)");
			$(".question_dtl").eq(0).addClass("show");
			$(".select_wrap").eq(0).addClass("show");
			//$("#screen_7").addClass("show");
		});
		$(".select_box").click(function(){
			var This = $(this);
			var name = This.attr("data-name");
			var index = parseInt(This.parents(".screen").attr("data-index"))+1;
			This.addClass(name).addClass("active").siblings().removeClass("active");
			$(".question_dtl").eq(index).addClass("show");
			$("#content").css("top",-h*(index+1)+"px");
			//$("#content").css("-webkit-transform","translateY(-"+h*(index+1)+"px)");
			$(".select_wrap").eq(index).addClass("show");
			if(index>4){
				$("#screen_7").addClass("show");
			}
		})
	},
	setScreenHtml:function(){
		var html = [
		'{@each qData as item,index}',
		'<section class="screen" data-index="${index}">',
            '<div class="line question_line"></div><div class="circle s_circle_top"></div><div class="circle s_circle_bottom"></div>',
            '<div class="question_box">',
                '<div class="q_head"></div>',
                '<div class="question_dtl">',
                    '<img src="http://hearthstone.nos.netease.com/3/touch/cnvsus/dialog.png">',
                    '<p class="s1_p">$${item.q}</p>',
                '</div>',
            '</div>',
            '<div class="select_wrap">',
                '<div class="select_left select_box" data-name="select_cn">',
                    '<img class="select_box_bg" src="http://hearthstone.nos.netease.com/3/touch/cnvsus/bg_select.png">',
                    '<div class="select_cont">',
                        '<img src="${item.cn_img}">',
                    '</div>',
                '</div>',
                '<div class="select_right select_box" data-name="select_us">',
                    '<img class="select_box_bg" src="http://hearthstone.nos.netease.com/3/touch/cnvsus/bg_select.png">',
                    '<div class="select_cont">',
                        '<img src="${item.us_img}">',
                    '</div>',
                '</div>',
            '</div>',
        '</section>',
        '{@/each}'].join("");
        return html;
	},
	setScreen:function(){
		var self = this;
		var random = self.randomNum(5,9);
		var qJson = {};
		var s7_html = $("#J_screen_7").html();
		qJson.qData = [];
		for(var i=0;i<random.length;i++){
			qJson.qData.push(questionData[random[i]]);
		}
		var html = self.setScreenHtml();
		var result = juicer(html,qJson);
		//console.log(result);
		$("#content").append(result)
		$("#content").append(s7_html);
		self.setSlide();
		self.setShare();
	}
}