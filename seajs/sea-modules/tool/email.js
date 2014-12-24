/**
 * email解析的util类，提供解析缓存
 * 提供：
 *     1.判断是否为合法email地址
 *     2.解析字符串为email对象
 *     3.获得email对象
 *     4.获得email对象的昵称
 *     5.获得email对象的地址
 * email对象结构：{name:"hite",emaiL;"admin@hite.me"}
 * @type {Object}
 * @module tool/email
 */
define('tool/email',function(require, exports, module) {
    /**
     * 解析
     */
    var LOCAL_PART = "([\\w!#$%&'*+-/=?\\^_`{|}~\\.]+)";

    var HOST = "([-\\w]+(\\.[-\\w]+)+)";

    var EMAIL_PATTERN = LOCAL_PART + "@" + HOST;
    /**
     * email校验函数
     */
    var patternStrs = [
        // "Changzhen Guo" <bineon@yahoo.com>
        "\\\"(.+)\\\"[ ]*<" + EMAIL_PATTERN + ">",
        // 'Changzhen Guo' <bineon@yahoo.com>
        "\\\'(.+)\\\'[ ]*<" + EMAIL_PATTERN + ">",
        // Changzhen Guo <bineon@yahoo.com>
        "([^\"\']+)<" + EMAIL_PATTERN + ">",
        // <bineon@yahoo.com>
        "<" + EMAIL_PATTERN + ">",
        // "bineon@yahoo.com"
        "\\\"" + EMAIL_PATTERN + "\\\"",
        // 'bineon@yahoo.com'
        "\\\'" + EMAIL_PATTERN + "\\\'",
        // bineon@yahoo.com
        EMAIL_PATTERN,

        // 手机客户端中发现的badcase, add by lijiawen
        // "Changzhen Guo" < bineon@yahoo.com >
        "[ \\\"\\\']?(.+)[ \\\"\\\']?[ ]*<[ ]*" + EMAIL_PATTERN + "[ ]*>"
    ];
    var patternRegs = [];

    for (var i = patternStrs.length - 1; i >= 0; i--) {
        patternRegs.push(new RegExp(patternStrs[i]));
    };
    var Email = {
        _cache: {},
        // 完整的合法email格式见：
        // http://www.cs.tut.fi/~jkorpela/rfc/822addr.html
        // http://en.wikipedia.org/wiki/Email_address
        // 现在的这个正则是子集
        emailPattern: "(\\w+[\\w\\-\\+]*\\w+@\\w+[\\w\\.\\-]*\\w+)",
        /**
         * 分隔符, 分号
         */
        DEFAULT_SEP: ';',
        /**
         * 对单个email字符串校验
         * @param  {string}  _email 需要校验的邮件地址
         * @return {Boolean}        合法返回true，非法返回false;
         */
        isValid: function(_email) {
            return this._parseEmail(_email) != null;
        },
        /**
         * 解析列表类的邮件字符串，解析为email对象数组
         * 以前的解析是通过分割,来获取某些email组；分割符是“，”，所以如果昵称中包含有“，”号则会出错；
         * 现在使用正则匹配的方式来实现
         * @param  {string} _str 需要解析的字符串，通常为“，”分割的字符串，如'xiangheka'<root@hite.me>,'hite'<admin@hite.me>
         * @return {array}      解析结果 email对象的数组
         */
 /*
        parse2Email: function(_str) {
            // 空字符串, 返回空数组
            if (!_str) {
                return [];
            }
            var str = _str;
            if ($.isArray(_str)) {
                str = _str.join(this.DEFAULT_SEP);
            }
            var cache = this._cache;
            if (cache[str]) {
                return cache[str];
            }

            // 排除email昵称里出现的“;”，因为分组依赖";"做的；
            str = str.replace(/[,]/g, ";").replace(/"[^@]+[;][^@]+"/ig, function(word) {
                return word.replace(/[;]/g, "");
            });

            var pieces = str.split(this.DEFAULT_SEP);
            var list = [];
            var error = [];
            for (var i = 0; i < pieces.length; i++) {
                var piece = pieces[i];
                if (piece != '') {
                    var mail = this._parseEmail(piece);
                    if (mail != null) {
                        list.push(mail);
                    } else {
                        error.push(piece);
                    }
                }
            }
            if (error.length > 0) {
                list.error = error;
            }
            cache[str] = list;
            return list;
        },
*/        
        /**
         * 将一个字符串解析成email{name, mail}
         * @param {string} _content 需要parse的字符串
         * @return {email} 解析后的email，null如果失败
         */
        _parseEmail: function(_content) {
            _content = $.trim(_content);
            var e = {};
            for (var i = 0; i < patternRegs.length; i++) {
                var pieces = _content.match(patternRegs[i]);

                if (pieces == null) {
                    continue;
                }
                if (pieces.length == 5) {
                    // 去掉引号
                    e.name = pieces[1].replace(/"/g, '');
                    e.mail = pieces[2] + "@" + pieces[3];
                    return e;
                } else if (pieces.length == 4) {
                    // 去掉引号
                    e.name = pieces[1].replace(/"/g, '');
                    e.mail = pieces[1] + "@" + pieces[2];
                    return e;
                } else {
                    return null;
                }
            }
        }
    };

    module.exports = Email;
    // module.exports = {};
});