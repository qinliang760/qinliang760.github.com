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
			model: false,
			hasClose: true,
			confirmTxt:"确定",
			confirmUrl:""	
		}
	};
	function LightBox(root, defaults) {
		var self = this,
		boxObj = root;

		$.extend(this, {
			getSelect:function(){
				return {
					model:defaults.model.substring(1),
					box:defaults.box.substring(1),
					close
				}
			},
			setModel: function() {
				var modelHtml = "<div id='boxModel'></div>",
				wW = $(window).width(),
				bH = $("body").height();
				$("body").append(modelHtml);
				var boxModel = $("#boxModel");
				boxModel.width(wW).height(bH).css("opacity", 0.5).show();
			},
			setPosition: function() {
				if(typeof boxObj == "string"){
					if($("body").find("#popBox").length!=0){
					    $("#popBox").remove();
					 }
					var str="<div id='popBox'>"+boxObj+"</div>";
					$("body").append(str);
					boxObj=$("#popBox");
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
				var closeObj = "<a class='closeBtn' href='javascript:;'>关闭</a>";
				boxObj.append(closeObj);
				boxObj.find(".closeBtn").live("click", function() {
					boxObj.hide();
					if (defaults.model) {
						$("#boxModel").remove();
					}
					return false;
				})
			},
			setConfirm:function(){
				var confirmObj="<a class='confirmBtn' href='javascript:;'>"+defaults.confirmTxt+"</a>",
				    confirmUrl=defaults.confirmUrl;
				boxObj.append(confirmObj);	
				boxObj.find(".confirmBtn").live("click", function() {
					boxObj.hide();
					if (defaults.model) {
						$("#boxModel").remove();
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

