var Swipe = {
    init: function(data) {
        this.setData(data);
        this.setLoading(data);
        //this.playMusic();
        this.setPageClick();

    },
    setData: function(data) {
        var self = this;
        for (var i = 0; i < data.length; i++) {
            var s = data[i];
            if (s.picSlide != null) {
                self.setHtml(s.picSlide, i);
            }
        }
    },
    setHtml: function(data, i) {
        //var data=data;
        /*      var a=_.filter(data.screen,function(num){
                    if(num.picSlide!=null){
                        return true;
                    }
                    return false;
                })*/
        var json = {};
        var page = $(".wp-inner > .page");
        json.d = data;



        var swipeHtml = [

            '<div class="wp-page-wp wp-page' + i + '-wp" data-cur="0" data-index="' + i + '">',
            '{@each d as item}',
            '<div class="page-sub page' + i + '-sub" style="background-image:url(${item})"></div>',
            '{@/each}',
            '</div>',
            '<ul class="w-focus w-focus' + i + '">',
            '{@each d as item,index}',
            '<li{@if index==0} class="active"{@/if}></li>',
            '{@/each}',
            '</ul>',
            '<img class="common_arrow_l" src="http://heroes.nos.netease.com/1/images/touch/minisite/conference/common_arrow_l.png">',
            '<img class="common_arrow_r" src="http://heroes.nos.netease.com/1/images/touch/minisite/conference/common_arrow_r.png">'
        ].join('');


        //juicer.register('formatToC', Cards.getName);
        var result = juicer(swipeHtml, json);
        page.eq(i).append(result);
        this.setFullpage(i);

    },
    setFullpage: function(i) {
        var a = new JV.fullpage('.wp-inner', {
            afterChange: function(e) {
                /*if(e.cur==2){
                    a.stop();
                }*/
            }
        });

        var focus_page2 = $(".w-focus" + i + " li");
        var l = focus_page2.length;
        Swipe["b" + i] = new JV.fullpage('.wp-page' + i + '-wp', {
            dir: "h",
            loop: false,
            page: ".page" + i + "-sub",
            afterChange: function(e) {
                var cur = e.cur; //debugger;
                if (cur == 0) {
                    $('.wp-page' + i + '-wp').siblings(".common_arrow_l").hide();
                } else if (cur >= 1 && cur < l - 1) {
                    $('.wp-page' + i + '-wp').siblings(".common_arrow_l").show();
                    $('.wp-page' + i + '-wp').siblings(".common_arrow_r").show();
                } else {
                    $('.wp-page' + i + '-wp').siblings(".common_arrow_r").hide()
                }

                focus_page2.eq(cur).addClass("active").siblings().removeClass("active");
            }
        });


    },
    setLoading: function(data) {
        var picArr = _.pluck(data, "pic");

        var imgJson = picArr;
        $.imgpreload(imgJson, {
            all: function() {
                $(".page2 .loading").css("background-image", "url(http://heroes.nos.netease.com/1/images/touch/minisite/conference/bg.jpg)");
                $(".u-loading").addClass("fadeOutTop").remove();
                $(".u-logo").addClass("fadeInBottom");
                setTimeout(function() {
                    $(".page2 .loading").addClass("fadeOutBottom");
                })    
                //Confer.setFullpage();


            }
        })
    },
    playMusic: function() {
        var music = document.getElementById('play_music');
        music.play();
        $(".s1_playmusic").click(function() {
            var This = $(this);
            var val = This.attr("data-play")
            if (val == "y") {
                music.pause();
                This.attr("data-play", "n").removeClass("s1_ani_playmusic");
            } else if (val == "n") {
                music.play();
                This.attr("data-play", "y").addClass("s1_ani_playmusic");
            }
        })
    },
    setPageClick: function() { //for pc 兼容
        //var curIndex1=0,curIndex2=0;
        $(".common_arrow_r").click(function() {
            var pt = $(this).siblings(".wp-page-wp"),
                index = pt.data("index"),
                cur = parseInt(pt.data("cur"));
            cur++
            pt.data("cur", cur);
            Swipe["b" + index].moveTo(cur, true)
        })
        $(".common_arrow_l").click(function() {
            var pt = $(this).siblings(".wp-page-wp"),
                index = pt.data("index"),
                cur = parseInt(pt.data("cur"));

            cur--
            pt.data("cur", cur);
            Swipe["b" + index].moveTo(cur, true)
        })

    }

}