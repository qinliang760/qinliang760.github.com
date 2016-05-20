//引入依赖
var express = require('express');
var cheerio = require('cheerio');
var fs = require('fs');
var request = require("request");
var superagent = require('superagent');
var mkdirp = require('mkdirp');

//建立express实例
var app = express();
app.use(express.static(__dirname));
//console.log();
//
//var dir='';
var download = function(url, dir_p, filename){
    var path=dir_p;
    mkdirp(path);
    request.head(url, function(err, res, body){
      request.get(url).pipe(fs.createWriteStream(path + "/" + filename));
    });
  };
var getImg=function(src,lt){
    if(src.indexOf("cloudfront")!=-1){
      var src_dir=src.indexOf("cloudfront.net");
      var dir_p="images"+src.substring(src_dir,lt);
      dir_p=dir_p.replace(/cloudfront.net/,"");
      return dir_p;
    }
}
var getCss=function(src,lt){
    if(src.indexOf("cloudfront")!=-1){
      var src_dir=src.indexOf("cloudfront.net");
      var dir_p="css"+src.substring(src_dir,lt);
      dir_p=dir_p.replace(/cloudfront.net/,"");
      return dir_p;
    }
}
var getJs=function(src,lt){
    if(src.indexOf("cloudfront")!=-1){
      var src_dir=src.indexOf("cloudfront.net");
      var dir_p="js"+src.substring(src_dir,lt);
      dir_p=dir_p.replace(/cloudfront.net/,"");
      return dir_p;
    }
}
var getVideo=function(src,lt){
    if(src.indexOf("cloudfront")!=-1){
      var src_dir=src.indexOf("cloudfront.net");
      var dir_p="images"+src.substring(src_dir,lt);
      dir_p=dir_p.replace(/cloudfront.net/,"");
      return dir_p;
    }
}

var getBg=function(dom,$){
      $(dom).each(function(k,v){
          var bg=$(v).css("background-image");
          if(bg.indexOf('"')!=-1){
            var src=bg.substring(5,bg.length-2);
          }else{
            var src=bg.substring(4,bg.length-1);
          }
          
          var lt=src.lastIndexOf("/");
          var dir_p=getImg(src,lt);
          if(dir_p){         
            download(src,dir_p,src.substring(lt));
            $(v).css("background-image","url(http://overwatch.nos.netease.com/1/assets/"+dir_p+src.substring(lt)+")");            
          }
          
      })
}

//app.get('/', function (req, res, next) {
  // 用 superagent 去抓取内容
  superagent.get('https://playoverwatch.com/zh-tw/heroes/'+process.argv[2]+'/')
    .end(function (err, sres) {
      // 常规的错误处理
      if (err) {
        return next(err);
      }

      var $ = cheerio.load(sres.text);

      var items = [];


      //var b=$("body").html();
      
      /**
       * fix css
       * @param  {[type]} k    [description]
       * @param  {[type]} v){                       var src [description]
       * @return {[type]}      [description]
       */
      $("link").each(function(k,v){
          var src=$(v).attr("href");
          var lt=src.lastIndexOf("/");
          var dir_p=getCss(src,lt);
          if(dir_p){
            var file_name=src.substring(lt);
            var css_arr=file_name.split("-")
            file_name=css_arr[0]+".css";
            download(src,dir_p,file_name);            
            $(v).attr("href",dir_p+file_name);
          }          
      })

      /**
       * fix js
       * @param  {[type]} k    [description]
       * @param  {[type]} v){                   } [description]
       * @return {[type]}      [description]
       */
      $("script",$("body")).each(function(k,v){
          if($(v).attr("src")){
            var src=$(v).attr("src");
            var lt=src.lastIndexOf("/");
            var dir_p=getJs(src,lt);
            if(dir_p){
              var file_name=src.substring(lt);
              var css_arr=file_name.split("-")
              file_name=css_arr[0]+".js";
              download(src,dir_p,file_name);            
              //$(v).attr("src","http://overwatch.nos.netease.com/1/assets/"+dir_p+file_name);
              $(v).attr("src","/js/bnet/"+file_name);
            } 
          }
      })
      /**
       * fix image
       * @param  {[type]} k    [description]
       * @param  {[type]} v){                       var src [description]
       * @return {[type]}      [description]
       */
      $("img").each(function(k,v){
          var src=$(v).attr("src");
          var lt=src.lastIndexOf("/");
          var dir_p=getImg(src,lt);
          if(dir_p){
            download(src,dir_p,src.substring(lt));
            $(v).attr("src","http://overwatch.nos.netease.com/1/assets/"+dir_p+src.substring(lt));
          }
          
          
      })
      $("video").each(function(k,v){
          var src=$(v).attr("poster");
          if(src){
            var lt=src.lastIndexOf("/");
            var dir_p=getImg(src,lt);
            if(dir_p){
              download(src,dir_p,src.substring(lt));
              $(v).attr("poster","http://overwatch.nos.netease.com/1/assets/"+dir_p+src.substring(lt));
            }            
          }

      })

      getBg(".media-border a",$);
      getBg(".hero-type-container .image",$);
      /**
       * fix video
       * @param  {[type]} k    [description]
       * @param  {[type]} v){                       var src [description]
       * @return {[type]}      [description]
       */
      $("video").each(function(k,v){
          $(v).find("source[type='video/webm']").remove();
          var src=$(v).find("source[type='video/mp4']").attr("src");
          var lt=src.lastIndexOf("/");
          var dir_p=getVideo(src,lt);
          if(dir_p){
            download(src,dir_p,src.substring(lt));
            $(v).find("source[type='video/mp4']").attr("src","http://overwatch.nos.netease.com/1/assets/"+dir_p+src.substring(lt));
          }
          
          
      })


      var title=$("title",$("head"));
      var link=$("link",$("head"));
      var style=$("style",$("head"));
      var script_head=$("script",$("head"));


      var head=['<head>',
      '<!--#include virtual="/features/common/head.html" -->',
      '<title>英雄 - 《守望先锋™》官方网站</title>',
      '<!--#include virtual="/features/common/css.html" -->',
      '<link rel="stylesheet" href="/css/pages/hero-detail.css">',
      style+script_head,
      '</head>'].join("");

      //$("body").find("video").remove();
      //$("script[src]",$("body")).remove();
      //var navbars=$(".navbars");
      var slide_menu=$(".slide-menu");
      var abilities=$("#abilities");
      var details=$("#details");
      var media=$("#media");
      var selectHeroes=$("#selectHeroes");
      var footer=$("#footer");
      var bootstrap_footer=$(".bootstrap-footer");
      var script_footer=$("script[src],script[type]",$("body"));                  
      var body=["<body>",
      '<!--#set var="active"value="3" -->',
      '<!--#include virtual="/features/common/nav.shtml" -->',
      slide_menu+abilities+details+media+selectHeroes,
      '<!--#include virtual="/features/common/footer.html" -->',
      '<!--#include virtual="/features/common/js.html" -->',
      '<script>$(function() {Common.init();})</script>',
      script_footer,
      '<script>$(function() {app.hero_details.init();})</script>',
      '<!--#include virtual="/features/common/analytics.html" -->',
      "</body>"].join("");


      //res.send(head+body);
      var path="D:/svn/carrier/overwatch/branches/dev/src/main/webapp/features/heroes";
      var html='<!doctype html><html xmlns="http://www.w3.org/1999/xhtml">'+head+body+'</html>'
      fs.writeFile(path+"/"+process.argv[2]+".shtml",html,function(err){
          if(!err)
          console.log("写入成功！")
      })
    });
//});

app.listen(3000, function (req, res) {
  console.log('app is running at port 3000');
});