var tvShow={
	init:function(){
		this.showTabs();
		this.setPager();
        this.videoHandle();
        this.showTable();
        this.showVideo();
	},
	showTabs:function(){
		var list=$(".nav li a");
		list.click(function(){
			var t=$(this),
				rel=t.attr("rel");
                
/*            if(rel=="showThree"){
                alert("敬请期待！")
                return false;
            } */               
            t.addClass('active');
            t.parent().siblings().find("a").removeClass('active');    
			$("div[id="+rel+"]").show().siblings().hide();
			return false;
		})
	},
	setPager:function(){
			$(".show_mx_page").pagination(stars.length,{
                items_per_page:5,
                num_display_entries:0,
                prev_text:"&lt;&lt;上一周",
                next_text:"下一周&gt;&gt;",
                callback:function(page_index){
                    var items_per_page = 5;
                    var max_elem = Math.min((page_index+1) * items_per_page, stars.length);
                    var newcontent = [],starStyle="";

                    for(var i=page_index*items_per_page;i<max_elem;i++)
                    {

                        if(i==(page_index*items_per_page)+1){
                            starStyle=' style="margin-right:12px;"';    
                        }else{
                            starStyle="";
                        }
                        var str=['<div class="show_mx"'+starStyle+'>',
                            '<h3 class="sprite">'+stars[i].time+'</h3>',
                            '<div class="show_mx_con clearFix">',
                                '<div>',
                                    '<img src="'+stars[i].pic[0]+'" alt="" width="115" height="94">',
                                    '<span class="sprite name">'+stars[i].name[0]+'</span>',
                                    '<span class="des">'+stars[i].info[0]+'</span>',
                                '</div>',
                                '<span class="sprite sprite_c">VS</span>',
                                '<div>',
                                    '<img src="'+stars[i].pic[1]+'" alt="" width="115" height="94">',
                                    '<span class="sprite name">'+stars[i].name[1]+'</span>',
                                    '<span class="des">'+stars[i].info[1]+'</span>',
                                '</div>',                   
                            '</div>',
                        '</div>'].join("");
                        newcontent.push(str);                        
                    }

                    $('.show_mx_list').html(newcontent.join(""));                    
                    return false;
                }
            });
            $(".show_jm_page").pagination(videos.length,{
                items_per_page:4,
                num_display_entries:0,
                prev_text:"&lt;&lt;上一页",
                next_text:"下一页&gt;&gt;",
                callback:function(page_index){
                    var items_per_page = 4;
                    var max_elem = Math.min((page_index+1) * items_per_page, videos.length);
                    var newcontent = [];

                    for(var i=page_index*items_per_page;i<max_elem;i++)
                    {

                        var str=['<li>',
                            '<a href="#" data-mp4="'+videos[i].mp4+'" data-flv="'+videos[i].flv+'"><img class="video_border" src="'+videos[i].pic+'" alt="" width="207" height="118"><span class="btn_video_s"></span></a>',
                            '<p class="show_jm_title"><span class="fr" style="width:127px;overflow:hidden;text-align:right;">'+videos[i].name+'</span><span>'+videos[i].time+'</span></p>',
                        '</li>'].join("");
                        newcontent.push(str);                        
                    }

                    $('.show_jm_con ul').html(newcontent.join(""));                    
                    return false;
                }
            });		
	},
    addFlash:function(path,id,w,h){
        var params = {
            menu: "false",
            allowFullScreen: "false",
            allowScriptAccess: "true",
            wmode: "transparent",
            base: "."
        };
        swfobject.embedSWF(path, id, w, h, "9.0.0", "", "", params);
    },
    videoWrap:function(src,w,h,flashvars){
        var v='<object width="'+w+'" height="'+h+'" id="FPlayer" data="'+src+'" type="application/x-shockwave-flash"><param value="transparent" name="wmode" /><param value="true" name="allowFullScreen" /><param value="always" name="allowscriptaccess" /><param value="'+src+'" allownetworking="all" name="movie" /><param value="'+flashvars+'" name="flashvars" /></object>';
        return v;
    },
    showIosVideo: function(url,w,h) {

        var ios_html = '<video controls="controls" width="'+w+'" height="'+h+'" poster="">\
                    <source src="' + url + '" type="video/mp4" />\
                </video>';
        return ios_html;

    },
    isTouch:function(){
        var rule=/(Android|iPod|iPad|iTouch|iPhone|BlackBerry|SymbianOS|SymbOS|Windows Phone OS|WAP|pod|pad)/ig;
        return rule.test(navigator.userAgent);
    },        
    getBoxwrap:function(){
        var boxwrap=['<div id="lightbox-container" style="display:block;width:960px;height: 595px;">',
                    '<h1 id="lightbox-title"></h1>',
                    '<div id="lightbox-content">',
                    '',
                    '</div>',
                    '<div class="corner corner-top-left"></div>',
                    '<div class="corner corner-top-right"></div>',
                    '<div class="corner corner-bottom-left"></div>',
                    '<div class="corner corner-bottom-right"></div>',
                    '<div class="border" id="lb-border-top" style="width: 960px;"></div>',
                    '<div class="border" id="lb-border-right" style="height: 595px;"></div>',
                    '<div class="border" id="lb-border-bottom" style="width: 960px;"></div>',
                    '<div class="border" id="lb-border-left" style="height: 595px;"></div>',
                    '<div class="control-wrapper no-paging no-gallery">',
                        '<p class="title"></p>',
                    '</div>',
                    '<a class="ui-element lightbox-close" href="javascript:;"></a>',             
                    '</div>'
                    ];
        return  boxwrap;        
    },
    setBoxwrap:function(w,h,con){
        var boxwrap='<div id="lightbox-container" style="display:block;width:'+w+';height: '+h+';">'+

                    '<div id="lightbox-content">'+
                    con+
                    '</div>'+
                    '<div class="corner corner-top-left"></div>'+
                    '<div class="corner corner-top-right"></div>'+
                    '<div class="corner corner-bottom-left"></div>'+
                    '<div class="corner corner-bottom-right"></div>'+
                    '<div class="border" id="lb-border-top" style="width: '+w+';"></div>'+
                    '<div class="border" id="lb-border-right" style="height: '+h+';"></div>'+
                    '<div class="border" id="lb-border-bottom" style="width: '+w+';"></div>'+
                    '<div class="border" id="lb-border-left" style="height: '+h+';"></div>'+

                    '<a class="ui-element lightbox-close" href="javascript:;"></a>'+             
                    '</div>';
        return  boxwrap;        
    },
    videoHandle:function(){
        var video=$(".show_jm_con li a");

        video.click(function(){
            var t=$(this),
                flv=t.attr("data-flv"),
                mp4=t.attr("data-mp4");

            
            if(tvShow.isTouch()){
                var videowrap=tvShow.showIosVideo(mp4,960,520);
            }else{
                var videowrap=tvShow.videoWrap("http://v.163.com/swf/video/NetEaseFlvPlayerV3.swf",960,520,flv);
            }    
            
            var boxwrap=tvShow.getBoxwrap();
            boxwrap[3]=videowrap;   
            $.sc2.lightBox(boxwrap.join(""),{model:true,hasClose:false});
            return false;
        })
        $(".lightbox-close").live("click",function(){
            $("#popBox").remove();
            $("#boxModel").remove();
        })        
    },
    showTable:function(){
        var link=$(".show_jm_s a");

        link.click(function(){
            $.sc2.lightBox($("#selectTable").html(),{model:true});
            return false;
        })
    },
    showVideo: function() {
        var video1 = $("#topVideoW"),
            video2=$("#show_jm_v");
        if (tvShow.isTouch()) {
            var videowrap = tvShow.showIosVideo("http://flv.bn.netease.com/videolib3/1405/06/gOKwr6083/SD/gOKwr6083-mobile.mp4",412,268);
            var videowrap2 = tvShow.showIosVideo("http://flv.bn.netease.com/videolib3/1405/06/gOKwr6083/SD/gOKwr6083-mobile.mp4",517,304);
        } else {
            var videowrap = tvShow.videoWrap("http://v.163.com/swf/video/NetEaseFlvPlayerV3.swf", 412, 268, "pltype=7&amp;topicid=0031&amp;vid=V9QKJ5GQQ&amp;sid=V9LKOJ9CL&amp;coverpic=http://hearthstone.nos.netease.com/1/news/201405/j_tv.jpg&amp;autoplay=false&amp;showend=false&amp;hiddenR=true");
            var videowrap2 = tvShow.videoWrap("http://v.163.com/swf/video/NetEaseFlvPlayerV3.swf", 517, 304, "pltype=7&amp;topicid=0031&amp;vid=V9QKJ5GQQ&amp;sid=V9LKOJ9CL&amp;coverpic=http://hearthstone.nos.netease.com/1/news/201405/j_tv.jpg&amp;autoplay=false&amp;showend=false&amp;hiddenR=true");

        }
        video1.html(videowrap);
        video2.html(videowrap2);
    }
};