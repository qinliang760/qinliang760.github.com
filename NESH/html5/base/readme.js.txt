���ݶ����׼ģ�黯 ����ѡ��Ȩ�����û������� FastClick ��д����

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