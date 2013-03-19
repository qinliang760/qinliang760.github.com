(function($) {
	share = {
		defaults: {
			picElement: $(".pic")
		}
	}

	function Share(root, defaults) {
		var self = this,
		obj = root;
		$.extend(this, {
			params: function() {
				var title = $("title"),
				link = location.href,
				pic = defaults.picElement;
				return {
					title: title,
					link: link,
					pic: pic
				}
			},
			setParams: function(name) {

				var P = self.params();
				switch (name) {
				case 'ntes':
					return ['http://t.163.com/article/user/checkLogin.do?images=' + P.pic + '&togImg=true&link=' + P.link + '&source=' + P.link + '&info=' + P.title + ' ' + P.link, 'width=640,height=480,resizable=no']

					break;
				case 'qq':
					/* qq weibo */
					return ['http://v.t.qq.com/share/share.php?pic=' + P.pic + '&url=' + P.link + '&site=' + P.link + '&title=' + P.title, 'width=640,height=480,resizable=no'];

					break;
				case 'sina':
					return ['http://v.t.sina.com.cn/share/share.php?type=3&pic=' + P.pic + '&title=' + P.title + '&url=' + P.link, 'width=640,height=480,resizable=no'];
					break;
				case 'kaixin':
					return ['http://www.kaixin001.com/repaste/bshare.php?rtitle=' + P.title + '&rurl=' + P.link, 'width=640,height=480,resizable=no'];
					break;
				case 'renren':
					return ['http://share.renren.com/share/buttonshare.do?link=' + P.link + '&title=' + P.title, 'width=640,height=480,resizable=no'];
					break;
				case 'qq_zoom':
					return ['http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=' + P.title + '&url=' + P.link + '&pics=' + P.pic + '&summary=' + P.title, 'width=640,height=480,resizable=no'];
					break;
				}

			},
			setShare: function() {
				obj.click(function() {
					var liClass = $(this).attr("class");
					var p = self.setParams(liClass);
					window.open(p[0], "", p[1])
				})

			}

		})
		this.setShare();
	}

	$.fn.share = function(defaults) {
		defaults = $.extend({},
		share.defaults, defaults);
		return this.each(function() {
			new Share($(this), defaults);
		})
	}

})(jQuery);

