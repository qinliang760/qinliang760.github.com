/*
 * lightBox
 *
 * Copyright (c) 2014 jay
 * Licensed under the MIT license.
 */

(function($){
    /**
     *
     * @class lightBox
     * @constructor
     */
    JV.touch = function(touchId, cfg) {
        var defaults = {
            data:{}
        };

        this.touchId = touchId;//html or $
        this.cfg = $.extend({}, defaults, cfg); //合并defaults和cfg，不修改defaults
        this.data=this.cfg.data;

    };

  JV.touch.prototype = {
        /**
         * 初始化
         * @param  {dom} Jnode
         * @param  {obj} cfg
         */
        setModel: function() {
            var self=this;
            var data=this.data;
            var global=data.global;
            //console.log(data+"dfsd")
            var modelHtml = [
                        '{@each screen as item,index}',
                            '<section class="screen" id="screen_${index|addIndex}" style="background-image:url(${item.bg})">',
                                '{@if global.arrow && index!= (screen.length-1) }',
                                '<div class="page_arrow">',
                                    '<img src="${global.arrow}" width="100%" height="100%">',
                                '</div>',
                                '{@/if}',

                                //for image
                                '{@if typeof screen.image!=undefined}',
                                    '{@each item.image as image}',
                                    '<div  style="${image.styles|setStyle}" {@if image.effect.name} data-class="${image.effect.name}" {@/if} class="${image.effect.init}" {@if image.pop}data-pop="${image.pop.type}" {@if !image.pop.hasClose} data-close="n"{@/if} data-image="${image.pop.content}"{@/if}>',
                                    '{@if image.link}',
                                    '<a href="${image.link}"><img src="${image.url}"  width="100%" height="100%"></a>',
                                    '{@else}',
                                    '<img src="${image.url}"  width="100%" height="100%">',
                                    '{@/if}',
                                    '{@if image.pop}',
                                    '<span class="txtPopHidden">${image.pop.content}</span>',
                                    '{@/if}',
                                    '</div>',
                                    '{@/each}',
                                '{@/if}',

                                //for text
                                '{@if typeof screen.text!=undefined}',
                                    '{@each item.text as text}',
                                    '<div style="${text.styles|setStyle}" {@if text.effect.name} data-class="${text.effect.name}" {@/if}  class="${text.effect.init}"  {@if text.pop}data-pop="${text.pop.type}"  {@if !text.pop.hasClose} data-close="n"{@/if} data-image="${text.pop.content}"{@/if}>',
                                        '{@if text.link}',
                                        '<a href="${text.link}">$${text.content}</a>',
                                        '{@else}',
                                        '$${text.content}',
                                        '{@/if}',
                                        '{@if text.pop}',
                                        '<span class="txtPopHidden">${text.pop.content}</span>',
                                        '{@/if}',
                                    '</div>',
                                    '{@/each}',
                                '{@/if}',

                                //for video
                                '{@if typeof screen.video!=undefined}',
                                    '{@each item.video as video}',
                                    //'<p style="${video.styles|setStyle}"><video ${video.params|setVideoParams} id="video" src="${video.url}" width="${video.width}" height="${video.height}">您的浏览器不支持该视频！</video></p>',
                                    '<div style="${video.styles|setStyle}" {@if video.effect.name} data-class="${video.effect.name}" {@/if}  class="${video.effect.init}" data-pop="video" data-mp4="${video.url}" data-porter="${video.params.poster}"><img width="100%" height="100%" src="${video.params.poster}"></div>',
                                    '{@/each}',
                                '{@/if}',
                            '</section>',
                        '{@/each}'
            ].join('');

            juicer.register('addIndex', self.util().addIndex);//给每屏设置index
            juicer.register('setStyle', self.util().setStyle);//设置元素style
            //juicer.register('setPop', self.util().setPop);//设置元素弹层
            juicer.register('setVideoParams', self.util().setVideoParams);//设置video参数
            var result=juicer(modelHtml, data);
            return result;
        },
        setPackage:function(){
            var self=this;
            self.setScale(640,32,32);
            var bgMusic = self.data.global.backgroundMusic.url;
            var musicHtml = "";
            if(bgMusic){
                musicHtml = self.util().setMusic(bgMusic); //是否添加音乐
            }
            var html=[
                '<div class="content" id="content" data-index="1">'+ musicHtml +self.setModel()+'</div>'
            ];
            document.getElementById("appContainer").innerHTML=html.join("");

            self.util().setJs(self.data.js);//添加需要加入的JS
            self.util().setCss(self.data.css);//添加需要加入的CSS
            self.util().setGlobal(self.data.global);//添加全局配置
            //self.util().setPop();//添加点击事件
            return html;
        },
        getGlobal:function(){
            var self=this;
            var global=self.data.global;
            return global;
        },
        setScale:function(psdWidth, dividendFontSize, maxRootFontSize){
            var d = document
            var de = d.documentElement
            var w = window
            var on = 'addEventListener'
            var gbcr = 'getBoundingClientRect'
            var ps = 'pageshow'
            var head = d.head || d.getElementsByTagName('HEAD')[0]
            var style = d.createElement('STYLE') // 采用拼css的形式，而不是直接用document.documentElement.style.fontSize的形式的原因是，拼css可以通过加入!important获得最高优先级，http://jsbin.com/dopupudago/2/edit?html,js,output
            var resizeEventThrottleTimer
                // 移除任何text-size-adjust对字体大小的改变效果
            var textSizeAdjustCSS = 'text-size-adjust:100%;'
            var textSizeAdjustCSSAll =
                '-webkit-' + textSizeAdjustCSS + '-moz-' + textSizeAdjustCSS + '-ms-' + textSizeAdjustCSS + '-o-' + textSizeAdjustCSS + textSizeAdjustCSS
            var hasGbcr = gbcr in de
            var lastRootFontSize = null // 上一次设置的html的font-size
            function setRem() {
                var rootFontSize = Math.min(
                        (
                            hasGbcr ?
                            de[gbcr]().width // document.documentElement.getBoundingClientRect() iOS4.0+ 安卓2.0+ https://developer.mozilla.org/zh-CN/docs/Web/API/Element.getBoundingClientRect
                            : w.innerWidth
                        ) / (psdWidth / dividendFontSize), maxRootFontSize
                    )
                    // alert('2 iW_'+w.innerWidth+' sw_'+w.screen.width+' dpr_'+devicePixelRatio+' or_'+w.orientation+' gbcrw_'+d.documentElement.getBoundingClientRect().width)
                if (rootFontSize != lastRootFontSize) {
                    // return
                    style.innerHTML =
                        'html{' + 'font-size:' + rootFontSize + 'px!important;' // 20=320/16 // 取16为默认html的font-size是因为浏览器都默认为16，不会导致抖动
                        + textSizeAdjustCSSAll + '}'
                    lastRootFontSize = rootFontSize
                }
            }
            // 在一定延时内稀释setRem的调用
            function trySetRem() {
                clearTimeout(resizeEventThrottleTimer)
                resizeEventThrottleTimer = setTimeout(setRem, 500)
            }
            psdWidth = psdWidth || 640
            dividendFontSize = dividendFontSize || 32
            maxRootFontSize = maxRootFontSize || 32
            head.appendChild(style)
            d[on]('DOMContentLoaded', setRem, false)
                // 安卓在页面刚载入时w.screen.width不一定正确，特别是从一个未设置viewport meta的页面跳转过来时，需要多调整几次。见图：“show/2.3.6_从一个未设置viewport的页面跳转过来时，起初innerWidth和screen.width都是不对的.png”，于是在pageshow或onload事件触发时再设置一次
            if ('on' + ps in w) {
                w[on](ps, function(e) {
                    if (e.persisted) {
                        trySetRem()
                    }
                }, false)
            } else {
                w[on]('load', trySetRem, false)
            }
            w[on]('resize', trySetRem, false)
            setRem()

        },
        util:function(){
            var self=this;
            return {
                    addIndex:function(index){
                        return parseInt(index)+1;
                    },
                    rem2px:function(v) {
                        v = parseFloat(v);
                        return v * 32;
                    },
                    px2rem:function(v) {
                        v = parseFloat(v);
                        return v / 32;
                    },
                    pxrem:function(v) {
                        v = parseFloat(v);
                        return v / 20;
                    },
                    setStyle:function(params){
                        var style="position:absolute;";
                        params=self.util().setAutoVal(params);
                        for (var i in params){
                            //动画设置
                            if(i == "animation"){
                                for(var s in params.animation){
                                    style+= s +":"+params.animation[s]+"s;"+"-webkit-" + s +":"+params.animation[s]+"s;";
                                }
                            }else {
                                style+=i+":"+params[i]+";";
                            }
                        }
                        return style;
                    },
                    setAutoVal:function(params){//把设置的值转换为rem

                        var count=["left","top","width","height"];
                        for (var i in params){
                            if(i=="font-size"){
                                params[i]=self.util().pxrem(parseInt(params[i]))+"rem";
                            }
                            if(_.indexOf(count,i)!=-1){
                               params[i]=self.util().px2rem(parseInt(params[i]))+"rem";
                            }

                        }
                        return params

                    },
                    setPop:function(){
                        $("[data-pop]").bind("click",function(){
                            var t=$(this),
                                data=t.data("pop").split("&&");

                            switch(data[0]){
                                case "image":
                                    //alert(data[1]);
                                break;
                                case "text":
                                break;
                                case "video":
                                break;
                            }
                        })

                    },
                    setObject:function(params){
                        var style="position:absolute;";
                        for (var i in params){
                            style+=i+":"+params[i]+";";
                        }
                        return style;
                    },
                    setVideoParams:function(params){
                        var videoParams="";
                        for (var i in params){
                            videoParams+=i+"='"+params[i]+"' ";
                        }
                        return videoParams;
                    },
                    setJs:function(data,r){
                        var js=data;
                        var js_HTML = '';
                        for (var i=0;i<js.length;i++){
                            if(r == 'html'){
                                js_HTML+= '<script type="text/javascript" src="/js/helper/'+ js[i] +'"></script>';
                            }else {
                                var script=document.createElement("script");
                                script.setAttribute("type", "text/javascript");
                                script.setAttribute("src", "/js/helper/"+js[i]);
                                document.body.appendChild(script);
                            }
                        }
                        return js_HTML;
                    },
                    setMusic:function(url){
                        if(url){
                            var musicHtml = '<div data-play="y" class="u-icon-playMusic J_ani_music_run">\
                                    <audio autoplay loop id="J_backgroundMusic">\
                                        <source type="audio/mpeg" src="'+ url +'"></source>\
                                    </audio>\
                            </div>';
                        }else {
                            var musicHtml = "";
                        }
                        return musicHtml;
                    },
                    setCss:function(data,r){
                        var css=data;
                        var css_HTML = '';
                        for (var i=0;i<css.length;i++){
                            if(r == 'html'){
                                css_HTML +='<link rel="stylesheet" type="text/css" href="/css/'+ css[i] +'">';
                            }else {
                                var link=document.createElement("link");
                                    link.setAttribute("rel", "stylesheet");
                                    link.setAttribute("type", "text/css");
                                    link.setAttribute("href", "/css/"+css[i]);
                                document.getElementsByTagName("head")[0].appendChild(link);
                            }
                        }
                        return css_HTML;
                    },
                    setGlobal:function(data){
                        console.log(data.option);
                        var J_phoneSlideInit = new JV.phoneSlide($("#content"), data.option);
                        document.body.style.background = data.background;
                        parent.$(".arrow_up").click(function() {
                            J_phoneSlideInit.ctrlScreenTouchGo().pc_screen_go(-20)
                        })
                        parent.$(".arrow_down").click(function() {
                            J_phoneSlideInit.ctrlScreenTouchGo().pc_screen_go(20)
                        })
                    }
            }
        }//util end


  };


 })($);