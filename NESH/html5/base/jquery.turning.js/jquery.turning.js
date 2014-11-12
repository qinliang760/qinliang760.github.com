/*
 * lightBox
 *
 * Copyright (c) 2014 jay
 * Licensed under the MIT license.
 */

$.ns("JV");
(function($){
    /**
     * 
     * @class lightBox
     * @constructor
     */
    JV.turning = function(Jnode, cfg) {
        var defaults = {
            model: false,
            hasClose: true,
            fixed: false,
            opacity: "0.8",
            callback: function() {}
        };
        this.items = Jnode;//html or $
        this.cfg = $.extend({}, defaults, cfg); //合并defaults和cfg，不修改defaults
        this.callback=this.cfg.callback;
        this.init();

    };
  
  JV.turning.prototype = {
        /**
         * 初始化
         * @param  {dom} Jnode
         * @param  {obj} cfg
         */
        setModel:function(){

        },
        init: function() {
            var self=this;

        }

  };


 })(Zepto);