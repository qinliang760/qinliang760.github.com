var ftService=angular.module('ftService', ['ngCookies']);

ftService.factory('Fts', ['$http','$cookies',function($http,$cookies) {

		return {
			get : function(url,params) {
				return $http.get(url,{params:params});
			},
			post : function(url,params) {
				return $http.post(url, $.param(params));
			},
			postJson : function(url,params) {
				return $http.post(url, $.param(params),{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}});
			},
			getJson : function(url,params) {
				return $http.get(url, {params:params},{headers: {'Accept': 'application/json;charset=UTF-8'}});
			},
			checkLogin:function($scope,url,rewrite){
				var cookie = $cookies.get("nickname");
				if(cookie){
					$scope.loginName = cookie;
					$scope.loginStatus = true;
					//console.log($scope.loginStatus)
				}else {
					$scope.loginStatus = false;
					$http.get("/auth/get_login_url",{params:{redirect_url:url}}).success(function(data){
						var s = data.status;
						if(s == "success"){
							if(rewrite == "rewrite"){
								location.href = data.msg;
							}else {
								$scope.rewriteLoginUrl =  data.msg;
								console.log($scope.rewriteLoginUrl)
							}
						}

						//console.log($scope.loginStatus)
					})
				}
			}
		}
	}]);