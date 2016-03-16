'use strict';

/**
 * @ngdoc function
 * @name listController.controller:mainController
 * @description
 * # mainController
 * Controller of the angularApp
 */
var homeMainController = angular.module('homeMainController', []);

homeMainController.controller('mainController',['$scope','$rootScope','Fts','$cookies',function($scope,$rootScope,Fts,$cookies) {
    Fts.checkLogin($scope,location.href,"");
    $rootScope.nav = 'home';
    var cookie = $cookies.get("nickname");
    if(cookie){
        $scope.homeLoginIn = '/config/#/new';
    }else {
        $scope.homeLoginIn = false;
    }
}])



var Home = {
    init:function(){
        this.setKvChange();
    },
    setKvChange: function() {
        var cooldown = true,
            cd_timer = 50,
            timer = 8000,
            fade_timer = 500,
            change_timer,
            num = 0,
            self = this;
        var divNum = $(".home_kv").length;
        if (divNum < 2) {
            return;
        }
        //添加 num init
        for (var i = 0; i < divNum; i++) {
            $("#kv_num").append('<li class="ld_icon"></li>');
        }
        $("#kv_num>li").eq(0).addClass("active");
        //切换功能
        function moveKv() {
            num++;
            if (num >= divNum) num = 0;
            self.changeKvAction(num, divNum, fade_timer);
        }
        change_timer = setInterval(moveKv, timer)
            //按钮绑定
        $("#kv_num>li").click(function() {
            var This = $(this);
            if (!This.hasClass("active")) {
                var this_index = This.index();
                //cooldown = false;
                self.changeKvAction(this_index, divNum, fade_timer);
                /*setTimeout(function() {
                    cooldown = true;
                }, cd_timer)*/
                clearInterval(change_timer);
                change_timer = setInterval(moveKv, timer)
            }
        });
    },
    changeKvAction: function(index, length, timer) {
        $("#kv_show>div").eq(index).siblings().stop().fadeTo(timer, 0, function() {
            if (index >= length) index = 0;
            $("#kv_show>div").eq(index).stop().fadeTo(timer, 1).siblings().hide();
            $("#kv_num>li").eq(index).addClass("active").siblings().removeClass("active");
        })
    }
}

