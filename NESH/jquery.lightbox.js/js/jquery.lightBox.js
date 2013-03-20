/*!
 * Base On jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 * Libs:Jay lightBox
 * Copyright 2012, QinLiang
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: 2012.10.22
 */

(function($) {
	var lightBox = {
		defaults: {
			model:".ui-box-model",
			box:".ui-box",
			close:".ui-box-close",
			confirm:".ui-box-confirm",
			cancel:".ui-box-cancel",
			//model: false,
			hasClose: true,
			confirmTxt:"确定",
			confirmUrl:""	
		}
	};
	function LightBox(root, defaults) {
		var self = this,
		boxObj = root;

		$.extend(this, {
			getStr:function(){
					var model=defaults.model.substring(1),
					 box=defaults.box.substring(1),
					 close=defaults.close.substring(1),
					 confirm=defaults.confirm.substring(1);
				return {
					model:model,
					box:box,
					close:close,
					confirm:confirm
				};
			},
			setModel: function() {
				var modelHtml = '<div class='+this.getStr().model+'></div>',
				wW = $(window).width(),
				bH = $(document).height();
				$("body").append(modelHtml);
				var boxModel = $(defaults.model);
				boxModel.width(wW).height(bH).css("opacity", 0.5).show();
			},
			setPosition: function() {

				if(typeof boxObj == "string"){
					if($(defaults.box).length!==0){
					    $(defaults.box).remove();
					 }
					var str='<div class='+this.getStr().box+'>'+boxObj+'</div>';
					$("body").append(str);
					boxObj=$(defaults.box);
				}
				
				var wW = $(window).width(),
				wH = $(window).height(),
				wScrollTop = $(window).scrollTop(),				
				bW = boxObj.width(),
				bH = boxObj.height(),
				bLeft = (wW - bW) / 2,
				bTop = (wH - bH) / 2 + wScrollTop;

				boxObj.css({
					"left": bLeft + "px",
					"top": bTop + "px"
				}).show();

			},
			setClose: function() {
				var closeObj = "<a class='"+this.getStr().close+"' href='javascript:;'>&times;</a>";
				boxObj.append(closeObj);
				boxObj.find(defaults.close).live("click", function() {
					boxObj.hide();
					if (defaults.model) {
						$(defaults.model).remove();
					}
					return false;
				})
			},
			setConfirm:function(){
				var confirmObj="<a class='"+this.getStr().confirm+"' href='javascript:;'>"+defaults.confirmTxt+"</a>",
				    confirmUrl=defaults.confirmUrl;
				boxObj.append(confirmObj);	
				boxObj.find(defaults.confirm).live("click", function() {
					boxObj.hide();
					if (defaults.model) {
						$(defaults.model).remove();
					}
					if(defaults.confirmUrl!==""){
						location.href=defaults.confirmUrl;
					}
					else{
					   return false;
					}
				})
			},
			init: function() {
				this.setPosition();
				defaults.model ? self.setModel() : "";
				defaults.hasClose ? self.setClose() : "";
				defaults.confirmTxt? self.setConfirm(): "";
			}
		})
		self.init();

	}

	$.fn.lightBox = function(defaults) {
		defaults = $.extend({},
		lightBox.defaults, defaults);
		return this.each(function() {
			el = new LightBox($(this), defaults);
		})

	}
	$.sc2 = {
		lightBox: function(obj, defaults) {
			defaults = $.extend({},
			lightBox.defaults, defaults);
			new LightBox(obj, defaults);
		}
	}
})(jQuery);

