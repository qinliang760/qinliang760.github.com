/*
 * fullpage
 *
 * Copyright (c) 2014 jay
 * Licensed under the MIT license.
 */
$.ns("JV");
(function($){
    /**
     * 
     * @class fullpage
     * @constructor
     */
    JV.fullpage = function(Jnode, cfg) {
        var that = this;
        var defaults = {
            page: '.page',
            dir: 'v',
            status:1,
            loop:false,
            duration:500,
            drag:false,
            change: function(data) {},
            beforeChange: function(data) {},
            afterChange: function(data) {},
            orientationchange: function(orientation) {}
        }
        
        this.cfg = $.extend({}, defaults, cfg); //合并defaults和cfg，不修改defaults
        that.items = $(Jnode);
        that.page=$(Jnode).find(this.cfg.page);
        that.dir=this.cfg.dir;
        that.status=this.cfg.status;
        that.loop=this.cfg.loop;
        that.drag=this.cfg.drag;
        that.duration=this.cfg.duration;
        that.change=this.cfg.change;
        that.beforeChange=this.cfg.beforeChange;
        that.afterChange=this.cfg.afterChange;
        that.orientationchange=this.cfg.orientationchange;

        that.curIndex = 0;

        that.startY = 0;
        that.movingFlag = false;

        that.items.addClass('fullPage-wp');
        that.$parent = that.items.parent();
        that.$pages = that.page.addClass('fullPage-page fullPage-dir-' + that.dir);
        that.pagesLength = that.$pages.length;        
        this.init();

    };
  
  JV.fullpage.prototype = {
        /**
         * 初始化
         * @param  {dom} Jnode
         * @param  {obj} cfg
         */


        init: function() {
            var that = this;
            var $this = that.items

            that.update();
            $(document).on('touchmove', function(e) {
                e.preventDefault();
            });

            var eventSet={
                start:"touchstart",
                end:"touchend",
                move:"touchmove"
            };

            if(!that.isMobile()){
                eventSet.start="mousedown";
                eventSet.end="mouseup";
                eventSet.move="mousemove";
            }


            $this.on(eventSet.start, function(e) {//debugger;

                if (!that.status) {return 1;}
                //e.preventDefault();
                if (that.movingFlag) {
                    return 0;
                }
                if (e.touches){
                    that.startX = e.targetTouches[0].pageX;
                    that.startY = e.targetTouches[0].pageY;
                }else{
                    that.startX = e.clientX;
                    that.startY = e.clientY;
                }


            });
            $this.on(eventSet.end, function(e) {

                if (!that.status) {return 1;}
                //e.preventDefault();
                if (that.movingFlag) {
                    return 0;
                }

                if (e.touches){
                    var sub = that.dir === 'v' ? e.changedTouches[0].pageY - that.startY : e.changedTouches[0].pageX - that.startX;
                }else{
                    var sub = that.dir === 'v' ? e.clientY - that.startY : e.clientX - that.startX;
                }                


                var der = (sub > 60 || sub < -60) ? sub > 0 ? -1 : 1 : 0;

                that.moveTo(that.curIndex + der, true);

            });
            if (that.drag) {
                $this.on(eventSet.move, function(e) {
                    if (!that.status) {return 1;}
                    //e.preventDefault();
                    if (that.movingFlag) {
                        return 0;
                    }
                    if (e.touches){
                        var y = e.changedTouches[0].pageY - that.startY;
                        var x = e.changedTouches[0].pageX - that.startX;
                    }else{
                        var y = e.clientY - that.startY;
                        var x = e.clientX - that.startX;
                    }

                    var dist = (that.dir === 'v' ? (-that.curIndex * that.height + y) : (-that.curIndex * that.width + x));
                    $this.removeClass('anim');
                    that.move($this, that.dir, dist);
                });
            }


            // 翻转屏幕提示
            // ==============================   
            
            var orientationHtml = '<div class="rotation_warning" style="background:#666; position: absolute; top:0; left:0; height:100%; width:100%; z-index:9999;"><div style="text-align:center;color:#fff; font-size:1em; margin:20% auto;">为了保证浏览效果，我们建议在竖屏下观看。</div></div>';          
            window.addEventListener("orientationchange", function() {
                if (window.orientation === 180 || window.orientation === 0) {
                    that.orientationchange('portrait');
                    $(".rotation_warning").remove();
                }
                if (window.orientation === 90 || window.orientation === -90) {
                    that.orientationchange('landscape');
                    $("body").append(orientationHtml);
                }
            }, false);

            window.addEventListener("resize", function() {
                that.update();
            }, false);


            //PC 兼容
            that.items.on("mousewheel",function(event){
                event = event || window.event;

                if (!that.status) {return 1;}

                if (that.movingFlag) {
                    return 0;
                }            
                var der =  event.wheelDelta > 0 ? -1 : 1;
                if(!that.isMobile() && that.dir=="v"){
                    that.moveTo(that.curIndex + der, true);
                }
                
            })

            that.items.on("DOMMouseScroll",function(event){

                if (!that.status) {return 1;}

                if (that.movingFlag) {
                    return 0;
                }            
                var der =  event.detail > 0 ? 1 : -1;

                if(!that.isMobile() && that.dir=="v"){
                    that.moveTo(that.curIndex + der, true);
                }             

            });         

        },
        update: function() {
            var that=this;
            if (that.dir === 'h') {
                that.width = that.$parent.width();
                that.$pages.width(that.width);
                that.items.width(that.width * that.pagesLength);
            }

            this.height = this.$parent.height();
            this.$pages.height(this.height);

            //this.moveTo(this.curIndex < 0 ? this.o.start : this.curIndex);
        },
        stop:function(){
            var that = this;
            that.status=0;
        },
        start:function(){
            var that = this;
            that.status=1;
        },                
        moveTo: function(next, anim) {
            var that = this;
            var $this = that.items;
            var cur = that.curIndex;
            next = that.fix(next, that.pagesLength, that.loop);

            if (anim) {
                $this.addClass('anim');
            } else {
                $this.removeClass('anim');
            }

            if (next !== cur) {
                that.beforeChange({
                    next: next,
                    cur: cur
                });
            }

            that.movingFlag = true;
            that.curIndex = next;
            that.move($this, that.dir, -next * (that.dir === 'v' ? that.height : that.width));

            if (next !== cur) {
                that.change({
                    prev: cur,
                    cur: next
                });
            }

            window.setTimeout(function() {
                that.movingFlag = false;
                if (next !== cur) {
                    that.afterChange({
                        prev: cur,
                        cur: next
                    });
                    that.$pages.removeClass('cur').eq(next).addClass('cur');
                }
            }, that.duration);
        },
        move:function($ele, dir, dist){

            var translate = dir === 'v' ? 'translateY' : 'translateX';
            $ele.css({'-webkit-transform':translate + '(' + dist + 'px)','transform':translate + '(' + dist + 'px)'});

        },
        fix:function(cur, pagesLength, loop){

            if (cur < 0) {
                return !!loop ? pagesLength - 1 : 0;
            }

            if (cur >= pagesLength) {
                return !!loop ? 0 : pagesLength - 1;
            }


            return cur;

        },
        isMobile: function() {
            var rule = /(android|iPhone|iPad|iPod|mobile)/ig;
            return rule.test(navigator.userAgent);
        }       

  };


 })(Zepto);