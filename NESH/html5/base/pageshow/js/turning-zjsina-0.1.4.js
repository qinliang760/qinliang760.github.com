/*=====================
 * 名称: turning
 * 功能: 滑动翻页
 * 作者: zjsina
 * 版本: 0.1.4
 * 时间: 2014-7-3
 ======================*/
(function( window, undefined ) {
	// support: IE 6.0+, FF 1.5+, Safari 2.0+, Opera 9.0+
	// card (切换效果)  support: IE 10.0+, FF 2.0+, Safari 2.0+, Opera 10.0+
	var
	//version
	t_version = "0.1.4",

	//监听容器
	monitor,

	//自定义滚动条
	tscroller,

	//滚动条长度
	sh,

	//页面长度
	ch,

	//获取子元素数量
	cnum,

	//获取当前页
	getnpage,

	//最小移动距离(可修改)
	lh = 100,

	//移动块
	target,

	//标记起始位置
	startY,

	//移动距离
	move = 0,

	//标记是否滑动
	flg = false,

	//标记滑块切 换
	initFlg = false,

	//标记turning是否是初次加载
	tinitFlg = true,

	//滑动方向
	dir,

	//上一页
	pre,

	//下一页
	next,

	//当前页
	npage = 1,

	//需要保存的动画
	saveAction = [],

	//定时器管理器
	pageTimer = [],

	//当前页 node
	showpage,

	//上一页 node
	prepage,

	//下一页node
	nextpage,

	//首页
	firstpage,

	//标识IE浏览器
	isIE,

	//IE浏览器下children数组重置
	iechildren = [], 
	
	//卡牌切换基准度数
	degConstant = 45,
	
	//turning初始化
	turning = function(selector) {
		return new turning.fn.init(selector);
	}
	
	//turning prototype function
	turning.fn = turning.prototype = {
		// The current version of turning being used
		turning : t_version,

		//constructor
		constructor : turning,

		//turning init
		init : function(selector) {
			if( monitor == undefined ){
				monitor =  document.getElementById(selector);
				ch      =  document.documentElement.clientHeight;
				monitor.style.height = ch + 'px';
				//过滤IE9以下 children 注释节点
				if ( isIE = navigator.userAgent.indexOf("MSIE") != -1) {
					var 
					     iecNum =  0 ,                      // 标记ie children的个数
					     mcNum  =  monitor.children.length; // 标记已获取children的个数
					for (var i = 0; i < mcNum; i++)
						if (monitor.children[i].nodeType != 8)
							iechildren[iecNum++] = monitor.children[i];
				}
				isIE ? cnum = iechildren.length  : cnum = monitor.children.length;
				isIE ? firstpage = iechildren[0] : firstpage = monitor.children[0];
			}
			return this;
		},

		//设定自定义滚动条
		setScroller : function(scrollerId) {
			tscroller =  document.getElementById(scrollerId);
			sh        =  document.body.clientHeight / cnum;
			tscroller.style.height = sh + 'px';
		},

		//翻页主函数
		move : function( callbackfn , mode ) {
			var 
			//旋转角度
			turndeg,
			//卡牌模式角度刻度
			degree = degConstant / ch,
			//检测浏览器是否支持transform
			transformSupport = turning.support('transform');
			getnpage = callbackfn;
			if (tinitFlg) {
				getnpage(npage);
				tinitFlg = false;
			}
			//模式初始化
			if( mode == undefined )
				mode = 'normal';
			//鼠标事件注册
			addEvent(monitor, 'mousedown', moveStart);
			addEvent(monitor, 'mousemove', moveIn);
			addEvent(window, 'mouseup', moveEnd);
			//移动设备触摸事件注册
			addEvent(monitor, 'touchstart', moveStart);
			addEvent(monitor, 'touchmove', moveIn);
			addEvent(monitor, 'touchend', moveEnd);

			/*事件监听 */
			function addEvent(el, type, fn) {
				if (el.addEventListener) {
					el.addEventListener(type, fn, false);
				} else if (el.attachEvent) {
					el.attachEvent('on' + type, fn);
				} else {
					el['on' + type] = fn;
				}
			}

			//取消浏览器默认行为
			function stop(e) {
				//Opera/Chrome/FF
				if (e.preventDefault)
					e.preventDefault();
				//IE
				e.returnValue = false;
			}

			//添加类
			function addClass(obj, cls) {
				obj.className += " " + cls;
			}

			//删除类
			function removeClass(obj, cls) {
				var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
				obj.className = obj.className.replace(reg, '');
			}

			//开始滑动
			function moveStart(e) {
				flg     =  true;
				initFlg =  true;
				if (e.touches)
					e = e.touches[0];
				startY = e.clientY;
			}

			//滑动中
			function moveIn(e) {
				if (flg) {
					stop(e);
					if (e.touches)
						e = e.touches[0];
					move = e.clientY - startY;
					if (initFlg && move) {
						pre = npage - 1;
						dir = move > 0 ? 1 : -1;
						npage == cnum ? next = 1 : next = npage + 1;
						isIE ? prepage  = iechildren[pre - 1]   : prepage  = monitor.children[pre - 1];
						isIE ? nextpage = iechildren[next - 1]  : nextpage = monitor.children[next - 1];
						isIE ? showpage = iechildren[npage - 1] : showpage = monitor.children[npage - 1];
						if (npage == 1 && dir > 0) {
							flg = false;
							return;
						}
						target = move > 0 ? prepage : nextpage;
						removeClass(showpage, 'show');
						removeClass(target, 'hide');
						addClass(target, 'show');
						//切换模式选择
						switch( mode ) {
							case 'normal':
								dir > 0 ? target.style.top = '0' : target.style.top = '100%';
								break;
							case 'card':
								//保证基础切换
								dir > 0 ? target.style.top = '0' : target.style.top = '100%';
								if( transformSupport  )
									cardtransform( target.children[0] , degConstant , '.8');		
								break;
							case 'scale':
								//to do
								break;
							default:
								throw new Error('turning: No such mode!');
						}
						initFlg = false;
					}
					if (target) {
						//切换模式选择
						switch( mode ) {
							case 'normal':
								dir > 0 ? target.style.top = move - ch + 'px' : target.style.top = move + ch + 'px';
								break;
							case 'card':
								var targetdeg;
								//旋转角赋值
								turndeg = move * degree;
								//保证基础切换
								dir > 0 ? target.style.top = move - ch + 'px' : target.style.top = move + ch + 'px';
								targetdeg = dir > 0 ? -degConstant + turndeg : degConstant + turndeg
								if( transformSupport ){
									cardtransform(showpage.children[0] , turndeg , '.8');
									cardtransform(target.children[0] , targetdeg , '.8')
								}
								break;
							case 'scale':
								//to do
								break;
							default:
								throw new Error('turning: No such mode!');
						}
						if ( tscroller != undefined )
							tscroller.style.top = (npage - 1) * sh - move / 4 + 'px';
					}
				}
			}

			//滑动结束
			function moveEnd(e) {
				stop(e);
				flg = false;
				isIE ? showpage = iechildren[npage - 1] : showpage = monitor.children[npage - 1];
				isIE ? prepage  = iechildren[npage - 2] : prepage  = monitor.children[npage - 2];
				isIE ? nextpage = iechildren[npage]     : nextpage = monitor.children[npage];
				if (target) {
					if (Math.abs(move) > lh) {
						addClass(showpage, 'hide');
						if (dir < 0) {
							npage == cnum ? npage = 1 : npage++;
						} else {
							npage == 1 ? npage = 1 : npage--;
						}
						if ( tscroller != undefined )
							tscroller.style.top = (npage - 1) * sh + 'px';
						switch( mode ) {
							case 'normal':
								t.saction(target, "top", 0, 20, function() {
									getnpage(npage);
								}, true);
								break;
							case 'card':
								//保证基础切换
								t.saction(target, "top", 0, 20, function() {
									getnpage(npage);
								}, true);
								if( transformSupport )
									cardtransform(target.children[0], 0 , 1);
								showpage.children[0].setAttribute("style","");
								break;
							case 'scale':
								//to do
								break;
							default:
								throw new Error('turning: No such mode!');
						}
					} else {
						switch( mode ) {
							case 'normal':
								dir > 0 ? target.style.top = '100%' : target.style.top = '-100%';
								break;
							case 'card':
								//保证基础切换
								dir > 0 ? target.style.top = '100%' : target.style.top = '-100%';
								//还原showpage高度
								showpage.style.top = '0';
								cardtransform(showpage.children[0], 0 , 1);
								break;
							case 'scale':
								//to do
								break;
							default:
								throw new Error('turning: No such mode!');
						}
						if (npage != cnum) {
							dir > 0 ? removeClass(prepage, 'show') : removeClass(nextpage, 'show');
							dir > 0 ?  addClass(prepage, 'hide')   : addClass(nextpage, 'hide');
						} else {
							dir > 0 ? removeClass(prepage, 'show') : removeClass(firstpage, 'show');
						}
					}
					target = '';
				}
			}
			
			//卡牌切换所需transform
			function cardtransform ( obj , tdeg , tscale){
				/*webkitTransform*/
				obj.style.webkitTransform = 'rotateX(' + tdeg + 'deg) scale(' + tscale + ')';
				/*MozTransform*/
				obj.style.MozTransform = 'rotateX(' + tdeg + 'deg) scale(' + tscale + ')';
				/*transform*/
				obj.style.transform = 'rotateX(' + tdeg + 'deg) scale(' + tscale + ')';
			}

		},
	}
	turning.fn.init.prototype = turning.fn;
	//DomReady callback
	turning.DomReady = function(startfn) {
		// Mozilla, Opera , webkit
		if (document.addEventListener)
			document.addEventListener("DOMContentLoaded", startfn(), false);
		
		// If IE event model is used
		else if (document.attachEvent)
			document.attachEvent("onreadystatechange", function() {
				if (document.readyState === "complete")
					startfn();
			});
	}
	//css3属性支持检测
	turning.support = function(prop){
		var 
		//创建div
		div = document.createElement('div'), 
		//浏览器标识
		vendors = 'Khtml O Moz Webkit'.split(' '), 
		//浏览器标识 长度
		len = vendors.length;
		if ( prop in div.style)
			return true;
		if ('-ms-' + prop in div.style)
			return true;
		prop = prop.replace(/^[a-z]/, function(val) {
			return val.toUpperCase();
		});
		while (len--) {
			if (vendors[len] + prop in div.style) {
				return true;
			}
		}
		return false;
	}
	//获取样式
	turning.getstyle = function(obj, name) {
		if (obj.currentStyle) {
			return obj.currentStyle[name];
		} else {
			return getComputedStyle(obj,false)[name];
		}
	}
	//缓动动画
	turning.saction = function(obj, attr, target, time, fn, notsave) {
		var pTimerNum = pageTimer.length;// 获取注册的时间管理
		if (!notsave)
			saveAction.push(obj);
		else
			for (var i = 0; i < pTimerNum; i++) 
				clearInterval(pageTimer[i]);
		pageTimer.push(setInterval(function() {
			var 
				cur   =  parseInt(t.getstyle(obj, attr)), // 获取当前属性
				speed =  (target - cur) / (time / 10);    // 抽象分离速度，参数可变
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if (cur == target) {
				clearInterval(pageTimer[pTimerNum]);
				if (fn)
					fn();
			} else {
				obj.style[attr] = cur + speed + "px";
			}
		}, time))
	}
	//缓动动画结束后的重置
	turning.reset = function() {
		var 
			saveActionNum =  saveAction.length, //saveAction长度  考虑JS执行效率  避免多次查询该值
			pageTimerNum  =  pageTimer.length;  //pageTimer长度 考虑JS执行效率  避免多次查询该值
		for (var i = 0; i < saveActionNum; i++) {
			saveAction[i].style.cssText = '';
			if (i == saveActionNum - 1)
				saveAction = [];
		}
		for (var i = 0; i < pageTimerNum; i++) {
			clearInterval(pageTimer[i]);
			if (i == pageTimerNum - 1)
				pageTimer = [];
		}
	}
	//淡入淡出
	turning.fademove = function(obj, iTarget) {
		var 
			alpha     =  30,              //滤镜值
			pTimerNum =  pageTimer.length;// 获取注册的时间管理
		pageTimer.push(setInterval(function() {
			var speed = 0;
			if (alpha > iTarget)
				speed = -10;
			else
				speed = 10;
			if (alpha == iTarget)
				clearInterval(pageTimer[pTimerNum]);
			else {
				alpha += speed;
				obj.style.filter = 'alpha(opacity:' + alpha + ')';
				obj.style.opacity = alpha / 100;
			}
		}, 30));
	}
	//添加t对象
	window.t = turning;
})(window)