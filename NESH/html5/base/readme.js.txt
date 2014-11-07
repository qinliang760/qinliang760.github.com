兼容多个标准模块化 ，把选择权交给用户，比如 FastClick 的写法：

if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
        'use strict';
        return FastClick;
    });
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = FastClick.attach;
    module.exports.FastClick = FastClick;
} else {
    window.FastClick = FastClick;
}