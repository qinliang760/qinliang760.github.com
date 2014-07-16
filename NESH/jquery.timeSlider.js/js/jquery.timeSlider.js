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

	    参数1  区域的ID
	    参数2：设置参数


     */
     JV.TimeSlider=function(Jnode,cfg){
        var self = this;
        var defaults={
            timePoint:[8,10,6,7,6,7,8,1],
            timeTxt:["第一章-崔斯特姆的黑暗時刻","第二章","第三章","第四章","第五章","第六章","第七章","第八章"],
            totalWidth:772,
            headClass:".timeline-head",//头部、标题
            pagesClass:".timeline-pages",//主内容显示
            scrubberClass:".timeline-scrubber",//时间轴
            prevClass:".timeline-page-left",//上一页
            nextClass:".timeline-page-right",//下一页
            moveClass:".scrubber-page-indicator",//移动元素
            currentClass:".scrubber-current-page",//当前显示数字
            pointClass:".scrubber-chapter-anchor"//当前阶段点
        }
		this.items = $(Jnode);
        this.cfg = $.extend({},defaults, cfg);//合并defaults和cfg，不修改defaults
        this.timePoint=this.cfg.timePoint;
        this.timeTxt=this.cfg.timeTxt;
        this.head=$(this.cfg.headClass,this.items);
        this.pages=$(this.cfg.pagesClass,this.items);
        this.scrubber=$(this.cfg.scrubberClass,this.items);
        this.prev=$(this.cfg.prevClass,this.items);
        this.next=$(this.cfg.nextClass,this.items);
        this.moveElement=$(this.cfg.moveClass,this.items);
        this.currentElement=$(this.cfg.currentClass,this.items);
        this.pointElement=$(this.cfg.pointClass,this.items);

		this.init();

    }
	
	JV.TimeSlider.prototype = {
        init: function() {
            var self = this;
            self.setDrag();
            self.setPage();
            self.setPointHandle();

        },
        pointStep:[],//各阶段时间点数组
        pointCollection:[],//各阶段内部时间点数组
        pointCollectionAll:[],//所有时间点数组

        setTimeActive:function(index){
            var point=$(".scrubber-unselected-chapter");
            if(index==null){
                point.removeClass("scrubber-selected-chapter");  
            }else{
                $(".scrubber-unselected-chapter[data-scrubber-chapter-index="+index+"]").addClass("scrubber-selected-chapter").siblings().removeClass("scrubber-selected-chapter");
            }              

        },
        setTimeNum:function(left){
            var self=this;
            self.currentElement.text(_.indexOf(self.pointCollectionAll, left)+1+"/"+self.pointCollectionAll.length);
        },
        setTimeTxt:function(index){
            var self=this;
            self.head.html(self.timeTxt[index-1]);
            
        },
        setPicUrl:function(point_index,point){//@第几阶段，第几点
            var self=this;
            var img=self.pages.find("img"),
                url_f="http://diablo3.nos.netease.com/1/story/pages/";

                //设置翻页箭头的显示隐藏
                self.next.show();
                self.prev.show();
                if(point_index==self.timePoint.length && point==1){
                    self.next.hide();
                }
                if(point==1 && point_index==1){
                    self.prev.hide();
                }      

            if(point_index<=9){
                point_index="0"+point_index;              
            }
            if(point<=9){
                point="0"+point;              
            }
            img.attr("src",url_f+point_index+"-"+point+".jpg").attr("data-page",point_index+"-"+point);



        },
        setPointHandle:function(){
            var self=this;
            self.pointElement.click(function(){
                var t=$(this),
                    index=t.attr("data-scrubber-chapter-index");

                var left=self.pointStep[index];    
                self.setShowPic(left,self.pointStep,self.pointCollection);
                self.setTimeMove(parseInt(index)+1,1);//@阶段 内时间点   
            })
        },
        setShowPic:function(left,point,inner_point){
            var self=this;

            var cur_index=_.sortedIndex(point,left),//第几阶段
                inner_index,
                active_index;//debugger;

                if(_.indexOf(point, left)!=-1){
                   cur_index=_.indexOf(point, left)+1;
                    inner_index=1;
                    active_index=_.indexOf(point, left);
                }else{
                    inner_index=_.indexOf(inner_point[cur_index-1],left)+1;
                    active_index=null;
                }                
 
            
            //第几阶段第几点    
                
            self.setPicUrl(cur_index,inner_index);  
            self.setTimeActive(active_index);
            self.setTimeTxt(cur_index);
            self.setTimeNum(left);

        },
        setTimeMove:function(point_index,point){
            var self=this;
            var collection=self.pointCollection;

            var left=collection[point_index-1][point-1];
            self.moveElement.css("left",left+"px");

            self.setTimeNum(left);

            if(_.indexOf(self.pointStep, left)!=-1){//如果在当前阶段点
                self.setTimeActive(point_index-1);
            }else{
                self.setTimeActive(null);
            }

        },
        setPage:function(){
            var self=this;

            var img=self.pages.find("img");
            var storyJson=self.timePoint;            
            self.next.click(function(){
                
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

                self.setPicUrl(point_index,point);
                self.setTimeMove(point_index,point);
                self.setTimeTxt(point_index);

            })

            self.prev.click(function(){
                
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

                self.setPicUrl(point_index,point);
                self.setTimeMove(point_index,point);
                self.setTimeTxt(point_index);

            })

        },
        setFloat2:function(data){
            var self=this;
            return Math.round(parseFloat(data)*100)/100;
        },
        setDrag:function(){
            var self=this;
            var storyJson=self.timePoint;

            var total=self.cfg.totalWidth,
                ever_w=total/(storyJson.length-1),//每个阶段的长度
                ever_point=[],//每个点的left值
                ever_inner_arr=[];//每个点在每个阶段的集合
                //ever_inner_point=[];//所有点的集合

            for(var i=0;i<storyJson.length;i++){
                ever_point.push(self.setFloat2(ever_w*i));//保留两位浮点数
            }


            for (var j=0;j<ever_point.length;j++){
                var m=j;
                var inner_l=storyJson[j];//每个阶段的点的个数

                if(j==0){
                    var inner_w=ever_w/inner_l;
                }else{
                    var inner_w=(ever_point[j]-ever_point[m-1])/inner_l;//每个阶段每个点的长度
                }

                ever_inner_arr[j]=[];

                for(var n=0;n<inner_l;n++){
                    var w=inner_w*n;
                    if(j==0){
                        ever_inner_arr[j].push(self.setFloat2(w));//每个阶段每个点的left
                    }else{                        
                        ever_inner_arr[j].push(self.setFloat2(w+ever_point[m]));//每个阶段每个点的left
                    }
                    
                }
            }
            self.pointStep=ever_point;
            self.pointCollection=ever_inner_arr;
            var ever_inner_point=_.flatten(ever_inner_arr);//所有点的集合
            self.pointCollectionAll=ever_inner_point;
            self.setTimeNum(0);
            self.setTimeTxt(0);
            //ever_point.unshift(0);//插入初始的点left=0

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


