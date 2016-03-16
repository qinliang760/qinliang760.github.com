var diskDirective = angular.module('diskDirective', []);

//确认框定位
// diskDirective.directive('position', function() {   
// 	    return {
// 	        restrict: 'A',
// 	        link: function(scope, el, attrs, ngModel) {
// 	        	var $el=$(angular.element(el));

// 	        	$el.bind('click', function() {
// 	        		$('.m-edit-name, .mark').show();
// 	        	});
// 	        }
//     	}
// });

// //删除静态文件html
// diskDirective.directive('removefilehtml', function() {  
// 	    return {
// 	        restrict: 'A',
// 	        link: function(scope, el, attrs, ngModel) {
// 	        	var $el=$(angular.element(el));

// 	        	$el.bind('click', function() {
// 	        		$('.m-edit-name, .mark').hide();
// 	        	});
// 	        }
//     	}
// });

diskDirective.directive('checkedfile', function() { //选中单个文件
    return {
        restrict: 'A',
        link: function($scope, el, attrs, ngModel) {
            var $el = $(angular.element(el));

            $el.bind('click', function() {
                $(this).parents('.file-items').toggleClass('file-items-active');
            });
        }
    }
});

//选中全部文件
// diskDirective.directive('allcheckedfile', function(){ 
// 	return {
// 		restrict: 'A',
// 		link: function(scope, el, attrs, ngModel) {
// 			var $el=$(angular.element(el));

// 			$el.toggle(function() {
// 				$(this).addClass('checked');
// 				$('.file-items').addClass('file-items-active');
// 				return false;
// 			}, function() {
// 				$(this).removeClass('checked');
// 				$('.file-items').removeClass('file-items-active');
// 				return false;
// 			});
// 		}
// 	}
// });
