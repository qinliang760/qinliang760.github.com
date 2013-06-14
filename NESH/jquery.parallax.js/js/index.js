
var netMkey=(function(){
    var niceScrollParams={
        scrollspeed:100,
        cursorcolor:'#eaeaea',
        cursorborder:'1px solid #ccc',
        cursorwidth:'8px',
        ZIndex:100,
        cursorborderradius:0
    }
    /*DOM Element*/
    var fixNavLi=$("#fix-nav li");
    var p2CountDown=$("#p2-countdown");
    var p2Phone=$("#p2-phone");
    var p3Phone=$("#p3-phone");
    var p3Off=$("#p3-off");
    var p4Zhang=$("#p4-zhang");
    var p5Tip=$("#p5-tip");
    var p5Phone=$("#p5-phone");

    /*CountDown Param*/
    var COUNTDOWNTIME=0;
    var posArr=[0,1026,2045,3064,4084,5112];

    /*functions*/
    function bindRightFixedFn(){
		$("#fix-nav-down").click(function(){
			var sTop=$(window).scrollTop();
			for(var i=0;i<posArr.length;i++){
				if(sTop<posArr[i]){
					$('body,html').stop().animate({scrollTop:posArr[i]});
					break;
				}
			}
		})
	}
    function countDownStFn(){
        var defaultWidth = 302;
        var percent = 0.0167 * defaultWidth;
        var countdownSt = setInterval(function () {
            COUNTDOWNTIME++;
            if (COUNTDOWNTIME == 61) {
                $("#p2-countdown").detach();
                $("#p2-count-out img").detach();
                $("<div id='p2-countdown'></div> ").appendTo($("#page2 .cont"));   //���¼���DOM
                $("<img src='http://res.nie.netease.com/mkey/gw/13v2/images/p2count.png' alt=''> ").appendTo($("#p2-count-out"));
                var num1 = Math.floor(Math.random() * (999 - 100) + 100);
                var num2 = Math.floor(Math.random() * (999 - 100) + 100);
                $("#p2-countnum .n1").html(num1);
                $("#p2-countdown-b1").html(num1);
                $("#p2-countnum .n2").html(num2);
                $("#p2-countdown-b2").html(num2);
                COUNTDOWNTIME = 0;
            }
            $("#p2-countdown").css({
                width:$("#p2-countdown").width() +percent
            })
            $("#p2-count-out img").css({
                left:-170+(COUNTDOWNTIME)*0.0167*170
            })
        }, 1000)
    }
    function bindNicescrollFn(){
        if(!($.browser.msie&&$.browser.version=="7.0")){ 
            $("body").niceScroll(niceScrollParams);
        }
    }
    function bindNavFn(height){
        var index=0;
        for(var i=0;i<posArr.length;i++){
            if(height<posArr[i]){
                  index=i-1;
                  break;
            }
        }

        fixNavLi.removeClass("current");
        fixNavLi.eq(index).addClass("current");
    }
    function bindNavClick(){

        fixNavLi.each(function(index){
            $(this).click(function(){
                var top=posArr[index];
                $('body,html').stop().animate({
                    scrollTop:top
                },Math.abs(parseInt(($(window).scrollTop()-top)*0.7)),'easeOutCubic')
            })
        })

    }
    function bindScrollFn(){
        $(window).scroll(function () {
            var scrolled = $(window).scrollTop();
            var bindnav=bindNavFn(scrolled);
            var scrolled2 = (scrolled - 500) > 0 ? (scrolled - 500) : 0;
            var scrolled3 = (scrolled - 2160) > 0 ? (scrolled - 2160) : 0;
            $("#layout1").css({
                top:(0 - (scrolled * 0.5))
            });
            $("#layout2").css({
                top:(0 - (scrolled2 * 0.6))
            });
            $("#layout4").css({
                top:(0 - (scrolled3 * 0.6))
            });
            if (scrolled > 980) {
                p2Phone.css({
                    width:500
                })
            } else {
                p2Phone.css({
                    width:355
                })
            }
            if (scrolled > 2020) {
                p3Phone.css({
                    left:80,
                    opacity:1
                })
                p3Off.addClass("p3offshow");
            } else {
                p3Phone.css({
                    left:-110,
                    opacity:0
                })
                p3Off.removeClass("p3offshow");
            }
            if (scrolled > 3060) {
                p4Zhang.css({
                    right:155,
                    top:370
                })
            } else {
                p4Zhang.css({
                    right: 100,
                    top: 420
                })
            }
            if (scrolled > 4040) {
                p5Phone.addClass("phoneshow");
                p5Tip.addClass("p5tipshow");
            } else {
                p5Phone.removeClass("phoneshow");
                p5Tip.removeClass("p5tipshow");
            }
        })
    }

    function init(){
        countDownStFn();
        bindScrollFn();
        bindNicescrollFn();
        bindNavClick();
	   bindRightFixedFn();
    }
    return{
        init:init
    }
}())

$(function(){
    nie.config.copyRight.setWhite();
    netMkey.init();
})


