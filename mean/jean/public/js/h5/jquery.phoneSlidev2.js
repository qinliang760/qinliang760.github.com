/*!
 * Base On jQuery JavaScript Library v1.7.2
 * http://jquery.com/
 * Copyright 2015, Ronbinson Lin
 * http://jquery.org/license
 *
 * Versions 2.1
 * Date: 2015.3.31
 *
 * log：
 * v2.1 版本 增加了 PC端的支持
 */
$.ns("JV");
(function($) {
    /*
    * @pram tar jquery object
    * @exp
    * new JV.phoneSlide($("#content"), {
                effect: "", //ScreenCling,ScreenTouch,ScreenTouchGo
                speed: 200, //滚动速度快慢
                scale: "", //是否有滚动缩放 "n" or "y"
                rotation:"y", //是否开启横屏提示
                callBack: function(index) { //滚屏组件
                    if (index == 1) { //是否是第一页
                    }
                }
            });
    */
    JV.phoneSlide = function(tar, cfg) {
        var defaults = {
            effect: "ScreenCling", //ScreenCling,ScreenTouch,ScreenTouchGo
            speed: 200, //滚动速度快慢
            scale: "n", //是否有滚动缩放
            rotation: "y", //是否开启横屏提示
            callback: function(index) {

            }
        };
        this.tar = tar; //html or $
        this.cfg = $.extend({}, defaults, cfg); //合并defaults和cfg，不修改defaults
        this.callback = this.cfg.callback;
        if (tar) {
            this.init();
        }
    };
    JV.phoneSlide.prototype = {
        init: function() {
            var self = this;
            this.ScreenStyleInit(); //控制位置
            this.setParallax($("#screen_1>div")); //启动第一祯
            if (self.isMobile()) {
                switch (self.cfg.effect) {
                    case "ScreenCling":
                        self.ctrlScreenCling();
                        break;
                    case "ScreenTouch":
                        self.ctrlScreenTouch();
                        break;
                    case "ScreenTouchGo":
                        self.ctrlScreenTouchGo();
                        break;
                }
                if (self.cfg.rotation == "y") {
                    self.changeRotationWarning();
                }
            } else {
                self.ctrlScreenTouchGo();
            }
        },
        //判断是否是移动端
        isMobile: function() {
            var rule = /(android|iPhone|iPad|iPod|mobile)/ig;
            return rule.test(navigator.userAgent);
        },
        //类似整屏滚动
        ctrlScreenTouchGo: function() {
            var index = 1,
                self = this,
                touchs = 0,
                touchm = 0,
                touche = 0,
                move_timer = self.cfg.speed + 300, //自动补全动画
                cooldown = false,
                timer,
                scale = 0,
                h_change = 0,
                move = 0,
                switchs = true;
            var w_h = $(window).height();
            var w_w = $(window).width();
            var tar = self.tar;
            var cfg = self.cfg;
            var cont = tar[0];
            var len = tar.children("section").length;
            $(".screen").css({
                "-webkit-transition": "all .5s ease-out 0s",
                "transition": "all .5s ease-out 0s"
            })

            function go(val) {
                if (!switchs) {
                    return;
                }
                switchs = false;
                timer = setTimeout(function() {
                    switchs = true;
                }, 1000)
                index = parseInt(tar.attr("data-index"));
                var This_screen = $("#screen_" + index);
                var now_index = index;
                if (val >= 10) {
                    if (index < len) {
                        //console.log(This_screen)
                        This_screen.css({
                            "-webkit-transform": "translateY(-" + w_h + "px)",
                            "transform": "translateY(-" + w_h + "px)"
                        });
                        $("#screen_" + (index + 1)).css({
                            "-webkit-transform": "translateY(0px)",
                            "transform": "translateY(0px)"
                        });
                        if (index > 1) {
                            $("#screen_" + (index - 1)).css({
                                "-webkit-transform": "translateY(-" + w_h + "px)",
                                "transform": "translateY(-" + w_h + "px)"
                            })
                        }
                        setTimeout(function() {
                            self.setParallax($("#screen_" + (index + 1) + ">div"));
                            self.setRemoveParallax($("#screen_" + index + ">div"));
                            tar.attr("data-index", index + 1);
                        }, move_timer)
                    }
                    now_index++;
                } else if (val <= -10) {
                    if (index != 1) {
                        This_screen.css({
                            "-webkit-transform": "translateY(" + w_h + "px)",
                            "transform": "translateY(" + w_h + "px)"
                        });
                        $("#screen_" + (index - 1)).css({
                            "-webkit-transform": "translateY(0px)",
                            "transform": "translateY(0px)"
                        });
                        if (index > len) {
                            $("#screen_" + (index + 1)).css({
                                "-webkit-transform": "translateY(" + w_h + "px)",
                                "transform": "translateY(" + w_h + "px)"
                            });
                        }
                        setTimeout(function() {
                            self.setParallax($("#screen_" + (index - 1) + ">div"));
                            self.setRemoveParallax($("#screen_" + index + ">div"));
                            tar.attr("data-index", index - 1);
                        }, move_timer)
                    }
                    now_index--;
                }
                //运行callback 函数
                if (cfg.callback) {
                    cfg.callback(now_index)
                }
            }
            cont.addEventListener('touchstart', function(event) {
                //event.preventDefault();
                var touch = event.targetTouches[0];
                touchs = touch.pageY;
            })
            cont.addEventListener('touchmove', function(event) {
                event.preventDefault();
            })
            cont.addEventListener('touchend', function(event) {
                //event.preventDefault();
                var touch = event.changedTouches[0];
                touche = touch.pageY;
                var move_end = Math.abs(touchs - touche);
                go(touchs - touche);
            });
            //PC 兼容
            document.body.onmousewheel = function(event) {
                event = event || window.event;
                //console.dir(event);
                //console.log(event.wheelDelta)
                go(-event.wheelDelta/6);
            };
            document.body.addEventListener("DOMMouseScroll", function(event) {
                //console.dir(event);
                //console.log(event.detail)
                go(event.detail/3*20);
            });
        },
        //effect one: touch play screen
        ctrlScreenTouch: function() {
            var index = 1,
                self = this,
                touchs = 0,
                touchm = 0,
                touche = 0,
                move_timer = self.cfg.speed, //自动补全动画
                cooldown = false,
                timer,
                scale = 0,
                h_change = 0,
                move = 0,
                switchs = true;
            var w_h = $(window).height();
            var w_w = $(window).width();
            var tar = self.tar;
            var cfg = self.cfg;
            var cont = tar[0];
            var len = tar.children("section").length;
            cont.addEventListener('touchstart', function(event) {
                //event.preventDefault();
                var touch = event.targetTouches[0];
                touchs = touch.pageY;
            })
            cont.addEventListener('touchmove', function(event) {
                event.preventDefault();
                if (!switchs) {
                    return;
                }
                var touch_m = event.targetTouches[0];
                touchm = touch_m.pageY;
                move = Math.abs(touchs - touchm);
                index = parseInt(tar.attr("data-index"));
                scale = 1 - (move) / w_h;
                h_change = w_h * scale;
                //alert(touchs-touchm)
                if (move <= w_h) { //判断是否移动距离多大
                    if (touchs - touchm >= 0) {
                        if (index < len) {
                            //console.log(index)
                            if (self.cfg.scale == "n") { //没有放大缩小功能
                                $("#screen_" + (index + 1)).css({
                                    "z-index": 101,
                                    "-webkit-transform": "translateY(" + h_change + "px)",
                                    "transform": "translateY(" + h_change + "px)"
                                })
                            } else {
                                $("#screen_" + index).css({
                                    "-webkit-transform-origin": "50% 0px",
                                    "-webkit-transform": "scale(" + scale + ")",
                                    "transform-origin": "50% 0px",
                                    "transform": "scale(" + scale + ")"
                                })
                                $("#screen_" + (index + 1)).css({
                                    "-webkit-transform": "translateY(" + h_change + "px)",
                                    "transform": "translateY(" + h_change + "px)"
                                })
                            };
                        } else {
                            return false;
                        }
                    } else {
                        if (index != 1) {
                            if (self.cfg.scale == "n") { //没有放大缩小功能
                                $("#screen_" + (index - 1)).css({
                                    "z-index": 101,
                                    "-webkit-transform": "translateY(-" + h_change + "px)",
                                    "transform": "translateY(-" + h_change + "px)"
                                })
                            } else {
                                $("#screen_" + index).css({
                                    "-webkit-transform": "scale(" + scale + ")",
                                    "transform": "scale(" + scale + ")",
                                    "transform-origin": "50% 100%",
                                    "-webkit-transform-origin": "50% 100%"
                                })
                                $("#screen_" + (index - 1)).css({
                                    "-webkit-transform": "translateY(-" + h_change + "px)",
                                    "transform": "translateY(-" + h_change + "px)"
                                })
                            };
                        }
                    }
                }
            })
            cont.addEventListener('touchend', function(event) {
                //event.preventDefault();
                if (!switchs) {
                    return;
                }
                switchs = false;
                timer = setTimeout(function() {
                    switchs = true;
                }, 1000)
                var touch = event.changedTouches[0];
                touche = touch.pageY;
                var move_end = Math.abs(touchs - touche);
                index = parseInt(tar.attr("data-index"));
                var This_screen = $("#screen_" + index);
                var now_index = index;
                if (touchs - touche >= 10) { //向上滑动
                    if (index < len) {
                        if (self.cfg.scale == "n") { //没有放大缩小功能
                            This_screen.animate({
                                //"-webkit-transform": "translateY(-" + w_h + "px)",
                                //"transform": "translateY(-" + w_h + "px)"
                            }, move_timer, function() {
                                self.setParallax($("#screen_" + (index + 1) + ">div"));
                                self.setRemoveParallax($("#screen_" + index + ">div"));
                                tar.attr("data-index", index + 1);
                                //重置覆盖上的一层
                                This_screen.css({
                                    "-webkit-transform": "translateY(-" + w_h + "px)",
                                    "transform": "translateY(-" + w_h + "px)",
                                });
                            });
                        } else {
                            This_screen.animate({
                                "-webkit-transform": "scale(0)",
                                "transform": "scale(0)"
                            }, move_timer, function() {
                                $(this).css({
                                    "-webkit-transform": "scale(1) translateY(-" + w_h + "px)",
                                    "transform": "scale(1) translateY(-" + w_h + "px)"
                                });
                                self.setParallax($("#screen_" + (index + 1) + ">div"));
                                self.setRemoveParallax($("#screen_" + index + ">div"));
                                tar.attr("data-index", index + 1);
                            });
                        };
                        $("#screen_" + (index + 1)).animate({
                            "z-index": 100,
                            "-webkit-transform": "translateY(0px)",
                            "transform": "translateY(0px)"
                        }, move_timer);
                        if (index > 1) {
                            $("#screen_" + (index - 1)).css({
                                "-webkit-transform": "translateY(-" + w_h + "px)",
                                "transform": "translateY(-" + w_h + "px)"
                            })
                        }
                    } else { //滑动过快重置最后一针
                        $("#screen_" + (index - 1)).css({
                            "-webkit-transform": "translateY(-" + w_h + "px)",
                            "transform": "translateY(-" + w_h + "px)"
                        })
                    }
                    now_index++;
                } else if (touchs - touche <= -10) { //向下滑动
                    if (index != 1) {
                        if (self.cfg.scale == "n") { //没有放大缩小功能
                            This_screen.animate({
                                //"-webkit-transform":"translateY(" + w_h + "px)",
                                //"transform":"translateY(" + w_h + "px)",
                                "z-index": 99
                            }, move_timer, function() {
                                self.setParallax($("#screen_" + (index - 1) + ">div"));
                                self.setRemoveParallax($("#screen_" + index + ">div"));
                                tar.attr("data-index", index - 1);
                                //重置覆盖上的一层
                                $(this).css({
                                    "-webkit-transform": "translateY(" + w_h + "px)",
                                    "transform": "translateY(" + w_h + "px)",
                                });
                                //console.log(This_screen.nextAll("section"))
                                    //重置页面不规律滚动错位
                                This_screen.nextAll("section").css({
                                    "-webkit-transform": "translateY(" + w_h + "px)",
                                    "transform": "translateY(" + w_h + "px)",
                                });
                            });
                        } else {
                            This_screen.animate({
                                "-webkit-transform": "scale(0)",
                                "transform": "scale(0)"
                            }, move_timer, function() {
                                $(this).css({
                                    "-webkit-transform": "scale(1) translateY(" + w_h + "px)",
                                    "transform": "scale(1) translateY(" + w_h + "px)"
                                });
                                self.setParallax($("#screen_" + (index - 1) + ">div"));
                                self.setRemoveParallax($("#screen_" + index + ">div"));
                                tar.attr("data-index", index - 1);
                                //重置页面不规律滚动错位
                                This_screen.nextAll("section").css({
                                    "-webkit-transform": "translateY(" + w_h + "px)",
                                    "transform": "translateY(" + w_h + "px)",
                                });
                            });
                        };
                        $("#screen_" + (index - 1)).animate({
                            "z-index": 100,
                            "-webkit-transform": "translateY(0px)",
                            "transform": "translateY(0px)"
                        }, move_timer);
                        if (index > len) {
                            $("#screen_" + (index + 1)).css({
                                "-webkit-transform": "translateY(" + w_h + "px)",
                                "transform": "translateY(" + w_h + "px)"
                            });
                        }
                    } else {
                        $("#screen_2").css({
                            "-webkit-transform": "translateY(" + w_h + "px)",
                            "transform": "translateY(" + w_h + "px)"
                        });
                    }
                    now_index--;
                } else {
                    This_screen.css({
                        "-webkit-transform": "translateY(0px)",
                        "transform": "translateY(0px)"
                    });
                    $("#screen_" + (index - 1)).css({
                        "-webkit-transform": "translateY(-" + w_h + "px)",
                        "transform": "translateY(-" + w_h + "px)"
                    });
                    $("#screen_" + (index + 1)).css({
                        "-webkit-transform": "translateY(" + w_h + "px)",
                        "transform": "translateY(" + w_h + "px)"
                    });
                }
                //运行callback 函数
                if (cfg.callback) {
                    cfg.callback(now_index)
                }
            });
        },
        //effect two: cling play screen
        ctrlScreenCling: function() {
            var index = 1,
                self = this,
                touchs = 0,
                touchm = 0,
                touche = 0,
                move_timer = self.cfg.speed, //自动补全动画
                cooldown = false,
                timer,
                scale = 0,
                h_change = 0,
                move = 0,
                switchs = true;
            var w_h = $(window).height();
            var w_w = $(window).width();
            var tar = self.tar;
            var cfg = self.cfg;
            var cont = tar[0];
            var len = tar.children("section").length;
            cont.addEventListener('touchstart', function(event) {
                //event.preventDefault();
                var touch = event.targetTouches[0];
                touchs = touch.pageY;
            })
            cont.addEventListener('touchmove', function(event) {
                event.preventDefault();
                if (!switchs) {
                    return;
                }
                var touch_m = event.targetTouches[0];
                touchm = touch_m.pageY;
                move = Math.abs(touchs - touchm);
                index = parseInt(tar.attr("data-index"));
                scale = 1 - (move) / w_h;
                h_change = w_h * scale;
                //alert(touchs-touchm)
                if (move <= w_h) {
                    if (touchs - touchm >= 0) {
                        if (index < len) {
                            $("#screen_" + index).css({
                                "-webkit-transform-origin": "50% 0px",
                                "-webkit-transform": "scale(" + scale + ")",
                                "transform-origin": "50% 0px",
                                "transform": "scale(" + scale + ")"
                            })
                            $("#screen_" + (index + 1)).css({
                                "-webkit-transform": "translateY(" + h_change + "px)",
                                "transform": "translateY(" + h_change + "px)"
                            })
                        } else {
                            return false;
                        }
                    } else {
                        if (index != 1) {
                            $("#screen_" + index).css({
                                "-webkit-transform-origin": "50% 100%",
                                "-webkit-transform": "scale(" + scale + ")",
                                "transform-origin": "50% 100%",
                                "transform": "scale(" + scale + ")"
                            })
                            $("#screen_" + (index - 1)).css({
                                "-webkit-transform": "translateY(-" + h_change + "px)",
                                "transform": "translateY(-" + h_change + "px)"
                            })
                        }
                    }
                }
            })
            cont.addEventListener('touchend', function(event) {
                //event.preventDefault();
                if (!switchs) {
                    return;
                }
                switchs = false;
                timer = setTimeout(function() {
                    switchs = true;
                }, 1000)
                var touch = event.changedTouches[0];
                touche = touch.pageY;
                var move_end = Math.abs(touchs - touche);
                index = parseInt(tar.attr("data-index"));
                var now_index = index;
                //下一帧动画
                if (move_end >= w_h / 4) {
                    if (touchs - touche >= 0) { //向上滑动
                        if (index < len) {
                            $("#screen_" + index).animate({
                                "-webkit-transform": "scale(0)",
                                "transform": "scale(0)"
                            }, move_timer, function() {
                                $(this).css({
                                    "-webkit-transform": "scale(1) translateY(-" + w_h + "px)",
                                    "transform": "scale(1) translateY(-" + w_h + "px)"
                                });
                                self.setParallax($("#screen_" + (index + 1) + ">div"));
                                self.setRemoveParallax($("#screen_" + index + ">div"));
                                tar.attr("data-index", index + 1);
                            });
                            $("#screen_" + (index + 1)).animate({
                                "-webkit-transform": "translateY(0px)",
                                "transform": "translateY(0px)"
                            }, move_timer);
                            if (index > 1) {
                                $("#screen_" + (index - 1)).css({
                                    "-webkit-transform": "translateY(-" + w_h + "px)",
                                    "transform": "translateY(-" + w_h + "px)"
                                })
                            }
                        }
                        now_index++;
                    } else { //向下滑动
                        if (index != 1) {
                            $("#screen_" + index).animate({
                                "-webkit-transform": "scale(0)",
                                "transform": "scale(0)"
                            }, move_timer, function() {
                                $(this).css({
                                    "-webkit-transform": "scale(1) translateY(" + w_h + "px)",
                                    "transform": "scale(1) translateY(" + w_h + "px)"
                                });
                                self.setParallax($("#screen_" + (index - 1) + ">div"));
                                self.setRemoveParallax($("#screen_" + index + ">div"));
                                tar.attr("data-index", index - 1);
                            });
                            $("#screen_" + (index - 1)).animate({
                                "-webkit-transform": "translateY(0px)",
                                "transform": "translateY(0px)"
                            }, move_timer);
                            if (index > len) {
                                $("#screen_" + (index + 1)).css({
                                    "-webkit-transform": "translateY(" + w_h + "px)",
                                    "transform": "translateY(" + w_h + "px)"
                                });
                            }
                        }
                        now_index--;
                    }
                    //运行callback 函数
                    if (cfg.callback) {
                        cfg.callback(now_index)
                    }
                    //位置重置动画
                } else {
                    if (touchs - touche >= 0) { //向上滑动
                        if (index < len) {
                            $("#screen_" + index).animate({
                                "-webkit-transform": "scale(1)",
                                "transform": "scale(1)"
                            }, move_timer, function() {
                                $(this).css({
                                    "-webkit-transform": "scale(1) translateY(0px)",
                                    "transform": "scale(1) translateY(0px)"
                                })
                            });
                            $("#screen_" + (index + 1)).animate({
                                "-webkit-transform": "translateY(" + w_h + "px)",
                                "transform": "translateY(" + w_h + "px)"
                            }, move_timer);
                            if (index > 1) {
                                $("#screen_" + (index - 1)).css({
                                    "-webkit-transform": "translateY(-" + w_h + "px)",
                                    "transform": "translateY(-" + w_h + "px)"
                                })
                            }
                        }
                    } else { //向下滑动
                        if (index != 1) {
                            $("#screen_" + index).animate({
                                "-webkit-transform": "scale(1)",
                                "transform": "scale(1)"
                            }, move_timer, function() {
                                $(this).css({
                                    "-webkit-transform": "scale(1) translateY(0px)",
                                    "transform": "scale(1) translateY(0px)"
                                })
                            });
                            $("#screen_" + (index - 1)).animate({
                                "-webkit-transform": "translateY(-" + w_h + "px)",
                                "transform": "translateY(-" + w_h + "px)"
                            }, move_timer);
                            if (index > len) {
                                $("#screen_" + (index + 1)).css({
                                    "-webkit-transform": "translateY(" + w_h + "px)",
                                    "transform": "translateY(" + w_h + "px)"
                                });
                            }
                        }
                    }
                }
            });
        },
        setParallax: function(tar) { //tar为jquery对象
            for (var i = 0; i < tar.length; i++) {
                var This = tar.eq(i);
                if (This.attr("data-class")) {
                    This.addClass(This.attr("data-class"));
                }
            }
        },
        setRemoveParallax: function(tar) { //tar为jquery对象
            for (var i = 0; i < tar.length; i++) {
                var This = tar.eq(i);
                if (This.attr("data-class")) {
                    This.removeClass(This.attr("data-class"));
                };
            }
        },
        ScreenStyleInit: function() {
            var w_h = $(window).height();
            $("#screen_1").siblings("section").css({
                "-webkit-transform": "translateY(" + w_h + "px)",
                "transform": "translateY(" + w_h + "px)"
            })
        },
        //横屏时弹出提示
        changeRotationWarning: function(callback) {
            var html = '<div class="rotation_warning" style="background:#666; position: absolute; top:0; left:0; height:100%; width:100%; z-index:9999;"><div style="text-align:center;color:#fff; font-size:1em; margin:20% auto;">为了保证浏览效果，我们建议在竖屏下观看。</div></div>';

            function orientationChange() {
                switch (window.orientation) {
                    case 0:
                        $(".rotation_warning").remove();
                        break;　　
                    case -90:
                        if (callback) callback();
                        else $("body").append(html);
                        break;　　
                    case 90:
                        if (callback) callback();
                        else $("body").append(html);
                        break;　　
                    case 180:
                        $(".rotation_warning").remove();
                        //alert("风景模式 180,screen-width: " + screen.width + "; screen-height:" + screen.height);
                        break;
                };
            };
            // 添加事件监听
            window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", orientationChange, false);
        }
    }

})($);