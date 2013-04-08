/*!
 * Base On jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 * Libs:Jay timer
 * Copyright 2012, QinLiang
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: 2012.10.22
 */

(function($) {
	var timer = {
		defaults: {
			dateShow:false,
			panels:".ui-timer" 
		}
	};

	function Timer(defaults) {
		var self = this,
			panels = $(defaults.panels),
			dateShow=defaults.dateShow;


		$.extend(this, {
			getDate:function(){
				var date=new Date();
				var year=date.getFullYear(),
					month=date.getMonth()+1,
					day=date.getDate;
				return {
					date:date,
					year:year,
					month:month,
					day:day
				}

			},
			getTimer:function(){
				var date=this.getDate().date;
				var hour=date.getHours(),
					minutes=date.getMinutes(),
					second=date.getTime() % 60000;
				second=(second-(second%1000))/1000;
				
				if(minutes<10){
					minutes="0"+minutes;
				}
				if(second<10){
					second="0"+second;
				}
				var clock=hour+":"+minutes+":"+second;
				return {
					clock:clock,
					hour:hour,
					minutes:minutes,
					second:second
				}
			},
			setup: function() {
				var getTime=this.getTimer();
				var time=getTime.clock;
				panels.html(time);
				setInterval(function(){self.setup()},1000);

			},
			init: function() {
				this.setup();

			}
		});
		self.init();

	}

	$.sc2 = {
		timer: function(defaults) {
			defaults = $.extend({},
			timer.defaults, defaults);
			new Timer(defaults);
		}
	};
})(jQuery);