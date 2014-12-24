/**
 * url处理
 * @version 6.0.0
 * @author hero
 * @public
 * @module tool/url
 */
define('tool/url',function(require, exports, module) {
    var tool = {
        /**
         * 从_baseUrl中删除某些参数
         * @author  hite
         * @version 1.0
         * @date    2012-3-27 14:49:32
         * @param   {string}    _baseUrl    源url
         * @param   {array}    _removeKeys 参数key的数组
         * @return  {string}                删除结果之后的url
         */
        cropURL: function(_baseUrl, _removeKeys) {
            var tempUrl = _baseUrl;
            for (var i = 0; i < _removeKeys.length; i++) {
                var reg = new RegExp("[&]?" + _removeKeys[i] + "=[^&]+", "g");
                tempUrl = tempUrl.replace(reg, "").replace("?&", "?");
            }
            return tempUrl;
        },
        /**
         * 获取url的参数
         */
        getUrlParams: function(_url) {
            var params = {};
            if (!_url || _url.indexOf('?') == -1) {
                return params;
            }

            var index = _url.indexOf('?');
            var pms = _url.substring(index + 1);
            var as = pms.split('&');
            for (var i = 0; i < as.length; i++) {
                var index = as[i].indexOf('=');
                if (index != -1) {
                    params[as[i].substring(0, index)] = decodeURIComponent(as[i].substring(index + 1));
                }
            }
            return params;
        },
        /**
         * 为_baseUrl追加某些参数，自动判断处理"？"
         * @example
         * .appendURL("hite.me",{a:2,c:3,d:4});
         *
         * @author  hite
         * @version 1.0
         * @date    2012-3-27
         * @param   {string}  _baseUrl  基础的url
         * @param   {object}  _optional 参数和参数值对的对象
         * @return  {string}            追加了参数的新url字符串
         */
        appendURL: function(_baseUrl, _optional) {
            var baseURL = _baseUrl || "";
            if (!_optional) {
                return baseURL;
            }

            var url = baseURL.split("?");
            var result = url[0] + "?" + $.param(_optional, true);
            if (url.length == 2) {
                result = result + "&" + url[1];
            }
            return result.replace(/&+/gm, "&");
        },
        
        /**
         * 模拟jsonp
         * @deprecated 已经废弃，一般使用跨域ajax调用
         */
        jsonp: function(_url, _callback, _settings) {
            var settings = $.extend({
                charset: "utf-8"
            }, _settings);
            var funcName = "_tmp_jsonp_callback" + (+new Date);
            if (settings.funcName) {
                funcName = settings.funcName;
            }
            window[funcName] = function() {
                _callback && _callback.apply(window, arguments);
                try {
                    delete window[funcName];
                } catch (e) {}
            }
            var callbackObj = {};
            callbackObj[(settings.callbackName || "callback")] = funcName;
            // _settings里面加入自定义callbackname，for文件中心里面不是用callback作为回调函数名。
            var url = this.appendURL(_url, callbackObj);
            this.getScript(url, settings.charset, function() {
                // _callback && _callback.apply(window,arguments);
                try {
                    window[funcName]();
                    // 删除临时变量
                    delete window[funcName];
                } catch (e) {}
            });
        },
        /**
         * 引用外部js
         * @method  fGetScript
         * @param {string} sUrl:外部js的url
         * @param {string} sCharset:编码
         * @param {function} fCallback:回调函数
         * @return {object} 返回script对象
         * @for CommonControl
         */
        getScript: function(sUrl, sCharset, fCallback, fError) {
            var callback = function() {
                fCallback && fCallback.apply(window, arguments);
            }
            this._getScript(sUrl, sCharset, callback, fError);
        },
        /**
         * 获取js脚本
         * @method getScript
         * @param {string}_url 请求url
         * @param {function}_callback 回调函数
         * @return {void}
         */
        _getScript: function(_url, _charset, _callback, _error) {
            // 异步加载解决
            setTimeout(function() {
                var READY_STATE_RE = /loaded|complete|undefined/;
                var script = document.createElement("script");
                script.setAttribute("charset", _charset || "utf-8");
                script.setAttribute("type", "text/javascript");
                script.setAttribute("src", _url);
                script.async = "async";
                var callback = function(_status) {
                    if (READY_STATE_RE.test(script.readyState)) {
                        script.onload = script.onerror = script.onreadystatechange = null;
                        script.parentNode.removeChild(script);
                        script = undefined;
                        //IE10下新加载的script会在此之后执行，所以此处需延迟执行
                        // 成功
                        if (_status) {
                            if (typeof _callback == "function") {
                                setTimeout(_callback, 0);
                            }
                        } else {
                            // 有error的时候使用error
                            if (typeof _error == "function") {
                                setTimeout(_error, 0);
                            } else if (typeof _callback == "function") {
                                setTimeout(_callback, 0);
                            }
                        }
                    }
                };

                script.onload = function() {
                    callback(true);
                };
                script.onerror = function() {
                    callback(false);
                };
                script.onreadystatechange = function() {
                    callback(true);
                };

                var head = document.getElementsByTagName("head")[0];
                head.appendChild(script);
            }, 0);
        }
    };

    module.exports = tool;

});