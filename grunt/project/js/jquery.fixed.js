(function(e){function t(t,n){var r=this,i=t,s=n.autoDir,o=i.css(s);e.extend(this,{startFixed:function(){var t=parseInt(i.css("top"));e(window).scroll(function(){var r=parseInt(e(document).scrollTop());if(n.autoHide){var s=parseInt(i.offset().top),o=e(window).height();s<o?i.hide():i.show()}n.easing?setTimeout(function(){i.stop(!0,!0).animate({top:t+r},500)},100):i.css("top",t+r+"px")}),e(window).resize(function(){n.autoWin?r.autoWin():""})},autoWin:function(){var t=e(window).width(),n=i.width(),r=i.parent().width(),u=(t-r)/2;if(n>u){var a=-(n-(n-u));i.css(s,a+"px")}else i.css(s,o)},init:function(){r.startFixed(),n.autoWin?r.autoWin():""}}),r.init()}var n={defaults:{autoWin:!0,autoDir:"right",easing:!1,autoHide:!0}};e.fn.fixed=function(r){return r=e.extend({},n.defaults,r),this.each(function(){el=new t(e(this),r)})}})(jQuery);