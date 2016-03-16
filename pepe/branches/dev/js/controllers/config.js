'use strict';

/**
 * @ngdoc function
 * @name ftController.controller:mainController
 * @description
 * # mainController
 * Controller of the angularApp
 */
var configController = angular.module('configController', ['ngFileUpload','ui.slider']);

configController.controller('configMainController',['$rootScope','$scope','$location','Fts','$http','Upload','$cookies', function($rootScope, $scope, $location, Fts, $http, Upload,$cookies) {
	Fts.checkLogin($scope,location.href,"rewrite"); //验证登录
	$rootScope.page = "模板配置页";
	$rootScope.nav = 'config';
	$scope.index = 0; //初始化索引
	$scope.popupbank = false; //是否显示pop图片集弹窗
	$scope.popupmodel = false; //是否显示popup的背景
	$scope.config_publish_show = false; //是否显示publish页面
	$scope.subIndex = 0; //初始化索引
	$scope.currentEdit = "global"; //当前处理的元素
	$scope.isNew=true;
	$scope.target_val = '_blank';
	$scope.publishNewUrl = 0;  // 发布时是否重新生成地址0-默认不更新URL 1-代表更新URL
	$scope.publish_data={//发布的数据结构
		title:"未命名专题",
		description:"",
		keywords:"",
		share_pic:"",
		share_text:""
	};

	$scope.pageSlideAnimate = [{
		v:"ScreenTouchGo",
		name:"默认触摸滚动"
	},{
		v:"ScreenTouchCover",
		name:"触摸覆盖滚动"
	},{
		v:"ScreenTouch",
		name:"触摸缩放滚动"
	},{
		v:"ScreenCling",
		name:"粘连缩放滚动"
	}]

	$scope.pageSlideAnimateSpeed = [{
		v:400,
	    name: "中速"
	}, {
		v:200,
	    name: "较快"
	}, {
		v:100,
	    name: "很快"
	}, {
		v:600,
	    name: "慢速"
	}];
	var dataInit = {
		"css": [
            //"swipe.css"
        ],
        "global": {
            "arrow": "http://jv-fe.github.io/JV/JVJ/demo/phone_slide/src/img/arrow.png",
            "background": "#eee",
            "backgroundMusic":{
            	name:"无背景音乐",
            	url:""
            },
            "height": "1048",
            "option": {
                "effect": "ScreenTouchGo",
                "speed": 400,
                "scale": "n",
                "rotation": "y",
                "shareHint":true
            },
            "width": "640"
        },
        "id": "3",
        "js": [
            //"jquery.imgpreload.js"
        ],
        "name": "",
        "screen": [{
        	"bg":""
        }]
	}
	Fts.getJson("/app/get"+$location.$$path).success(function(data) {

		//console.log(data)
		//if(data.app_data && data.app_data!="{}"){
		if(data.status != "error"){
			//console.log(data.app_data)
			if(data.app_data.length < 1){
				$scope.data=dataInit;
				return false;
			}
			$scope.data = angular.fromJson(data.app_data);
			var cookie = $cookies.get("nickname");
			console.log(data.creator)
			if(cookie == data.creator){
				console.log($scope.data);
				if(typeof(data.publish_data) == "object"){
					$scope.publish_data = data.publish_data;
				}
				//console.log(typeof($scope.publish_data))
				//console.log($scope.publish_data)
				$scope.isNew=false;
			}else {
				console.log($scope.data)
				$scope.isNew=true;
			}
		}else{
			$scope.data=dataInit;
		}

	}).error(function(res) {

	})


/*	Fts.get("/js/config.json").success(function(data) {
		//console.log(data);
		$scope.data = data;

	}).error(function(res) {

	})*/

	$scope.setInit = function() { //初始化数据

	}
	$scope.addText = function() {
		var defult = {
			"content": "请输入文字",
			"effect": {
				"name":"",
				"init":"",
				"delay":"ani_0s"
			},
			"styles": {
				"color": "#000",
				"font-family": "Microsoft YaHei",
				"font-size": "14px",
				"font-style": "normal",
				"font-weight": "normal",
	            "left": Math.floor(Math.random()*42),
	            "top": Math.floor(Math.random()*600),
				"z-index": 199,
				"position": "absolute",
                "animation":{
                	"animation-delay":"0",
                	"animation-duration":"0.5"
                }
			},
			"link": ""
		}
		var c_t = $scope.data.screen[$scope.index].text;
		if (c_t) {
			c_t.push(defult);

		} else {
			$scope.data.screen[$scope.index].text = []
			$scope.data.screen[$scope.index].text.push(defult);
		}
		$scope.currentEdit = "text";
		//$scope.addActive = true; //添加active
		//$scope.animate_delay_init()  //动画顺序初始化
		$scope.setText($scope.data.screen[$scope.index].text.length - 1);
	}
	$scope.imgObj={};
	$scope.countImage=function(url,callback){

		var image = new Image();
		image.src=url;
		image.onload = function () {
			$scope.imgObj.width = this.width;
			$scope.imgObj.height = this.height;
			var defult = {
				"effect": {
					"name":"",
					"init":"",
					"delay":"ani_0s"
				},
				"styles": {
	                "left": Math.floor(Math.random()*70),
	                "top": Math.floor(Math.random()*300),
	                "height": $scope.imgObj.height,
	                "width": $scope.imgObj.width,
	                "z-index": 199,
	                "position":"absolute",
	                "animation":{
	                	"animation-delay":"0",
	                	"animation-duration":"0.5"
	                }
				},
				"link": "",
				"url": url
			}

			if($scope.imageType=="change"){//替换图片
				$scope.data.screen[$scope.index].image[$scope.subIndex]=defult;
			}else{
				var c_t = $scope.data.screen[$scope.index].image;
				if (c_t) {
					c_t.push(defult);

				} else {
					$scope.data.screen[$scope.index].image = []
					$scope.data.screen[$scope.index].image.push(defult);
				}

				$scope.setImage($scope.data.screen[$scope.index].image.length - 1);
			}
			callback && callback();

		};
	};
	//渲染动画内容
	$scope.animationStyle = function(data){

	};
	$scope.addImage = function(url,imageType) {
		//console.log(imageType)//用于判断图片类型
		$scope.currentEdit = "image";
		//$scope.addActive = true; //添加active
		//$scope.animate_delay_init()  //动画顺序初始化

		if(url){
			$scope.countImage(url,function(){
	            $scope.$apply();
            });
			$scope.removePop();
		}else {
			//$scope.getImgInput();
		}

	}
	$scope.addVideo = function() {
		var defult = {
			"effect": {
				"name":"",
				"init":""
			},
			"styles": {
				"left": "70",
				"top": "388",
				"height": "224",
				"width": "398",
				"z-index": 199,
				"position": "absolute",
                "animation":{
                	"animation-delay":"0",
                	"animation-duration":"0.5"
                }
			},
			"params": {
				//"autoplay": "",
				//"controls": "controls",
				//"loop": "",
				"poster": "/images/video_holder.jpg"
			},
			"url": ""

		}
		var c_t = $scope.data.screen[$scope.index].video;
		if (c_t) {
			c_t.push(defult);

		} else {
			$scope.data.screen[$scope.index].video = []
			$scope.data.screen[$scope.index].video.push(defult);
		}
		$scope.currentEdit = "video";
		//$scope.addActive = true; //添加active
		//$scope.animate_delay_init()  //动画顺序初始化
		$scope.setVideo($scope.data.screen[$scope.index].video.length - 1);

	}
	$scope.addScreen = function() {
		var defult = {
			"bg": ""
		};
		$scope.data.screen.push(defult);
	}
	$scope.copyScreen = function(index) {//从当前往后插入到数组
		var copyObj=angular.copy($scope.data.screen[index]);
		$scope.data.screen.splice(index,0,copyObj);
		console.log(index);
		$scope.preview_index = index;
	}
	$scope.deleteScreen = function(index) {//从当前删除

		var c = confirm("确定要删除吗？");
		if (c) {
			$scope.data.screen.splice(index, 1);
		}

	}
	$scope.setScreen = function(index) {
		$scope.index = index;
		$scope.currentEdit="global";
		$scope.preview_index = index;
		//$scope.addActive=false;
		//$(angular.element(document)).find(".m-preview-box").eq(index).addClass('active').siblings().removeClass("active");

	}
	$scope.setBold = function(v) {
		if (v == "bold") {
			$scope.data.screen[$scope.index].text[$scope.subIndex].styles["font-weight"] = "normal";
		} else {
			$scope.data.screen[$scope.index].text[$scope.subIndex].styles["font-weight"] = "bold";
		}
	}
	$scope.setItalic = function(v) {
		if (v == "italic") {
			$scope.data.screen[$scope.index].text[$scope.subIndex].styles["font-style"] = "normal";
		} else {
			$scope.data.screen[$scope.index].text[$scope.subIndex].styles["font-style"] = "italic";
		}
	}
	$scope.setEffect = function(v, type, init) {
		// if (type == "text") {
		// 	$scope.data.screen[$scope.index].text[$scope.subIndex].effect.name = v;
		// 	$scope.data.screen[$scope.index].text[$scope.subIndex].effect.init = init;
		// } else if (type == "image") {
		// 	$scope.data.screen[$scope.index].image[$scope.subIndex].effect.name = v;
		// 	$scope.data.screen[$scope.index].image[$scope.subIndex].effect.init = init;
		// }

		$scope.data.screen[$scope.index][type][$scope.subIndex].effect.name = v;
		$scope.data.screen[$scope.index][type][$scope.subIndex].effect.init = init;

		//console.log($scope.data);
	}
	$scope.setAnimate = function(index) {

		$scope.showRun={};

		for (var i = 0; i < $scope.effect.length; i++) {
			if (i == index) {
				$scope.showRun[index]=$scope.effect[i].v;
				break;
			}
		}

	}

	$scope.setText = function(index) {
		$scope.currentEdit = "text";
		$scope.subIndex = index;
		$scope.data.screen[$scope.index][$scope.currentEdit].curIndex=$scope.subIndex;//存储当前激活的index值

		var font_family = $scope.data.screen[$scope.index].text[$scope.subIndex].styles["font-family"];
		var font_size = $scope.data.screen[$scope.index].text[$scope.subIndex].styles["font-size"];
		//var animate_delay = $scope.data.screen[$scope.index].text[$scope.subIndex].effect["delay"];
		//console.log("textanimate_delay = " + animate_delay)
		//$scope.setAnimate_delay_default(animate_delay,"text")  //设置动画
		for (var i = 0; i < $scope.font_family.length; i++) {
			if ($scope.font_family[i].v == font_family) {
				$scope.font_family_default = $scope.font_family[i]
				break;
			}
		}
		for (var i = 0; i < $scope.font_size.length; i++) {
			if ($scope.font_size[i].v == font_size) {
				$scope.font_size_default = $scope.font_size[i]
				break;
			}
		}
		if(!$scope.data.screen[$scope.index][$scope.currentEdit][index].styles.animation){
			$scope.data.screen[$scope.index][$scope.currentEdit][index].styles.animation = {
				"animation-delay":"0",
	            "animation-duration":"0.5"
			}
		}

		//$(angular.element(document)).find(".dragText").eq($scope.subIndex).addClass('ui-resizable-active').siblings().removeClass("ui-resizable-active");



	}
	$scope.setImage = function(index) {
		$scope.subIndex = index;
		$scope.currentEdit = "image";
		$scope.data.screen[$scope.index][$scope.currentEdit].curIndex=$scope.subIndex;
		//console.log($scope.data.screen[$scope.index][$scope.currentEdit])
		//console.log($scope.data.screen[$scope.index][$scope.currentEdit][index].styles)
		if(!$scope.data.screen[$scope.index][$scope.currentEdit][index].styles.animation){
			$scope.data.screen[$scope.index][$scope.currentEdit][index].styles.animation = {
				"animation-delay":"0",
	            "animation-duration":"0.5"
			}
		}
		//$(angular.element(document)).find(".dragImg").eq($scope.subIndex).addClass('ui-resizable-active').siblings().removeClass("ui-resizable-active");

		//var animate_delay = $scope.data.screen[$scope.index].image[$scope.subIndex].effect["delay"];
		//console.log(animate_delay)
		//$scope.setAnimate_delay_default(animate_delay,'image')  //设置动画
	}
	$scope.setVideo = function(index) {
		$scope.subIndex = index;
		$scope.currentEdit = "video";
		$scope.data.screen[$scope.index][$scope.currentEdit].curIndex=$scope.subIndex;
		if(!$scope.data.screen[$scope.index][$scope.currentEdit][index].styles.animation){
			$scope.data.screen[$scope.index][$scope.currentEdit][index].styles.animation = {
				"animation-delay":"0",
	            "animation-duration":"0.5"
			}
		}
		//$(angular.element(document)).find(".dragVideo").eq($scope.subIndex).addClass('ui-resizable-active').siblings().removeClass("ui-resizable-active");
		//var animate_delay = $scope.data.screen[$scope.index].video[$scope.subIndex].effect["delay"];
		//$scope.setAnimate_delay_default(animate_delay,'video')  //设置动画
		//$(angular.element(document)).find(".dragImg").eq($scope.subIndex).addClass('ui-resizable-active').siblings().removeClass("ui-resizable-active");

	}
	$scope.setBg = function(index) {
		$scope.currentEdit = "global";
	}
	//设置层级
	$scope.setZindex = function(v) {
		var index;
		if($scope.currentEdit=="global"){
			return;
		}
		var cur_zindex=$scope.data.screen[$scope.index][$scope.currentEdit][$scope.subIndex].styles["z-index"];
		switch(v){
			case "max":
				var maxVal = parseInt(angular.element(".m-workbench-box").attr('data-max'));
				index=maxVal+10;
				angular.element(".m-workbench-box").attr('data-max',index);
			break;
			case "+":
				index=parseInt(cur_zindex)+1;
			break;
			case "-":
				index=parseInt(cur_zindex)-1;
				index<0?index=0:"";
			break;
			case "0":
				var minVal = parseInt(angular.element(".m-workbench-box").attr('data-min'));
				index=minVal-1;
				index<0?index=0:index;
				angular.element(".m-workbench-box").attr('data-min',index);
			break;
		}
		$scope.data.screen[$scope.index][$scope.currentEdit][$scope.subIndex].styles["z-index"] = index;

	}

	//删除舞台元素
	$scope.setDelete=function(){
		if($scope.currentEdit=="global"){
			return;
		}
		var c = confirm("确定要删除吗？");
		if (c) {
			$scope.data.screen[$scope.index][$scope.currentEdit].splice($scope.subIndex, 1);
		}

	}

	$scope.setPop = function(source) {
		if ($scope.data.screen[$scope.index][source][$scope.subIndex].pop) {
			delete $scope.data.screen[$scope.index][source][$scope.subIndex].pop;
		} else {
			$scope.data.screen[$scope.index][source][$scope.subIndex].pop = {
				type: "text",
				content: "",
				hasClose:true
			}
		}
	}
	$scope.setShare = function(){
		if($scope.data.global.option.shareHint){
			$scope.data.global.option.shareHint = !$scope.data.global.option.shareHint;
		}else {
			$scope.data.global.option.shareHint = true;
		}
	}
	$scope.font_family = [{
		v: "Microsoft YaHei"
	}, {
		v: "sans-serif"
	}, {
		v: "Arial"
	}, {
		v: "Helvetica"
	}];
	$scope.font_size = [{
		v: "12px"
	}, {
		v: "14px"
	}, {
		v: "16px"
	}, {
		v: "18px"
	}, {
		v: "20px"
	}, {
		v: "22px"
	}, {
		v: "24px"
	}, {
		v: "26px"
	}, {
		v: "28px"
	}, {
		v: "36px"
	}, {
		v: "50px"
	}, {
		v: "64px"
	}, {
		v: "72px"
	}, {
		v: "90px"
	}];
	$scope.animateDelay = [{
		v:1,
		ani_class:"ani_0s"
	},{
		v:2,
		ani_class:"ani_200ms"
	},{
		v:3,
		ani_class:"ani_400ms"
	},{
		v:4,
		ani_class:"ani_600ms"
	},{
		v:5,
		ani_class:"ani_800ms"
	},{
		v:6,
		ani_class:"ani_1s"
	}]
	$scope.effect = [{
		v: "",
		init:"",
		name:"无动画"
	},{
		v: "fadeIn",
		init:"animate ani_hide",
		name:"淡入"
	},{
		v: "fadeOut",
		init:"animate",
		name:"淡出"
	},{
		v: "fadeInRight",
		init:"animate ani_hide",
		name:"从右飞入"
	}, {
		v: "fadeInLeft",
		init:"animate ani_hide",
		name:"从左飞入"
	}, {
		v: "fadeInTop",
		init:"animate ani_hide",
		name:"从上飞入"
	}, {
		v: "fadeInBottom",
		init:"animate ani_hide",
		name:"从下飞入"
	}, {
		v: "fadeInTopLeft",
		init:"animate ani_hide",
		name:"左上飞入"
	}, {
		v: "fadeInTopRight",
		init:"animate ani_hide",
		name:"右上飞入"
	}, {
		v: "fadeInBottomLeft",
		init:"animate ani_hide",
		name:"左下飞入"
	}, {
		v: "fadeInBottomRight",
		init:"animate ani_hide",
		name:"右下飞入"
	}, {
		v: "fadeInSmall",
		init:"animate ani_hide",
		name:"收缩淡入"
	}, {
		v: "fadeInBig",
		init:"animate ani_hide",
		name:"放大淡入"
	}, {
		v: "ani_shake",
		init:"animate_1s",
		name:"摇晃"
	}, {
		v: "ani_bounce",
		init:"animate_1s",
		name:"弹起"
	}];

	
	$scope.change = function(type, df) {
		$scope.data.screen[$scope.index].text[$scope.subIndex].styles[type] = $scope[df].v;
	}
	$scope.saveData = function(callback) {//保存
		var preview_img=$scope.publish_data.share_pic;
		if(preview_img==""){
			preview_img="http://nos.netease.com/blz/3/1/190452dbcd1066737b246bede06bf2bf.jpg";
		}

		if($scope.isNew){

			Fts.postJson("/app/add", {
				app_name: $scope.publish_data.title,
				model_file:"1",
				preview_img:preview_img,
				app_data: angular.toJson($scope.data),
				publish_data:angular.toJson($scope.publish_data)
			}).success(function(data) {
				if (data.status == "error") {
					alert(data.msg);
				} else {
					$scope.pid=data.msg;
					$scope.isNew = false;
					location.hash = "#/"+data.msg;
					if(callback == "alert"){
						alert('保存成功');
					}else {
						callback && callback();
					}
				}
			}).error(function(res) {

			})
		}else{
			Fts.postJson("/app/update"+$location.$$path, {
				//id:$location.$$path.replace("\/",""),
				app_name: $scope.publish_data.title,
				model_file:"1",
				preview_img:preview_img,
				app_data: angular.toJson($scope.data),
				publish_data:angular.toJson($scope.publish_data)

			}).success(function(data) {
				if (data.status == "error") {
					alert(data.msg);
				} else if(data.msg == "role"){
					$scope.isNew = true;
					$scope.saveData(function(){
						$scope.getDataP($scope.pid);
					});
				} else {
					if(callback == "alert"){
						alert('更新成功');
					}
				}
			}).error(function(res) {

			})
		}

	}
	$scope.getData = function() {
		//id:$routeParams.cId
		var pid="";
		if($scope.isNew){
			if(typeof $scope.pid=="undefined"){
				var w_open = window.open('/preview/loading','newwindow');
				$scope.saveData(function(){
					$scope.getDataP($scope.pid,w_open);
				});
			}else{
				//console.log(2);
				$scope.saveData();
				$scope.getDataP($scope.pid);
			}
		}else{
			pid=$location.$$path.replace("\/","");
			$scope.saveData();
			$scope.getDataP(pid);
		}

	}
	$scope.getDataP=function(pid,w_open){
		if(!w_open){ //先保存后打开的情况片段
			w_open = window.open('/preview/loading','newwindow');
		}
		Fts.postJson("/app/preview_submit", {
			content_json: angular.toJson($scope.data),
			id: pid
		}).success(function(data) {
			if (data.status == "error") {
				alert(data.msg);
			} else {
				w_open.location = "/preview/" + data.msg;
			}
		}).error(function(res) {

		})
	}
	$scope.setPublish=function(){
		$scope.publish_success=false;
		$scope.config_publish_show = true;
	}
	$scope.setPublishNewUrl=function(){
		$scope.publishNewUrl = $scope.publishNewUrl==0?1:0;
	}

	//提交发布内容
	$scope.publish_submit = function(){

		//id:$routeParams.cId
		var pid="";
		if($scope.isNew){
			if(typeof $scope.pid=="undefined"){
				$scope.saveData(function(){
					$scope.setPublishSubmit($scope.pid);
				});
			}else{
				$scope.saveData();
				$scope.setPublishSubmit($scope.pid);
			}
		}else{
			pid=$location.$$path.replace("\/","");
			$scope.saveData();
			$scope.setPublishSubmit(pid);
		}
	}
	$scope.setPublishSubmit = function(pid){
		var dataJson = angular.copy($scope.data);
		var publishJson = $scope.publish_data;
		var compileApp = new JV.touch(1,{data:dataJson});
		var content_HTML = compileApp.setModel();
		//var content_HTML;
        var backgroundMusic_HTML = compileApp.util().setMusic(dataJson.global.backgroundMusic.url);//添加需要加入的CSS
        var global_HTML = dataJson.global.background;//添加全局配置
		var js_HTML = compileApp.util().setJs(dataJson.js,"html");//添加需要加入的JS
        var css_HTML = compileApp.util().setCss(dataJson.css,"html");//添加需要加入的CSS
		var publish_HTML = '<!DOCTYPE html><html><head><meta charset="utf-8">\
<title>'+ $scope.publish_data.title+'</title>\
<meta name="description" content="'+ $scope.publish_data.description +'" />\
<meta name="keywords" content="'+ $scope.publish_data.keywords +'" />\
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" name="viewport">\
<link type="text/css" rel="stylesheet" href="/css/pepe.min.css">\
</head><body style="background:'+ global_HTML +'">\
<div class="main" id="appContainer"><div class="content" id="content" data-index="1">'+ backgroundMusic_HTML + content_HTML +'</div></div>\
<script src="/js/pepe.min.js"></script>\
<script>\
var phone = new JV.phoneSlide($("#content"), '+ angular.toJson($scope.data.global.option) +'); phone.setScale(640,32,32)</script>\
<script src="http://analytics.163.com/ntes.js" type="text/javascript"></script>\
<script type="text/javascript">\
_ntes_nacc = "pepe";\
neteaseTracker();\
neteaseClickStat();\
</script>\
</body></html>';
		//console.log(publishJson)
		//console.log(publish_HTML)
		//console.log(angular.toJson(dataJson))
		//return;
		Fts.postJson("/app/publish",
			{
				id:pid,//id for test
				size:5, //设置二维码尺寸
				is_new_url:$scope.publishNewUrl, //是否生成新的链接
				content_json:angular.toJson($scope.data),// modify
				content_html: publish_HTML,
				publish_data:angular.toJson(publishJson)
			}).success(function(data){
			if(data.status=="error"){

				alert(data.msg);
			} else {
				$scope.publish_success = true;
				$scope.publish_url=data.msg.url;
				$scope.publish_code2=data.msg.code2;
				//window.open(data.msg);
			}

		}).error(function(res){

		})
	}

	//图片仓库
	$scope.popupbankJson = {};
	$scope.popupbankItemJson = [];
	$scope.popupbankNavType = "";
	$scope.getPopupBankInit = function(){
		Fts.getJson("/storage/colmun_lists").success(function(data) {
		//Fts.getJson("/features/data/colmun_lists.json").success(function(data) {
			//console.log(data);
			var s = data.status;
			var msg = data.msg;
			var cache = [];
			var popupbankJson = {
				index:0,
				gameType:[],
				nav:[],
				data:msg
			};
			if(s == "success"){
				for(var i=0; i<msg.length; i++){
					if(msg[i].parent_id == 0){
						popupbankJson.gameType.push({
							name:msg[i].name,
							cn_name:msg[i].cn_name,
							id:msg[i].id,
							prefix:msg[i].prefix
						})
					}
					if(!cache[msg[i].parent_id]){
						cache[msg[i].parent_id] = [];
					}
					cache[msg[i].parent_id].push({
						name:msg[i].name,
						cn_name:msg[i].cn_name,
						id:msg[i].id,
						prefix:msg[i].prefix
					})
				}
				//console.log(cache)
				//console.log(popupbankJson)
				for(var i=0; i<popupbankJson.gameType.length; i++){
					if(cache[popupbankJson.gameType[i].id]){
						popupbankJson.gameType[i].nav = cache[popupbankJson.gameType[i].id]
					}
				}
				popupbankJson.nav = popupbankJson.gameType[0].nav;
			}
			//console.log(popupbankJson);
			$scope.popupbankJson = popupbankJson;
			$scope.popupbankNavType = $scope.popupbankJson.gameType[0].nav[0].name;
			//console.log("aaa" +$scope.popupbankJsonIndex)
			$scope.getPopupBankImgJson(popupbankJson.nav[0].prefix,0)
		}).error(function(res) {

		});
	}
	$scope.getPopupBankImgJson = function(name,index,type){
		//console.log(index)
		if(type == 0){ //0 为gameType  切换
			$scope.popupbankNavIndex = index;
			$scope.popupbankJson.index = 0;
			$scope.popupbankJson.nav = $scope.popupbankJson.gameType[index].nav;
			$scope.popupbankNavType = $scope.popupbankJson.gameType[0].nav[0].name;
		}else if(type){ //1 为nav类型  切换
			$scope.popupbankJson.index = index;
			$scope.popupbankNavType = type;
		}
		if(!name){
			$scope.popupbankItemJson = [];
			return;
		}
		Fts.getJson("/storage/object_lists",{prefix:name}).success(function(data) {
			$scope.popupbankItemJson = data.msg;
			$(".pic-list").mCustomScrollbar("update");
			//console.log(data);
		}).error(function(res) {

		});
	}

	$scope.popupBankShow = function(){
		$scope.popupbank = true;
		$scope.popupmodel = true;
		$scope.getPopupBankInit();
	}

	$scope.removePop = function() {
		$scope.popupbank = false;
		$scope.popupmodel = false;
	}

	// 控制 文字设置 页面是否添加弹层
	$scope.J_operaTxt_pop_show = false;
	$scope.J_operaTxt_pop = function() {
		$scope.J_operaTxt_pop_show = !$scope.J_operaTxt_pop_show;
		//$(".g-operating-box").mCustomScrollbar("update");
	}
	$scope.deleteMusic = function(type){
		var c = confirm("确定要删除背景音乐吗？");
		if (c) {
			$scope.data.global.backgroundMusic= {
				url:"",
				name:"无背景音乐"
			};
		}
	}
	//标准文件上传格式
	$scope.uploadFiles = function (file,fileType,isNew) { //fileType：上传文件类型
		//console.log(file)
		//console.log(fileType)
		if(!file||!fileType){
			return;
		}
		var fileName = file.name;
		var num = 0;
		var checkJson = {
			video:['.mp4','.jpg','.png'],
			image:['.jpg','.png'],
			global:['.jpg','.png'],
			music:['.mp3','.ogg'],
			share:['.jpg','.png']
		};
		//console.log(checkJson[fileType])
		if(checkJson[fileType]){
			for(var i=0;i<checkJson[fileType].length;i++){
				if(fileName.indexOf(checkJson[fileType][i])>-1){
					num++;
					break;
				}
			}
			if(num == 0){
				alert("上传文件格式错误，请重新选择。");
				return;
			}
		}else {
			alert("无类型。");
			return;
		}
		Upload.upload({
            url: '/storage/put',
            data: {file: file}
        }).then(function (resp) {
            //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            var data = resp.data;
            var s = resp.data.status;
        	var msg = resp.data.msg;
        	if(s == "success"){
     //    		if($scope.config_publish_show){//发布页分享图片
     //    			$scope.publish_data.share_pic = msg.url;
					// return;
     //    		}
        		$scope.removePop();  //清除pop层
        		//console.log($scope.subIndex);
        		if(fileType=="image"){//"global"
        			if(isNew == "new"){
        				$scope.addImage();
        				$scope.countImage(msg.url,function(){
	            			$scope.$apply(function() {
	            				$scope.data.screen[$scope.index].image[$scope.subIndex].url = msg.url;
							});
	        			});
        			}else {
        				$scope.data.screen[$scope.index].image[$scope.subIndex].url = msg.url;
        			}
        		}else if(fileType=="global"){
        			$scope.data.screen[$scope.index].bg = msg.url;
        		}else if(fileType=="video") {
        			//console.log(msg.url.indexOf(".mp4"))
        			if(isNew == "new"){
        				$scope.addVideo();
        			}
        			if(msg.url.indexOf(".mp4")>-1){
            			$scope.data.screen[$scope.index].video[$scope.subIndex].url = msg.url;
        			}else if(msg.url.indexOf(".jpg")>-1||msg.url.indexOf(".png")>-1){
        				$scope.data.screen[$scope.index].video[$scope.subIndex].params.poster = msg.url;
        			}
        		}else if(fileType=="share"){
        			$scope.publish_data.share_pic = msg.url;
        		}else if(fileType=="music"){  //MP3 背景音乐添加
        			if(msg.url.indexOf(".mp3")>-1||msg.url.indexOf(".ogg")>-1){
						$scope.data.global.backgroundMusic= {
							url:msg.url,
							name:msg.file_name
						};
        			}else {
        				alert("背景音乐上传格式错误。");
        			}
        			return;
        		}
        	}else {
        		if(msg == "login"){
        			alert("请先登录！");
        		}else {
        			alert("系统繁忙，请稍后再试！");
        		}
        	}
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
    //删除图片 或者 重置状态
    $scope.resetStatus = function(type){
    	if(type == "global"){
        	$scope.data.screen[$scope.index].bg = '';
    	}
    }
	$scope.animate_delay_init = function(){
		$scope.animate_delay_default = $scope.animateDelay[0]
	};


	//设置style集合font,position
	/*	$scope.setStyle=function(style){
			var s=angular.extend(style.font,style.position);
			return s;
		}*/
}]);