/*
 * lightBox
 *
 * Copyright (c) 2014 jay
 * Licensed under the MIT license.
 */

$.ns("JV");
(function($){
    /**
     * 
     * @class lightBox
     * @constructor
     */
    JV.turning = function(Jnode, cfg) {
        var defaults = {
            effect:"scaleAndTranslate",//scaleAndTranslate,translate
            callback:function(index){

            }
        };
        this.items = $(Jnode);//html or $
        this.cfg = $.extend({}, defaults, cfg); //合并defaults和cfg，不修改defaults
        this.callback=this.cfg.callback;
        this.init();

    };
  
  JV.turning.prototype = {
        /**
         * 初始化
         * @param  {dom} Jnode
         * @param  {obj} cfg
         */
        index:0,
        startY:null,
        wH:$(window).height(),
        wW:$(window).width(),
        speed:200,
        animated:false,        
        setItemsStyle:function(){
            var self=this;
            $.each(self.items,function(k,v){
                if(k!=0){
                    $(v).css({
                        "-webkit-transform": "translateY(" + self.wH + "px)",
                        "-moz-transform": "translateY(" + self.wH + "px)"
                    })                    
                }
            })

        },
        init: function() {
            var self=this;

            self.setItemsStyle();
            self.items.bind("touchstart",function(e){
                var target=e.targetTouches[0];
                self.startY=target.pageY;

            })

            self.items.bind("touchmove",function(e){
                e.preventDefault();

                var target=e.targetTouches[0],
                    touch_y=target.pageY,
                    run_y=Math.abs(touch_y-self.startY),
                    c_index=self.index,//当前的索引
                    sectoinL=self.items.length,
                    h=1-run_y/self.wH,//剩余滑动的百分比
                    i = self.wH * h;//剩余滑动的高度值

 
                if (touch_y - self.startY <= 0) {
                    if (c_index >= sectoinL - 1) {
                        return;
                    }
                    $(".m-section" + (c_index + 1)).css({
                        "-webkit-transform-origin": "50% 0px",
                        "-webkit-transform": "scale(" + h + ")"
                    }), $(".m-section" + (c_index + 2)).css({
                        "-webkit-transform": "translateY(" + i + "px)"
                    })
                } else {
                    if (c_index != 0) {
                        $(".m-section" + (c_index + 1)).css({
                            "-webkit-transform-origin": "50% 100%",
                            "-webkit-transform": "scale(" + h + ")"
                        }), $(".m-section" + c_index).css({
                            "-webkit-transform": "translateY(-" + i + "px)"
                        })
                    }

                }

            })
            
            self.items.bind("touchend",function(e){
                e.preventDefault();
                if(self.animated){
                    return;
                }
                self.animated=true;//松开手指滑动开始动画
                var target=e.changedTouches[0],
                    touch_y=target.pageY,
                    run_y=Math.abs(touch_y-self.startY),
                    c_index=self.index,//当前的索引
                    sectoinL=self.items.length;
                    
                  
                if (touch_y - self.startY <= 0) {//向上滑动

                    if(c_index ==sectoinL - 1 ){//最后一张
                        self.animated=false;
                        return;
                    } 
                    if (c_index >= 1) {//防止快速上下拖动，顶上图片错位
                        $(".m-section" + c_index).css("-webkit-transform", "translateY(-" + self.wH + "px)");
                    }
                    if(run_y>=self.wH/4){//self.wH/4 屏幕的四分之一  
                        self.setScaleSmall(c_index + 1,"up");
                        self.setTranslateSmall(c_index + 2,"up")


                    }else{
                        self.setScaleLarge(c_index + 1,"up");
                        self.setTranslateLarge(c_index+2,"up");

                    }
 
                }else{//向下滑动
                    if(c_index ==0 ){//第一张
                        self.animated=false;
                        return;
                    }   
                    if (c_index < sectoinL - 1) {//防止快速上下拖动，顶上图片错位
                        $(".m-section" + (c_index + 2)).css("-webkit-transform", "translateY(" + self.wH + "px)");
                    }
                    if(run_y>=self.wH/4){
                        
                        self.setScaleSmall(c_index + 1,"down");
                        self.setTranslateSmall(c_index,"down");

                    }else{

                        self.setScaleLarge(c_index + 1,"down");
                        self.setTranslateLarge(c_index,"down");

                    }

                }                    
            })//touchend


        },
        setScaleSmall:function(index,dir){//索引，方向(up or down)
            var self=this;         
            $(".m-section" + index).animate({
                "-webkit-transform": "scale(0)"
            }, self.speed, function() {
                $(this).css({
                    "-webkit-transform": "scale(1) translateY("+ self.wH + "px)"
                });
                if(dir=="up"){
                    self.index++;
                }                
                
                self.animated=false;//动画结束
                self.callback(index);//setion动画结束后，内部元素需执行的动画
            });
        },
        setScaleLarge:function(index,dir){
            var self=this;
            $(".m-section" + index).animate({
                "-webkit-transform": "scale(1)"
            }, self.speed, function() {
                $(this).css({
                    "-webkit-transform": "scale(1) translateY(0px)"
                });
                self.animated=false;

            });

        },
        setTranslateSmall:function(index,dir){
            var self=this;
            $(".m-section" + index).animate({
                "-webkit-transform": "translateY(0px)"
            }, self.speed, function() {
                $(this).css({
                    "-webkit-transform": "scale(1) translateY(0px)"
                });
                if(dir=="down"){
                    self.index--;
                } 
                self.animated=false;               

            });
        },
        setTranslateLarge:function(index,dir){
            var self=this;
            var dir_v="";
            if(dir=="down"){
                dir_v="-";
            }            
            $(".m-section" + index).animate({
                "-webkit-transform": "translateY("+dir_v + self.wH + "px)"
            }, self.speed, function() {
                $(this).css({
                    "-webkit-transform": "scale(1) translateY(" + self.wH + "px)"
                });
                self.animated=false;
            });
        }

  };


 })(Zepto);