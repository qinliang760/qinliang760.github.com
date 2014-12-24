/**
 * 初始化入口
 * @version 6.0.0
 * @author hero
 * @public
 * @module index
 */
define('index', function(require, exports, module) {
    var Log = require('tool/log');
    var Validate = require('tool/validate');
    var Url = require('tool/url');
    
    var index = {
        /**
         * 构造函数
         * @return {void}
         */
        init: function() {
            var that = this;
            var shareAct = $('.js-share-act');

            //检测是否是ie6

            if(that.isIE6()){
                alert('您的浏览器是ie6,请更新浏览器！！')
            };

            $('#sendMsg').on('click',function(){
                that.sendDashiMmobile($(".send"));
            });


            $('.pop').on('click',function(){
                that.getPraise();
            });
            $('.join').on('click',function(){
                that.getPraise();
            });
            $('.mas_rule2l a').on('click',function(){
                that.getPraise();
            })

            $('.show_winners').on('click',function(){
                that.getWinners();
            });
            $(".share").socialshare(); //分享



            $('#seeRules').on('click',function(){
                var dialog = $($('#winRules').html());
                dialog.showDialog({clsName:'m-rules-win'});
            });
            $(".banner_box a").on('mouseover',function(){
                $(this).find("div").css("display","block");
            });
            $(".banner_box a").on('mouseout',function(){
                $(this).find("div").css("display","none");
            });



        },
        //下载邮箱大师到手机
        sendDashiMmobile: function(Wmobile){
            var that = this;
            var mobileIpt = Wmobile.find('[name="mobile"]');
                // 发送下载链接
                var val = mobileIpt.val();
                if(!Validate.isCellPhone(val)) {
                    Wmobile.find(".mas_msg").html('请输入正确的手机号码。');
                } else {
                    var _template = 'ds43';
                    // 发送下载链接
                    // 启动短信发送接口
                    Url.jsonp('http://smsspub.mail.163.com/mobileserv/fsms.do?product=AndroidMail&' +
                        'template=' + _template + '&mobile=' + val, function (e) {
                        if(typeof e === 'number') {
                            switch (e) {
                                case 1:
                                    Wmobile.find(".mas_msg").html('短信发送成功，请注意查收。');
                                    break;
                                default:
                                    Wmobile.find(".mas_msg").html('换个手机号码试试。');
                                    break;
                            }
                        }
                    });
                }

        },
        getPraise:function(){
        var that = this;
            var dialog = $($('#winPraiseDialog').html());

            //var $id = dialog.find('.m-winners-list');

            dialog.showDialog({clsName:'m-praise-win'});
            dialog.find('#sendMsg2').on('click',function(){
                that.sendDashiMmobile($(".send2"));
            });

        },


        //获奖者名单
        getWinners: function(){
            var dialog = $($('#winWinnerDialog').html());
            var $id = dialog.find('.folist');
            $.get('ajax/getIphoneWinners.do',function(res){
                var $winners = res.content.winners;
                if($winners.length <= 0){  //判断名单是否为空
                    dialog.find(".folist").append('<p>还没有同学中奖</p>');
                }else{
                    for(var i = 0; i < $winners.length; i++){
                        dialog.find(".folist").append('<p>'+$winners[i].time+'恭喜'+$winners[i].uid+'获得iPhone6 Plus</p>');
                    };
                }
            });
            dialog.showDialog({clsName:'m-winners-win'});
        },
        isIE6 : function(){
            var flag;
            var browser=navigator.appName;
            var b_version=navigator.appVersion;
            var version=b_version.split(";");
            if(browser=="Microsoft Internet Explorer" && getIEVer()=="6"){
                flag = true;
            }else{
                flag = false;
            };
            function getIEVer() {
                var ua = navigator.userAgent; //获取用户端信息
                var b = ua.indexOf("MSIE "); //检测特殊字符串"MSIE "的位置
                if (b < 0) {
                    return 0;
                }
                return parseFloat(ua.substring(b + 5, ua.indexOf(";", b))); //截取版本号字符串，并转换为数值
            };
            return flag;
        },
        //时间戳
        timeStamp: function(){
            return new Date().getTime();
        }
    };

    module.exports = index;
});
