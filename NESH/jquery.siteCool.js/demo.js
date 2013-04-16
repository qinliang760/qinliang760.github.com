(function($){
	var scroller={
		defaults:{
			con : '.con',  //移动元素
			box : '.box',  //内部元素
			nav : '.nav',  //导航
			navBtn : 'li',  //按钮
			btn : '.btn', //左右按钮box
			btnL : '.left_btn',  //左边按钮
			btnR : '.right_btn', //右边按钮
			wheelStep : 400   //鼠标滚轮滚动的宽度
		}
	}
	function Scroller(root,defaults){
		var self=this,
			boxObj=root,
			num=0,
			animate=false;			
			
		$.extend(this,{
			init:function(){
				var nav=boxObj.find(defaults.nav),
				navBtn=nav.find(defaults.navBtn),
				navW=nav.width(),
				con=boxObj.find(defaults.con),
				box=con.find(defaults.box);

				navBtn.each(function(i){
					$(this).click(function(){
						if(animate)return;	
						animate=true;
						var marginW=0;
						
						for(var j=0; j<i; j++){
							marginW +=box.eq(j).width();
						}
						con.animate({marginLeft:-marginW+navW},'slow',function(){
							animate=false;
						})
						num=-j;
						self.cbtn();
					})
				})
				
				this.cbtn();
				this.btn();
				this.mouse();
				
			},
			btn:function(){
				var btn=boxObj.find(defaults.btn),
				btnL=btn.find(defaults.btnL),
				btnR=btn.find(defaults.btnR),
				con=boxObj.find(defaults.con),
				box=con.find(defaults.box),
				nav=boxObj.find(defaults.nav),
				navW=nav.width();
				
				//左按钮
				btnL.click(function(){
					if(animate)return;	
					animate=true;
					var marginW=0
					num ++;
					
					for(var j=0; j<Math.abs(num); j++){
						marginW +=box.eq(j).width();
					}
					con.animate({marginLeft:-marginW+navW},'slow',function(){
						animate=false;
					})
					self.cbtn();
				})

				//右按钮
				btnR.click(function(){
					if(animate)return;	
					animate=true;
					var marginW=0
					num --;
					
					for(var j=0; j<Math.abs(num); j++){
						marginW +=box.eq(j).width();
					}
					con.animate({marginLeft:-marginW+navW},'slow',function(){
						animate=false;
					})
					self.cbtn();
				})

			},
			 cbtn:function(){
				var con=boxObj.find(defaults.con),
				box=con.find(defaults.box),
				btn=boxObj.find(defaults.btn),
				btnL=btn.find(defaults.btnL),
				btnR=btn.find(defaults.btnR);
				
				if(Math.abs(num)<=0){
					btnL.hide();
					btnR.show();
				}else if(Math.abs(num)>=box.length-1){
					btnL.show();
					btnR.hide();
				}else{
					btnL.show();
					btnR.show();
				}
			},
			mouse:function(){
				var con=boxObj.find(defaults.con),
				nav=boxObj.find(defaults.nav),
				navW=nav.width(),
				
				con.mousewheel(function(event, delta, deltaX, deltaY) {
					if(animate)return;	
					animate=true;
					
					if (delta > 0){
						setTimeout(function(){
							con.animate({marginLeft:-defaults.wheelStep+navW},800,'easeOutExpo',function(){
								animate=false;
							})
						},50);	
					}else if(delta < 0){
					   	if(){
							con.css('marginLeft',navW+"px");
							animate=false;
						}else{
						   setTimeout(function(){
							   con.animate({marginLeft:-n*defaults.wheelStep+navW},800,'easeOutExpo',function(){
									animate=false
								})
							},50);
						}						
					}
				})
			}
		})
		self.init();
	}
	
	$.fn.scroller=function(defaults){
		defaults=$.extend({}, scroller.defaults, defaults);
		return this.each(function(){
			el=new Scroller($(this), defaults);
		})
	}
})(jQuery);