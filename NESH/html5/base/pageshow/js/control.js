/*========================
 * pageshow control.js调用封装好的turnning
 * 注：必须在 turning加载完成之后调用
 =======================*/
t.DomReady(function() {
	var userIntTimer = [], // 定时管理器
	userSetTimer = []// 延时管理器
	t('pageMenage').move(getnowpage, "card");
	//调用turning并在监听容器中调用move的方法，参数为获取当前页的callback
	t('pageMenage').setScroller('scoller');
	//调用turning的自定义滚动条 无自定义滚动条 不调用此函数即可
	function getnowpage(m) {
		t.reset();
		//如果使每次翻页动画都重置，使用reset()方法即可
		/*考虑JS效率 避免for in 避免重复查询变量 进行变量赋值  */
		var userIntTimerNum = userIntTimer.length, userSetTimerNum = userSetTimer.length;
		for (var i = 0; i < userIntTimerNum; i++) {
			clearInterval(userIntTimer[i]);
			if (i == userIntTimerNum - 1)
				userIntTimer = [];
		}
		//清除设定定时器  防止用户反复快速切屏  请在数组清空后重置
		for (var i = 0; i < userSetTimerNum; i++) {
			clearTimeout(userSetTimer[i]);
			if (i == userSetTimerNum - 1)
				userSetTimer = [];
		}
		//清除设定延时器 防止用户反复快速切屏  请在数组清空后重置
		if (m == 1) {
			/*page-1*/
			userSetTimer.push(setTimeout(function() {
				t.fademove(p1p1, 100);
				t.fademove(p1p2, 100);
				t.saction(p1p1, "left", 70, 80);
				t.saction(p1p2, "right", 138, 80);
			}, 300));
			userIntTimer.push(setInterval(function() {
				p1p3.style.visibility = "visible";
				t.saction(p1p3, "bottom", 100, 90, function() {
					p1p3.style.visibility = "hidden";
					p1p3.style.bottom = '80px';
				})
			}, 1500));
		} else if (m == 2) {
			/*page-2*/
			userSetTimer.push(setTimeout(function() {
				t.fademove(p2p1, 100);
				t.saction(p2p1, "top", 50, 40);
			}, 500));
			t.saction(p2p3, "top", 320, 50);
			t.saction(p2p4, "top", 360, 50);
			userSetTimer.push(setTimeout(function() {
				t.fademove(p2p2, 100);
				t.saction(p2p2, "left", 30, 30);
			}, 700));
		} else if (m == 3) {
			/*page-3*/
			userSetTimer.push(setTimeout(function() {
				t.fademove(p3p1, 100);
				t.saction(p3p1, "top", 50, 40);
			}, 500));
			userSetTimer.push(setTimeout(function() {
				t.fademove(p3p2, 100);
				t.saction(p3p2, "left", 30, 40);
			}, 500));
			userSetTimer.push(setTimeout(function() {
				t.fademove(p3p3, 100);
				t.saction(p3p3, "left", 23, 40);
			}, 500));
		} else if (m == 4) {
			/*page-4*/
			userSetTimer.push(setTimeout(function() {
				t.fademove(p4p1, 100);
				t.saction(p4p1, "top", 0, 40);
			}, 300));
			userSetTimer.push(setTimeout(function() {
				t.fademove(p4p2, 100);
				t.saction(p4p2, "top", 150, 40);
			}, 500));
			userSetTimer.push(setTimeout(function() {
				t.fademove(p4p3, 100);
				t.fademove(p4p4, 100);
				t.saction(p4p3, "left", 110, 40);
				t.saction(p4p4, "left", 20, 40);
			}, 600));
		}
	}

})