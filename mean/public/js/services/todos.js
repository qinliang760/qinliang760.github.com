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
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			},
			tojson : function(id) {
				if(typeof id =="undefined"){
					id="main";
				}
				return $http.get('/json/' + id+".json");
			},			
			setFullpage:function(options){
				return new JV.fullpage('.wp-inner',options);
			}
		}
	}]);