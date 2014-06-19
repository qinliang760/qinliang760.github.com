// For: jQuery省市弹出选择插件
// Design:	 Marcho, http://Ryeen.com
// Time: 2010-05-28
//调用示例：
//     $("#ID,#ID1").PopupCity({
//		 popupDistance:"25", // 弹出框距离当前元素上距离
//		 popupWidth:"540" // 	弹出框宽度
//	 });

$.fn.PopupCity = function(o){
		var a=$(this);
		var  defaults = {
				popupDistance:"0", // 弹出框距离当前元素上距离
				popupWidth:"600" // 弹出框宽度
				};	
		if(o==null || o.options==null){var o = $.extend(defaults, o);};
		 var str="<div id=PopupWrap><a href=# id=closePopup title=关闭></a><div id=PopupContent></div></div>";//容器
		$("body").append(str);
		// 省份选择
		$(a).click(function(event){
					var Record_Id=$(this).attr("id"); //记录当前的选择框ID,用于返回值
					$("#PopupContent").html(""); 
					$.ajax({
        			url :"data.xml",   
                    success:function(xml){
							$("#PopupContent").append("<dl id='Provinces'></dl><div class='clear'></div><dl id='Citys'></dl><input type='hidden' value='' id='Record_Id' />"); //添加容器
							$("#Record_Id").val(""); 
							$("#Record_Id").val(Record_Id); //将记录的选择框ID 写入隐藏域中
							var _provinceAll="";
                            $(xml).find("province").each(function(){  //循环省份
								_provinceAll+="<dd><a href='javascript:'>"+$(this).attr("name")+"</a></dd>";
                           });
						   $("#Provinces").html(_provinceAll);	//将所有省份加入容器
						   $("#Provinces dd a").focus(function(){$(this).blur();});
						   $("#Provinces dd a").click(function(){ //省份点击时
							   		var _province=$(this).html(); //获取当前省份
									$("#Provinces dd a").removeClass("on");
									$(this).addClass("on");
									$.ajax({
										url:"data.xml",
										success:function(xml){
											var _cityAll="";
											$(xml).find("province[name='"+_province+"'] > city").each(function(){ //循环城市
												t=$(this).attr("name");
												_cityAll+="<dd><a href='javascript:'>"+t+"</a></dd>";
                           					});
											$("#Citys").html(_cityAll);	//将所有城市加入容器
											$("#Citys dd a").click(function(){
												var _city=$(this).html();//获取当前城市
												$("#"+$("#Record_Id").val()).val(_province+"-"+_city);
												$("#PopupWrap").hide();
											})
										}
									});
								});
							}
					});
					
					var Popup=$("#PopupWrap");
					var O=$(this).offset();
					var top=O.top;
					var left=O.left;
					top=parseInt(top)+parseInt(o.popupDistance);
					Popup.hide();
					Popup.show().css("top",top+"px").css("left",left+"px").css("width",o.popupWidth+"px");
					event.stopPropagation();
		 })	;
		//点击按钮关闭
		$("#closePopup").click(function(event){
				$("#PopupWrap").hide();
				event.stopPropagation();
		 });
}