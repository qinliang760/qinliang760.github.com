define(function(require, exports, module) {
    //var Browser=require("tool/browser");

    /**
     * 浏览器判断初始化类，对外部不可见
     * @type {Object}
     */
    var core = {
        /**
         * 初始化
         * @method init
         * @param {void}
         * @return {void}
         */
        init: function() {
            Browser=require("tool/browser");
        }
    };    

    module.exports = core;

});