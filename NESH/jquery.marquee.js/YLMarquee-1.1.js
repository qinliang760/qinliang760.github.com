//彦磊图片（文字）平滑连续滚动插件1.0
// 技术支持及版本升级:http://hi.baidu.com/dpxdqx
// 使用前您一定要引入jQurey及本脚本,如
// <script type="text/javascript" src="js/jquery-1.4.2.min.js"></script>
// <script type="text/javascript" src="js/YlMarquee.js">

//1、为您要设置滚动的对象设置容器，并命名id，如id="scroll"
//2、将您要滚动的对象置入<ul></ul>中，并添加li标签，li标签中可以是图片、文字或表格……
//<div id="scroll">
//    <ul>
//         <li><img src="image/1.jpg" alt="1"></li>
//         <li><img src="image/2.jpg" alt="2"></li>
//        <li><img src="image/3.jpg" alt="3"></li>
//         <li><img src="image/4.jpg" alt="4"></li>
//     </ul>
//</div>
//3、在页面中添加jQuery语句，调用此插件，并对相关参数进行设置,如：
//<script type="text/javascript">
//$(document).ready(function(){
//$("#scroll").YlMarquee({
//     visible:3,
//     step:1
//       });
//});
// </script>

//4、插件相关参数：
//　　visible:页面可见元素（图片）个数，默认为3，必须参数。
//　　step:滚动步长，整数，默认为３，增大此数可加快滚动速度，设为0，则不进行滚动。
//　　vertical:滚动方向，有"true"（向上滚动）和"false"（向左滚动）两个参数，默认为false(即向左滚动)。
//    width:滚动的宽度(即说明2中id为scroll的宽度)，可选，不指定则由插件自动定义宽度。
//    height:滚动的高度(即说明2中id为scroll的高度），可选，不指定则由插件自动定义高度。
//    textMode:文字模式（默认为图片模式），当滚动内容为文字时，请指定为true(1.1版本新增参数)。



; (function($) {
    $.fn.extend({
        "totalWidth": function() {
            var tmpWidth = 0;
            $(this).each(function() {
                tmpWidth += $(this).outerWidth(true);

            });
            return tmpWidth;
        },
        "totalHeight": function() {
            var tmpHeight = 0;
            $(this).each(function() {
                tmpHeight += $(this).outerHeight(true);

            });
            return tmpHeight;

        }

    });
    $.fn.YlMarquee = function(o) {
        o = $.extend({
            speed: 60,
            step: 3,
            vertical: false,
            width: 0,
            height: 0,
            visible: 0,
            textMode: false
        }, o || {});
       // debugger;
        var wrap = $(this), ul = $("ul", wrap), li = $("li", ul), v = o.visible, step = o.step, liNum = li.size(), visibleLi = li.slice(0, v);

        var whiteSpace, floatStyle, displayStyle, liSize, ie7HackCss, marginStyle, paddingStyle, wrapSize, visibleLiSize, i, scrollSize, cssPro;
        if (o.vertical) {
            whiteSpace = "normal";
            floatStyle = "none";
            displayStyle = "block";
            wrapSize = o.height;

        } else {
            whiteSpace = "nowrap";
            floatStyle = "left";
            displayStyle = "inline";
            wrapSize = o.width;
            ie7HackCss = o.textMode ? "*float:none;" : "";
        }


        wrap.css({ position: "relative", overflow: "hidden" });
        ul.css({ position: "relative", "white-space": whiteSpace, overflow: "hidden", "list-style-type": "none", margin: "0", padding: "0" });
        li.css({ "white-space": whiteSpace, "display": displayStyle, overflow: "hidden" });
        li.attr("style", li.attr("style") + ";" + "float:" + floatStyle + ";" + ie7HackCss);
        liSize = o.vertical ? li.totalHeight() : li.totalWidth();

        o.vertical ? ul.height(liSize) : ul.width(liSize);

        visibleLiSize = o.vertical ? visibleLi.totalHeight() : visibleLi.totalWidth();

        if (wrapSize == 0) {
            wrapSize = visibleLiSize;
        }



        o.vertical ? wrap.height(wrapSize) : wrap.width(wrapSize);

        if (wrapSize < liSize) {

            ul.append(li.clone());

            var newLi = $("li", ul), newLiSize = o.vertical ? newLi.totalHeight() : newLi.totalWidth();
            newLi.attr("style", newLi.attr("style") + ";" + "float:" + floatStyle + ";");
            o.vertical ? ul.height(newLiSize) : ul.width(newLiSize);
            scrollSize = o.vertical ? newLi.slice(0, liNum).totalHeight() : newLi.slice(0, liNum).totalWidth();
            var MyMar = setInterval(marquee, o.speed);
            ul.hover(function() { clearInterval(MyMar); }, function() { MyMar = setInterval(marquee, o.speed); });

        }

        function marquee() {

            if (o.vertical) {
debugger;
                if (wrap.scrollTop() >= scrollSize) {
                    wrap.scrollTop(wrap.scrollTop() - scrollSize + step);
                }
                else {
                    i = wrap.scrollTop();
                    i += step;
                    wrap.scrollTop(i)
                }

            } else {

                if (wrap.scrollLeft() >= scrollSize) {

                    wrap.scrollLeft(wrap.scrollLeft() - scrollSize + step);
                }
                else {
                    i = wrap.scrollLeft();
                    i += step;

                    wrap.scrollLeft(i);
                }

            }
        };


    };


})(jQuery);

