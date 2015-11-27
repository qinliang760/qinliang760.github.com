'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
var configPage=angular.module('configPage', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'configController',
    'ftDirective'    
  ]);
configPage.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/features/views/config.html',
        controller: 'configMainController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
