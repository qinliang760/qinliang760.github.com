/**
 * 创建namespace，用于保存变量和类
 * 用法：
 * <pre><code>
jQuery.namespace('Company', 'Company.data');
jQuery.namespace('Company.data'); // 等同于上面的语法
Company.Widget = function() { ... }
Company.data.CustomStore = function(config) { ... }
</code></pre>
 * 函数别名：jQuery.ns('Company.data')
 * @param {String} namespace1
 * @param {String} namespace2
 * @param {String} etc
 * @method namespace
 */
(function($){
	$.namespace = $.ns = function(){
		var o, d;
		$.each(arguments, function(i, v) {
			d = v.split(".");
			o = window[d[0]] = window[d[0]] || {};
			$.each(d.slice(1), function(i2, v2){
				o = o[v2] = o[v2] || {};
			});
		});
		return o;
	};
 })(jQuery);
