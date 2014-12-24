/**
 * url处理
 * @version 6.0.0
 * @author hero
 * @public
 * @module tool/url
 */
define('tool/log',function(require, exports, module) {
    var Tool = require('tool/tool');
    var Url = require('tool/url');
    var globalFrom = Url.getUrlParams(location.href);
    var activityName = document.title;
    var tools = {
        /* 统计函数 */
        log: function(data) {
            var params = [];
            for (var p in data) {
                if (data.hasOwnProperty(p)) {
                    params.push('' + p + '=' + data[p]);
                }
            }
            params.push('t=' + new Date().getTime());
            params.push('from=' + globalFrom);
            params.push('activity=' + activityName);
            var url = 'http://yxplus.yeah.net/log/a.js?' + params.join('&');
            url = encodeURI(url);
            $.getScript(url);
        }
    };


    module.exports = tools;

});