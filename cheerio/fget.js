//引入依赖
var express = require('express');
var cheerio = require('cheerio');
var fs = require('fs');
var request = require("request");
var superagent = require('superagent');

//建立express实例
var app = express();
app.use(express.static(__dirname));
//console.log();
//
var dir='./images';
var download = function(url, dir, filename){
    request.head(url, function(err, res, body){
      request(url).pipe(fs.createWriteStream(dir + "/" + filename));
    });
  };
app.get('/', function (req, res, next) {
  // 用 superagent 去抓取内容
  superagent.get('http://hs.localhost/download/')
    .end(function (err, sres) {
      // 常规的错误处理
      if (err) {
        return next(err);
      }

      var $ = cheerio.load(sres.text);

      var items = [];
      var head=['<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /><title>英雄</title>',
      '<link rel="stylesheet" href="app.css" type="text/css" media="all" />',
      '</head>'].join("");
      //var b=$("body").html();
      
      $(".hero-ability img").each(function(k,v){
          var src=$(v).attr("src");
          var lt=src.lastIndexOf("/");
          if(src.indexOf("cloudfront")!=-1){
            download(src,dir,src.substring(lt));

          }
          $(v).attr("src",dir+src.substring(lt));
          
      })
      $(".media-border a").each(function(k,v){
          var bg=$(v).css("background-image");
          var src=bg.substring(4,bg.length-1);
          var lt=src.lastIndexOf("/");
          if(src.indexOf("cloudfront")!=-1){
            download(src,dir,src.substring(lt));
          }
          
          $(v).css("background-image","url("+dir+src.substring(lt)+")");
      })      
      $("body").find("video").remove();
      var navbars=$(".navbars");
      var slide_menu=$(".slide-menu");
      var abilities=$("#abilities");
      var details=$("#details");
      var media=$("#media");
      var selectHeroes=$("#selectHeroes");
      var footer=$("#footer");
      var bootstrap_footer=$(".bootstrap-footer");                  
      var body="<body>"+navbars+slide_menu+abilities+details+media+selectHeroes+footer+bootstrap_footer+"</body>"


      res.send(head+body);
    });
});

app.listen(3000, function (req, res) {
  console.log('app is running at port 3000');
});