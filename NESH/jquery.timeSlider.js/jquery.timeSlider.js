/**
 * @fileoverview 
 * @author jay
 * @module TimeSlider
 **/
(function($){
	$.ns("JV");

    /**
     * 
     * @class TimeSlider
     * @constructor
     * @extends Base

	    参数1  视差区域的ID
	    参数2：设置参数


     */
     JV.TimeSlider=function(Jnode,cfg){
        var self = this;
        var defaults={
            headClass:".timeline-head",//导航ID
            pagesClass:".timeline-pages",//导航链接
            scrubberClass:".timeline-scrubber",
            prevClass:".timeline-page-left",
            nextClass:".timeline-page-right"
        }
		this.items = $(Jnode);
        this.cfg = $.extend({},defaults, cfg);//合并defaults和cfg，不修改defaults
        this.head=$(this.cfg.headClass,this.items);
        this.pages=$(this.cfg.pagesClass,this.items);
        this.scrubber=$(this.cfg.scrubberClass,this.items);
        this.prev=$(this.cfg.prevClass,this.items);
        this.next=$(this.cfg.nextClass,this.items);

		this.init();

    }
	
	JV.TimeSlider.prototype = {
        init: function() {
            var self = this;
            self.setTimeSlider();//设置视差
            self.setDrag();


        },
        setTimeSlider:function(){
            var self=this;

        },
        setDrag:function(){
            var self=this;
            var storyJson=[
                {
                    "1":8
                    
                },
                {
                    "2":10
                },
                {
                    "3":6
                },
                {
                    "4":7
                },
                {
                    "5":6
                },
                {
                    "6":7
                },
                {
                    "7":9
                },
                {
                    "8":1
                }                                                              

            ];

            var total=772,
                ever_w=772/(storyJson.length-1),//每个阶段的长度
                ever_point=[],ever_inner_point=[];

            for(var i=1;i<storyJson.length;i++){
                ever_point.push(parseFloat((ever_w*i).toFixed(2)));
            }

            for (var j=0;j<ever_point.length;j++){
                var t=j+1;
                var inner_l=storyJson[j][t];
                var inner_w=ever_point[j]/inner_l;
                for(var n=1;n<inner_l+1;n++){
                    if(j==0){
                        ever_inner_point.push(inner_w*n);
                    }else{console.log(inner_w*n);
                        var m=j-1;
                       ever_inner_point.push((inner_w*n)+ever_point[m]); 
                    }
                    
                }
            }debugger;
            $(".scrubber-page-indicator").draggable({
                revert:false,
                onDrag:function(e){
                    var d=e.data;
                    d.top=0;
                    if(d.left<0){
                        d.left=0;
                    }             
                    if(d.left>772){
                        d.left=772;
                    }
                }
            })



        }        
	};//prototype



 })(jQuery);


