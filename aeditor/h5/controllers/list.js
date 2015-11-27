'use strict';

/**
 * @ngdoc function
 * @name listController.controller:mainController
 * @description
 * # mainController
 * Controller of the angularApp
 */
var listMainController = angular.module('listMainController', []);




listMainController.controller('modelController',function($scope,$rootScope, $http) {
    $rootScope.page = "模板案例页面";
    $rootScope.nav = 'model';
    $http({
        method: 'GET',
        url: '/features/data/model.json',
        data: ""
    }).success(function(data) {
    	$scope.modelJson = data.model;
    })
})
listMainController.controller('historyController', function($scope,$rootScope, $http) {
    $rootScope.page = "历史";
    $rootScope.nav = 'history';
    $http({
        method: 'GET',
        url: '/features/data/model.json',
        data: ""
    }).success(function(data) {
    	$scope.historyJson = data.history;
    	$scope.mymodelJson = data.mymodel;
    })
})
listMainController.controller('myModelController', function($scope,$rootScope, $http) {
    $rootScope.page = "我的模板";
    $rootScope.nav = 'mymodel';
    $http({
        method: 'GET',
        url: '/features/data/model.json',
        data: ""
    }).success(function(data) {
    	$scope.mymodelJson = data.mymodel;
    })
});
