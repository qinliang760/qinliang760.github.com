/*
 * animCanvas
 *
 * Copyright (c) 2014 jay
 * Licensed under the MIT license.
 */
$.ns("JV");
(function($){
    /**
     * 
     * @class animCanvas
     * @constructor
     */
    JV.animCanvas = function(Jnode, cfg) {
        var defaults = {
            width:1200,
            height:300
        };
        this.items = $(Jnode);//html or $
        this.cfg = $.extend({}, defaults, cfg); //合并defaults和cfg，不修改defaults
        this.width=parseInt(this.cfg.width);
        this.height=parseInt(this.cfg.height);
        this.init();

    };
  
  JV.animCanvas.prototype = {
  		init:function(){
			var self = this;

			canvas = self.items[0];
			canvas.width = self.width;
			canvas.height = self.height;
			self.ctx = canvas.getContext('2d');

			// create particles
			self.circles = [];
			self.render();
			self.setAnimCanvas();
			

  		},
        
		setAnimCanvas: function() {

			var self=this;
			
			self.setDraw();
			requestAnimationFrame(function() {
				self.setAnimCanvas();
			});
	        

			
		},
		render:function(){
			var self=this;

			for (var x = 0; x < self.width * 0.3; x++) {
				var c = self.setCircle();
				self.circles.push(c);
			}
			console.log(self.circles);
		},
		setCircle:function(){
			var self=this;
			 var circle={};

			
				circle.x = Math.random() * self.width;
				circle.y = self.height + Math.random() * 100;
				circle.alpha = 0.1 + Math.random() * 0.3;
				circle.scale = 0.1 + Math.random() * 0.3;
				circle.velocity = Math.random();
/*			if (circle.alpha <= 0) {
				init();
			}*/

			return circle;

			

		},
		setDraw:function(){
			var self=this;
			var ctx=self.ctx;
			ctx.clearRect(0, 0, self.width, self.height);

			for(var i = 0 ; i < self.circles.length ; i ++){
				if (self.circles[i].alpha <= 0) {
					self.circles[i].x = Math.random() * self.width;
					self.circles[i].y = self.height + Math.random() * 100;
					self.circles[i].alpha = 0.1 + Math.random() * 0.3;
					self.circles[i].scale = 0.1 + Math.random() * 0.3;
					self.circles[i].velocity = Math.random();
	                
	            }			
				self.circles[i].y -= self.circles[i].velocity;
				self.circles[i].alpha -= 0.0005;
				ctx.beginPath();
				ctx.arc(self.circles[i].x, self.circles[i].y, self.circles[i].scale * 10, 0, 2 * Math.PI, false);
				ctx.fillStyle = 'rgba(255,255,255,' + self.circles[i].alpha + ')';
				ctx.fill();
			}


		},
        getRandom:function(num){
			return Math.round(Math.random() * num);
        }

  };


 })(Zepto);