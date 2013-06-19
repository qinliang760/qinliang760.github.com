var Suspense={
  init:function(){
      this.hammerHander();
  },
  hammerHander:function(){
    $("#join").click(function(){
        var hammer=$(".hammer");
        if(!hammer.is(":animated")){
            $(".hammer").animate({rotate:"90deg"},function(){
                $(this).animate({rotate:"0deg"});                
                Suspense.joinHander();
            });          
        }

        return false;
    })
  },
  queryJoiner:function(){

  },
  joinHander:function(){
        var n=$.cookie("HS_JOIN");
        var data={"num":"1234567890","time":"12"};
        Suspense.formatNum(data.num);
        Suspense.getPercent(data.time);
        if(n==null){
            $.post("test.php",
                {
                  count:1
                },
                function(data){
                  //var data={"num":"1234567890","time":"10"};
                   $.cookie("HS_JOIN",1); 

                }
            )
        }else{
            alert("您已经参与过了！")
        }  

  },
  gifShow:function(){

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
  }
}