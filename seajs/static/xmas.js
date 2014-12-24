define(function(require, exports, module) {
    var Core=require("core");

    /**
     * 浏览器判断初始化类，对外部不可见
     * @type {Object}
     */
    var Xmas = {
        /**
         * 初始化
         * @method init
         * @param {void}
         * @return {void}
         */
        init: function() {
            if(Browser.isMobile()){
                alert("is mobile");

            }else{//debugger;
                alert("is pc");
            }
        }
    };    

    module.exports = Xmas;

});