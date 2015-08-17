var h5Todo=angular.module('h5Todo', ['todoController', 'todoService','ngRoute']);
h5Todo.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/public/m/:mId', {
        templateUrl: function($routeParams){
        	return "tmpl/m"+$routeParams.mId+".html";	
        },
        controller:"mController"
      }).
      when('/public/p/:mId', {
        templateUrl: function($routeParams){
        	return "/tmpl/m"+$routeParams.mId+".html";	
        },
        controller:"previewController"
      }).      
      otherwise({
        redirectTo: '/public'
      });
  }]);
