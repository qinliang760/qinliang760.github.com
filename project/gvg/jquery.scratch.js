/*
 * scratch
 *
 * Copyright (c) 2014 jay
 * Licensed under the MIT license.
 */
$.ns("JV");
(function($){
    /**
     * 
     * @class scratch
     * @constructor
     */
    JV.scratch = function(cfg) {
        var defaults = {
            canvas:"#scratch",
            img:".pic",
            eraser: 0,
            size: 30,
            w:null,  //自定义宽高 
            h:null, //自定义宽高 
            removePercent:60, //  擦拭到多少比例移除 cover
            callback:function(){ }, 
            fg: '#f00'//color '#f00' or image 'http://hearthstone.nos.netease.com/3/touch/gvg/s6_card_bg.png'
        };
        this.cfg = $.extend({}, defaults, cfg); //合并defaults和cfg，不修改defaults
        this.eraser=this.cfg.eraser;
        this.removePercent=this.cfg.removePercent;
        this.w=this.cfg.w;
        this.h=this.cfg.h;
        this.callback=this.cfg.callback;
        this.size=this.cfg.size;
        this.fg=this.cfg.fg;
        this.initializer();

    };
  
  JV.scratch.prototype = {
        /**
         * 初始化
         * @param  {dom} Jnode
         * @param  {obj} cfg
         */
        
 		initializer: function() {
            var self = this;

            self.canvas = $(this.cfg.canvas)[0];
            self.ctx = self.canvas.getContext('2d');

            self.$img = $(this.cfg.img);
            self.$scratchpad=$(self.canvas);
            imgUrl = self.$img.attr("src");
            self.setImgLoad(imgUrl,function(pic){
                //self.canvas.width=pic.width;
                //self.canvas.height=pic.height;
                if(!self.w){                    
                    self.w=self.$img.width();
                }
                if(!self.h){                    
                    self.h=self.$img.height();
                }              
                self.canvas.width=self.w;
                self.canvas.height=self.h;
                console.log(self.canvas.width,self.canvas.height)
                self.render(self.w,self.h);                
            })
            self._bindEvents();
        },
        setImgLoad:function(img,callback){
            var self=this;
            var pic=new Image();
            pic.src=img;
            if(pic.complete){
                //$("#section_6").removeClass("dn");
                callback(pic);
            }else{
                pic.onload=function(){
                    //$("#section_6").removeClass("dn");
                    callback(pic);
                }
                pic.onerror=function(){

                }        
            }           
        },
        render: function(w,h) {
            var self = this,
                width = Math.ceil(w),//for zepto use width
                height = Math.ceil(h),//for zepto use height
                //width = Math.ceil(self.$img.width());//for zepto use width
                //height = Math.ceil(self.$img.height());//for zepto use height
                devicePixelRatio = window.devicePixelRatio || 1;//debugger;
                console.log(width,height)
                

            self.pixels = width * height;

            // Set fg.
            if (self.fg) {
                if (self.fg.charAt(0) === '#') {
                	self.$img.css("visibility","visible");
                    self.ctx.fillStyle = self.fg;
                    self.ctx.beginPath();
                    self.ctx.rect(0, 0, width, height);
                    self.ctx.fill();
                    
                } else {
                    // Have to load image before we can use it.
                    var canvasImage = new Image();
                    canvasImage.onload = function() {
                        self.ctx.drawImage(this, 0, 0, width, height);
                        self.$img.css("visibility","visible");
                    };
                    canvasImage.src = self.fg;
                    console.log(canvasImage.src)
                }
            }

        },
        clear: function() {
            var self = this;
            self.ctx.clearRect(0, 0, Math.ceil(self.w), Math.ceil(self.h));
        },

        _bindEvents: function() {
            var self = this;
            self.$scratchpad.on("touchstart", function(event) {
                self.canvasOffset = self.$scratchpad.offset();
                self.scratch = true;
                self._scratchDown(event);
            }).on("touchmove", function(event) {
                event.preventDefault();
                if (self.scratch) {
                    self._scratchMove(event);
                };
            }).on("touchend", function(event) {
                event.preventDefault();
                if (self.scratch) {
                    self.scratch = false;
                    self._scratchUp(event);
                }
            })
        },

        _scratchDown: function(e) {
            var self = this;
            self.ctx.globalCompositeOperation = 'destination-out';
            this.ctx.lineJoin = 'round';
            self.ctx.lineCap = 'round';

            var mx=e.targetTouches[0].pageX-self.canvasOffset.left,
                my=e.targetTouches[0].pageY-self.canvasOffset.top;

            self.ctx.beginPath();
            self.ctx.arc(mx, my, self.size, 0, Math.PI * 2, true);
            self.ctx.closePath();
            self.ctx.fill();
            //start the path for a drag
            self.ctx.beginPath();
            self.ctx.moveTo(mx, my);

        },
        _scratchMove: function(e) {
            var self = this;

            var mx=e.targetTouches[0].pageX-self.canvasOffset.left,
                my=e.targetTouches[0].pageY-self.canvasOffset.top;            
            self.ctx.lineWidth = self.size*2;
            self.ctx.lineTo(mx, my);
            self.ctx.stroke();
            self._scratchPercent();
        },
        _scratchUp: function(e) {
            var self = this;

            var mx=e.changedTouches[0].pageX-self.canvasOffset.left,
                my=e.changedTouches[0].pageY-self.canvasOffset.top;            
            self.ctx.beginPath();



            self.ctx.arc(mx, my, self.size, 0, Math.PI * 2, true);
            self.ctx.closePath();
            self.ctx.fill();
            //start the path for a drag
            self.ctx.beginPath();
            self.ctx.moveTo(mx, my);            
            self.ctx.closePath();
            self._scratchPercent();

        },
        _scratchPercent: function() {//get point
            var self = this;
            if(self.eraser==100){
                return;
            }
            var hits = 0,
                imageData = self.ctx.getImageData(0, 0, Math.ceil(self.w), Math.ceil(self.h));
            for (var i = 0, ii = imageData.data.length; i < ii; i = i + 4) {
                if (imageData.data[i] === 0 && imageData.data[i + 1] === 0 && imageData.data[i + 2] === 0 && imageData.data[i + 3] === 0) {
                    hits++;
                }
            }

            self.eraser= (hits / this.pixels) * 100;
            console.log(self.removePercent)
            if(self.eraser>self.removePercent){
                self.clear();
                self.eraser=100;
                console.log(typeof self.callback)
                if(typeof this.callback == "function"){
                    this.callback();
                }
            }
        }

  };


 })(Zepto);