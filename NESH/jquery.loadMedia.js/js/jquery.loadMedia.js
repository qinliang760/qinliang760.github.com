/*!
 * Base On jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 * Libs:Jay loadMedia
 * Copyright 2012, QinLiang
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: 2012.10.22
 
case flash
	options={
		width:"1024",
		height:"335",
		id:"payBanner",
		flashPlayer:"../images/video-player.swf",
		flashvars:{flvPath:""},
		params:{},
		attributes:{}	
	}
 requier swfobject.js
 
 
 */

(function($) {
	var loadMedia = {
		defaults: {
			type: "flash",//flash,iframe,image
			options:{}
			
		}
	};
	function LoadMedia(defaults) {
		var self = this;
		var options={
			width:defaults.options.width,
			height:defaults.options.height,
			id:defaults.options.id,
			
			//flash
			flashPlayer:defaults.options.flashPlayer,
			flashvars:defaults.options.flashvars,
			params:defaults.options.params,
			attributes:defaults.options.attributes,
			
			//image
			imgSrc:defaults.options.imgSrc,
			
			//iframe
			iframeSrc:defaults.options.iframeSrc,
			iframeId:defaults.options.iframeId
			
		}
		$.extend(this, {
			setFlash: function() {
				var rand=Math.random()* 1000000;			
				swfobject.embedSWF(options.flashPlayer+"?v="+rand, options.id, options.width, options.height, "9.0.0", false, options.flashvars, options.params, options.attributes);	
			},
			setImage:function(){			
				var img='<img src="'+options.imgSrc+'" width="'+options.width+'" height="'+options.height+'"/>';
				$("#"+options.id).append(img);
			},
			setIframe:function(){				
				var iframeHtml='<iframe allowtransparency="true" id="'+options.iframeId+'" name="commentsIframe" border="0" vspace="0" hspace="0" marginwidth="0" marginheight="0" framespacing="0" frameborder="0" scrolling="no" width="'+options.width+'" height="'+options.height+'" src="'+options.iframeSrc+'"></iframe>';
				$("#"+options.id).append(iframeHtml);				
			},
			setScript:function(){
				
			},
			init: function(type) {
				switch(type){
					case "flash":				
						self.setFlash();
						break;
					case "image":
						self.setImage();
						break;		
					case "iframe":
						self.setIframe();
						break;
					case "script":
						self.setScript();		
						break;
				}	
			}
		})
		self.init(defaults.type);
	}

	$.sc2 = {
		loadMedia: function(defaults) {
			defaults = $.extend({},
			loadMedia.defaults, defaults);
			new LoadMedia(defaults);
		}
	}
})(jQuery);

