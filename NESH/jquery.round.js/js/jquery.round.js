/**
 * @fileoverview
 * @author jay
 * @module Round
 **/
(function($) {
    $.ns("JV");

    /**
     * 
     * @class Round
     * @constructor
     * @extends Base

        参数1  Jnode 设置Round的区域
        参数2：设置参数


     */
    JV.Round = function(Jnode, cfg) {
        var self = this;
        var defaults = {


        }
        this.items = $(Jnode);
        this.cfg = $.extend({}, defaults, cfg); //合并defaults和cfg，不修改defaults
        this.init();

    }

    JV.Round.prototype = {
        init: function() {
            var self = this;            
            self.styleInit();
            self.setMove();


        },
        run:false,
        style:[
                {"left":0,"top":0,"z-index":0},
                {"left":"30px","top":"20px","z-index":1},
                {"left":"60px","top":"40px","z-index":2},
                {"left":"400px","top":"60px","z-index":3},
                {"left":"460px","top":"40px","z-index":2},
                {"left":"490px","top":"20px","z-index":1},
                {"left":"520px","top":"0","z-index":0},
            ],
        styleInit:function(){
            var s=this.style;

            this.items.children().each(function(k,v){
                $(v).css(s[k]).data("index",k);
            })



        },
        setMove:function(){
            var self=this;
            this.items.children().click(function(){
                var t=$(this),
                    l=self.items.children().length,
                    m_index=Math.floor(l/2),
                    index=t.data("index"),
                    goto_index;

                var n=Math.abs(index-m_index);

                
                self.items.children().each(function(k,v){
                    var current_index=$(v).data("index");
                    if(index>m_index){
                        goto_index=current_index-n;
                        if(goto_index<0){
                            goto_index=goto_index+l;
                        }

                    }else if(index<m_index){
                        goto_index=current_index+n;
                        if(goto_index>l-1){
                            goto_index=goto_index-l;
                        }
                      
                    }
                    $(v).data("index",goto_index).animate(self.style[goto_index],500);
                })

            })
        }
    }; //prototype



})(jQuery); 