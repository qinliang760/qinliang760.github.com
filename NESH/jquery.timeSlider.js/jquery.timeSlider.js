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
            self.setPage();


        },
        setTimeSlider:function(){
            var self=this;

        },
        setShowPic:function(left,point,inner_point){
            var cur_index=_.sortedIndex(point,left),//第几阶段
                inner_index,
                img=this.pages.find("img");//debugger;

            if(left==0){
                cur_index=1
                inner_index=1
$(".scrubber-unselected-chapter[data-scrubber-chapter-index="+_.indexOf(point, left)+"]").addClass("scrubber-selected-chapter").siblings().removeClass("scrubber-selected-chapter");                
            }else{
                if(_.indexOf(point, left)!=-1){
                   cur_index=_.indexOf(point, left)+1;
                    inner_index=1;
                    $(".scrubber-unselected-chapter[data-scrubber-chapter-index="+_.indexOf(point, left)+"]").addClass("scrubber-selected-chapter").siblings().removeClass("scrubber-selected-chapter");
                }else{
                    inner_index=_.indexOf(inner_point[cur_index-1],left)+2;
$(".scrubber-unselected-chapter").removeClass("scrubber-selected-chapter");                

                }                
            }    

            //第几阶段第几点    
                

                //debugger;
            if(inner_index>9){
                img.attr("src","http://diablo3.nos.netease.com/1/story/pages/0"+cur_index+"-"+inner_index+".jpg").attr("data-page",cur_index+"-"+inner_index);
            }else{
                img.attr("src","http://diablo3.nos.netease.com/1/story/pages/0"+cur_index+"-0"+inner_index+".jpg").attr("data-page",cur_index+"-"+inner_index);
            }  

            var ever_inner_point=_.flatten(inner_point);
            ever_inner_point.unshift(0);  
            $(".scrubber-current-page").text(_.indexOf(ever_inner_point, left)+1);
            

        },
        setPage:function(){
            var self=this;

            var storyJson=[8,10,6,7,6,7,8,1];
            var img=self.pages.find("img");
            this.next.click(function(){
                
                var page=img.attr("data-page"),
                    point_index=parseInt(page.split("-")[0]),
                    point=parseInt(page.split("-")[1]);

                var point_l= storyJson[point_index-1];
                if(point<point_l){
                    point++
                }else{
                    point_index++;
                    point=1;
                }

                if(point_index==storyJson.length && point==1){
                    $(".timeline-page-right").hide();
                }                

                if(point>9){
                    img.attr("src","http://diablo3.nos.netease.com/1/story/pages/0"+point_index+"-"+point+".jpg").attr("data-page",point_index+"-"+point);   

                }else{
                    img.attr("src","http://diablo3.nos.netease.com/1/story/pages/0"+point_index+"-0"+point+".jpg").attr("data-page",point_index+"-"+point);   

                }
                    




            })

            this.prev.click(function(){
                
                var page=img.attr("data-page"),
                    point_index=parseInt(page.split("-")[0]),//第几阶段
                    point=parseInt(page.split("-")[1]);//阶段点数

                var point_l= storyJson[point_index-1];
                if(point>1){
                    point--
                }else{
                    point_index--;
                    point=storyJson[point_index-1];
                }

                if(point==1 && point_index==1){
                    $(".timeline-page-left").hide();
                }
                

                if(point>9){
                    img.attr("src","http://diablo3.nos.netease.com/1/story/pages/0"+point_index+"-"+point+".jpg").attr("data-page",point_index+"-"+point);   

                }else{
                    img.attr("src","http://diablo3.nos.netease.com/1/story/pages/0"+point_index+"-0"+point+".jpg").attr("data-page",point_index+"-"+point);   

                }
                    




            })

        },
        setFloat2:function(data){
            var self=this;
            return Math.round(parseFloat(data)*100)/100;
        },
        setDrag:function(){
            var self=this;
            var storyJson=[8,10,6,7,6,7,8,1];

            var total=772,
                ever_w=772/(storyJson.length-1),//每个阶段的长度
                ever_point=[],//每个点的left值
                ever_inner_arr=[];//每个点在每个阶段的集合
                //ever_inner_point=[];//所有点的集合

            for(var i=1;i<storyJson.length;i++){
                ever_point.push(self.setFloat2(ever_w*i));//保留两位浮点数
            }


            for (var j=0;j<ever_point.length;j++){
                var m=j;
                var inner_l=storyJson[j];//每个阶段的点的个数

                if(j==0){
                    var inner_w=ever_point[j]/inner_l;
                }else{
                    var inner_w=(ever_point[j]-ever_point[m-1])/inner_l;//每个阶段每个点的长度
                }

                ever_inner_arr[j]=[];

                for(var n=1;n<inner_l+1;n++){
                    var w=inner_w*n;
                    if(j==0){
                        ever_inner_arr[j].push(self.setFloat2(w));//每个阶段每个点的left
                    }else{                        
                        ever_inner_arr[j].push(self.setFloat2(w+ever_point[m-1]));//每个阶段每个点的left
                    }
                    
                }
            }
            var ever_inner_point=_.flatten(ever_inner_arr);//所有点的集合
            ever_point.unshift(0);//插入初始的点left=0
            $(".scrubber-page-indicator").draggable({
                revert:false,
                onDrag:function(e){
                    var d=e.data;
                    d.top=0;
                    
                    if(d.left<0){
                        d.left=0;
                    }else if(d.left>772){
                        d.left=772;
                    }else{ 
                        var index=_.sortedIndex(ever_inner_point,d.left);           
                        d.left=ever_inner_point[index];//设置应该的left值
                    }
                    //var index=_.sortedIndex(ever_inner_point,d.left);//当前left在所有点的索引                  
                    self.setShowPic(d.left,ever_point,ever_inner_arr);


                }
            })



        }        
	};//prototype



 })(jQuery);


