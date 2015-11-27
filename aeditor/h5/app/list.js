'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
var listController=angular.module('listController', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'listMainController'
  ]);
listController.config(function ($routeProvider) {
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
        templateUrl: '/features/views/history.html',
        controller: 'myModelController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
