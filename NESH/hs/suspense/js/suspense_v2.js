var Suspense={
  init:function(){      
      this.showPercent();
      this.queryJoiner();
      this.gifShow();
      this.hammerHander();
  },
  hammerHander:function(){
    $("#join").click(function(){
        var hammer=$(".hammer");
        if(!hammer.is(":animated")){
            $(".hammer").animate({rotate:"90deg"},function(){
                $(this).animate({rotate:"0deg"},function(){
                    Suspense.joinHander();
                });                
                
            });          
        }

        return false;
    })
  },
  queryJoiner:function(){

      setInterval(function(){
            $.getJSON(
              "/total",
              { t: new Date().getTime() },
              function(res) {
                  var num=Suspense.formatNum(res.total);
                  $("#joiner strong").text(num);
              }
            );
      },10000);

  },
  joinHander:function(){
    this.fireEffect();return;
        var ck=$.cookie("__utbg");
        if(ck==null){
            $.getJSON(
              "/bingo",
              { t: new Date().getTime() },
              function(res) {
                if(res.msg == "dup") {
                  alert("您已经参与过了！");
                } else {
                  var num=Suspense.formatNum(res.total);
                  $("#joiner strong").text(num);
                }
              }
            );
        }else{
          alert("您已经参与过了！");
        } 
      

  },
  gifShow:function(){
      var runObj=$("#runer img");
      var runer=["panda.gif","air.gif"];
      var randomNum=Math.floor(Math.random()*2);
      runObj.attr("src","/images/suspense/"+runer[randomNum]);
  },
  formatNum:function(num){
  
      num  =  num+"";   
      if(num.indexOf(',')>0){  
          num = num.replace(/,/gi,'') + "";   
      }  
      var  re=/(-?\d+)(\d{3})/    
      while(re.test(num)){    
          num=num.replace(re,"$1,$2")    
      }    
          
      return  num;    
 
  },
  delFormatNum:function(num){
      num=num.replace(/,/gi,'');
      return num;
  },
  getPercent:function(time){
      var day=4,
          hours=day*24,
          time=parseInt(time);
      var count=Math.round((time/hours)*100)+"%";

      return count;
  },
  showPercent:function(){
      var progress=$("#progress .percentage"),
          hour=parseInt(progress.attr("rel")),
          percentage=this.getPercent(hour);
      progress.text(percentage);
  },
  fireEffect:function(){
      var fireWrap=$("#join");
      var fire=$(".fire");

      var bezier_params = [
      {
          start: { 
            x: 207, 
            y: 12, 
            angle: 10
          },  
          end: {
            x:-363,
            y:0, 
            angle: Suspense.randomNum(50), 
            length: Suspense.randomNum(3)
          }
      },
      {
          start: { 
            x: 207, 
            y: 12, 
            angle: 10
          },  
          end: {
            x:-360,
            y:15, 
            angle: Suspense.randomNum(50), 
            length: Suspense.randomNum(3)
          }
      },
      {
          start: { 
            x: 207, 
            y: 12, 
            angle: 10
          },  
          end: {
            x:-350,
            y:30, 
            angle: Suspense.randomNum(50), 
            length: Suspense.randomNum(3)
          }
      }            
      ]

      $(".fire").css("opacity",1);   
      fire.eq(0).animate({path : new $.path.bezier(bezier_params[0]),opacity:0},1000)
      fire.eq(1).animate({path : new $.path.bezier(bezier_params[1]),opacity:0},900)
      fire.eq(2).animate({path : new $.path.bezier(bezier_params[2]),opacity:0},800)

         
  },
  randomNum:function(num){
       return Math.random() * num; 
  }
}