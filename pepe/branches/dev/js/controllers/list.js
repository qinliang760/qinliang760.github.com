'use strict';

/**
 * @ngdoc function
 * @name listController.controller:mainController
 * @description
 * # mainController
 * Controller of the angularApp
 */
var listMainController = angular.module('listMainController', []);

listMainController.controller('mainController',['$scope','$rootScope','Fts','$http',function($scope,$rootScope,Fts,$http) {
    Fts.checkLogin($scope,location.href,"rewrite"); //验证登录
    $rootScope.nav_href_1 = '#/';
    $rootScope.nav_href_2 = '#/history/';
    $rootScope.nav_href_3 = '#/mymodel/';
    $scope.CopyTmpl = function(id){
        $http({
            method: 'POST',
            url: '/app/copy',
            params:{
                id:id
            }
        }).success(function(data) {
            console.log(data)
            if(data.status == "success"){
                console.log(data.data.insert_id)
                location.href = "/config/#/" + data.data.insert_id;
            }
        })
    }
    $scope.offLine = function(id,type){
        var action_type = "off";
        if(type == "已上线"){
            action_type = "off";
        }else if(type == "已下线"){
            action_type = "on";
        }
        $http({
            method: 'POST',
            url: '/app/line',
            params:{
                id:id,
                action:action_type
            }
        }).success(function(data) {
            console.log(data)
            if(data.status == "success"){
                console.log(data.msg)
            }
        })
    }
}])

listMainController.controller('modelController',['$scope','$rootScope','$http',function($scope,$rootScope, $http) {
    $rootScope.page = "模板案例库";
    $rootScope.nav = 'model';
    $http({
        method: 'GET',
        url: '/app/public_lists'
    }).success(function(data) {
    	$scope.modelJson = data.result;
    })
}])
listMainController.controller('historyController',['$scope','$rootScope','$http', function($scope,$rootScope, $http) {
    $rootScope.page = "历史发布专题";
    $rootScope.nav = 'history';
    $http({
        method: 'GET',
        url: '/app/product'
    }).success(function(data) {
    	$scope.historyJson = data.result;
    	//$scope.mymodelJson = data.mymodel;
    })
}])
listMainController.controller('myModelController',['$scope','$rootScope','$http', function($scope,$rootScope, $http) {
    $rootScope.page = "我的专题";
    $rootScope.nav = 'mymodel';
    $http({
        method: 'GET',
        url: '/app/mine'
    }).success(function(data) {
    	$scope.mymodelJson = data.result;
    })
}]);
