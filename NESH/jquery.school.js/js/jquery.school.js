/*!
 * Base On jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 * Libs:Jay school
 * Copyright 2012, QinLiang
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: 2012.10.22
 */

(function($) {
	var school = {
		defaults: {
			province:"#university_province",
			unis:"#university_unis",
			schoolWrap:"#schoolInput"
		}
	};

	function School(root, defaults) {
		var self = this,
			boxObj = root,
			province=$(defaults.province),
			unis=$(defaults.unis),
			schoolWrap=$(defaults.schoolWrap);

		$.extend(this, {

			getProvince: function() {
				var provinceName = [],provinceId = [];
				for (var i = 0,l=schoolData.length;i<l;i++){
					provinceName.push(schoolData[i].name);
					provinceId.push(schoolData[i].id);
				}
				return {
					provinceName:provinceName,
					provinceId:provinceId

				}
			},
			setProvince:function(){
				var provinceData = this.getProvince(),
					provinceName = provinceData.provinceName,
					provinceId = provinceData.provinceId,
					provinceNameHtml = [];

				for (var i = 0, l = provinceName.length; i < l; i++) {
					provinceNameHtml.push('<li><a rel=' + provinceId[i] + ' href="javascript:void(0)">' + provinceName[i] + '</a></li>')
				}
				province.html(provinceNameHtml.join(""));
			},
			setProvinceStyle:function(id){
				var index=id-1,
					list=province.find("a");

				list.removeClass('active');
				list.eq(index).addClass('active');
			},

			getUnis:function(id){
				var index=id-1,
					unis=schoolData[index].univs,
					univsName=[],univsId=[];

				for (var i=0,l=unis.length;i<l;i++){
					univsName.push(unis[i].name);
					univsId.push(unis[i].id);
				}

				return {
					univsName:univsName,
					univsId:univsId
				}	


			},
			setUnis:function(id){
				var unisNameHtml=[],
					unisName=this.getUnis(id).univsName,
					unisId=this.getUnis(id).univsId;

				for (var i=0,l=unisName.length;i<l;i++){
					unisNameHtml.push('<li><a rel=' + unisId[i] + ' href="javascript:void(0)">' + unisName[i] + '</a></li>');
				}	
				unis.html(unisNameHtml.join(""));
			},
			showSchoolBox:function(){
				schoolWrap.click(function(){
					$.sc2.lightBox($("#univlist"));
				})
			},
			showInit:function(){
				this.setProvince();
				this.setUnis(1);
				this.setProvinceStyle(1);

			},
			schoolHandle:function(){
				var provinceList=province.find("a"),
					unisList=unis.find("a");

				provinceList.live("click",function(){
					var t=$(this),
						id=parseInt(t.attr("rel"));

					self.setUnis(id);
					self.setProvinceStyle(id);

					return false;
				})
				unisList.live("click",function(){
					var t=$(this),
						unisName=t.text();

					schoolWrap.val(unisName);
					$("#boxModel").remove();
					boxObj.hide();
					return false;
				})				


			},

			init: function() {
				this.showInit();
				this.schoolHandle();
				this.showSchoolBox();
			}
		})
		this.init();

	}

	$.fn.school = function(defaults) {
		defaults = $.extend({},
		school.defaults, defaults);
		return this.each(function() {
			el = new School($(this), defaults);
		})

	}

})(jQuery);