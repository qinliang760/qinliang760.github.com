(function($){
	var scroller={
		defaults:{
			con : '.con',  //�ƶ�Ԫ��
			box : '.box',  //�ڲ�Ԫ��
			nav : '.nav',  //����
			navBtn : 'li',  //��ť
			btn : '.btn', //���Ұ�ťbox
			btnL : '.left_btn',  //��߰�ť
			btnR : '.right_btn', //�ұ߰�ť
			wheelStep : 400   //�����ֹ����Ŀ��
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
				
				//��ť
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

				//�Ұ�ť
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