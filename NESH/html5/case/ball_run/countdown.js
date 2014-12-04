var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 3;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;


var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");
        canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
window.onload = function(){


//render( context );
addBalls(50,50,10);
/*
    setInterval(
        function(){
            
            
            update();
        }
        ,
        50
    );*/

run();
    

}
var fps = 30;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;
function run(){
    requestAnimationFrame(run);

now = Date.now();
　　delta = now - then;
　　if (delta > interval) {
　　　　// 这里不能简单then=now，否则还会出现上边简单做法的细微时间差问题。例如fps=10，每帧100ms，而现在每16ms（60fps）执行一次draw。16*7=112>100，需要7次才实际绘制一次。这个情况下，实际10帧需要112*10=1120ms>1000ms才绘制完成。
　　　　then = now - (delta % interval);
    render(context);
    update(); 
　　}    
   
}

function update(){

    updateBalls();
}

function updateBalls(){

    for( var i = 0 ; i < balls.length ; i ++ ){

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if( balls[i].y >= WINDOW_HEIGHT-RADIUS ){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = - balls[i].vy*0.75;
        }
    }
}

function addBalls( x , y , num ){
//debugger;
    for( var i = 0  ; i < digit[num].length ; i ++ )
        for( var j = 0  ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                    vy:-5,
                    color: colors[ Math.floor( Math.random()*colors.length ) ]
                }

                balls.push( aBall )
            }

}

function render( cxt ){

    cxt.clearRect(0,0,WINDOW_WIDTH, WINDOW_HEIGHT);

    for( var i = 0 ; i < balls.length ; i ++ ){

        cxt.fillStyle=balls[i].color;

        cxt.beginPath();
        cxt.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
        cxt.closePath();

        cxt.fill();
    }
}

function renderDigit( x , y , num , cxt ){
//debugger;
    cxt.fillStyle = "rgb(0,102,153)";

    for( var i = 0 ; i < digit[num].length ; i ++ )
        for(var j = 0 ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                cxt.beginPath();
                cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI )
                cxt.closePath()

                cxt.fill()
            }
}

