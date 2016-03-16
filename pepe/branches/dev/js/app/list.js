'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
var listPage=angular.module('listPage', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ftService',
    'listMainController',
    'ftCommonCtrl'
  ]);
listPage.config(["$routeProvider",function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/features/views/model.html',
        controller: 'modelController'
      })
      .when('/history/', {
        templateUrl: '/features/views/history.html',
        controller: 'historyController'
      })
      .when('/mymodel/', {
        templateUrl: '/features/views/model.html',
        controller: 'myModelController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
