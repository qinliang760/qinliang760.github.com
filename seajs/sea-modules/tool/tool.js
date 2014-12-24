/**
 * url处理
 * @version 6.0.0
 * @author hero
 * @public
 * @module tool/url
 */
define('tool/tool',function(require, exports, module) {
    var tools = {
        _baseUID: new Date().getTime(),

        /**
         * 独一无二的id，以特定的字符为开头
         * @example .uid("widget_");
         * @author  hite
         * @version 1.0
         * @date    2012-4-18
         * @param   {string}    _basePrefix 特定前缀
         * @param   {number}    _step       uid直接的距离
         * @param   {number}    _offset     起始数字
         * @return  {string}                uid
         */
        uid: function(_basePrefix, _step, _offset) {
            return (_basePrefix || "id_") + (this._baseUID++);
        },
        /**
         * cookie缓存
         */
        __cookieCache: {},
        /**
         * 设置cookie
         * @example .setCookie("name","hite")
         * @author  hite
         * @version 1.0
         * @date    2012-3-27
         * @param   {string}  _name   cookie的键值
         * @param   {string}  _value  cookie的键值
         * @param   {string}  _day    过期时间，以天为单位
         * @param   {string}  _path   cookie的path，如/jy4
         * @param   {string}  _domain 域名如mail.163.com
         */
        setCookie: function(_name, _value, _day, _path, _domain) {
            var cookie = _name + "=" + escape(_value);
            if (_day && _day != -1) {
                var date = new Date();
                date.setTime(date.getTime() + (_day * 24 * 60 * 60 * 1000));
                cookie += ";expires=" + date.toGMTString();
            }
            if (_path) {
                cookie += ";path=" + _path;
            }
            if (_domain) {
                cookie += ";domain=" + _domain;
            }
            document.cookie = cookie + ";";
            //  清除cookie缓存
            this.clearCookieCache();
        },
        /**
         * 清除cookie缓存
         */
        clearCookieCache: function() {
            // 清除缓存
            this.__cookieCache = {};
        },
        /**
         * 获取cookie里的_key对应的键值
         * @example .getCookie("name");
         * @author  hite
         * @version 1.0
         * @date    2012-3-27
         * @param   {string}  _key cookie的键名
         * @return  {string}       key对于的键值,不包含key和=;
         */
        getCookie: function(_key) {
            var cookie = '';
            var cache = this.__cookieCache;
            if (cache['lastTime']) {
                // 10秒缓存
                if (new Date().getTime() - cache['lastTime'] < 10000) {
                    cookie = cache['cookie'];
                } else {
                    cookie = cache['cookie'] = document.cookie;
                }
            } else {
                cache['lastTime'] = new Date().getTime();
                cookie = cache['cookie'] = document.cookie;
            }
            var regExp = new RegExp(_key + "=([^;]+)");
            var result = regExp.exec(cookie);
            if (result) {
                return result[1];
            } else {}
            return null;
        },

        /**
         * Replace chars &, >, <, ", ' with html entities. 手动转义html，防止script注入
         * To disable function set settings: filter_data=false, filter_params=false
         * @param {string} string
         * @return {string}
         * @static
         */
        escapeHTML: function(_html) {
            if (!_html) {
                return '';
            }

            if (typeof _html == "number") {
                _html = _html.toString();
            }

            return _html.replace(/[\u0000]/g, "").replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        },

        /**
         * 补齐左边
         * @param _content 字符串
         * @param _len 长度
         * @param _c 用于补齐的字符串
         * @returns 补齐的字符串
         */
        paddingLeft: function(_content, _len, _c) {
            _content += '';
            if (_content.length < _len) {
                var left = '';
                for (var i = 0; i < (_len - _content.length); i++) {
                    left += _c;
                }
                return left + _content;
            }
            return _content;
        },

        /**
         * 去除需要去掉的字符
         */
        trimEnd: function(_value, _trimChars) {
            var index = _value.length - 1;
            for (var i = _value.length - 1; i >= 0; i--) {
                if (_trimChars.indexOf(_value.charAt(i)) == -1) {
                    index = i;
                    break;
                }
            }
            return _value.substring(0, index + 1);
        }
    };


    module.exports = tools;

});