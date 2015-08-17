var todoController=angular.module('todoController', []);

	// inject the Todo service factory into our controller
todoController.controller('mainController', ['$scope','$http','$routeParams','Todos', function($scope, $http, $routeParams,Todos) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.image="";
		$scope.html="";
		$scope.option={
			dir:"v",
			loop:false
		}
		$scope.mId="";

 		
 		//设置预览
 		//$routeParams.mId初始化不存在，通过事件click传递
		$scope.preview=function(){
			var options={
				loop:$scope.option.loop,
				dir:$scope.option.dir
			};
			localStorage.setItem("options",JSON.stringify(options))

			window.open("/preview/#/public/p/"+$routeParams.mId);
			//console.log($routeParams.mId);
			///preview/#/public/p/1
			/*Todos.create("/api/todos/pre",$scope.option)
				.success(function(data) {
					$scope.todos = data;
				});*/
			

		}
		$scope.generate=function(){
			var options={
				loop:$scope.option.loop,
				dir:$scope.option.dir,
				id:$routeParams.mId
			};
			//localStorage.setItem("options",JSON.stringify(options))

Todos.create("/api/todos/pre",options)
				.success(function(data) {
					//$scope.todos = data;
				});
			//console.log($routeParams.mId);
			///preview/#/public/p/1
			/*Todos.create("/api/todos/pre",$scope.option)
				.success(function(data) {
					$scope.todos = data;
				});*/
			

		}

		Todos.get("/json/main.json").success(function(data){
			$scope.mlists=data;
		}).error(function(res){

		})

		//用来设置初始化




		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		/*Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});*/

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create("/api/todos",$scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};


	}]);

todoController.controller('mController', ['$scope','$http','$routeParams','Todos', function($scope, $http, $routeParams,Todos) {
/*		    Todos.get("/tmpl/m"+$routeParams.mId+".html").success(function(data) {
		    	$scope.tmpl=data;
		    });		*/

			$scope.mId=$routeParams.mId;
	}]);

todoController.controller('previewController', ['$scope','$http','Todos', function($scope, $http,Todos) {
/*		Todos.tojson()
			.success(function(data) {
				var d=data[0];
				var options={
					loop:data.loop,
					loop:data.v
				}
				Todos.setFullpage(options);
			});*/
			var options=JSON.parse(localStorage.getItem("options"));

			Todos.setFullpage(options);
	}]);