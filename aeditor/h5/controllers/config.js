'use strict';

/**
 * @ngdoc function
 * @name ftController.controller:mainController
 * @description
 * # mainController
 * Controller of the angularApp
 */
var configController=angular.module('configController', []);

configController.controller('configMainController', function ($rootScope,$scope) {
	$rootScope.page="模板配置页";
	$rootScope.nav = 'model';
	$scope.index=0;//初始化索引
	$scope.subIndex=0;//初始化索引
	$scope.data={
				    "css": [
				        "animate.css",
				        "swipe.css"
				    ],
				    "global": {
				        "arrow": "http://jv-fe.github.io/JV/JVJ/demo/phone_slide/src/img/arrow.png",
				        "background": "#eee",
				        "height": "",
				        "option": {
				            "effect":"ScreenCling",
				            "speed":200,
				            "scale":true,
				            "rotation":true
				        },
				        "width": ""
				    },
				    "id": "3",
				    "js": [
				        "underscore.js",
				        "jquery.imgpreload.js"
				    ],
				    "name": "带左右滑动的模板",
				    "screen": [
				        {
				            "bg": "http://heroes.nos.netease.com/1/images/touch/minisite/cross-promotion/s_1.jpg",
				            "children": [
				                {
				                    "description": "文字内容",
				                    "image": "http://blz.nos.netease.com/1/frame/cprt/icon20120516.png",
				                    "title": "文字内容"
				                }
				            ],
				            "image": [
				                {
				                    "effect": "fadeInTop",
				                    "height": "200",
				                    "link": "",
				                    "pop": {
				                        "content": "",
				                        "type": "image"
				                    },
				                    "position": {
				                        "left": "30%",
				                        "top": "30%",
				                        "z-index": "1"
				                    },
				                    "url": "http://img1.cache.netease.com/3g/hdppt/rls_9352/images/53c14fd87732f83054b3cead463aa738.png",
				                    "width": "200"
				                }
				            ],
				            "text": [
				                {
				                    "content": "指挥官们，你们在战役中扮演英雄大主教阿塔尼<br/>斯，通过联合不同星灵阵营来阻止埃蒙的毁灭计<br/>划。为了艾尔！",
				                    "effect": "",
				                    "font": {
				                        "color": "#000",
				                        "font-family": "Microsoft YaHei",
				                        "font-size": "12px",
				                        "font-weight": "bold"
				                    },
				                    "link": "",
				                    "pop": {
				                        "content": "",
				                        "type": "image"
				                    },
				                    "position": {
				                        "left": "30%",
				                        "top": "0",
				                        "z-index": ""
				                    }
				                },{
				                    "content": "JVJVJVJVJV",
				                    "effect": "",
				                    "font": {
				                        "color": "#000",
				                        "font-family": "Microsoft YaHei",
				                        "font-size": "12px",
				                        "font-weight": "bold"
				                    },
				                    "link": "",
				                    "pop": {
				                        "content": "",
				                        "type": "image"
				                    },
				                    "position": {
				                        "left": "30%",
				                        "top": "80%",
				                        "z-index": ""
				                    }
				                }
				            ],
				            "video": [
				                {
				                    "effect": "",
				                    "height": "100%",
				                    "params": {
				                        //"autoplay": "",
				                        "controls": "controls",
				                        "loop": "",
				                        "poster": "http://heroes.nos.netease.com/1/images/touch/minisite/cross-promotion/s_2.jpg"
				                    },
				                    "position": {
				                        "left": "",
				                        "top": "",
				                        "z-index": ""
				                    },
				                    "url": "http://sc2.nos.netease.com/1/flash/touch/minisite/OSwyz8837-mobile.mp4",
				                    "width": "100%"
				                }
				            ]
				        },
				        {
				            "bg": "http://heroes.nos.netease.com/1/images/touch/minisite/cross-promotion/s_2.jpg",
				            "image": [
				                {
				                    "effect": "",
				                    "height": "",
				                    "link": "",
				                    "pop": {
				                        "content": "",
				                        "type": "image"
				                    },
				                    "position": {
				                        "left": "",
				                        "top": "",
				                        "z-index": ""
				                    },
				                    "url": "http://blz.nos.netease.com/1/frame/cprt/icon20120516.png",
				                    "width": ""
				                }
				            ]
				        },
				        {
				            "bg": "http://heroes.nos.netease.com/1/images/touch/minisite/cross-promotion/s_3.jpg",
				            "image": [
				                {
				                    "effect": "",
				                    "height": "",
				                    "link": "",
				                    "pop": {
				                        "content": "",
				                        "type": "image"
				                    },
				                    "position": {
				                        "left": "",
				                        "top": "",
				                        "z-index": ""
				                    },
				                    "url": "http://blz.nos.netease.com/1/frame/cprt/icon20120516.png",
				                    "width": ""
				                }
				            ]
				        },
				        {
				            "bg": "http://heroes.nos.netease.com/1/images/touch/minisite/cross-promotion/s_4.jpg",
				            "image": [
				                {
				                    "effect": "",
				                    "height": "",
				                    "link": "",
				                    "pop": {
				                        "content": "",
				                        "type": "image"
				                    },
				                    "position": {
				                        "left": "",
				                        "top": "",
				                        "z-index": ""
				                    },
				                    "url": "http://blz.nos.netease.com/1/frame/cprt/icon20120516.png",
				                    "width": ""
				                }
				            ]
				        },
				        {
				            "bg": "http://heroes.nos.netease.com/1/images/touch/minisite/cross-promotion/s_5.jpg",
				            "image": [
				                {
				                    "effect": "",
				                    "height": "",
				                    "link": "",
				                    "pop": {
				                        "content": "",
				                        "type": "image"
				                    },
				                    "position": {
				                        "left": "",
				                        "top": "",
				                        "z-index": ""
				                    },
				                    "url": "http://blz.nos.netease.com/1/frame/cprt/icon20120516.png",
				                    "width": ""
				                }
				            ]
				        },
				        {
				            "bg": "http://heroes.nos.netease.com/1/images/touch/minisite/cross-promotion/s_6.jpg",
				            "image": [

				            ]
				        }
				    ],
				    "type": "swipe"
				}
//data end
	
	$scope.setScreen=function(index){
		$scope.index=index;			
	}

	$scope.setText = function(index) {
		$scope.subIndex = index;
	}

	//设置style集合font,position
	$scope.setStyle=function(style){
		var s=angular.extend(style.font,style.position);
		return s;
	}
});
