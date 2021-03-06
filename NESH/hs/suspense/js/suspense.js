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
                    Suspense.fireEffect();                    
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
                  if(typeof res.total=="undefined")return;
                  var num=Suspense.formatNum(res.total);
                  $("#joiner strong").text(num);
              }
            );
      },10000);

  },
  joinHander:function(){        
        var progress=$("#progress .progressbar");
        progress.animate({width:"+=1%"},1000);
        $("#runer").fadeOut(2000,function(){$(this).fadeIn()});
        var ck=$.cookie("__utbg");
        if(ck==null){
            $.getJSON(
              "/bingo",
              { t: new Date().getTime() },
              function(res) {
                if(res.msg == "dup") {
                   $(".joinTip").fadeIn("fast",function(){setTimeout(function(){$(".joinTip").fadeOut();},2000)});
                } else {
                  if(typeof res.total=="undefined")return;
                  var num=Suspense.formatNum(res.total);
                  $("#joiner strong").text(num);
                  if(parseInt(progress.css("width"))>=805)return;

                  if(!progress.is(":animated")){
                      progress.animate({width:"+=1%"},1000);
                  }

                }
              }
            );
        }else{
          $(".joinTip").fadeIn("fast",function(){setTimeout(function(){$(".joinTip").fadeOut();},2000)});

        } 
      

  },
  gifShow:function(){
      var runObj=$("#runer img");
      var runer=["panda.gif","panda.gif"];
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
          bar=$("#progress .progressbar"),
          run=$("#runer"),
          hour=parseInt(progress.attr("rel")),
          percentage=this.getPercent(hour);
      percentage=this.maxPer(percentage);
      bar.css({"opacity":0}).animate({"width":percentage,"opacity":1},2000,function(){
          run.animate({right:"-45px"},2000);
          
      });

      bar.hover(function(){
          progress.text(percentage);
      },function(){
          progress.text("");
      })
  },
  maxPer:function(percentage){
      if(parseInt(percentage)>parseInt("100%")){
        return percentage="100%"
      }else{
        return percentage;
      }
      
  },
  fireEffect:function(){
      var fireWrap=$("#join");
      var fire='<img class="fire" src="/images/suspense/fire.png"/>';
      var fireArr=[];
      var bezier_params=[];
      var speed=[1000,900,800,700,600]
      for(var i=0;i<5;i++){
          var params={
              start: { 
                x: 207, 
                y: 12, 
                angle: 10
              },  
              end: {
                x:-(300+Suspense.randomNum(60)),
                y:12, 
                angle: 10, 
                length: Suspense.randomNum(3)
              }
          }

          fireArr.push(fire);
          bezier_params.push(params);
      }
      fireWrap.find(".fire").remove();
      fireWrap.append(fireArr.join(""));
      var fireObj=$(".fire");
      fireObj.css("opacity",1);
      fireObj.each(function(k,v){
          $(v).animate({path : new $.path.bezier(bezier_params[k]),opacity:0},speed[k]);
      })

         
  },
  randomNum:function(num){
       return Math.random() * num; 
  }
}

    var jiathis_config={
        data_track_clickback:true,
        summary:"hs",
        pic:"",
        hideMore:false
    }