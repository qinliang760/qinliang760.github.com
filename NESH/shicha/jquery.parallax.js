/**
 * @fileoverview 
 * @author jay
 * @module Parallax
 **/
(function($){
	$.ns("JV");

    /**
     * 
     * @class Parallax
     * @constructor
     * @extends Base

	    参数1  视差区域的ID
	    参数2：设置参数


     */
     JV.Parallax=function(Jnode,cfg){
        var self = this;
        var defaults={
            activeNode:"",//导航ID
            scrollToNode:""//导航链接
        }
		this.items = $(Jnode);
        this.cfg = $.extend({},defaults, cfg);//合并defaults和cfg，不修改defaults
		this.init();

    }
	
	JV.Parallax.prototype = {
        init: function() {
            var self = this;
            self.setParallax();//设置视差
            $.sc2.scrollTo({trigger:self.cfg.scrollToNode});//设置导航

        },        
        inView:function(obj){
            var w=$(window),
                wt=w.scrollTop(),
                wh=w.height(),
                ot=this.getOffsetTop(obj),
                objH=obj.height();
                if ( (wt + wh) > ot && (ot + objH) > wt ) {
                    return true;
                }
                return false;           
        },
        getOffsetTop:function(obj){
            var offset=obj.offset(),
                offsetTop=offset.top;
            return offsetTop;
        },

        setParallax:function(){
            

            $('[data-type]').each(function() {  
                $(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
                $(this).data('Xposition', $(this).attr('data-Xposition'));
                $(this).data('speed', $(this).attr('data-speed'));
            });

            var self=this,
                $window = $(window),
                elements=self.items.find('[data-type="background"]');

            elements.each(function(){
                var $self = $(this);

                $(window).scroll(function() {
                    
                            // If this div is in view
                            if ( self.inView($self)) {

                                //set active
                                var section=$self.attr("id"),    
                                    link=$(self.cfg.activeNode).find("a");

                                link.removeClass("active");    
                                $(self.cfg.activeNode).find('a[href="#'+section+'"]').addClass("active") ;
                                // Scroll the background at var speed
                                // the yPos is a negative value because we're scrolling it UP!                              
                                var yPos = -($window.scrollTop() / $self.data('speed')); 
                                
                                // If this element has a Y offset then add it on
                                if ($self.data('offsetY')) {
                                    yPos += $self.data('offsetY');
                                }
                                var coords = '50% '+ yPos + 'px';

                                     // Move the background
                                 $self.css({ backgroundPosition: coords });        

                                 $('[data-type="sprite"]', $self).each(function() {
                                    var $sprite = $(this);
                                    
                                    // Use the same calculation to work out how far to scroll the sprite
                                    var yPos = -($window.scrollTop() / $sprite.data('speed'));                  
                                    var coords = $sprite.data('Xposition') + ' ' + (yPos + $sprite.data('offsetY')) + 'px';
                                    
                                    $sprite.css({ backgroundPosition: coords });
                                 })

                                $('[data-type="move"]', $self).each(function() {
                                    
                                    // Cache the video
                                    var $move = $(this);
                                    
                                    // There's some repetition going on here, so 
                                    // feel free to tidy this section up. 
                                    var yPos = -($window.scrollTop() / $move.data('speed'));                   
                                    var coords = (yPos + $move.data('offsetY')) + 'px';

                                    $move.css({ top: coords });                                                    
                                    
                                }); // video

                                
                             
                            
                            }; // in view
                    
                        }); // window scroll
            })   //elements each         
        }        
	};//prototype



 })(jQuery);


