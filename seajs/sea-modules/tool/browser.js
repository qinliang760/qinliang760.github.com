define("tool/browser",function(require, exports, module) {


    /**
     * 浏览器判断初始化类，对外部不可见
     * @type {Object}
     */
    var browser = {
        /**
         * 初始化
         * @method init
         * @param {void}
         * @return {void}
         */
        init: function() {
            var userAgent = window.navigator.userAgent;
            this._parseKernel(userAgent);
            this._parseBrowser(userAgent);
            this._parseOs(userAgent);
            this._parseShell(userAgent);
            this._parseFeature(userAgent);
            this._parseMobile(userAgent);alert(2);
        },
        flash: function() {
            if (typeof this._flash == 'undefined') {
                this._parseFlash();
            }
            return this._flash;
        },
        /**
         * 获取浏览器滚动条宽度
         * @return {void}
         */
         /*
        getScrollBarWidth: function() {
            if (!this.scrollBarWidth) {
                var noScroll, scroll, oDiv = document.createElement("DIV");
                oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
                noScroll = document.body.appendChild(oDiv).clientWidth;
                oDiv.style.overflowY = "scroll";
                scroll = oDiv.clientWidth;
                document.body.removeChild(oDiv);
                this.scrollBarWidth = (noScroll - scroll);

            }
            return this.scrollBarWidth;
        },
        */
        /**
         * 分析浏览器类型及版本
         * @method _parseBrowser
         * @param {string}_userAgent 浏览器userAgent
         * @return {void}
         */
        _parseBrowser: function(_userAgent) {
            var ua = _userAgent;
            var matcher;
            // 使用正则表达式在userAgent中提取浏览器版本信息
            (matcher = ua.match(/MSIE ([\d.]+)/)) ? this.ie = matcher[1] :
                (matcher = ua.match(/Firefox\/([\d.]+)/)) ? this.firefox = matcher[1] :
                (matcher = ua.match(/Chrome\/([\d.]+)/)) ? this.chrome = matcher[1] :
                (matcher = ua.match(/Opera.([\d.]+)/)) ? this.opera = matcher[1] :
                (matcher = ua.match(/Version\/([\d.]+).*Safari/)) ? this.safari = matcher[1] : 0;
            this.version = 0;
            if(matcher && matcher[1]){
                this.version = matcher[1].split('.');
            }else{
                if(this.trident){
                    this.ie = 11;
                    this.version = 11;
                }
            }
        },
        /**
         * 分析浏览器类型及版本
         * @method _parseOs
         * @param {string}_userAgent 浏览器userAgent
         * @return {void}
         */
        _parseOs: function(_userAgent) {
            var os;
            // 读取分析操作系统
            /windows|win32/i.test(_userAgent) ? this.windows = true :
                /linux/i.test(_userAgent) ? this.linux = true :
                /macintosh/i.test(_userAgent) ? this.mac = true : 0;

            if (/win64|wow64/i.test(_userAgent)) {
                this.x64 = true;
            }
            if(this.windows) {
                if(/Windows NT 5/.test(_userAgent)) {
                    this.winxp = true;    
                } else if(/Windows NT 6.1/.test(_userAgent)) {
                    this.win7 = true;    
                } else if(/Windows NT 6.2/.test(_userAgent)) {
                    this.win8 = true;    
                }
            }
        },
        /**
         * 分析浏览器内核类型
         * @method _parseKernel
         * @param {string}_userAgent 浏览器userAgent
         * @return {void}
         */
        _parseKernel: function(_userAgent) {
            var ua = _userAgent;
            var matcher;
            // 使用正则表达式在userAgent中提取浏览器版本信息
            /trident/i.test(ua) ? this.trident = true :
                /webkit/i.test(ua) ? this.webkit = true :
                /gecko/i.test(ua) ? this.gecko = true :
                /presto/i.test(ua) ? this.presto = true : 0;
        },
        /**
         * 分析浏览器壳类型
         * @method _parseShell
         * @param {string}_userAgent 浏览器userAgent
         * @return {void}
         */
        _parseShell: function(_userAgent) {
            var matcher;
            var ua = _userAgent;
            // 使用正则表达式在userAgent中提取浏览器壳信息

            /MetaSr/i.test(ua) ? this.sogou = true :
                /Maxthon/i.test(ua) ? this.maxthon = true :
                /TencentTraveler/i.test(ua) ? this.tt = true :
                /TheWorld/i.test(ua) ? this.theWorld = true :
                /360[S|E]E/i.test(ua) ? this.is360 = true : 0;
            if ((/maxthon|qqbrowser/i).test(ua)) {
                this.shell = true;
            }

        },
        /**
         * 分析浏览器flash版本
         * @method __parseFlash
         * @param {void}
         * @return {void}
         */
        _parseFlash: function() {
            var flashVersion;
            try {
                // 如果是ie浏览器
                if (this.ie) {
                    // 创建一个activeobject
                    var oFlash = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                    if (oFlash) {
                        flashVersion = oFlash.getVariable("$version").split(" ")[1];
                    }
                    // 其他浏览器
                } else {
                    if (navigator.plugins && navigator.plugins.length > 0) {
                        var oFlash = navigator.plugins["Shockwave Flash"];
                        if (oFlash) {
                            var aInfo = oFlash.description.split(" ");
                            for (var i = 0, m = aInfo.length; i < m; i++) {
                                if (parseInt(aInfo[i]) > 0) {
                                    flashVersion = aInfo[i];
                                    break;
                                }
                            }
                        }
                    }
                }
            } catch (e) {}
            this._flash = !! flashVersion ? flashVersion : null;
        },

        /**
         * 判断浏览器是否可以开启CSS3动画
         * - mac的safari对CSS3动画支持的很不好，会引发各种问题，屏蔽掉
         * - ie低版本也不支持，但是CSS写入了对功能不影响，所以没有加入判断里
         * @return {boolean}
         */
        _parseFeature: function() {
            this.css3Animation = !(this.safari && this.mac);
        },
        _parseMobile : function(_userAgent) {
            this.isMobileUA = /ipad/i.test(_userAgent) ||
                /iphone os/i.test(_userAgent) ||
                /midp/i.test(_userAgent) ||
                /rv:1.2.3.4/i.test(_userAgent) ||
                /ucweb/i.test(_userAgent) ||
                /android/i.test(_userAgent) ||
                /windows ce/i.test(_userAgent) ||
                /windows mobile/i.test(_userAgent);
        },
        isMobile : function () {
            return this.isMobileUA;
        },
        /**
         * 是否带壳
         * @returns
         */
        isShell: function() {
            return this.sogou || this.maxthon || this.tt || this.theWorld || this.is360 || this.shell;
        }
    }

    module.exports = browser;

});