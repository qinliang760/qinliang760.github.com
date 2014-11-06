var ua = navigator.userAgent;
var ios = /iPhone|iPad|iPod/.test(navigator.platform) && ua.indexOf("AppleWebKit") > -1;
var andriod = ua.indexOf("Android") > -1;
var fcb = {
	init: function() {
		this.styleInit();
		this.ctrlScreen($("#content"));
		this.playVideo($("#s4_play"), $("#content"));
		this.cover(); //页面弹出分享详情
		FastClick.attach(document.body);
	},
	ctrlScreen: function(tar) {
		var index = 1,
			touchs = 0,
			touchm = 0,
			touche = 0,
			move_timer = 200, //自动补全动画
			cooldown = false,
			timer,
			scale = 0,
			h_change = 0,
			move = 0,
			index = 0,
			switchs = true;
		var w_h = $(window).height();
		var w_w = $(window).width();
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
							"-webkit-transform": "scale(" + scale + ")"
						})
						$("#screen_" + (index + 1)).css({
							"-webkit-transform": "translateY(" + h_change + "px)"
						})
					} else {
						return false;
					}
				} else {
					if (index != 1) {
						$("#screen_" + index).css({
							"-webkit-transform-origin": "50% 100%",
							"-webkit-transform": "scale(" + scale + ")"
						})
						$("#screen_" + (index - 1)).css({
							"-webkit-transform": "translateY(-" + h_change + "px)"
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
			switchs = true;
			var touch = event.changedTouches[0];
			touche = touch.pageY;
			var move_end = Math.abs(touchs - touche);
			index = parseInt(tar.attr("data-index"));
			//下一帧动画
			if (move_end >= w_h / 4) {
				if (touchs - touche >= 0) { //向上滑动
					if (index < len) {
						$("#screen_" + index).animate({
							"-webkit-transform": "scale(0)"
						}, move_timer, function() {
							$(this).css({
								"-webkit-transform": "scale(1) translateY(-" + w_h + "px)"
							});
							fcb.setParallax($("#screen_" + (index + 1) + ">div"));
							fcb.setRemoveParallax($("#screen_" + index + ">div"));
							tar.attr("data-index", index + 1);
						});
						$("#screen_" + (index + 1)).animate({
							"-webkit-transform": "translateY(0px)"
						}, move_timer);
						if (index > 1) {
							$("#screen_" + (index - 1)).css("-webkit-transform", "translateY(-" + w_h + "px)")
						}
					}
				} else { //向下滑动
					if (index != 1) {
						$("#screen_" + index).animate({
							"-webkit-transform": "scale(0)"
						}, move_timer, function() {
							$(this).css({
								"-webkit-transform": "scale(1) translateY(" + w_h + "px)"
							});
							fcb.setParallax($("#screen_" + (index - 1) + ">div"));
							fcb.setRemoveParallax($("#screen_" + index + ">div"));
							tar.attr("data-index", index - 1);
						});
						$("#screen_" + (index - 1)).animate({
							"-webkit-transform": "translateY(0px)"
						}, move_timer);
						if (index > len) {
							$("#screen_" + (index + 1)).css("-webkit-transform", "translateY(" + w_h + "px)");
						}
					}
				}
				//位置重置动画
			} else {
				if (touchs - touche >= 0) { //向上滑动
					if (index < len) {
						$("#screen_" + index).animate({
							"-webkit-transform": "scale(1)"
						}, move_timer, function() {
							$(this).css({
								"-webkit-transform": "scale(1) translateY(0px)"
							})
							//switchs = true;
							//tar.attr("data-index",index+1)
						});
						$("#screen_" + (index + 1)).animate({
							"-webkit-transform": "translateY(" + w_h + "px)"
						}, move_timer);
						if (index > 1) {
							$("#screen_" + (index - 1)).css("-webkit-transform", "translateY(-" + w_h + "px)")
						}
					}
				} else { //向下滑动
					if (index != 1) {
						$("#screen_" + index).animate({
							"-webkit-transform": "scale(1)"
						}, move_timer, function() {
							$(this).css({
								"-webkit-transform": "scale(1) translateY(0px)"
							})
						});
						$("#screen_" + (index - 1)).animate({
							"-webkit-transform": "translateY(-" + w_h + "px)"
						}, move_timer);
						if (index > len) {
							$("#screen_" + (index + 1)).css("-webkit-transform", "translateY(" + w_h + "px)");
						}
					}
				}
			}
		});
	},
	styleInit: function() {
		var w_h = $(window).height();
		$("#screen_1").siblings("section").css({
			"-webkit-transform": "translateY(" + w_h + "px)",
			"-moz-transform": "translateY(" + w_h + "px)"
		})
	},
	setParallax: function(tar) { //tar为jquery对象
		for (var i = 0; i < tar.length; i++) {
			var This = tar.eq(i);
			This.addClass(This.attr("data-class"));
		}
	},
	setRemoveParallax: function(tar) { //tar为jquery对象
		for (var i = 0; i < tar.length; i++) {
			var This = tar.eq(i);
			This.removeClass(This.attr("data-class"));
		}
	},
	cover: function() {
		$("#j-popupPlay").click(function() {
			$("#j-popupWrap").show();
		});
		$("#j-popupWrap").click(function() {
			$("#j-popupWrap").hide();
		})
	},
	playVideo: function(tar, this_window) {
		tar.on('click', function() {
			var mp4 = $(this).attr('data-mp4');
			if (ios) {
				var playerHolder = '<video id="video" src="' + mp4 + '" width="100%" height="auto" controls autoplay preload="auto">您的浏览器不支持该视频！</video>'
				this_window.append(playerHolder);
				var video = $('#video'),
					h = window.innerHeight,
					scrollTop = $(window).scrollTop();
				video[0].play();
				video.css({
					'width': '100%',
					'height': h,
					'position': 'absolute',
					'top': scrollTop,
					'left': 0
				})
				video[0].addEventListener('webkitendfullscreen', onVideoEndsFullScreen, false);

				function onVideoEndsFullScreen() {
					$('#video').remove();
				}
			} else {
				var playerHolder = [
					'<div id="playerHolder">',
					'<video id="video" src="' + mp4 + '" width="100%" height="auto" controls autoplay preload="auto">您的浏览器不支持该视频！</video>',
					'<a href="javascript:void(0);" class="video_close"></a>',
					'</div>'
				].join('');
				this_window.append(playerHolder);
				var videoWrapper = $('#playerHolder'),
					video = $('#video'),
					h = window.innerHeight,
					scrollTop = $(window).scrollTop();
				video[0].play();
				document.ontouchmove = function(e) {
					e.preventDefault();
				}
				videoWrapper.css({
					'width': '100%',
					'height': h,
					'position': 'absolute',
					'top': scrollTop,
					'left': 0
				})
				video.attr('height', h);
				$(window).on('resize', function() {
					h = window.innerHeight;
					scrollTop = $(window).scrollTop();
					videoWrapper.css({
						'width': '100%',
						'height': h,
						'position': 'absolute',
						'top': scrollTop,
						'left': 0
					})
					video.attr('height', h);
				})
				$('.video_close').on('click', function() {
					$('#playerHolder').remove();
					document.ontouchmove = function(e) {
						e.default();
					}
				})
			}

		})
	}
}