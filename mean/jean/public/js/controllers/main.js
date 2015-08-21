var todoController=angular.module('todoController', []);

	// inject the Todo service factory into our controller
todoController.controller('mainController', ['$scope','$http','$routeParams','Todos', function($scope, $http, $routeParams,Todos) {

		$scope.option={}
		$scope.mId="";
		$scope.mpic="http://placehold.it/640x1000";
		$scope.config=false;
		$scope.effect=[{
			e:"ScreenCling"
		},{
			e:"ScreenTouch"
		},{
			e:"ScreenTouchGo"
		}];
 		$scope.effectSelect=$scope.effect[0];

 		//设置预览
 		//$routeParams.mId初始化不存在，通过事件click传递
		$scope.preview=function(){
			$scope.option.effect=$scope.effectSelect.e;
			var options={
				option:$scope.option,
				screen:$scope.screen
			};

			localStorage.setItem("options",JSON.stringify(options))
			//console.log($routeParams.mId);

			window.open("/preview/#/public/p/"+$routeParams.mId);


		}

		$scope.generate=function(){
			$scope.option.effect=$scope.effectSelect.e;
			var options={
				id:$routeParams.mId,
				option:$scope.option,
				screen:$scope.screen
			};
			Todos.create("/api/todos/pre",options)
				.success(function(data) {
					alert("成功生成啦");
				}).error(function(error){
					alert(error);
				});
		}

		Todos.get("/json/main.json").success(function(data){
			$scope.mlists=data;
		}).error(function(res){

		})

		//用来设置初始化


			$scope.setM=function(id){
				var data=$scope.mlists;
				$scope.config=true;
				for(var i=0;i<data.length;i++){
					if(data[i].id==id){
						$scope.mpic=data[i].screen[0].pic;
						data[i].active=" active";
						$scope.option=data[i].option;//设置参数
						$scope.screen=data[i].screen;//设置图片

						var scale=data[i].option.scale,
							rotation=data[i].option.rotation;

						if(scale=="y" || scale==true){
							$scope.option.scale=true;
						}else{
							$scope.option.scale=false;
						}
						if(rotation=="y" || rotation==true){
							$scope.option.rotation=true;
						}else{
							$scope.option.rotation=false;
						}						

						//设置默认effect
						for(var j=0;j<$scope.effect.length;j++){
							if($scope.effect[j].e==data[i].option.effect){
								$scope.effectSelect=$scope.effect[j];
								break;
							}
						}

					}else{
						data[i].active="";
					}
				}
			}
	}]);

todoController.controller('mController', ['$scope','$http','$routeParams','Todos', function($scope, $http, $routeParams,Todos) {
/*		    Todos.get("/tmpl/m"+$routeParams.mId+".html").success(function(data) {
		    	$scope.tmpl=data;
		    });		*/

			$scope.mId=$routeParams.mId;


	}]);

todoController.controller('previewController', ['$scope','$http','Todos', function($scope, $http,Todos) {

			var options=JSON.parse(localStorage.getItem("options"));
			setTimeout(function(){
				Todos.setFullpage(options.option)	
			},300);
;

	}]);