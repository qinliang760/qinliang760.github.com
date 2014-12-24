/**
 * parse, validate, element
 * @version 6.0.0
 * @author hero
 * @public
 * @module tool/validate
 */
define('tool/validate',function(require, exports, module) {
    var Email = require('tool/email');
    var tool = {
        /**
         * 是否空字符串
         * @param  {string}  _value  待校验内容
         * @return {string}      提示语
         *         如果不符合条件，返回 ''
         */
        isEmpty: function(_value) {
            if ($.trim(_value) == "") {
                // return "不能为空";/
                return true;
            }
            return false;
        },
        /**
         * 是否包含非法字符
         * @param  {string}  _value  待校验内容
         * @return {string}      提示语
         *         如果不符合条件，返回 ''
         */
        isLegal: function(_value, _return) {
            var sReg = /[,%\'\"\/\\;|&*\<\>]/;
            if (sReg.test(_value)) {
                // return '请不要输入 ＂, % \' " \ / ；|<>&.*＂ 等特殊字符';
                return false;
            }
            return true;
        },
        /**
         * 是否电话号码
         * @param  {string}  _value  待校验内容
         * @return {string}      提示语
         *         如果不符合条件，返回 ''
         */
        isTel: function(_value) {
            var sReg = /^\d+$/g;
            if (_value.search(sReg) != 0) {
                // return "电话格式错误";
                return true;
            }
            return false;
        },
        /**
         * 是否是数字
         * @param  {string}  _value  待校验内容
         * @return {string}      提示语
         *         如果不符合条件，返回 ''
         */
        isNumber : function(_value) {
            if(/^[0-9]*$/.test(_value)){
                return true;
            }else{
                return false;
            }
        },
        /**
         * 是否是email
         * @param  {string}  _value  待校验内容
         * @return {string}      提示语
         *         如果不符合条件，返回 ''
         */
        isEmail: function(_value) {
            if (!Email.isValid(_value)) {
                // return "邮箱地址格式错误";
                return false;
            }
            return true;
        },
        /**
         * 是否是手机号码
         * @param  {string}  _value 待检验内容
         * @todo 支持数字中间夹着“-”符号的号码形式，例如“1-584-320-4666”
         * @return {Boolean}
         */
        isCellPhone: function(_value){
            if(_value.length == 11){
                if(/^1[34578][0-9]{9}$/.test(_value)){
                    return true;
                }else{
                    return false;
                }
            }
            return false;
        },
        /**
         * 是否长度超过限制
         * @param  {string}  _value  待校验内容
         * @return {string}      提示语
         *         如果不符合条件，返回 ''
         */
        isOverflow: function(_value, length) {
            length = length || 20;
            if (this.getStringLength(_value) > length) {
                // return "字数不能大于10个汉字(或20个字符)";
                return true;
            }
            return false;
        },
        /**
         * 是否时间格式
         * @param  {string}  _value  待校验内容
         * @param {string} _format 格式
         * @return {string}      提示语
         *         如果不符合条件，返回 ''
         */
        isDate: function(_value, _format) {
            _value = (_value + "").replace("-", "");
            var dateReg = /(\d{4})(0\d|1[012])(0\d|[12]\d|3[01])/;

            if (_value.length < 6 || _value.length > 8 || /[^0-9]/g.test(_value)) {
                return "日期格式不正确";
            } else if (_value.length == 6) {
                _value = _value.replace(/((?=((\d){1,2})$))/g, "0");
            } else if (_value.length == 7) {
                var value = _value.replace(/(\d)$/g, "0$1");
                if (!dateReg.test(value)) {
                    _value = _value.replace(/(\d{3})$/g, "0$1");
                } else {
                    _value = value;
                }
            }

            if (dateReg.test(_value)) {
                _value = _value.replace(/((?=((\d{2}){1,2})$))/g, "-");
                return _format ? _value : true;
            } else {
                return "日期格式不正确";
            }
        },
        /**
         * 判断元素是否是图片类型
         * @param {string} _fileName 文件名
         * @return {Boolean}
         */
        isPic: function(_fileName) {
            var suffix, flag = false;
            if (_fileName.indexOf('.') !== -1) {
                suffix = _fileName.substring(_fileName.lastIndexOf('.') + 1, _fileName.length).toLowerCase();
                var picSuffix = ['bmp', 'jpg', 'png', 'tiff', 'gif', 'pcx', 'tga', 'exif', 'fpx', 'svg', 'cdr', 'pcd', 'dxf', 'ufo', 'eps', 'raw'];
                for (var i = 0; i < picSuffix.length; i++) {
                    if (suffix === picSuffix[i]) {
                        flag = true;
                        break;
                    }
                }
            }
            return suffix && flag;
        },
        /**
         * 获取字符串长度
         * @param {string} _str 字符串
         * @return {int} 长度
         */
        getStringLength: function(_str) {
            var a = 0; //预期计数：中文2字节，英文1字节
            var i = 0; //循环计数
            for (i = 0; i < _str.length; i++) {
                if (_str.charCodeAt(i) > 255) {
                    a += 2; //按照预期计数增加2
                } else {
                    a++;
                }
            }
            return a;
        },
        /**
         * 判断是字符串中否含有中文
         * @param  {string}  _str 待校验内容
         * @return {Boolean}
         */
        isChinese: function(_str){
            var isChinese = false;
            for(var i = 0, j = _str.length; i < j; i++){
                if (_str.charCodeAt(i)>255){
                    isChinese = true;
                    break;
                }
            }
            return isChinese;
        },
        /**
         * 是否是网易邮箱地址
         * @param  {string} _value 待校验内容
         * @return {boolean}
         */
        is163Email: function(_value, mailArray) {
            var that = this;
            var mail = ['163.com', '126.com', 'yeah.net', 'vip.163.com', 'vip.126.com', '188.com'];
            mail = $.makeArray(mailArray).concat(mail);
            if(that.isEmail(_value)){
                var suffix = _value.split("@")[1];
                if($.inArray(suffix, mail) < 0){
                    return false;
                }else{
                    return true;
                }
            }else{
                return false;
            }
        },
        __log : function(msg) {
            console.log(msg);
        },
        /**
         * 检查是否正数
         * @param  {string} name 名称
         * @param  {object} obj      检查的对象
         * @param  {boolean} required 是否必须
         * @return {boolean}          是否正确
         */
        checkPositiveNumber : function(name, obj, required) {
            if(!required && typeof obj === 'undefined') {
                return true;
            }

            if(typeof obj !== 'number') {
                this.__log(name, '应该是数字');
                return false;
            }
            if(obj <= 0) {
                this.__log(name, '应该是正数');
                return false;
            }

            return true;
        },
        /**
         * 检查是否非负数
         * @param  {string} name 名称
         * @param  {object} obj      检查的对象
         * @param  {boolean} required 是否必须
         * @return {boolean}          是否正确
         */
        checkNotNegativeNumber : function(name, obj, required) {
            if(!required && typeof obj === 'undefined') {
                return true;
            }

            if(typeof obj !== 'number') {
                this.__log(name, '应该是数字');
                return false;
            }
            if(obj < 0) {
                this.__log(name, '应该是非负数');
                return false;
            }

            return true;
        },
        /**
         * 检查是否非空
         * @param  {string} name 名称
         * @param  {object} obj      检查的对象
         * @param  {boolean} required 是否必须
         * @return {boolean}          是否正确
         */
        checkNotEmptyString : function(name, obj, required) {
            if(!required && (typeof obj === 'undefined' || (typeof obj === 'string' && obj === ''))) {
                return true;
            }
            if(typeof obj !== 'string') {
                this.__log(name, '应该是字符串');
                return false;
            }
            if($.trim(obj).length === 0) {
                this.__log(name, '应该是非空字符串');
                return false;
            }

            return true;
        },
        /**
         * 检查字符串是否在数组中
         * @param  {string} name 名称
         * @param  {object} obj      待检测字符
         * @param  {array} arr      array
         * @param  {boolean} required 是否必填
         * @return {boolean}          是否正确
         */
        checkStringInArray : function(name, obj, arr, required) {
            if(!required && typeof obj === 'undefined') {
                return true;
            }
            if(!this.checkNotEmptyString(name, obj, required)) {
                return false;
            }
            if($.inArray(obj, arr) === -1) {
                this.__log(name, '字符串应该在数组中');
                return false;
            }
            return true;
        },
        /**
         * 检查字符串是否在数组中
         * @param  {string} name 名称
         * @param  {object} obj      待检测字符
         * @param  {array} arr      array
         * @param  {boolean} required 是否必填
         * @return {boolean}          是否正确
         */
        checkArray : function(name, obj, type, required) {
            if(!required && typeof obj === 'undefined') {
                return true;
            }
            if(!$.isArray(obj)) {
                this.__log(name, '应该是数组');
                return false;
            }
            for (var i = 0; i < obj.length; i++) {
                if(typeof obj[i] !== type) {
                    this.__log(name, '应该是类型：' + type);
                    return false;
                }
            };

            return true;
        },
        /**
         * 检查是否是布尔型
         * @param  {string} name 名称
         * @param  {object} obj      待检测字符
         * @param  {boolean} required 是否必填
         * @return {boolean}          是否正确
         */
        checkBoolean : function(name, obj, required) {
            if(!required && typeof obj === 'undefined') {
                return true;
            }
            if(typeof obj !== 'boolean') {
                this.__log(name, '应该是boolean');
                return false;
            }

            return true;
        } 
    };

    module.exports = tool;

});