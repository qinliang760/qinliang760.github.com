/*
 * <%= props.name %>
 *
 * Copyright (c) <%= currentYear %> <%= props.author_name %>
 * Licensed under the <%= props.license %> license.
 */

(function($){
    /**
     * 
     * @class <%= props.name %>
     * @constructor
     */
    JV.<%= props.name %> = function(Jnode, cfg) {
        var self = this;
        var defaults = {

        }
        this.items = $(Jnode);
        this.cfg = $.extend({}, defaults, cfg); //合并defaults和cfg，不修改defaults
        this._init();

    }
  
  JV.<%= props.name %>.prototype = {
        /**
         * 初始化
         * @param  {dom} Jnode
         * @param  {obj} cfg
         */
        _init: function() {//私有
            var self = this;

        }

  };


 })(jQuery);