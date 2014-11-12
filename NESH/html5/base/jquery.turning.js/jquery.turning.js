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

        };
        this.items = $(Jnode);//html or $
        this.cfg = $.extend({}, defaults, cfg); //合并defaults和cfg，不修改defaults
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
        setModel:function(){

        },
        init: function() {
            var self=this;

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
                    $(".m-section" + (c_index+1)).css({
                        "-webkit-transform-origin": "50% 0px",
                        "-webkit-transform": "scale(" + h + ")"
                    }), $(".m-section" + (c_index+2)).css({
                        "-webkit-transform": "translateY(" + i + "px)"
                    })
                }else{
                    if(c_index!=0){
                        $(".m-section" + (c_index+1)).css({
                            "-webkit-transform-origin": "50% 100%",
                            "-webkit-transform": "scale(" + h + ")"
                        }), $(".m-section" + c_index).css({
                            "-webkit-transform": "translateY(-" + i + "px)"
                        })                        
                    }

                }
            })
            
            self.items.bind("touchend",function(e){
                var target=e.changedTouches[0],
                    touch_y=target.pageY,
                    run_y=Math.abs(touch_y-self.startY),
                    c_index=self.index,//当前的索引
                    sectoinL=self.items.length;

                //sectoinL/4 屏幕的四分之一    
                if (touch_y - self.startY <= 0 && run_y>=self.wH/4 && c_index < sectoinL - 1) {
                    

                    $(".m-section" + (c_index + 1)).animate({
                        "-webkit-transform": "scale(0)"
                    }, self.speed, function() {
                        $(this).css({
                            "-webkit-transform": "scale(1) translateY(-" + self.wH + "px)"
                        });
                        self.index++;

                    });
                    $(".m-section" + (c_index + 2)).animate({
                        "-webkit-transform": "translateY(0px)"
                    }, self.speed,function(){

                    }); 
                }else{
                    if(c_index >= sectoinL - 1){//最后一张
                        return;
                    }
                    if(c_index ==0 ){//第一张
                        return;
                    }                     
                    $(".m-section" + c_index).animate({
                        "-webkit-transform": "translateY(0px)"
                    }, self.speed, function() {
                        $(this).css({
                            "-webkit-transform": "scale(1) translateY(0px)"
                        });
                        self.index--;

                    });
                    $(".m-section" + (c_index + 1)).animate({
                        "-webkit-transform": "scale(0)"
                    }, self.speed,function(){
                        $(this).css({
                            "-webkit-transform": "scale(1) translateY(" + self.wH + "px)"
                        });
                    }); 
                }                    
            })


        }

  };


 })(Zepto);