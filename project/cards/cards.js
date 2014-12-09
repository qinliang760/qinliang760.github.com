var cardsData={
	"cardRarity":{
		"legendary":"传说",
		"epic":"史诗",
		"rare":"稀有",
		"common":"普通",
		"free":"基本"
	},
	"cardClass":{
		"neutral":"中立",
		"druid":"德鲁伊",
		"hunter":"猎人",
		"mage":"法师",
		"paladin":"圣骑士",
		"priest":"牧师",
		"rogue":"潜行者",
		"shaman":"萨满",
		"warlock":"术士",
		"warrior":"战士"			
	},
	"cardType":{
		"minion":"随从",
		"spell":"法术",
		"weapon":"武器"		
	},
	"cardRace":{
		"murloc":"鱼人",
		"demon":"恶魔",
		"beast":"野兽",
		"dragon":"龙",
		"pirate":"海盗",
		"mech": "机械"
	},
	"cardSet":{
		"basic":"基本级",
		"expert":"专家级",
		"missions":"奖励",
		"reward":"纪念",
		"naxx":"纳克萨玛斯",
		"gvg": "地精大战侏儒"
	},
	"cardEffect":{
		"battlecry":"战吼",
		"combo":"连击",
		"divine_shield":"圣盾",
		"overload":"过载",
		"silence":"沉默",
		"taunt":"嘲讽",
		"spell_damage":"法术伤害",
		"charge":"冲锋",
		"death_rattle":"亡语",
		"enrage":"激怒",
		"secret":"奥秘",
		"stealth":"潜行",
		"windfury":"风怒",
		"choice":"抉择"					
	}					

}





var Cards={
	init:function () {		
		this.getCardsInit();	//卡牌初始化
		this.filter.init();		//筛先初始化
		this.setSearch();		//搜索
		this.tabsHandle();		//标签
		this.setPagerHandle();	//翻页
		this.goldenHandle();	//金卡
		this.cardsHandle();		//卡牌点击
		//this.flashInit();		//flash初始化
		//this.setGuide();
		CardsBuilder.init();
		
	},
	flashInit:function(){
		if(Common.isIOS()){
			$("#flash_coming h3").show();
			$("#flash_coming .tag_coming").css("display","block");
		}else{
			Common.addFlash("http://hearthstone.nos.netease.com/3/cards/coming.swf","flash_coming",250,500);			
		}
	},
	filter:{
		init:function(){
			this.setSelect();
			this.setRarity();
		},
		setSelect:function(){
			var area=$("#cards_filter"),
				typeArea=$(".type",area),
				select=$(".type_select li",area),
				link=$("#cards_filter li > a[rel]");

			typeArea.click(function(e){
				$(this).find(".type_select").toggle();
			})
			typeArea.mouseleave(function() {
				$(this).find(".type_select").hide();
			});	
			select.click(function(e){
				var type=$(this).attr("rel");
				$(".cards_option[rel="+type+"]",area).show().siblings().hide();
				$(".type_select",area).hide();
				Cards.setTypeInit();
				return false;
			})
			select.hover(function(){
				$(this).addClass("active");
			},function(){
				$(this).removeClass("active");
			})

			link.click(function(){
				var t=$(this),
					rel=t.attr("rel");


				if(t.find("span[class$=_active]").length){
					return;
				}	
				Cards.setTabsInit();
				var tClass=(rel=="")?t.children().eq(0).attr("class"):t.attr("class");
					
				var lastIndex=tClass.lastIndexOf("_"),
					type=tClass.substring(lastIndex+1),					
					params=Cards.getCurrentParams;

				if(typeof params=="undefined"){
					var params={};
				}				

				switch(type){
					case "cost":
						params.cost=rel;
						delete params.attack;
						delete params.health;
						break;
					case "atk":
						params.attack=rel;
						delete params.cost;
						delete params.health;
						break;
					case "hp":
						params.health=rel;
						delete params.attack;
						delete params.cost;
						break;

				}

				//params.cardClass="";
				params.cardClass=Cards.getCurrentTab();
				var rarity=Cards.getCurrentRarity();
				params.cardRarity=rarity;

				Cards.isGolden()?params.golden=1:params.golden=0;			
				Cards.getCardsData(params);
				var activeHtml='<span class="type_icon type_'+type+'_active"></span>';
				$(".type_"+type+"_active",area).remove();
				t.append(activeHtml);
				return false;
			})

			
		},
		setRarity:function(){
			var rarity=$("#cards_rarity"),
				rarityList=$("li[rel]",rarity),
				rarityType=$(".rarity_type",rarity),
				rarityActive=$("li[rel].active",rarity);

			rarityList.click(function(){
				var t=$(this),
					rel=t.attr("rel"),
					params=Cards.getCurrentParams;

				if(typeof params=="undefined"){
					var params={};
				}

				if(t.hasClass("active")){
					t.siblings().toggle();
					return;					
				}
				Cards.setTabsInit();
				t.addClass('active').siblings().removeClass('active');

				if(rel==""){
					if(t.parent().find("li:visible").length==1){
						t.siblings().toggle();
						return;
					}

				}else{
					t.siblings().toggle();
				}				
					



/*				if(rel==""){
					if(Cards.getSearchParams){
						params.cardRarity=Cards.getSearchParams;
					}else{
						params.cardRarity="";
					}
				}else{
					if(Cards.getSearchParams && Cards.getSearchParams.indexOf(rel)==-1){
						Cards.setNull();
						return;
					}else{
						params.cardRarity=rel;	
					}

				}*/

				params.cardRarity=t.attr("rel");
				var type=Cards.getCurrentType();
				params[type[0]]=type[1];
				//params.cardClass="";
				params.cardClass=Cards.getCurrentTab();


				Cards.isGolden()?params.golden=1:params.golden=0;
				Cards.getCardsData(params);
				return false;
			})
		}
	},
	isObjectNull:function(obj){
		var k=0;
		for(var i in obj){
		    k++;
		}
		if(k == 0){
		    return true;
		}
		return false;
	},	
	getCardsInit: function() {
		
		var tabs=$(".tabs_hero"),tabsList=$("li",tabs);
		$(".tab_tag",tabs).remove();
		$(".cards_null").remove();
		tabsList.show();
		$("li[rel='druid']").addClass("active").siblings().removeClass("active");	

		tabsList.each(function(k,v){
			$(v).data("hasLook",1);
		})		
		var params = {
			cardClass:"druid",
			golden:0,
			t: new Date().getTime()
		};
		//$("#cards_box").append('<img class="imgload" src="http://hearthstone.nos.netease.com/3/cards/cards_loading.gif"/>');
		var data={"cards":[{"artist":"Richard Wright","background":"“把月火术拖到每一个技能栏位上。”——《如何成为一名德鲁伊》，第五章，第三节","cardClass":"druid","cardEffect":"","cardRarity":"free","cardSet":"basic","cardType":"spell","code":"Moonfire","cost":0,"description":"造成1点伤害。","golden":0,"id":564,"imageUrl":"http://hearthstone.nos.netease.com/1/cards/druid/Moonfire.png","name":"月火术"},{"artist":"Doug Alexander","background":"有些德鲁伊做梦的时候都会被陌生人的“给我个激活！”的喊叫声惊醒。","cardClass":"druid","cardEffect":"","cardRarity":"free","cardSet":"basic","cardType":"spell","code":"Innervate","cost":0,"description":"仅在本回合中，获得2个法力水晶。","golden":0,"id":565,"imageUrl":"http://hearthstone.nos.netease.com/1/cards/druid/Innervate.png","name":"激活"},{"artist":"Dany Orizio","background":"是去是留，谁去谁留，都由爪子决定。","cardClass":"druid","cardEffect":"","cardRarity":"free","cardSet":"basic","cardType":"spell","code":"Claw","cost":1,"description":"使你的英雄获得2点护甲值，并在本回合中获得+2攻击力。","golden":0,"id":590,"imageUrl":"http://hearthstone.nos.netease.com/1/cards/druid/Claw.png","name":"爪击"},{"artist":"Leo Che","background":"他们为什么要咆哮？没人能够确切地作出解释。也许是出于对当前状态下体型的不满？也许并非如此。","cardClass":"druid","cardEffect":"","cardRarity":"common","cardSet":"expert","cardType":"spell","code":"Naturalize","consume":40,"cost":1,"description":"消灭一个随从，你的对手抽两张牌。","gain":5,"golden":0,"id":2,"imageUrl":"http://hearthstone.nos.netease.com/1/cards/druid/Naturalize.png","name":"自然平衡"},{"artist":"Dave Rapoza","background":"确实有些德鲁伊野性十足，但仍有些喜欢在恬静的时刻品上一壶好茶。","cardClass":"druid","cardEffect":"","cardRarity":"rare","cardSet":"expert","cardType":"spell","code":"Savagery","consume":100,"cost":1,"description":"对一个随从造成等同于你的英雄攻击力的伤害。","gain":20,"golden":0,"id":5,"imageUrl":"http://hearthstone.nos.netease.com/1/cards/druid/Savagery.png","name":"野蛮之击"},{"artist":"Raymond Swanland","background":"棘齿城酒馆里的人们纷纷表示，这张牌太强了，应该是传说级别的。","cardClass":"druid","cardEffect":"choice","cardRarity":"common","cardSet":"expert","cardType":"spell","code":"Wrath","consume":40,"cost":2,"description":"抉择：对一个随从造成3点伤害；或者造成1点伤害并抽一张牌。","gain":5,"golden":0,"id":6,"imageUrl":"http://hearthstone.nos.netease.com/1/cards/druid/Wrath.png","name":"愤怒"},{"artist":"Steve Tappin","background":"在灰谷的树林中，猎豹的毛皮漆黑油亮，数量众多。那为什么这地方要叫灰谷，而不是黑谷呢？","cardClass":"druid","cardEffect":"choice","cardRarity":"common","cardSet":"expert","cardType":"spell","code":"Power of the Wild","consume":40,"cost":2,"description":"抉择：使你的随从获得+1/+1；或者召唤一个3/2的猎豹。","gain":5,"golden":0,"id":8,"imageUrl":"http://hearthstone.nos.netease.com/1/cards/druid/Power+of+the+Wild.png","name":"野性之力"},{"artist":"Brad Vancata","background":"这种爪子形状的印记如果纹在身上，人们一定知道你是德鲁伊玩家。","cardClass":"druid","cardEffect":"taunt","cardRarity":"free","cardSet":"basic","cardType":"spell","code":"Mark of the Wild","cost":2,"description":"使一个随从获得嘲讽和+2/+2。（+2攻击力/+2生命值）","golden":0,"id":591,"imageUrl":"http://hearthstone.nos.netease.com/1/cards/druid/Mark+of+the+Wild.png","name":"野性印记"}],"curPage":1,"pageSize":8,"total":25,"totalPage":4};	
/*		$.post(
          "/cards/query",
          params,
          function(data) {*/
          	var pager={
          		curPage:data.curPage,	//当前页
          		pageSize:data.pageSize,	//每页卡牌总数
          		total:data.total,	//当前分类卡牌数
          		totalPage:data.totalPage	//总页数
          	};
          	var cards=data.cards;
          	Cards.setCards(cards);
          	Cards.setCardClass("druid");
          	Cards.setPager(pager,"druid");

/*          },
          "json"
        );*/
	},
/*	getBuildData:function(params,trigger){
		if(Cards.getIng){
			return;
		}
		Cards.getIng=true;
		if(typeof params=="undefined"){
			var params={};
		}

		params.t=new Date().getTime();
		params.token=Common.getToken();

		if(!trigger){
			params.p=1;
		}


		
		$("#cards_box").append('<img class="imgload" src="http://hearthstone.nos.netease.com/3/cards/cards_loading.gif"/>');

	        $.post(
	          "/cards/query",
	          params,
	          function(data) {
	          	Cards.getIng=false;
	          	$("#cards_box > .imgload").remove();

	          	var pager={
	          		curPage:data.curPage,	//当前页
	          		pageSize:data.pageSize,	//每页卡牌总数
	          		total:data.total,	//当前分类卡牌数
	          		totalPage:data.totalPage	//总页数
	          	};
	          	var cards=data.cards,
	          		curCardClass=data.curCardClass,
	          		totalPerClass=data.totalPerClass;

	          	if(CardsBuilder.isStart && cards.length){	//如果处于组牌阶段
	          		if(params.cardClass!=curCardClass){
	          			if(params.cardClass!="neutral"){
							var params2=Cards.getCurrentParams;

							if(typeof params2=="undefined"){
								var params2={};
							}
							params2.cardClass="neutral";	          			
							var type=Cards.getCurrentType();
							params2[type[0]]=type[1];
							var rarity=Cards.getCurrentRarity();
							params2.cardRarity=rarity;

							Cards.isGolden()?params2.golden=1:params2.golden=0;

							Cards.getCardsData(params2);	          				
	          			}else{
							Cards.setNull();
							return;	          				
	          			}
	          			
		          		
	          		}

	          	}	
	          		
	          	if((!cards.length) && Cards.isObjectNull(totalPerClass)){
	          		Cards.setNull();
	          		return;
	          	}else{
	          		$(".cards_null").remove();
	          	}

	          	Cards.setCards(cards,trigger);
	          	Cards.setTabs(curCardClass,totalPerClass);
	          	Cards.setCardClass(curCardClass);
	          	Cards.setPager(pager,curCardClass);	
	          },
	          "json"
	        );
	},*/
	getCardsData:function(params,trigger){	//trigger pager click

		if(Cards.getIng){
			return;
		}
		Cards.getIng=true;
		if(typeof params=="undefined"){
			var params={};
		}

		params.t=new Date().getTime();
		params.token=Common.getToken();

		if(!trigger){
			params.p=1;
		}


		
		$("#cards_box").append('<img class="imgload" src="http://hearthstone.nos.netease.com/3/cards/cards_loading.gif"/>');

	        $.post(
	          "/cards/query",
	          params,
	          function(data) {
	          	Cards.getIng=false;
	          	$("#cards_box > .imgload").remove();

	          	var pager={
	          		curPage:data.curPage,	//当前页
	          		pageSize:data.pageSize,	//每页卡牌总数
	          		total:data.total,	//当前分类卡牌数
	          		totalPage:data.totalPage	//总页数
	          	};
	          	var cards=data.cards,
	          		curCardClass=data.curCardClass,
	          		totalPerClass=data.totalPerClass;

	          	if(CardsBuilder.isStart && cards.length){	//如果处于组牌阶段
	          		if(params.cardClass!=curCardClass){
	          			if(params.cardClass!="neutral"){
							var params2=Cards.getCurrentParams;

							if(typeof params2=="undefined"){
								var params2={};
							}
							params2.cardClass="neutral";	          			
							var type=Cards.getCurrentType();
							params2[type[0]]=type[1];
							var rarity=Cards.getCurrentRarity();
							params2.cardRarity=rarity;

							Cards.isGolden()?params2.golden=1:params2.golden=0;

							Cards.getCardsData(params2);	          				
	          			}else{
							Cards.setNull();
							return;	          				
	          			}
	          			
/*		          		*/
	          		}

	          	}	
	          		
	          	if((!cards.length) && Cards.isObjectNull(totalPerClass)){
	          		Cards.setNull();
	          		return;
	          	}else{
	          		$(".cards_null").remove();
	          	}

	          	Cards.setCards(cards,trigger);
	          	Cards.setTabs(curCardClass,totalPerClass);
	          	Cards.setCardClass(curCardClass);
	          	Cards.setPager(pager,curCardClass);	
	          },
	          "json"
	        );


	},
	setPager:function(pager){
		var pageTag=$("#cards_page strong"),
			pageNext=$(".cards_next"),
			pagePrev=$(".cards_prev");

		pageTag.text(pager.curPage).attr("data-total",pager.totalPage);

		this.setPagerArrow(pager.curPage,pager.totalPage);		

	},
	setPagerHandle:function(){
		var pageTag=$("#cards_page strong"),
			pagePrev=$(".cards_prev"),
			pageNext=$(".cards_next");

		Cards.animated=false;

		pagePrev.click(function(){
			if(Cards.animated){
				return;
			}			
			var curPage=parseInt(pageTag.text()),
				totalPage=parseInt(pageTag.attr("data-total"));

				
			if(curPage==1){
				return false;
			}
			curPage--;
			pageTag.text(curPage);

			Cards.setPagerArrow(curPage,totalPage);
			Cards.setPagerScroll("prev");

/*			var params = Cards.getCurrentParams;

			if (typeof params == "undefined") {
				var params = {};
			}
			params.cardClass = Cards.getCurrentTab();
			params.p = curPage-1;

			var type = Cards.getCurrentType();
			params[type[0]] = type[1];
			var rarity = Cards.getCurrentRarity();
			params.cardRarity = rarity;

			Cards.isGolden() ? params.golden = 1 : params.golden = 0;

			Cards.getCardsData(params, "prev");*/
			return false;

		})
		pageNext.click(function(){

			if(Cards.animated){
				return;
			}
			
			var curPage=parseInt(pageTag.text()),
				totalPage=parseInt(pageTag.attr("data-total")),
				pageWrap=$("#cards_box .cards_box_wraper");

			if(curPage==totalPage){
				return false;
			}

			if(curPage<pageWrap.length){
				curPage++;
				pageTag.text(curPage);				
				Cards.setPagerScroll("next");
				Cards.setPagerArrow(curPage,totalPage);
				return false;
			}

			var params = Cards.getCurrentParams;

			if (typeof params == "undefined") {
				var params = {};
			}
			params.cardClass = Cards.getCurrentTab();
			params.p = curPage + 1;

			var type = Cards.getCurrentType();
			params[type[0]] = type[1];
			var rarity = Cards.getCurrentRarity();
			params.cardRarity = rarity;

			Cards.isGolden() ? params.golden = 1 : params.golden = 0;

			Cards.setPagerArrow(params.p,totalPage);			
			Cards.getCardsData(params,"next");
			return false;

		})
	},
	setPagerScroll:function(trigger){
		var cardsBox=$("#cards_box"),
			cardsBorder=$(".cards_box_border",cardsBox),
			currentScroll=parseInt(cardsBorder.css("left"));
			Cards.animated=true;
			if(trigger=="next"){
				var scrollPx=currentScroll+(-762);
			    cardsBorder.animate({"left":scrollPx+"px"}, 800,function(){
			    	Cards.animated=false;
	          	})					
			}else{
				var scrollPx=currentScroll+(762);
			    cardsBorder.animate({"left":scrollPx+"px"}, 800,function(){
			    	Cards.animated=false;
	          	})	
			}	

	},
	setPagerArrow:function(c,t){
		var pagePrev=$(".cards_prev"),
			pageNext=$(".cards_next");

		if(t==0){
			pageNext.hide();
			pagePrev.hide();
			pageTag.text(0);
		}else{
			if(c==1 && t>1){
				pagePrev.hide();
				pageNext.show();
			}else if(c==t && t==1){
				pagePrev.hide();
				pageNext.hide();
			}else if(c>1 && c<t){
				pagePrev.show();
				pageNext.show();
			}else{
				pagePrev.show();
				pageNext.hide();
			}			
		}



	},
	setCardClass:function(hero){
		var heroWrap=$("#cards_data h3"),
			hero=this.getName(hero,"cardClass");

		heroWrap.text(hero);
	},
	setTabs:function(current,total){
		if(typeof current=="undefined" || typeof total=="undefined"){
			return;
		}
//debugger;
		var tabs=$(".tabs_hero"),tabsList=$("li",tabs);
		if(CardsBuilder.isStart && $("#cards_group:visible").length){
			var n=0,m=0;	//n currentClass m neutral
			//debugger;
			tabsList.hide();

			//if(current=="neutral"){
				var cls=CardsBuilder.getGroupCls();
			for(var i in total){
				if(i==cls){
					n=1;
				}
				if(i=="neutral"){
					m=1;
				}				
			}		
			if(n==1){
				$("li[rel="+cls+"]",tabs).show();
			}else{
				$("li[rel="+cls+"]",tabs).hide();
			}	
			if(m==1){
				$("li[rel='neutral']",tabs).show();
			}else{
				$("li[rel='neutral']",tabs).hide();
			}				
				
				//$("li[rel='neutral']",tabs).show();
				//$("li[rel="+current+"]",tabs).show();
				//$("li[rel="+current+"]",tabs).addClass("active").siblings().removeClass("active");
			//}else{
				$("li[rel="+current+"]",tabs).addClass("active").siblings().removeClass("active");
				//$("li[rel='neutral']",tabs).show();				
			//}
			return;
		}

		$("li[rel="+current+"]").addClass("active").siblings().removeClass("active");
		tabsList.hide();

		for(var i in total){
			var showTabs=$("li[rel="+i+"]");
			showTabs.show();
			if(!showTabs.data("hasLook")){
				showTabs.append('<span class="tab_tag">'+total[i]+'</span>');
			}
			
		}	

	},
	setTabsInit:function(){
		var tabs=$(".tabs_hero"),tabsList=$("li",tabs);
		tabsList.each(function(k,v){
			$(v).data("hasLook",0);
		})
	},
	setTypeInit:function(){
		var filter=$("#cards_filter .cards_option:visible"),
			active=$("span[class$='_active']",filter);

		active.remove();
	},
	setParamsInit:function(){
		this.setTypeInit();
		$("#cards_rarity .rarity_type").show().siblings().removeClass("active").hide();
		$(".goldenCheck span").removeClass('active');
	},
	setNull:function(){
		var cards=$("#cards_data"),
			tabs=$(".tabs_hero li",cards),
			cardClass=$("h3",cards),
			pageNum=$("#cards_page strong"),
			pageNext=$(".cards_next"),
			pagePrev=$(".cards_prev"),			
			nullHtml='<p class="cards_null">没有查询结果</p>';
		tabs.hide();
		cardClass.html("&nbsp;");
		cards.append(nullHtml);
		pageNext.hide();
		pagePrev.hide();sxslklsdl
		pageNum.text(0);
		$(".cards_box_wraper").html("");		
	},
	getCurrentTab:function(){
		var tabs=$(".tabs_hero"),
			cur=$("li.active",tabs).attr("rel");
		return cur;
	},
	getCurrentRarity:function(){
		//var searchRarity=Cards.getSearchParams;

		var rarity=$("#cards_rarity"),
			cur=$("li.active",rarity).attr("rel");

		/*if(searchRarity && cur==""){
			var c=searchRarity;
			return c;
		}*/			
		return cur;
	},	
	getCurrentType:function(){
		var filter=$("#cards_filter .cards_option:visible"),
			active=$("span[class$='_active']",filter);
			
		if(!active.length){
			return [];
		}
		var cur=active.parent(),
			rel = cur.attr("rel");

		var tClass = (rel == "") ? cur.children().eq(0).attr("class") : cur.attr("class");

		var lastIndex = tClass.lastIndexOf("_"),
			type = tClass.substring(lastIndex + 1);

				switch(type){
					case "cost":
						type="cost";
						break;
					case "atk":
						type="attack";
						break;
					case "hp":
						type="health";
						break;

				}


		return [type,rel];

	},
	isGolden:function(){
		var golden=$(".goldenCheck"),
			check=golden.find("span").attr("class");

		if(check=="active"){
			return true;
		}
		return false;
	},
	goldenHandle:function(){
		var golden=$(".goldenCheck");

		golden.click(function(){
			var t=$(this);
			t.find("span").toggleClass('active');
			Cards.setTabsInit();

				var params=Cards.getCurrentParams;

				if(typeof params=="undefined"){
					var params={};
				}

				var type=Cards.getCurrentType();
				params[type[0]]=type[1];
				var rarity=Cards.getCurrentRarity();
				params.cardRarity=rarity;
				//params.cardClass="";	//show current class
				params.cardClass=Cards.getCurrentTab();

				Cards.isGolden()?params.golden=1:params.golden=0;
				Cards.getCardsData(params);
				return false;			
		})
	},	
	tabsHandle:function(){
		var tabs=$(".tabs_hero"),tabsList=$("li",tabs);
		tabsList.click(function(){
			var t=$(this),
				cardClass=t.attr("rel");
			t.find(".tab_tag").remove();
			t.data("hasLook",1);
			if(t.hasClass('active')){
				return false;
			}
			var params = Cards.getCurrentParams;

			if (typeof params == "undefined") {
				var params = {};
			}

			params.cardClass = cardClass;

			var type = Cards.getCurrentType();
			params[type[0]] = type[1];
			var rarity=Cards.getCurrentRarity();
			params.cardRarity=rarity;			
			t.addClass('active').siblings().removeClass("active");			
			Cards.isGolden()?params.golden=1:params.golden=0;

			Cards.getCardsData(params);
			Cards.setCardClass(cardClass);
		})
	},
	setCards:function(data,trigger){
		/*params:
          		artist	//画师
          		background	//卡牌背景故事
          		cardClass//卡牌分类
          		cardEffect	//空格分隔的卡牌效果字符串：战吼，冲锋，亡语等等
          		cardRarity	//稀有度：基本，普通，稀有，史诗，传说
          		cardSet	//卡牌所属套牌：专家级，基础级等等
          		cardType	//卡牌类型
          		code	//卡牌英文名称
          		cost	//法力消耗
          		createTime
          		description	//卡牌描述
          		golden	//金卡
          		id
          		imageUrl	//卡牌图片地址
          		name	//卡牌名称
          		status
          		updateTime
		*/
		var json={},cardsBox=$("#cards_box");
		json.cards=data;

		//<span class="icon_hero icon_hero_${item.cardClass}"></span>	//small pic
		var cardsHtml = [
			'{@each cards as item}',
			'<div class="cards_place">',
			'<a class="cards_link" data-id="${item.id}" data-params="${item.cardClass},${item.code},${item.id},${item.cost},${item.golden}" href="javascript:void(0);" rel="${item.imageUrl}"><img class="imgload" src="http://hearthstone.nos.netease.com/3/cards/cards_loading.gif"/><img class="card_img" alt="${item.name}" src="${item.imageUrl}"/></a>',

				'<div class="cards_detail_wraper">',
				'<div class="cards_detail">',
					'<p class="detail_top">${item.name}</p>',
					'<div class="detail_con">',
						'<ul>',
							'<li class="detail_skill">${item.description}</li>',
							'<li>卡牌类型：${item.cardType|formatToC,"cardType"}</li>',
							'<li>职业：${item.cardClass|formatToC,"cardClass"}</li>',
							'{@if item.cardRace && item.cardRace!="other"}',
							'<li>种族：${item.cardRace|formatToC,"cardRace"}</li>',
							'{@/if}',
							'{@if item.gain}',							
							'<li>分解获得：${item.gain}<span class="icon_stive icon_gain"></span></li>',
							'<li>合成需要：${item.consume}<span class="icon_stive icon_consume"></span></li>',
							'{@/if}',
						'</ul>',
						'<p class="border_db"></p>',
						'<p class="detail_bg">${item.background}</p>',
						'<p class="border_db"></p>',
					'</div>',
					'<div class="detail_bottom">',
						'<p class="rarity_txt">${item.cardSet|formatToC,"cardSet"}</p>',
						'<p class="rarity_con">${item.cardRarity|formatToC,"cardRarity"}<span class="detail_rarity_icon rarity_${item.cardRarity}"></span></p>',
						'<p class="rarity_artist">画家：${item.artist}</p>',
					'</div>',
				'</div>',
				'</div>',
				'<a class="cards_zoom" rel="${item.imageUrl}" href="javascript:void(0);" {@if item.cardType =="spell"}style="bottom:0;"{@/if}></a>',
			'</div>',
			'{@/each}'
		].join('');


		juicer.register('formatToC', Cards.getName);
		var result=juicer(cardsHtml, json);
		//var result=juicer(cardsHtml, json);						

		if(typeof trigger=="undefined"){//trigger pager click
			$(".cards_box_border",cardsBox).html('<div class="cards_box_wraper clearFix">'+result+"</div>").css("left",0);
		}else if(trigger=="prev"){
			Cards.setPagerScroll(trigger);			
		}else{
			
			var pageTag=$("#cards_page strong"),
				curPage=parseInt(pageTag.text()),
				curWraper=$(".cards_box_wraper",cardsBox).length;
			if(curPage<curWraper){//if has load data
				Cards.setPagerScroll(trigger);
			}else{
				Cards.setPagerScroll(trigger);
				$(".cards_box_border",cardsBox).append('<div class="cards_box_wraper clearFix">'+result+"</div>");
			}
		    			
		}

		$(".cards_place img.card_img", cardsBox).imgpreload({
			each:function(){
				//var imgurl=$(this).attr("data-imgurl");
				$(this).show().prev().hide();
			}
		});

		//this.cardsHandle();
		
	},
	cardsHandle:function(){
		var cardList=$("#cards_box .cards_place"),
			cardLink=$(".cards_link",cardList),
			zoom=$(".cards_zoom",cardList);
/*		cardList.mouseenter(function(e){
			//clearTimeout(timer);
			var t=$(this);
			var details=t.find(".cards_detail_wraper").html();
			t.find(".cards_zoom").show();
			//Cards.setTooltip(325,details,e);
		})
		cardList.mouseleave(function(e){
			var t=$(this);
			t.find(".cards_zoom").hide();
			
		})*/

		cardLink.live("click",function() {
			var detail=$(this).next().html(),
				imgUrl=$(this).attr("rel"),
				bigImgUrl="http://hearthstone.nos.netease.com/1/l-cards/"+imgUrl.split("http://hearthstone.nos.netease.com/1/")[1],
				imgHtml='<p class="cards_big"><img class="imgload" src="http://hearthstone.nos.netease.com/3/cards/cards_loading.gif"/><img class="big_img" width="300" src="'+bigImgUrl+'" alt=""/></p>',
				closeHtml='<a class="cards_big_close" href="javascript:void(0);"><span class="btn_fork"></span>关闭</a>',
				html='<div class="cards_big_box clearFix">'+imgHtml+detail+'</div>'+closeHtml;

			//var closeHtml='<a class="cards_big_close" href="javascript:void(0);"><span class="btn_fork"></span>关闭</a>';	
			//$("body").append(closeHtml);
			//$(".cards_big_close").show();

			if(CardsBuilder.isStart){
				var paramsArr=$(this).attr("data-params").split(","),
					params={
						cls:paramsArr[0],
						name:paramsArr[1],
						id:paramsArr[2],
						cost:paramsArr[3],
						golden:paramsArr[4]
					};
					
				CardsBuilder.addCards(params);
			}else{
				$.sc2.lightBox(html,{model:true,hasClose:false});
				$(".cards_big img.big_img").imgpreload(function(){
					$(this).show().prev().hide();
				});					
			}
	


		});

		$(".cards_big_close").live("click",function(){
			//$(this).remove();
			$("#popBox").remove();
			$("#boxModel").remove();
		})

/*		$("#titleTip").live("mouseenter",function(){
			clearTimeout(timer);
		})
		$("#titleTip").live("mouseleave",function(){
			timer=setTimeout(function(){
				$("#titleTip").remove();
			},500);
		})*/		
	},
	setTooltip: function(w, con, e) {
		if($("#titleTip").length){
			$("#titleTip").remove();
		}		
		var tooltip = "<div id='titleTip' style='width:" + w + "px'>" + con + "</div>";
		$("body").append(tooltip);
		var ex = e.pageX,
			ey = e.pageY,
			tooltipW = $("#titleTip").width(),
			tooltipH = $("#titleTip").height(),
			wW = $(window).width(),
			wH = $(window).height()+$(window).scrollTop(),
			leftV,
			topV;
		if (ex + tooltipW > wW) {
			leftV = ex - (ex + tooltipW - wW) - tooltipW;
		} else {
			leftV = ex;
		}
		if (ey + tooltipH > wH) {
			topV = ey - (ey + tooltipH - wH);
		} else {
			topV = ey;
		}

		$("#titleTip").css({
			"top": topV + "px",
			"left": leftV +20+ "px"
		}).show("fast").stop(true, true);
	},
	getName:function(data,type){
		return cardsData[type][data];
	},
	setSearch:function(){


		var search=$("#cards_search > .cards_btn"),
			searchBox=$("#cards_search > .search_box"),
			searchTab=$(".search_tab a",searchBox),
			searchBtn=$(".search_btn .cards_btn",searchBox),
			searchClear=$(".search_btn .cards_btn_clear",searchBox),
			searchReset=$(".cards_reset",$("#cards_search")),
			close=$(".btn_close",searchBox);
				
		search.click(function(){
			//searchBox.show();
			searchBox.fadeIn("fast");
		})
		searchReset.click(function(){
			if(CardsBuilder.isStart){
				CardsBuilder.getClsInit();
				return;
			}
			var checked=$(".exact_search .checkboxInput .checked"),
				keywords=$(".dim_search input"),
				selectTag=$(".cards_select_tag");

			checked.removeClass('checked');
			keywords.val("");
			selectTag.hide();
			Cards.setParamsInit();	
			Cards.getCardsInit();
			Cards.getCurrentParams=undefined;
		})
		searchTab.click(function(){
			var rel=$(this).attr("rel");
			$(this).addClass('active').siblings().removeClass('active');
			if(rel=="exact_search"){
				$(".exact_search",searchBox).show();
				$(".dim_search",searchBox).hide();
			}else{
				$(".exact_search",searchBox).hide();
				$(".dim_search",searchBox).show();
			}
			
		})

		close.click(function(event){
			event.stopPropagation()
			searchBox.hide();
			return false;
		})

		searchBtn.click(function(){
			var currentS=$(".search_tab a.active",searchBox).attr("rel"),
				selectTag=$(".cards_select_tag");

				Cards.setTabsInit();

			if(currentS=="exact_search"){
				var exact_search=$(".exact_search .checkboxInput"),
					checkboxL=$("a",exact_search).length,
					checkedL=$("a.checked",exact_search).length,
					params={};
				exact_search.each(function(k,v){
					var key=$(v).find("label").attr("rel"),
						checked=$(v).find(".checked"),paramArr=[];

					for(var i=0,l=checked.length;i<l;i++){
						paramArr.push($(checked[i]).attr("rel"));
					}
					params[key]=paramArr.join(",");

				});
				if(checkedL==0){
					selectTag.hide();
				}else{
					selectTag.show();
				}				

				params.golden=0;

				searchBox.hide();
				Cards.setParamsInit();
				if(checkedL==0 || checkedL==checkboxL){	

					if(CardsBuilder.isStart){
						CardsBuilder.getClsInit();
						Cards.getCurrentParams=undefined;
						return;
					}

					Cards.getCardsInit();
					Cards.getCurrentParams=undefined;
					return;
				}

					if(CardsBuilder.isStart){
						params.cardClass=CardsBuilder.getGroupCls();
					}

				Cards.getCardsData(params);
				Cards.getCurrentParams=params;
				//Cards.getSearchParams=params.cardRarity;
			}else{
				var keywords=$(".dim_search input").val(),params={};
				params.keywords=keywords;
				params.golden=0;

				searchBox.hide();
				Cards.setParamsInit();
				if(keywords=="" || keywords=="请输入关键字"){	

					if(CardsBuilder.isStart){
						CardsBuilder.getClsInit();
						Cards.getCurrentParams=undefined;
						return;
					}

					selectTag.hide();
					Cards.getCardsInit();
					Cards.getCurrentParams=undefined;
					return;
				}
				selectTag.show();

					if(CardsBuilder.isStart){
						params.cardClass=CardsBuilder.getGroupCls();
					}

				Cards.getCardsData(params);
				Cards.getCurrentParams=params;
				//Cards.getSearchParams=params.cardRarity;

			}
			return false;
		})

		searchClear.click(function(){
			var currentS=$(".search_tab a.active",searchBox).attr("rel"),
				option=$(".search_option a",searchBox),
				searchInput=$(".dim_search input");

			if(currentS=="exact_search"){
				option.removeClass('checked');
			}else{
				searchInput.val("");
			}			
			return false;

		})

	},
	setGuide:function(){
		var guide=$("#cards_guide"),
			img=$("img",guide),
			btn=$(".btn_guide",guide),
			close=$(".cards_guide_close",guide),
			step=1;

		
		if(!$.cookie("CARDS_GUIDE")){
			guide.show();
			var imgArr=[];
			for(var i=2;i<=5;i++){
				var pic='<img src="http://hearthstone.nos.netease.com/3/cards/guide/'+i+'.jpg"/>';
				imgArr.push(pic);
			}
			$("body").append("<div style='display:none'>"+imgArr.join("")+"</div>");
		}
		$.cookie("CARDS_GUIDE",1);
		var json=[
			{id:1,text:"了解更多",style:"top:50%;left:50%;margin-left:-98px;margin-top: -9px;"},
			{id:2,text:"下一步",style:"top:50%;left:50%;margin-left:21px;margin-top: -63px;"},
			{id:3,text:"下一步",style:"top:50%;left:50%;margin-left:-171px;margin-top: 93px;"},
			{id:4,text:"下一步",style:"top:100%;left:100%;margin-left:-239px;margin-top: -93px;"},
			{id:5,text:"立即体验",style:"top:50%;left:50%;margin-left:221px;margin-top: -76px;"}
		];


		btn.click(function(){

			if(step==5){				
				guide.remove();
				return;
			}
			btn.text(json[step].text).attr("style",json[step].style).removeClass('active');
			step++;
			if(step==5){
				btn.addClass("active");
			}			
			img.attr("src","http://hearthstone.nos.netease.com/3/cards/guide/"+step+".jpg");
		})

		close.click(function(){
			guide.remove();
			return false;
		})

/*		setInterval(function(){
			btn.animate({"opacity":1},1000,function(){
				btn.css("opacity",0.8);
			});
		},1000);	*/
	}


}


//data from cards_json
var CardsBuilder={
	init:function(){
		this.getCardsJson();	//获取卡牌json数据		
		this.delCards();	//删除卡牌
		this.builderHandle();	//激活组牌
		this.saveCards();	//保存组牌
		this.showCards();	//浮层显示
		this.searchCards();	//搜索卡牌
		this.groupHandle();	//套牌
	},
	getCardsJson:function(){
		jQuery.ajax({
			type:'GET',
			async:false,
		    url: 'http://hearthstone.nos.netease.com/3/json/cards/cards.json',
	        jsonp:"callback",
	        jsonpCallback:"cardsJson",
	        dataType: 'jsonp', 
	        success:function(json){
	        	window.cards_json=json;
	        	CardsBuilder.getFromUrl();
	        }
	    })    
	},	
	addCards:function(params){

		var cards_list=$("#cards_list"),
			id=params.id,
			cls=this.getGroupCls(),
			href=location.href;

		if(this.isLongUrl()){

			if(!this.validateCards(params)){
				return false;
			}

			if(!this.validateUrl("trigger")){	//防止添加卡牌过程中修改地址	验证点击普卡也点击金卡
				return false;
			}		
			this.setUrl(id);
		}else{
			if(this.isShortUrl()){
				CardsBuilder.showBox("不能超过30张卡牌");
				return false;
			}else{
				location.href="http://"+location.host+"/cards/builder/#"+cls+"&"+id+":1";				
			}

		}	

		//this.updateCards(params);
		//CardsBuilder.scroll=true;
		this.setUrlCards();
		this.setScroll(id);
		
		//$(".cards_list_wrap").mCustomScrollbar("update");
		

	},
	delCards:function(){
		var cards_li=$("#cards_list > li");

		cards_li.live("click",function(){
			var t=$(this),
				id=t.attr("data-id"),
				href=location.href,
				numWrap=t.find("span.cards_two"),
				num=numWrap.length;
			
				CardsBuilder.updateUrl(id,"del");


			if(num){
				numWrap.remove();
			}else{
				t.remove();
			}
			CardsBuilder.showCost();
			CardsBuilder.setScroll();

		})
	},
	showCards:function(){
		var cards_li=$("#cards_list > li");
		cards_li.live("mouseover",function(e){
			var t=$(this),
				id=t.data("id"),
				cls=t.data("cls"),
				name=cards_json[cls][id].name,
				golden=cards_json[cls][id].golden,
				classTag;	
			t.addClass('active').siblings().removeClass("active");
			golden?classTag="g-":classTag="";
			name=name.replace(/[\s:]/g, "+");
			var img='<img src="http://hearthstone.nos.netease.com/1/'+classTag+'cards/'+cls+'/'+classTag+name+'.png" alt=""/>';

			CardsBuilder.setTooltip(168,img,e);
		}).live("mouseout",function(e){
			$("#cardsTip").remove();
		})
		$("#cardsTip").live("mouseover",function(){
			$("#cardsTip").remove();
		})
	
	},
	setTooltip: function(w, con, e) {
		if($("#cardsTip").length){
			$("#cardsTip").remove();
		}		
		var tooltip = "<div id='cardsTip' style='width:" + w + "px'>" + con + "</div>";
		$("body").append(tooltip);
		var ex = e.pageX,
			ey = e.pageY,
			tooltipW = $("#cardsTip").width(),
			tooltipH = $("#cardsTip").height(),
			wW = $(window).width(),
			wH = $(window).height()+$(window).scrollTop(),
			leftV,
			topV;

		if (ey + tooltipH > wH) {
			topV = ey - (ey + tooltipH - wH);
		} else {
			topV = ey;
		}

		$("#cardsTip").css({
			"top": topV + "px"
		}).show("fast").stop(true, true);
	},
	setScroll:function(){
/*		var sh=$("#cards_list").height();
		if(sh>518){
			$("#cards_builder .scrollBar").show();
			$("#cards_builder").tinyscrollbar({
				scrollbarSelector: '.scrollBar',
				viewportSelector: '#cards_selected',
				overviewSelector: "#cards_list",
				sizethumb:63
			});			
		}*/
					if(!$(".mCustomScrollbar").length){
						$("#cards_list img").imgpreload({
							all:function(){
								$(".cards_list_wrap").mCustomScrollbar({
									scrollButtons:{enable:true},
									autoDraggerLength:false
								});
							}
						});						
					}else{
						$(".cards_list_wrap").mCustomScrollbar("update");

/*						if(arguments[0]){
							var imgS="#cards_small_"+arguments[0];
							$(imgS+" img").imgpreload(function(){
								$(".cards_list_wrap").mCustomScrollbar("scrollTo",imgS);
							})
							
						}*/

					}
	
		
						//$(".cards_list_wrap .mCSB_container").append(data); //append new content inside .mCSB_container
						//$("#content_1").mCustomScrollbar("update"); //update scrollbar according to newly appended content
						//$("#content_1").mCustomScrollbar("scrollTo","h2:last",{scrollInertia:2500,scrollEasing:"easeInOutQuad"}); //scroll to appended content
		//$("#cards_list").mCustomScrollbar();

	},	
	setBuilderTabs:function(){
		var cls=this.getCardsCls();
		var tabs=$(".tabs_hero"),tabsList=$("li",tabs);
		$("li[rel="+cls+"]",tabs).addClass("active").show().siblings().removeClass("active").hide();
		$("li[rel='neutral']",tabs).show();				
	},
	setUrl: function(id) {
		var href=location.href;	
			times = this.getSelectTimes(id);
		if (times == 0) {
			location.href = href + ";" + id + ":1";
		} else {
			this.updateUrl(id);
		}
	},
	updateUrl: function(id) { //更新url

		var currentList=this.getCardsList(),
			cards_save=$(".cards_save strong"),
			cards_num=this.getTotal(),
			listArr=[];

		if(arguments[1]){	//如果是删除标识			
			if(currentList[id]==2){
				currentList[id]=1
			}else{
				delete currentList[id];
			}
			cards_save.text(--cards_num);
		}else{
			cards_save.text(cards_num++);
			currentList[id]=2;
		}	
		
		for (var i in currentList){
			listArr.push(i+":"+currentList[i]);
		}


/*		if(CardsBuilder.searchInit){
			var cls=$(".cards_uid").attr("data-cls"),
				hrefFront=location.href.split("/builder/")[0];
				location.href=hrefFront+"/builder/#"+cls+"&"+listArr.join(";");
			
			CardsBuilder.searchInit=false;							
		}else{*/
			if (this.isLongUrl()) {
				var href=location.href;
				href=href.split("&")[0]+"&";
				location.href=href+listArr.join(";");

			}else{

				if(this.isShortUrl()){
					var cls=$("#clazz").val();
					location.href="http://"+location.host+"/cards/builder/#"+cls+"&"+listArr.join(";");
				}

			}			
		//}
		

	},
	updateCards:function(params){
		var cards_list=$("#cards_list"),
			cls=params.cls,
			id=params.id,
			cards_ck=$("li[data-id="+id+"]",cards_list),			
			cost=params.cost;

			if(cards_ck.length){
				var html='<span class="thumb_draw cards_two"></span>';
				cards_ck.append(html);
			}else{
				var imgurl=this.getImgUrl(id,cls);

				cards_list.append('<li data-cost="'+cost+'" data-id="'+id+'" data-cls="'+cls+'"><img src="'+imgurl+'" alt=""/><span class="cards_over"></span></li>');
			}

		//this.setScroll();	
		this.showCost();	
		
	},
	updateCardsState:function(id,type){
		var box=$("#cards_box");

		if(type=="legendary"){
			var disableHtml='<span class="cards_disable cards_disable_c"></span>';
		}else{
			var disableHtml='<span class="cards_disable"></span>';
		}
		var current=$(".cards_link[data-id="+id+"]",box);
		if(!current.find(".cards_disable").length){
			current.append(disableHtml);
		}
		
	},
	validateCards:function(params){
		var id=params.id,
			cls=this.getCardsCls(),
			name=params.name,
			total=this.getTotal();

		if(total>=30){
			CardsBuilder.showBox("不能超过30张卡牌");
			return false;
		}
	
		if(this.isLongUrl()){
			var params_list=this.getCardsList(),
				times=this.getSelectTimes(id),
				nameNum=0;

				if(this.isLegendary(id)){
					if(times==1){
						//alert("橙卡只能选择一张");
						CardsBuilder.updateCardsState(id,"legendary");
						return false;
					}
				}else{
					if(times==2){
						//alert("只能选择两张卡牌");											
						CardsBuilder.updateCardsState(id);
						return false;
					}
				}



			for (var i in params_list){

				var card=cards_json[cls][i];	//是否有id
				if(typeof card=="undefined" && cards_json["neutral"][i]=="undefined"){
					CardsBuilder.showBox("卡牌地址有误");
					return;
				}
				

				//判断是否有金卡和普卡选择超过2张

				if(typeof card=="undefined"){
					var cl="neutral";
				}else{
					var cl=cls;
				}
//console.log(cls+"===="+i);
				if(cards_json[cl][i].name==name){//fix bug for nameNum
					var num=parseInt(params_list[i]);
					nameNum=nameNum+num;
				}



			}


			if(this.isLegendary(id)){
				if(nameNum>=1){
					//alert("橙卡只能选择一张");
					CardsBuilder.updateCardsState(id,"legendary");
					return false;
				}
			}else{
				if(nameNum>=2){
					//alert("只能选择两张卡牌");
					CardsBuilder.updateCardsState(id);
					return false;
				}
			}
			


		}
		return true;

	},
	validateUrl:function(){
		var href=location.href,
			params_list=this.getCardsList(),
			cls=this.getCardsCls(),
			listArr=[],index=0,cards_length=0;

		
		if(cls=="neutral"){
			CardsBuilder.showBox("卡牌地址有误");
			return;
		}
		for (var i in params_list){
			cards_length=cards_length+parseInt(params_list[i]);
			if(typeof cards_json[cls]=="undefined" || typeof params_list[i]=="undefined"){
				CardsBuilder.showBox("卡牌地址有误");
				return;
			}

			var card=cards_json[cls][i];	//是否有id
			if(typeof card=="undefined" && cards_json["neutral"][i]=="undefined"){
				CardsBuilder.showBox("卡牌地址有误");
				return;
			}
			


			var num=params_list[i];
			if(CardsBuilder.isLegendary(i)){	//验证数量
				if(num!=1){
					CardsBuilder.showBox("卡牌地址有误");
					return false;					
					break;
				}
			}else{
				if(num!=1 && num!=2){
					CardsBuilder.showBox("卡牌地址有误");
					return false;					
					break;

				}
			}

			//判断是否有金卡和普卡选择超过2张

			if(typeof card=="undefined"){
				var cl="neutral";
			}else{
				var cl=cls;
			}
			listArr[index]={};

			listArr[index].id=i;
			listArr[index].name=cards_json[cl][i].name;
			listArr[index].num=params_list[i];				

			index++;


		}
		if(cards_length>30){
			CardsBuilder.showBox("卡牌地址有误");
			return false;
		}
		

		var showNum;//debugger;
		for (var m=0,le=listArr.length;m<le;m++){
			for (var t=0,let=listArr.length;t<let;t++){
				//console.log(listArr[j].name+"==="+listArr[t].name)
				
				if(m==t){
					continue;
				}
				if(listArr[m].name==listArr[t].name){//debugger;
					showNum=parseInt(listArr[m].num)+parseInt(listArr[t].num);


					if(CardsBuilder.isLegendary(listArr[m].id)){	//如果是金卡和普卡的总数大于1
						if(showNum>1){
							if(arguments[0]){
								//alert("卡牌限制")
								CardsBuilder.updateCardsState(listArr[m].id,"legendary");
							}else{
								CardsBuilder.showBox("卡牌地址有误");
							}
							return false;					
							break;
						}
					}else{
						if(showNum>2){
							if(arguments[0]){
								//alert("卡牌限制")
								CardsBuilder.updateCardsState(listArr[m].id);
							}else{
								CardsBuilder.showBox("卡牌地址有误");
							}
							return false;					
							break;
						}	
					}

				}
			}

		}


		return true;
	},
	showBox:function(html,type){
		if(type=="custom"){
			var htmlStr="<div class='cards_error'>"+html+"</div>";
		}else{
			var htmlStr="<p class='cards_error'><span>"+html+"</span></p>";
		}
		var htmlW=Common.setBoxwrap("300px","100px",htmlStr);
		$.sc2.lightBox(htmlW,{model:true,hasClose:false});
	},
	selectHero:function(){
		var hero=$("#hero_select"),
			hero_link=$("a",hero);

		hero_link.mouseover(function(){
			var t=$(this);
			hero_link.find(".hero_light").removeClass('hero_active');
			t.find(".hero_light").addClass('hero_active');
		})

		hero_link.click(function(){
			var cardClass=$(this).attr("rel"),
				tabs=$(".tabs_hero");


			CardsBuilder.isStart=true;	
			CardsBuilder.setGroup(cardClass);
			var params={
				cardClass:cardClass,
				golden:0,
				p:1
			}
			Cards.getCardsData(params);
			$("#hero_select").hide();
			$("#boxModel").remove();

			var cards_selected=$("#cards_selected"),cards_group=$("#cards_group");
			cards_selected.html('<div class="cards_list_wrap"><ul id="cards_list"></ul></div>');
			cards_group.show();
			$(".cards_save strong").text(0);
		})
	},
	groupHandle:function(){
		var group=$("#cards_group"),
			group_li=$("li",group),
			cost=$("#cards_cost"),
			close=$(".group_close",group),cost_timer;

		group_li.live("mouseover",function(){
			clearTimeout(cost_timer);
			cost.show();
		}).live("mouseout",function(){
			cost_timer=setTimeout(function(){cost.hide();},200);
		})
		close.live("click",function(){
			CardsBuilder.showBox('<p class="cards_confirm_txt">确定要删除卡组吗?</p><p class="cards_confirm"><a rel="confirm" href="javascript:void(0);">确定</a><a rel="cancel" href="javascript:void(0);">取消</a></p>',"custom");
/*			if(confirm("确定要删除卡组吗?")){
				location.href="http://"+location.host+"/cards/builder/";
				$(this).parent().parent().remove();

				var cards_selected=$("#cards_selected");
				cards_selected.html('<div class="cards_list_wrap"><ul id="cards_list"></ul></div>');

				group.hide();
				cost.hide();
				$(".newCards").show();				
			}*/

		})

		$(".cards_confirm a").live("click",function(){
			var rel=$(this).attr("rel");
			if(rel=="confirm"){
				location.href="http://"+location.host+"/cards/builder/";
			}else{
				$("#popBox").remove();
				$("#boxModel").remove();
			}
		})

	},
	setGroup:function(cls){
		var group=$("#cards_group"),
			btn_new=$(".newCards"),
			name='<span class="name">自定义套牌</span>',
			img='<span class="thumb_draw group_over"></span>',
			close='<span class="thumb_draw group_close"></span>',
			html='<li><a class="group_'+cls+'" href="javascript:void(0);">'+name+img+close+'</a></li>';
		btn_new.hide();
		group.append(html);
		group.show();
		
	},
	saveCards:function(){			
		var box=$("#saveBox"),
			finish=$("#cards_finish"),
			submit=$("#cards_submit");
		finish.click(function(){
			if(!CardsBuilder.validateUrl()){
				CardsBuilder.showBox("卡牌地址有误");
				return;
			}

			var deckName=$(".group",box),
				creator=$(".name",box),
				checkbox=$(".checkboxInput a",box),
				detail=$("textarea",box);

			deckName.val("");
			//creator.attr("炉石玩家");
			creator.val("");
			$.sc2.placeholder({trigger:".group_input input"});
			detail.val("");	
			checkbox.removeClass('checked');			
			var total=CardsBuilder.getTotal();
			if (total<30) {
				//alert("卡牌不能少于30张");
				return false;
			}
			$.sc2.lightBox($("#saveBox"),{model:true});

		})

		$("textarea",box).keyup(function() {
			var detail=$(this).val();
			if(detail.length>300){
				$("textarea",box).val(detail.substring(0,300));
			}			
		});

		submit.click(function(){
			var deckName=$(".group",box).val(),
				creator=$(".name",box).val(),
				checkbox=$(".checkboxInput .checked",box),
				detail=$("textarea",box).val(),
				checkArr=[];

			if(!deckName){
				alert("请填写套牌名称");
				return false;
			}
			if(!checkbox.length){
				alert("请选择标签");
				return false;
			}	
			var checkboxL=checkbox.length;
			if(checkboxL>3){
				alert("标签不能超过3个");
				return false;
			}			
			if(!detail){
				alert("请填写套牌描述");
				return false;
			}
			if(detail.length>300){
				alert("字数限制在300以内");
				return false;
			}

			for (var i=0,l=checkbox.length;i<l;i++){
				var check_txt=$(checkbox[i]).text();
				checkArr.push(check_txt);
			}
			if(creator==""){
				creator="炉石玩家";
			}
			var cls=CardsBuilder.getGroupCls();
			var list=CardsBuilder.getSaveList();
			$.post(
	          "/deck/save",
	          {
	          	deckName:deckName,
	          	creator:creator,
	          	clazz:cls,
	          	content:list,
	          	tags:checkArr.join(","),
	          	description:detail,
	          	token:Common.getToken(),
	          	t:new Date().getTime()
	          },
	          function(data) {
	          	if(data.id){
	          		CardsBuilder.showSaveTip(data.id);
	          	}else{
	          		var msg=data.msg;
	          		if(msg=="fail"){
	          			alert("保存失败，请重试");
	          		}else{
	          			alert("参数不合法");
	          		}
	          	}

	          },
	          "json"
	        );								
		})
	},
	showSaveTip:function(uid){
		var saveBox=$("#saveBox"),
			saveTip=$("#saveTip"),
			uidWrap=$("strong",saveTip),
			cards_new=$(".saveTipNew",saveTip),
			cards_old=$(".saveTipOld",saveTip);
		saveBox.hide();	
		uidWrap.text(uid);
		$.sc2.lightBox(saveTip,{model:true,hasClose:false});
/*		window.jiathis_config = {
			data_track_clickback: true,
			summary: "#炉石传说#这是我的新卡组，分享给大家一起尝试一下： "+" 炉石酒馆中的对战正在激烈进行，如此精彩的挑战岂容错过？带上你的三十六计加入到《炉石传说》的队伍中来吧！《炉石传说》卡牌工具_暴雪首款免费休闲卡牌网游",
			pic: "",
			title:"",
			url:"http://"+location.host+"/cards/builder/"+uid,
			shortUrl:false,
			hideMore: false
		}*/
		window.jiathis_config = {
			data_track_clickback: false,
			summary: "这是我的新卡组，分享给大家："+"http://"+location.host+"/cards/builder/"+uid+"炉石酒馆中的对战正在激烈进行，如此精彩岂容错过？赶紧加入吧！",
			pic: "",
			title:"#炉石传说#",
			url:"http://"+location.host+"/cards/builder/"+uid,
			shortUrl:false,
			hideMore: false
		};	
		cards_new.click(function(){
			location.href="http://"+location.host+"/cards/builder/";
		})
		cards_old.click(function(){
			saveTip.hide();
			$("#boxModel").remove();
		});		
	},
	showSaveCon: function(params) {
		if(typeof params=="undefined"){
			var params = {
				deckName: $("#deckName").val(),
				creator: $("#creator").val(),
				clazz: $("#clazz").val(),
				content: $("#content").val(),
				tags: $("#tags").val(),
				description: $("#description").val(),
				createTime: $("#createTime").val()
			}			
		}

		var saveWrap=$("#saveCon"),
			deckName=$(".deckName",saveWrap),
			creator=$(".creator",saveWrap),
			tags=$(".tags",saveWrap),
			description=$(".description",saveWrap),
			createTime=$(".createTime",saveWrap);

		deckName.text(params.deckName);
		creator.text(params.creator);
		tags.text(params.tags);
		description.text(params.description);
		createTime.text(params.createTime);
		$("#cards_group .name").text(params.deckName);


		var saveCon=$("#saveCon"),
			close=$(".closeBtn",saveCon);
		saveCon.show();

		close.click(function(){
			saveCon.hide();
		})

		
	},
	shareCards:function(){
		var share=$("#shareNav"),
			href=location.href,
			share_input=$("input",share);

		share_input.val(href);
		//share.animate({"top":"37px","opacity":"1"}, 1000);


		share_input.click(function(){
			$(this).select();
		})
		share_input.hover(function(){
			var v=share_input.val();
			$(this).attr("title",v);
		})
		this.updateShareCards();

		
	},
	updateShareCards:function(){
		var share=$("#shareNav"),
			href=location.href,
			share_input=$("input",share);

		share_input.val(href);
		//share.animate({"top":"37px","opacity":"1"}, 1000);

		var val=share_input.val();		
/*		window.jiathis_config = {
			data_track_clickback: true,
			summary: "#炉石传说#这是我的新卡组，分享给大家一起尝试一下： "+val+" 炉石酒馆中的对战正在激烈进行，如此精彩的挑战岂容错过？带上你的三十六计加入到《炉石传说》的队伍中来吧！《炉石传说》卡牌工具_暴雪首款免费休闲卡牌网游",
			pic: "",
			hideMore: false
		}*/
		window.jiathis_config = {
			data_track_clickback: false,
			summary: "这是我的新卡组，分享给大家："+val+"炉石酒馆中的对战正在激烈进行，如此精彩岂容错过？赶紧加入吧！",
			pic: "",
			title:"#炉石传说#",
			url:val,
			shortUrl:false,
			hideMore: false
		}	
	},
	searchCardsPost:function(){
		var search=$(".cards_uid"),
			input=$("input",search);
					
			var val=input.val(),
				rule=/^([0-9]+)$/;
			if(!val || !rule.test(val)){
				alert("请输入ID查找套牌");
				return false;
			}

			location.href="http://"+location.host+"/cards/builder/"+val;

			/*$.post(
				"/deck/"+val, {
					token: Common.getToken(),
					t: new Date().getTime()
				},
				function(data) {

					var createTime=new Date(data.createTime).toLocaleString();
					if (data.clazz) {
						var params={
							clazz:data.clazz,
							content:data.content,
							createTime:createTime,
							creator:data.creator,
							deckName:data.deckName,
							description:data.description,
							tags:data.tags
						}
						//CardsBuilder.searchInit=true;
						search.attr("data-content",params.content).attr("data-cls",params.clazz);							
						CardsBuilder.setUrlCards();
						CardsBuilder.showSaveCon(params);
						CardsBuilder.setScroll();
						
						//location.href=location.origin+"/cards/builder/#";
												
					} else {
						alert("套牌不存在");

					}

				},
				"json"
			);*/
	},
	setSearchId:function(){
		var search=$(".cards_uid"),
			input=$("input",search);

			input.val(location.href.split("/cards/builder/")[1]);
			input.addClass("cards_uid_in");
	},
	searchCards: function() {
		var search=$(".cards_uid"),
			input=$("input",search),
			btn=$("a",search);

		input.keypress(function(e){
				if(e.keyCode==13){
					CardsBuilder.searchCardsPost();
				}
		})
		input.focus(function(){
			var t=$(this),
				v=t.val();

			if(t.hasClass('cards_uid_in')){
				t.val("");
				t.removeClass('cards_uid_in');
			}
			
			if(v=="请输入ID查找套牌"){
				$(this).val("");
			}
		}).blur(function() {
			var v=$(this).val();
			if(v==""){
				$(this).val("请输入ID查找套牌");
			}
		});
		btn.click(function(){
			CardsBuilder.searchCardsPost();
		})

	},
	builderHandle:function(){
		var btn=$(".newCards");

		btn.click(function(){
			
			//CardsBuilder.searchInit=false;
			$.sc2.lightBox($("#hero_select"),{model:true});
		})
		this.selectHero();
	},
	getSelectTimes:function(id){	//该id选择的牌的数量
		
		var currentList=this.getCardsList(),
			times=currentList[id];
		if(times){
			return times;
		}
		return 0;
	},
/*	getShowTimes:function(single,href){
		var times=href.split(single).length-1;
		return times;
	},*/
	getCardsList: function() { //获取卡牌数据	#1
		var href = location.href;
		//if (CardsBuilder.searchInit) {
			//var list = this.getSearchResult().list;
		//} else {
			if (this.isLongUrl()) {

				var params = href.split("/builder/#")[1],
					list = params.split("&")[1],
					cls = params.split("&")[0];
			} else {

				if (this.isShortUrl()) {
					var cls = $("#clazz").val(),
						list = $("#content").val();
				}
			}
		//}


		return CardsBuilder.formatCardsList(list);

	},
	getSaveList:function(){
		var cards_list=$("#cards_list"),
			cards_li=$("li",cards_list),
			list=[];

		cards_li.each(function(k,v){
			var num=$(v).find("span.cards_two").length,
				id=$(v).attr("data-id");
			num?num=2:num=1;
			list.push(id+":"+num);

		});
		return list.join(";");
	},
	getSaveCls:function(){
		var cards_list=$("#cards_list"),
			cards_first=$("li:eq(0)",cards_list),
			cls=cards_first.attr("data-cls");

		return cls;
	},
	formatCardsList: function(params) {
		var list = {},
			rule=/^[0-9]+:[1-2]{1}$/;

		if(params.indexOf(";")>0){
			var params_list=params.split(";");
		}else{
			if(rule.test(params)){
				var params1=params.split(":")[0],
					params2=params.split(":")[1],
					p={};
				p[params1]=params2	
				return p;

			}
		}

		var list_l=params_list.length,idArr=[];
		if(list_l>30){
			CardsBuilder.showBox("卡牌有误");
			return;
		}

		for (var i = 0, l = list_l; i < l; i++) {
			var id = params_list[i].split(":")[0],
				num = params_list[i].split(":")[1];

			//listArr[i]={};
			//listArr[i][id]=num;
			list[id] = num;
			idArr.push(id);
		}
		if(this.isRepeatId(idArr)){
			CardsBuilder.showBox("卡牌有误");
			return;
		}
		return list;
	},
	getCardsCls:function(){
		var cls="";
		if(this.isShortUrl()){
			var cls=$("#clazz").val();

		}else{
			var href=location.href,
				params=href.split("/builder/#")[1],
				params_list_str=params.split("&")[1],
				cls=params.split("&")[0];
		}
		return cls;		

	},
	getGroupCls:function(){
		var group=$("#cards_group"),
			cls_class=$("a",group).attr("class");

		return cls_class.split("group_")[1];
	},
	getClsInit: function() {
		var cls=this.getGroupCls();
		var params = {
			cardClass: cls,
			golden: 0,
			p: 1
		}
		Cards.getCardsData(params);
	},
	getSearchResult:function(){
		var uid=$(".cards_uid"),
			list=uid.attr("data-content"),
			cls=uid.attr("data-cls");

		return {
			list:list,
			cls:cls
		};
	},
	getImgUrl:function(id,cls){
		var name=cards_json[cls][id].name,
			golden=cards_json[cls][id].golden,
			g_class="";

		name=name.replace(/[\s:]/g, "+");	
		if(golden){
			g_class="g-";
		}
		return 	"http://hearthstone.nos.netease.com/1/s-cards/"+g_class+"cards/"+cls+"/"+g_class+name+".png";
	},
	getTotal:function(){
		var cards_save=$(".cards_save strong"),
			cards_num=parseInt(cards_save.text());

		return cards_num;
	},
	isShortUrl:function(){
		var deckName=$("#deckName");
		if(deckName.length){
			return true;
		}
		return false;
	},
	isLongUrl:function(){
		var href=location.href;
		var rule=/^[0-9]+:[1-2]{1}$/;
		if(href.indexOf("/builder/#")>0){
			var cls=this.getCardsCls();
			if(cls){
				var id=href.split("/builder/#"+cls+"&")[1];
				if(id){
					
					if(rule.test(id)){
						return true;
					}else{
						var firstId=id.split(";")[0];
						if(firstId && rule.test(firstId)){
							return true;
						}
					}
				}
			}
			
		}
		return false;
	},
	isLegendary: function(id) {
		var cls=this.getCardsCls();
		if (typeof cards_json[cls][id] == "undefined") {
			var cl = "neutral";
			if (typeof cards_json["neutral"][id] == "undefined"){
				CardsBuilder.showBox("卡牌地址有误");
				return;
			}			
		}else{
			var cl = cls;
		}
				
		var rarity=cards_json[cl][id].rarity;

		if(rarity=="legendary"){
			return true;
		}
		return false;
	},
	isSearchUrl:function(){
		var search=$(".cards_uid");

		if(search.attr("data-content")){
			return true;
		}else{
			return false;
		}
	},
	isRepeatId:function(arr){
		arr=arr.sort();
		for (var i = 0, l = arr.length-1; i < l; i++) {
			if(arr[i]==arr[i+1]){
				return true;
			}
		}
		return false;
	},	
	getFromUrl:function(){

		CardsBuilder.shareCards();
		if(this.isShortUrl()){	//uid的地址
			var params={
				clazz:$("#clazz").val(),
				content:$("#content").val()
			}
			CardsBuilder.isStart=true;
			CardsBuilder.setUrlCards();
			CardsBuilder.setGroup(params.clazz);			
			CardsBuilder.showSaveCon();


			var data_params={
				cardClass:params.clazz,
				golden:0,
				p:1
			}
			Cards.getCardsData(data_params);
			CardsBuilder.setScroll();
			


		}else{
			if(this.isLongUrl()){
				if(this.validateUrl()){
					CardsBuilder.setBuilderTabs();
					CardsBuilder.isStart=true;
					CardsBuilder.setUrlCards();
					var cls=CardsBuilder.getCardsCls();
					CardsBuilder.setGroup(cls);
					var params={
						cardClass:cls,
						golden:0,
						p:1
					}
					Cards.getCardsData(params);
					CardsBuilder.setScroll();
					//CardsBuilder.shareCards();				
				}	
			}else{
				return;
			}			
		}


	},
	setUrlCards:function(){
		//if(CardsBuilder.searchInit){
			//var list=this.formatCardsList(this.getSearchResult().list),
			//	cls=this.getSearchResult().cls;				
		//}else{
			if(this.isLongUrl()){

				var list=this.getCardsList(),
					cls=this.getCardsCls();							
			}else{
				if(this.isShortUrl()){
					var params={
						clazz:$("#clazz").val(),
						content:$("#content").val()
					}			
					var cls=params.clazz,
						content=params.content,
						list=this.formatCardsList(content);

					this.setSearchId();	
				}			
			}			
		//}

	


		var cards_list=$("#cards_list"),
			listArr=[],index=0,cards_two;
		for (var i in list){
			if(typeof cards_json[cls][i]=="undefined"){
				var cl="neutral";
				if (typeof cards_json["neutral"][i] == "undefined"){
					CardsBuilder.showBox("卡牌地址有误");
					return;
					break;
				}				
			}else{
				var cl=cls;
			}
			var imgurl=CardsBuilder.getImgUrl(i,cl),
				num=list[i],
				cost=cards_json[cl][i].cost,
				name=cards_json[cl][i].name;
			num==1?cards_two="":cards_two='<span class="thumb_draw cards_two"></span>';

			listArr[index]={};
			listArr[index].html='<li id="cards_small_'+i+'" data-cost="'+cost+'" data-id="'+i+'" data-cls="'+cl+'" data-name="'+name+'"><img src="'+imgurl+'" alt=""/><span class="cards_over"></span>'+cards_two+'</li>';	
			listArr[index].cost=cost;
			index++;
		}
		//listArr.sort(function(x,y){return x.cost-y.cost});
		var listHtml=[];
		for (var j=0,le=listArr.length;j<le;j++){
			listHtml.push(listArr[j].html);
		}
		cards_list.html("").append(listHtml.join(""));
		$("#cards_list > li").tsort({data:"cost"},{data:"name"});
		//this.setScroll();				
		this.showCost();
	},
	showCost:function(){	//显示比例
		var cards_list=$("#cards_list"),
			cards_li=$("li",cards_list),
			total=0,cost_obj={};

		cards_li.each(function(k,v){
			var num_str=$(v).find("span.cards_two").length,
				cost=$(v).attr("data-cost"),
				num;
			num_str?num=2:num=1;
			cost>7?cost=7:"";
			total=total+num;

			for (var i=0;i<=7;i++){				
				if(cost==i){
					var n=num;
					if(cost_obj[i]){
						cost_obj[i]=cost_obj[i]+n;
					}else{
						cost_obj[i]=n;
					}
					
				}
				
			}

		});

		var finish=$("#cards_finish");
		if(total==30){
			finish.removeClass('cards_btn_disabled');
		}else{
			finish.addClass('cards_btn_disabled');
		}
		$(".cards_save strong").text(total);
		$("#cards_cost .line").css("height",0);
		$("#cards_cost .num").text(0);
		var percentHtml=[],costWrap=$("#cards_cost");
		for (var j in cost_obj){
			var percent=Math.round(cost_obj[j] / total * 100) + "%";
			//percentHtml.push('<li>'+percent+'</li>');
			$("li.cost_"+j).html('<span class="line" style="height:'+percent+'"><span class="num">'+cost_obj[j]+'</span></span>')
		}
		this.updateShareCards();

		//costWrap.html('<ul class="clearFix">'+percentHtml.join("")+'</ul>');

	}



}
