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
    JV.scratch = function(Jnode, cfg) {
        var defaults = {
			srcNode:Jnode,
            eraser: 0,
            realtime: true,
            size: 10,
            bg: '#cacaca',
            bgOrigin: false,
            bgSize: null,
            fg: '#6699ff',
            fgOrigin: false,
            cursor: 'default',
            color: "#cccccc"
        };
        this.items = Jnode;//html or $
        this.cfg = $.extend({}, defaults, cfg); //合并defaults和cfg，不修改defaults
        this.srcNode=$(Jnode);
        this.eraser=this.cfg.eraser;
        this.realtime=this.cfg.realtime;
        this.size=this.cfg.size;
        this.bg=this.cfg.bg;
        this.bgOrigin=this.cfg.bgOrigin;
        this.bgSize=this.cfg.bgSize;
        this.fg=this.cfg.fg;
        this.fgOrigin=this.cfg.fgOrigin;
        this.cursor=this.cfg.cursor;
        this.color=this.cfg.color;
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
            //self = self.getAttrVals();

            self.$el = self.srcNode;
            if (self._supportCanvas()) {
                self.$el.html('Canvas is not supported in this browser.')
                return true;
            };

            self.enabled = true;
            self.canvas = $("#cc")[0];
            self.ctx = self.canvas.getContext('2d');

            if (self.$el.css('position') === 'static') {
                self.$el.css('position', 'relative');
            }
            self.$img = $('.pic');
            if (self.bgOrigin) {
                self.$img.attr('crossOrigin', '*')
            };
            if (self.bgSize) {
                self.$img.css({
                    position: 'absolute',
                    width: self.bgSize.width,
                    height: self.bgSize.height
                });
            } else {
                self.$img.css({
                    //position: 'absolute',
                    //width: '100%'
                });
            };


            self.$scratchpad = $(self.canvas).css({
                position: 'absolute',
                //width: '100%',
                //height: '100%'
            });

            self.$el.append(self.$img).append(self.$scratchpad);
            self.ctx.beginPath();
            self.ctx.arc(10, 10, 10, 0, Math.PI * 2, true);
            self.ctx.fill();
            self.ctx.stroke();
            self.render();
            //self._addEvent();
            self._bindEvents();
        },
        _addEvent: function() {
            var self = this;
            self.on('destroy', function() {
                self.$el.children().remove();
            })
            self._onSetBg = function() {
                self = self.getAttrVals();
            };
            self._onSetFg  =function() {
                self = self.getAttrVals();
            };
            self._onSetRealtime = function() {
                self = self.getAttrVals();
            };
            self._onSetSize = function() {
                self = self.getAttrVals();
            };
            self._onSetCursor = function() {
                self = self.getAttrVals();
            };
        },
        render: function() {
            var self = this,
                width = Math.ceil(self.$el.width()),//for zepto use width
                height = Math.ceil(self.$el.height()),//for zepto use height
                devicePixelRatio = window.devicePixelRatio || 1;//debugger;

            // Set number of pixels required for getting scratch percentage.
            self.pixels = width * height;

            // We'll do a hard render for the height here in case
            // we need to run this at differnt sizes.
            //self.$scratchpad.attr('width', width).attr('height', height);

            //self.canvas.setAttribute('width', width * devicePixelRatio);
            //self.canvas.setAttribute('height', height * devicePixelRatio);

            //self.ctx.scale(devicePixelRatio, devicePixelRatio);
            self.pixels = width * devicePixelRatio * height * devicePixelRatio;

            // Default to image hidden in case no bg or color is set.
            self.$img.hide();

            if (self.bg) {
                //if (self.bg.charAt(0) === '#') {
                    self.$el.css('backgroundColor', self.bg);
                /*} else {
                    self.$el.css('backgroundColor', EMPTY);
                    self.$img.attr('src', self.bg);
                }*/
            }

            // Set fg.
            if (self.fg) {
                if (self.fg.charAt(0) === '#') {
                	self.$img.show();
                    self.ctx.fillStyle = self.fg;
                    self.ctx.beginPath();
                    self.ctx.rect(0, 0, width, height);
                    self.ctx.fill();
                    
                } else {
                    // Have to load image before we can use it.
                    var canvasImage = new Image();
                    canvasImage.onload = function() {
                        self.ctx.drawImage(this, 0, 0, width, height);
                        self.$img.show();
                    };
                    if (self.fgOrigin) {
                        canvasImage.crossOrigin = "*";
                    };
                    canvasImage.src = self.fg;
                }
            }

            if (self.cursor && self.cursor !== 'crosshair') {
                self._setCursor();
            };
        },
        clear: function() {
            var self = this;
            self.ctx.clearRect(0, 0, Math.ceil(self.$el.innerWidth()), Math.ceil(self.$el.innerHeight()));
        },
        enable: function(enabled) {
            this.enabled = enabled === true ? true : false;
        },
        _bindEvents: function() {
            var self = this;
            self.$scratchpad.on("mousedown", function(event) {
                if (!self.enabled) {
                    return true;
                };
                self.canvasOffset = self.$scratchpad.offset();
                self.scratch = true;
                //self._scratchFunc(event, 'Down');
                self._scratchDown(event);
            }).on("mousemove", function(event) {
                event.preventDefault();
                if (self.scratch) {
                    //self._scratchFunc(event, 'Move');
                    self._scratchMove(event);
                };
            }).on("mouseup", function(event) {
                event.preventDefault();
                if (self.scratch) {
                    self.scratch = false;
                    //self._scratchFunc(event, 'Up');
                    self._scratchUp(event);
                }
            })
        },
        _setCursor: function() {
            var self = this;
            self.$el.css('cursor', self.cursor);
        },
        _scratchFunc: function(event, type) {
            var self = this;
            event.pageX = Math.floor(event.pageX - self.canvasOffset.left);
            event.pageY = Math.floor(event.pageY - self.canvasOffset.top);
            self['_scratch' + type](event);
        },
        _scratchDown: function(e) {//debugger;
            var self = this;
            self.ctx.globalCompositeOperation = 'destination-out';
            this.ctx.lineJoin = 'round';
            self.ctx.lineCap = 'round';
            self.ctx.strokeStyle = self.color;
            self.ctx.lineWidth = 40;

            //draw single dot in case of a click without a move
            self.ctx.beginPath();

            self.ctx.arc(e.pageX, e.pageY, 10, 0, Math.PI * 2, true);
            self.ctx.closePath();
            self.ctx.fill();
            //start the path for a drag
            //self.ctx.beginPath();
            self.ctx.moveTo(e.pageX, e.pageY);
            //self.fire('down');
        },
        _scratchMove: function(e) {
            var self = this;
            self.ctx.lineTo(e.pageX, e.pageY);
            self.ctx.stroke();
            if (self.realtime) {
                self._scratchPercent();
            };
            //self.fire('move');
        },
        _scratchUp: function(e) {
            var self = this;
            self.ctx.beginPath();

            self.ctx.arc(e.pageX, e.pageY, 10, 0, Math.PI * 2, true);
            self.ctx.closePath();
            self.ctx.fill();
            //start the path for a drag
            //self.ctx.beginPath();
            self.ctx.moveTo(e.pageX, e.pageY);            
            self.ctx.closePath();
            //self._scratchPercent();
            //self.fire('up');
        },
        _scratchPercent: function() {
            var self = this;
            var hits = 0,
                imageData = self.ctx.getImageData(0, 0, 640, 537);
            for (var i = 0, ii = imageData.data.length; i < ii; i = i + 4) {
                if (imageData.data[i] === 0 && imageData.data[i + 1] === 0 && imageData.data[i + 2] === 0 && imageData.data[i + 3] === 0) {
                    hits++;
                }
            }

            self.eraser= (hits / this.pixels) * 100;
        },
        _supportCanvas: function() {
            return !(document.createElement('canvas')).getContext
        }/*,
        init: function() {
            var self=this;
            self.setscratch();
        }*/

  };


 })(Zepto);