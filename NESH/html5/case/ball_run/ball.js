var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 10;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

var ball = {
    x: 50,
    y: 50,
    g: 1.5 + Math.random(),
    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
    vy: -5
};
var cxt;

var moveXY={
    x:50,
    y:50,
    a:0
}
window.onload = function(){

    var canvas = document.getElementById('canvas');
    cxt = canvas.getContext("2d");
    context= canvas.getContext("2d");
    
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    run();       
    
}

function run(){
    mozRequestAnimationFrame(run);
    render();
    update();
    getSinWave(cxt,moveXY.x,moveXY.y,100,200);
    upline();
}


function render(){
    //cxt.clearRect(0,0,WINDOW_WIDTH, WINDOW_HEIGHT);

        cxt.fillStyle="#33B5E5";
        cxt.beginPath();
        cxt.arc( ball.x , ball.y , RADIUS , 0 , 2*Math.PI , true );
        cxt.closePath();

        cxt.fill();    
}
function update(){
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.vy += ball.g;

        if( ball.y >= WINDOW_HEIGHT-RADIUS ){
            ball.y = WINDOW_HEIGHT-RADIUS;
            ball.vy = - ball.vy*0.75;
        }        
}

function upline(){
    moveXY.a=moveXY.a+0.1;
}
function getSinWave(context,x,y,width,height){  
    
    context.save();  
      
    context.beginPath();
    context.moveTo(x,y);  
    //for(var i=0;i<2;i+=0.1){   context.lineTo(i*width,Math.sin(i*width*Math.PI/180)*height);
    var b=moveXY.a*width;var c=Math.sin(moveXY.a*width*Math.PI/180)*height;
    context.lineTo(b,c);//debugger;
    moveXY.x=b;moveXY.y=c;
    //context.lineTo(50,500);
    //console.log(moveXY.x,moveXY.y)
    context.stroke();  
    context.restore(); 

}