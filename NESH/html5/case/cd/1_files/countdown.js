var RADIUS = 4;// 小球半径
var MARGIN_LEFT = 60;// 左边距
var MARGIN_TOP = 30;// 上边距
var endTime = new Date(2014,7,27,11,0,0);// 时间
var curShowTimeSeconds = 0;// 当前是秒数

var balls = [];
var colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444"];// 小球颜色池

window.onload=function(){
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");// 获取canvas画布
	curShowTimeSeconds = getCurShowTImeSeconds();// 获取当前的秒数
	
	setInterval(function(){
		render(context);
		update();
	},50);
}

function update(){
	var nextShowTimeSeconds = getCurShowTImeSeconds();
	var nextHours = parseInt(nextShowTimeSeconds/3600);
	var nextMinutes = parseInt((nextShowTimeSeconds-nextHours*3600)/60);
	var nextSeconds = parseInt(nextShowTimeSeconds%60);
	
	var curHours = parseInt(curShowTimeSeconds/3600);
	var curMinutes = parseInt((curShowTimeSeconds-curHours*3600)/60);
	var curSeconds = parseInt(curShowTimeSeconds%60);
	if(nextSeconds!=curSeconds){
		if(parseInt(curHours/10)!=parseInt(nextHours/10)){
			addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(curHours/10));
		}
		if(parseInt(curHours%10)!=parseInt(nextHours%10)){
			addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
		}
		if(parseInt(curMinutes/10)!=parseInt(nextMinutes/10)){
			addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
		}
		if(parseInt(curMinutes%10)!=parseInt(nextMinutes%10)){
			addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes%10));
		}
		if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10)){
			addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
		}
		if(parseInt(curSeconds%10)!=parseInt(nextSeconds%10)){
			addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds%10));
		}
		curShowTimeSeconds = nextShowTimeSeconds;
	}
	updateBalls();
}

function updateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		
	//	alert(balls[i].y);
		if(balls[i].y>600-balls[i].r){// 屏幕的底部
			balls[i].y=600-balls[i].r;
			balls[i].vy = -balls[i].vy*0.6;
		}else{
			balls[i].vy+=balls[i].g;
		}
	}
	log.console(balls.length);
}

function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][j].length;j++){
			if(digit[num][i][j]==1){
				var aBall = {
					x:x+j*2*(RADIUS+1)+(RADIUS+1),// x轴坐标
					y:y+i*2*(RADIUS+1)+(RADIUS+1),// y轴坐标
					r:RADIUS,// 半径
					g:1.5+Math.random(),// 重力加速度
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,// x轴速度
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]// 取颜色
				}
				balls.push(aBall);
			}
		}
	}
}

function getCurShowTImeSeconds(){
	var curTime = new Date();
	var ret = endTime.getTime()-curTime.getTime();
	ret = Math.round(ret/1000);
	return ret>0?ret:0;
}

function render(ctx){
	ctx.clearRect(0,0,1200,600);// 清空画布
	var hours = parseInt(curShowTimeSeconds/3600);
	var minutes = parseInt((curShowTimeSeconds%3600)/60);
	var seconds = parseInt(curShowTimeSeconds%60);
	
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),ctx);
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),ctx);
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,ctx);
	renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),ctx);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),ctx);
	renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,ctx);
	renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),ctx);
	renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),ctx);
	
	for(var i=0;i<balls.length;i++){
		ctx.fillStyle=balls[i].color;
		ctx.beginPath();
		ctx.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
	}
}

function renderDigit(x,y,num,ctx){
	ctx.fillStyle="blue";
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][j].length;j++){
			if(digit[num][i][j]==1){
				ctx.beginPath();
				ctx.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				ctx.closePath();
				ctx.fill();
			}
		}
	}
}