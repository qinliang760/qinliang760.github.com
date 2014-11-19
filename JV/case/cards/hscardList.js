/*!
 * Base On jQuery JavaScript Library v1.7.2
 * http://jquery.com/
 * Libs:Robinson hscardList.JS
 * Copyright 2013, Robinson Lin
 * Dual licensed under the MIT or GPL Version 1 licenses.
 * http://jquery.org/license
 *
 * Date: 2014.2.21
 * exp:JS: jq('.card_list').getHscard(); html:<div class="card_list" data-cardId="1005"></div>
 */
var jq = jQuery.noConflict();
(function(jq) {
	var hscardList = {
		defaults: {
			num:0,
			ajax_url:"http://www.hearthstone.com.cn/deck/",
			cardTool_url:"http://www.hearthstone.com.cn/cards/builder/",
			clazz:{
				'druid':'德鲁伊',
				'hunter':'猎人',
				'mage':'法师',
				'paladin':'圣骑士',
				'priest':'牧师',
				'rogue':'潜行者',
				'shaman':'萨满',
				'warlock':'术士',
				'warrior':'战士',
				'neutral':'中立'
			}
			/*url:function(This){
				var id = This.attr('data-cardId');
				url="/deck/"+id;
				return url;
			},*/
		},	
		showCardList:function (cont,This,pro,id,deckName){
			//var cont = "565:2;564:2;722:2;561:2;559:2;591:2;8:2;6:2;573:2;660:2;596:2;639:2;22:2;21:2;27:1;25:1";
			This.html('');
			This.append('<p class="card_ListTitle">'+'职业：'+hscardList.defaults.clazz[pro]+'</p>'+'<p class="card_ListTitle">套牌名称：'+deckName+'</p>')
			var cont_arr = cont.split(';');
			//console.log(cont_arr)
			//显示的json
			var show_json = {}
			var json = {}
			
			for (var i=0;i<cont_arr.length;i++){
				var key = cont_arr[i].split(':');
				json[key[0]]=key[1];
			}
			//console.log(json)
			for( var x in json){
				var card_num = json[x];
				var card_dtl = hs_cards_name[pro][x];
				if(!card_dtl){
					card_dtl = hs_cards_name['neutral'][x];
				}
				var this_name = card_dtl.cnName;
				var cost_num = card_dtl.cost;
				if(show_json[cost_num]){
					//金卡和普卡重复问题
					if(parseInt(show_json[cost_num][this_name])==1){
						show_json[cost_num][this_name]=2;
					}else{
						show_json[cost_num][this_name]=card_num;
					}
				}else{
					show_json[cost_num]={};
					show_json[cost_num][this_name]=card_num;
				}
			}
			//console.log(show_json);
			//大于7费用变量声明
			var html_gao= '',title_gao = '';
			for (var i in show_json){
				if(i<7){
					var html = '';
					for (var y in show_json[i]){
						html+='<i class="cardsList_n">'+'<span class="dbTooptip">'+y+'</span>'+' * '+show_json[i][y]+'</i>';
					}
					//var title='<span class="t_cardList">'+i+'费卡牌：</span>';
					var title = '<div class="hs_crystal fei'+i+'"></div>'
					This.append('<div>'+title+'<p>'+html+'</p>'+'</div>')
				}else{
					//大约7费用合并
					for (var y in show_json[i]){
						html_gao+='<i class="cardsList_n">'+'<span class="dbTooptip">'+y+'</span>'+' * '+show_json[i][y]+'</i>';
					}
					//var title='<span class="t_cardList">'+i+'费卡牌：</span>';
					title_gao= '<div class="hs_crystal fei7"></div>';				
				}			
			}
			if(html_gao!=''){
				This.append('<div>'+title_gao+'<p>'+html_gao+'</p>'+'</div>');
			}
			//了解牌组详情
			This.append('<p class="tR"><a href="'+hscardList.defaults.cardTool_url+id+'" target="_blank" class="show_cardList">了解牌组详情</a></p>');
		},
		getData:function(This,id,obj){
			jq.ajax({
				url:hscardList.defaults.ajax_url+id,
				data: 'brief',
				async: false,
				jsonp:"callback",
        		jsonpCallback:"crossDomain",
				dataType:"jsonp",  
				type:"GET",
				timestamp:"true",
				success:function(v){
					var d = v.content;
					var c = v.clazz;
					var deckName = v.deckName;
					//判断卡组是否存在
					if(d&&c){
						hscardList.showCardList(d,This,c,id,deckName);
					}else{
						This.html('牌组ID错误，请前往'+'<a href="http://www.hearthstone.com.cn/cards/builder/" target="_blank">卡牌工具</a>'+'查询。')
					}
					hscardList.defaults.num++;
					hscardList.getCont(obj);
				},
				error:function(v){
					This.remove();
					hscardList.defaults.num++;
					hscardList.getCont(obj);
				}
			})
		},
		getCont:function(obj){
			var index_n = hscardList.defaults.num;
			var obj_len = obj.length;
			if(index_n>=obj_len){
				//样式渲染
				jq(".dbTooptip").cardsTooltip();
				return;
			}
			var This = obj.eq(index_n);
			var id = This.attr('data-cardId');
			if(parseInt(id)){
				hscardList.getData(This,id,obj);
			}else{
				This.html('输入内容有误！')
				hscardList.defaults.num++;
				hscardList.getCont(obj);
			}
		},
		init:function(){
			//配置标题样式
			//jq(".t_cardList").css('color','green');
		}
	};
	
	
	
	jq.fn.showHscard = function(cont) {
		//defaults = jq.extend({},hscardList.defaults, defaults);
		return new hscardList.showCardList(cont, jq(this));
	}
	jq.fn.getHscard = function(defaults) {
		//defaults = jq.extend({},hscardList.defaults, defaults);
		// return this.each(function() {
		// 	el = new hscardList.getCont(jq(this));
		// })
		return	new hscardList.getCont(jq(this));
	}
	
	
})(jq);
