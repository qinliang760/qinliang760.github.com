var ftDirective=angular.module('ftDirective', []);

//set draggable
ftDirective.directive('draggable', function() {
	    return {
	        restrict: 'A',
	        require: '?ngModel',
	        link: function(scope, el, attrs, ngModel) {
	        	scope.isDrag=true;

	            $(angular.element(el)).drag({
					handle: ".dh",
					ondragstart: function() {
						if (!scope.isDrag) {
							arguments[1].is = false;
							arguments[1].cursor="auto";
						} else {
							arguments[1].is = true;
						}

					},
					ondragbefore: function() {
						if (!scope.isDrag) {
							arguments[1].is = false;
							arguments[1].cursor="auto";
						} else {
							arguments[1].is = true;
						}
					},
					ondrag: function() {
						arguments[1].cursor="auto";
						ngModel.$viewValue.left=parseFloat(el.css("left"))/0.6;
						ngModel.$viewValue.top=parseFloat(el.css("top"))/0.6;
	                    scope.$apply(function() {
	                       ngModel.$setViewValue(ngModel.$viewValue);
	                    });
					},
					ondragend: function() {
						arguments[1].cursor="auto";
					}
				});
	        }
    	}
});

//set resizable
ftDirective.directive('resizable', function() {
	    return {
	        restrict: 'A',
	        link: function(scope, el, attrs, controller) {
	        	var $el=$(angular.element(el));
	            $el.resizable({ handles: "n, e, s, w, ne, se, sw, nw" });
	            if($el.hasClass("dragImg")){
	            	return;
	            }
	            $el.bind("dblclick",function(){
	                scope.isDrag=false;
	                $(this).find(".text").attr("contenteditable","true");
	                $(this).find(".text").focus();
	                $(this).find(".dh").css("position","static");
	            })

	            $el.find(".text").bind("blur",function(){
	                scope.isDrag=true;
	                $(this).attr("contenteditable","false");
	                $(this).parent().find(".dh").css("position","absolute");
	            })
	        }
    	}
});

//set contenteditable data bind
ftDirective.directive('contenteditable', function() {
	    return {
	        restrict: 'A',
	        require: 'ngModel',
	        link: function(scope, el, attrs, controller) {
 				el.bind('blur', function() {
                    scope.$apply(function() {
                       controller.$setViewValue(el.html());
                    });
                });
	        }
    	}
});



