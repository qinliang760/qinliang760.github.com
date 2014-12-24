/**
 * 和事件相关的Util
 * @author hzxushaozhen
 *
 * @module  tool/time
 */
define('tool/time',function( require, exports, module ){
	var serverTimeRange = 0;
	var time = {

		/**
	     * 根据timezone处理时间
	     * @return {date} 
	     */
	    getTimeZoneDate: function( value ) {
	        value = value || new Date().getTime();
	        var timezone = 8;
	        var currentTimeZone = -new Date().getTimezoneOffset() / 60;
	        value = (+value) + (timezone - currentTimeZone) * 1000 * 60 * 60;

	        return new Date( value );
	    },
	    /**
	     * 设置
	     * @param {[type]} time
	     */
	    setServerTime : function(time) {
	    	serverTimeRange = time - new Date().getTime();
	    },
	    /**
	     * 当前服务器时间
	     * @return {[type]}
	     */
	    getServerTime : function() {
	    	return new Date(serverTimeRange + new Date().getTime());
	    },
	    /**
	     * 格式化时间
	     * @param {number|date} value  	时间
	     * @param {string} 		fmt 	格式
	     */
	    formatDate: function(value, fmt) {
	        if (typeof(value) == "number" || typeof(value) == "string") {
	            value = this.getTimeZoneDate(value);
	        }

	        var o = {
	            "y+": value.getFullYear(), // 年份      
	            "M+": value.getMonth() + 1, //月份        
	            "d+": value.getDate(), //日        
	            "h+": value.getHours() % 12 == 0 ? 12 : value.getHours() % 12, //小时        
	            "H+": value.getHours(), //小时        
	            "m+": value.getMinutes(), //分        
	            "s+": value.getSeconds(), //秒        
	            //"q+" : Math.floor((value.getMonth()+3)/3), //季度        
	            "S": value.getMilliseconds() //毫秒        
	        };
	        var week = {
	            "0": "\u65e5",
	            "1": "\u4e00",
	            "2": "\u4e8c",
	            "3": "\u4e09",
	            "4": "\u56db",
	            "5": "\u4e94",
	            "6": "\u516d"
	        };
	        if (/(y+)/.test(fmt)) {
	            fmt = fmt.replace(RegExp.$1, (value.getFullYear() + "").substr(4 - RegExp.$1.length));
	        }
	        if (/(E+)/.test(fmt)) {
	            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[value.getDay() + ""]);
	        }
	        for (var k in o) {
	            if (new RegExp("(" + k + ")").test(fmt)) {
	                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	            }
	        }
	        return fmt;
	    },
	    /** 
	     * 获取短时间
	     * @param  {[type]} time   [description]
	     * @param  {[type]} format [description]
	     * @return {[type]}        [description]
	     */
	    getPostTimeTip : function(time, format) {
	    	var now = new Date().getTime();
	    	var time = new Date(time).getTime();

	    	var leftTime = now - time;

	    	var SECOND = 1000;
			var MINUTE = 60 * SECOND;
			var HOUR = 60 * MINUTE;
			var DAY = 24 * HOUR;

			var day = Math.floor(leftTime / DAY);
			leftTime -= DAY * day;
			var hour = Math.floor(leftTime / HOUR);
			leftTime -= HOUR * hour;
			var minute = Math.floor(leftTime / MINUTE);
			leftTime -= MINUTE * minute;
			var second = Math.floor(leftTime / SECOND);
			
			var tip = '';
			if(day > 0) {
				tip+= day + '天'
			} else {
				if(hour > 0) {
					tip += hour + '小时';
				} else {
					if(minute > 0) {
						tip += minute + '分钟'
					} else {
						tip += second + '秒'
					}
				}
			}


			tip += '前';
			return tip;
	    }
	};

	module.exports = time;
})