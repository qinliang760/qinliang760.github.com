(function(e){function t(t,n){var r=this,i=t;e.extend(this,{tab:function(){i.each(function(){var t=i.find(n.menu).children(),r=i.find(n.meunCon);t.click(function(){var t=e(this).index();e(this).find("a").addClass("on").end().siblings().find("a").removeClass("on"),r.removeClass("f-db").eq(t).addClass("f-db")})})}}),r.tab()}tab={defaults:{menu:".menu",meunCon:".con"}},e.fn.tab=function(n){return n=e.extend({},tab.defaults,n),this.each(function(){el=new t(e(this),n)})}})(jQuery);