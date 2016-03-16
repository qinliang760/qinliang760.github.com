var ftDirective = angular.module('ftDirective', []);

//set draggable
ftDirective.directive('draggable', function() {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, el, attrs, ngModel) {
            scope.isDrag = true;

            $(angular.element(el)).drag({
                handle: ".dh",
                ondragstart: function() {
                    //console.log(arguments);
                    if (!scope.isDrag) {
                        arguments[1].is = false;
                        arguments[1].cursor = "auto";
                    } else {
                        arguments[1].is = true;
                    }

                },
                ondragbefore: function() {
                    if (!scope.isDrag) {
                        arguments[1].is = false;
                        arguments[1].cursor = "auto";
                    } else {
                        arguments[1].is = true;
                    }
                },
                ondrag: function() {
                    arguments[1].cursor = "auto";
                    ngModel.$viewValue.left = Math.round(parseFloat(el.css("left"))/0.6);
                    ngModel.$viewValue.top = Math.round(parseFloat(el.css("top"))/0.6);
                    scope.$apply(function() {
                        ngModel.$setViewValue(ngModel.$viewValue);
                    });
                },
                ondragend: function() {
                    arguments[1].cursor = "auto";
                }
            });
        }
    }
});

//set resizable
ftDirective.directive('resizable', function() {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, el, attrs, ngModel) {
            var $el = $(angular.element(el));
            $el.resizable({
                handles: "n, e, s, w, ne, se, sw, nw",
                stop: function( event, ui ) {
                    //console.log(ui);
                    ngModel.$viewValue.left = parseFloat(ui.position.left)/0.6;
                    ngModel.$viewValue.top = parseFloat(ui.position.top)/0.6;
                    ngModel.$viewValue.width = parseFloat(ui.size.width)/0.6;
                    ngModel.$viewValue.height = parseFloat(ui.size.height)/0.6;
                    scope.$apply(function() {
                        ngModel.$setViewValue(ngModel.$viewValue);
                    });
                }
            });
            if ($el.hasClass("dragImg")) {
                return;
            }
            $el.bind("dblclick", function() {
                scope.isDrag = false;
                $(this).find(".text").attr("contenteditable", "true");
                $(this).find(".text").focus();
                $(this).find(".dh").css("position", "static");
            })

            $el.find(".text").bind("blur", function() {
                scope.isDrag = true;
                $(this).attr("contenteditable", "false");
                $(this).parent().find(".dh").css("position", "absolute");
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

//set sortable
ftDirective.directive('sortable', function() {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, el, attrs, ngModel) {
            $(angular.element(el)).sortable({
                items:".m-preview-box",
                axis:"y",
                placeholder:"ui-sortable-placeholder",
                revert: true,
                cursor: "move",
                update: function( event, ui ) {
                    var currentIndex=$(".g-preview-box .m-preview-box").index(ui.item),//当前索引
                        originIndex=ui.item.data("index");//之前索引

                    var copyObj=ngModel.$viewValue.screen[originIndex];
                    ngModel.$viewValue.screen.splice(originIndex,1);
                    ngModel.$viewValue.screen.splice(currentIndex,0,copyObj);
                    ui.item.data("index",currentIndex);
                    scope.$apply(function() {
                        ngModel.$setViewValue(ngModel.$viewValue);
                    });
                    //console.log(ngModel.$viewValue.screen);
                }
            });
        }
    }
});

//set popup model
ftDirective.directive('popupmodel', function() {
    return {
        template: '<div class="g-popupmodel" ng-show="popupmodel" ng-click="removePop()"></div>',
        restrict: 'E',
        replace: true
    }
});


//set popup bank
/*ftDirective.directive('popupbank', function() {
    return {
        templateUrl: "/features/views/popupbank.html",
        restrict: 'E',
        replace: true,
        link: function(scope, el, attrs, controller) {
            $(".pic-list").mCustomScrollbar();
        }
    }
});*/

//set config--preview
/*ftDirective.directive('configpreview', function() {
    return {
        templateUrl: "/features/views/config_preview.html",
        restrict: 'E',
        replace: true,
        link: function(scope, el, attrs, controller) {
            $(".g-preview-box").mCustomScrollbar();
            $(".m-preview-box").click(function(event) {
            	$(this).addClass('active').siblings().removeClass('active');
            });
        }
    }
});*/


//set config--operating
/*ftDirective.directive('configoperating', function() {
    return {
        templateUrl: "/features/views/config_opera.html",
        restrict: 'E',
        replace: true,
        link: function(scope, el, attrs, controller) {
            $(".g-operating-box").mCustomScrollbar();
        }
    }
});*/

//set config--publish
/*ftDirective.directive('publish', function() {
    return {
        templateUrl: "/features/views/config_publish.html",
        restrict: 'E',
        replace: true,
        link: function(scope, el, attrs, controller) {
            $(".g-publish-box").mCustomScrollbar();
        }
    }
});*/

//动画时间设置
ftDirective.directive('animationTime', function(){
   return {
     require: 'ngModel',
     link: function(scope, el, attrs, controller) {
        //console.log(controller.$formatters)
        //console.log(controller)
        // console.log(element.attr('value'))
        //重置格式
        // controller.$formatters.push(function(value){
        //     //console.log("aa"+controller.$modelValue)
        //     return value + "s";
        // })
        controller.$parsers.push(function(value){
            var zeg = /^[0-9]$|^[1][0]$|^[0-9]\.\d{0,1}$/g;
            //console.log(zeg.test(value))
            //console.log(!value)
            if(value){
                if(!zeg.test(value)){
                    if(parseFloat(value)<=10&&parseFloat(value)>=0){
                        value = parseInt(value)
                    }else {
                        value = 0;
                    }
                    angular.element(el).attr("value",value);
                }
            }
            return value;
        });
     }
   };
});


//动画模块设置
ftDirective.directive('animationTemplate', function() {
    return {
        template: angular.element("#J_animationTemplate").html(),
        restrict: 'E',
        replace: true,
        link: function(scope, el, attrs, controller) {
            //$(".g-publish-box").mCustomScrollbar();
        }
    }
});