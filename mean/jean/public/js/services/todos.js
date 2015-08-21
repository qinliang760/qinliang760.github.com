angular.module('todoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Todos', ['$http',function($http) {
		return {
			get : function(url,params) {
				return $http.get(url,params);
			},
			create : function(url,todoData) {
				return $http.post(url, todoData);
			},		
			setFullpage:function(options){
				console.log(options);
				//return console.log(options);
				return new JV.phoneSlide($("#content"), options)
			}
		}
	}]);