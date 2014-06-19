// For: jQuery省市弹出选择插件
// Design:	 jay
// Time: 2011-11-21
//调用示例：
//     $("#ID,#ID1").PopupCity({
//		 popupDistance:"25", // 弹出框距离当前元素上距离
//		 popupWidth:"540" // 	弹出框宽度
//	 });

$.fn.PopupCity = function(o){
	var a=$(this);
	var Record_Id;
	var municipality=['北京','上海','天津','重庆'];
	var defaults = {
		popupDistance:"0", // 弹出框距离当前元素上距离
		popupWidth:"100", // 弹出框宽度
		ajaxUrl:"php/popupCity/data.php?id="
	};	
	if(o==null || o.options==null){var o = $.extend(defaults, o);};
	 var str="<div id=PopupWrap><div id=PopupContent></div></div>";//容器
	$("body").append(str);
	$(a).click(function(event){
		Record_Id=$(this).val(); //记录当前的选择框ID,用于返回值
		//判断是否为直辖市
		for(i=0;i<municipality.length;i++){
			if($(this).next().text()==municipality[i]){
				if($(this).attr("checked")){
					$(this).parent().append("<input type='hidden' value='"+$(this).attr("itemid")+"' name='province"+Record_Id+"[]'/>");
				}else{
					$(this).parent().find("input[type='hidden']").remove();
				}
				return;
			}	
		}
		
		$("#PopupContent").html("");
		hideInput=$(this).siblings("input:hidden");
		var selectedVal=[];//定义已选择的数组
		if(hideInput.length>0){
			selectedVal=hideInput.val().split(",");
		}
		if($(this).siblings("span").length>0){
			$(this).attr("checked","checked");	
		}else{
			$(this).attr("checked","");
		}
		$.ajax({
			url :o.ajaxUrl+Record_Id,
			type:"GET",
			dataType:"json",
			success:function(data){
				var rightData=eval(data);
				$("#PopupContent").append("<ul id='popupCitys'></ul>"); //添加容器
				$("#PopupWrap > p.popupDo").remove();
				$("#PopupWrap").append("<p class='popupDo'><a href='#' class='checkAllBtn'>全选</a><span>/</span><a href='#' class='checkNoBtn'>全不选</a><br/><a href='#' class='okBtn'>确定</a><a href='#' class='cancelBtn'>取消</a></p>"); //添加容器
				var _cityAll="";
				var checkedLabel="";
				for(i=0;i<rightData.length;i++){ //循环省份
					if(selectedVal.length>0){
						for(j=0;j<selectedVal.length;j++){
							if(rightData[i].id == selectedVal[j]){								
								checkedLabel = "checked";
								break;
							}else{								
								checkedLabel = "";
							}						
						}
						_cityAll+="<li><input "+checkedLabel+" type='checkbox' id='citys"+rightData[i].id+"' value='"+rightData[i].id+"' name=''/><label for='citys"+rightData[i].id+"'>"+rightData[i].city+"</label></li>";	
					}else{
						_cityAll+="<li><input type='checkbox' id='citys"+rightData[i].id+"' value='"+rightData[i].id+"' name=''/><label for='citys"+rightData[i].id+"'>"+rightData[i].city+"</label></li>";
					}
				};
			   $("#popupCitys").html(_cityAll);	//将所有省份加入容器
			}
		});//省市ajax
		
		var Popup=$("#PopupWrap");
		var O=$(this).offset();
		var top=O.top;
		var left=O.left;
		top=parseInt(top)+parseInt(o.popupDistance);
		Popup.hide();
		Popup.show().css("top",top+"px").css("left",left+"px").css("width",o.popupWidth+"px");
		event.stopPropagation();
	 })	;
	
	//submit
	$("#PopupWrap p.popupDo > a ").live("click",function(e){
		var currentCheckbox	= $("#popupCity .popupCityList input[value="+Record_Id+"]");									
		if($(e.target).attr("class")=="okBtn"){
			var citySelectedL=$("#popupCitys").find("input:checked").length;
			var popupCitysL=$("#popupCitys").find("li").length;
			if(citySelectedL>0){
				currentCheckbox.attr("checked","checked");
				if(currentCheckbox.parent().find("span").length>0){
					currentCheckbox.parent().find("span").html("("+citySelectedL+"/"+popupCitysL+")")	
				}else{
					currentCheckbox.parent().append("<span>("+citySelectedL+"/"+popupCitysL+")</span>")
				}
			}else{
				currentCheckbox.attr("checked","");
				currentCheckbox.parent().find("span").remove();
			}
			var citySelectedArr=[];
			for(i=0;i<citySelectedL;i++){
				citySelectedArr.push($("#popupCitys").find("input:checked").eq(i).val());	
			}
			currentCheckbox.parent().find("input[type=hidden]").remove();
			currentCheckbox.parent().append("<input type='hidden' value='"+citySelectedArr+"' name='province"+Record_Id+"[]'/>");
			$("#PopupWrap").hide();
		}else if($(e.target).attr("class")=="checkAllBtn"){
			$("#popupCitys input[type='checkbox']").each(function(){
				$(this).attr("checked","checked");												  
			})
		}else if($(e.target).attr("class")=="checkNoBtn"){
			$("#popupCitys input[type='checkbox']").each(function(){
				$(this).attr("checked","");												  
			})			
		}else{
			$("#PopupWrap").hide();
		}			
		return false;
	})
	
}