var ActivityCalendar = {
	initWidget:function(){
		this.init();
	},
	
	init:function(param){
		if(!$(".w-activity-calendar"))return;
		var isWidget;
		var date;
		if(param){
			isWidget=false;
			date=param;
		}else{
			isWidget=true;
			date=new Date();//now
		}
		var now=new Date(date.getTime());
		date.setDate(1);
		var isWidget=isWidget?isWidget:false;
		var timer=0;
		var setStatus=function(selector,hasActivity){	// fix ie6 buggy css selector
			if(hasActivity){
				selector.click(listCalendar);
				selector.hover(showCalendarLayer,hideCalendarLayer);
			}else{
				selector.unbind("mouseenter mouseleave click");
			}
			var isToday=(selector.data("today")===true);
			var outOfRange=(selector.attr("date")===undefined);
			if(isToday){
				if(hasActivity){
					//selector.toggleClass("today",false);
					selector.toggleClass("today-has-activity",true);
					selector.unbind("mouseenter mouseleave");
				}else{
					selector.toggleClass("today",true);
					//selector.toggleClass("today-has-activity",false);
					selector.hover(
						function(){
							$(this).toggleClass("today", false);
							$(this).toggleClass("today-hover", true);
						},
						function(){
							$(this).toggleClass("today", true);
							$(this).toggleClass("today-hover", false);
						});
				}
			}else if(outOfRange){
				selector.toggleClass("outofrange",true);
			}else{
				if(hasActivity){
					//selector.toggleClass("normal",false);
					selector.toggleClass("has-activity",true);
					selector.hover(
						function(){
							$(this).toggleClass("has-activity", false);
							$(this).toggleClass("has-activity-hover", true);
						},
						function(){
							$(this).toggleClass("has-activity", true);
							$(this).toggleClass("has-activity-hover", false);
						});
				}else{
					selector.toggleClass("normal",true);
					//selector.toggleClass("has-activity",false);
					selector.hover(
						function(){
							$(this).toggleClass("normal", false);
							$(this).toggleClass("normal-hover", true);
						},
						function(){
							$(this).toggleClass("normal", true);
							$(this).toggleClass("normal-hover", false);
						});
				}
			}
		};
		var prepareDisplayCalendars=function(el){
			var displayCalendars=el.data("displayCalendars");
			if(!displayCalendars){
				var savedCalendars=el.data("savedCalendars");
				if(savedCalendars){
					savedCalendars.sort(function(c1,c2){// sort by priority
						var p1=c1.article.contentMap.priority;
						var p2=c2.article.contentMap.priority;
						p1=p1?p1:0;//normalize data
						p2=p2?p2:0;
						return p2-p1;
					});
					displayCalendars=savedCalendars.slice(0,3);
					el.data("displayCalendars",displayCalendars);
				}
			}
			return displayCalendars;
		};
		var layerDom;
		if($.browser.msie && $.browser.version=="6.0"){
			layerDom=$("<div class='layer ie6'><div class='mc'></div></div>");
		}else{
			layerDom=$("<div class='layer'><div class='tl'><b></b></div><div class='tc'><b></b></div><div class='tr'><b></b></div><div class='ml'><b></b></div><div class='mc'><b></b></div><div class='mr'><b></b></div><div class='bl'><b></b></div><div class='bc'><b></b></div><div class='br'><b></b></div></div>");
		}
		var listCalendar=function(){// widget only
			var calendarDate= $(this).data("calendarDate");
			if(isWidget){
				// remove all
				$(".w-activity-calendar .activities .item").not($(".w-activity-calendar .activities .jstmpl .item")).detach();
				$(".w-activity-calendar .activities .more").hide();
				// append new one
				var displayCalendars=prepareDisplayCalendars($(this));
				if(displayCalendars&&displayCalendars.length>0){
					var tmpl=$(".w-activity-calendar .jstmpl").html();
					var container=$(".w-activity-calendar .activities")
					for(var i=0;displayCalendars&&displayCalendars[i]&&i<4;i++){
						var calendar=displayCalendars[i];
						var el=$(tmpl);
						el.find(".wrap").addClass("type "+calendar.article.contentMap.type); 
						var actType=calendar.article.contentMap.type;
						var typeName=null;
						if(actType=="game"){
							typeName="比赛";
						}else if(actType=="activity"){
							typeName="活动";
						}else if(actType=="exhibition"){
							typeName="展会";
						}else if(actType=="interflow"){
							typeName="交流";
						}else{ 
							typeName="官方";
						}
						el.find(".title").text("[" +typeName+ "] " + calendar.article.title );
						el.find(".title").attr("href",calendar.article.contentMap.linkUrl);
						el.find(".date").text((new Date(calendar.startTime)).format("[MM-dd]"));
						container.append(el);
					}
					var more=container.find(".more");
					more.attr("href","/calendar/"+calendarDate.format("yyyyMMdd"));
					more.show();
					container.append(more);
				}
			}else{
				window.location="/calendar/"+calendarDate.format("yyyyMMdd");
			}
		};
		var showCalendarLayer=function(e){
			var calendarDate=$(this).data("calendarDate");
			var displayCalendars=prepareDisplayCalendars($(this));
			var a=[];
			for(var i=0;displayCalendars&&displayCalendars[i];i++){
				var calendar=displayCalendars[i];
				a.push("<div class='item type " + calendar.article.contentMap.type + "'>" + calendar.article.title + "</div>")
				a.push("<div class='split'><b></b></div>");
			}
			if(i>0)a.pop();
			$(this).append(layerDom);
			$(this).find(".layer .mc").html(a.join(''));
			setPopPosition($(this),e);
		};
		var hideCalendarLayer=function(){
			var el=$(this).find(".layer");
			if(el)el.detach();
		};
		var setPopPosition=function(obj,e){
			var popBox=obj.find(".layer");
			var popBoxWidth=popBox.width();
			var dateIndex=parseInt(obj.attr("id").substring(3));
			var winRightWidth=parseInt($(window).width()-1030)/2;
			var pageWidth=parseInt(popBoxWidth-(7-dateIndex)*38);			
            if(winRightWidth>pageWidth){
				popBox.css("left","15px");
				}
			else{								
				var tolWidth=dateIndex*38+popBoxWidth;
				if(tolWidth>282){
					var positionLeft=-popBoxWidth+23+(6-dateIndex)*40;
					popBox.css("left",positionLeft+"px");
					}
				else{
					popBox.css("left","15px");
					}		
				}			
		}
		var updateCalendar=function(){
			$(".w-activity-calendar .calendar .title").text(date.getFullYear()+"年"+(date.getMonth()+1)+"月");
			var els = $(".w-activity-calendar .calendar .date");
			els.text("");
			els.removeClass();
			els.addClass("date");
			els.unbind("mouseenter mouseleave click");
			els.removeAttr("date");
			els.data("savedCalendars",null);
			els.data("calendarDate",null);
			els.data("displayCalendars",null);
			els.data("today",null);
			var cursor=new Date(date.getTime());
			cursor.setDate(date.getDay()==0?-6:1-date.getDay());
			var week=0;
			while(week<6){
				var el = $(".w-activity-calendar .calendar .date#w"+week+"d"+cursor.getDay());
				el.text(cursor.getDate());
				if(cursor.getMonth()==date.getMonth()){
					el.attr("date", cursor.getDate());
					if(cursor.getYear()==now.getYear()&&cursor.getMonth()==now.getMonth()&&cursor.getDate()==now.getDate()){
						el.data("today",true);
					}else{
						el.data("today",false);
					}
				}
				setStatus(el,false);
				cursor.setDate(cursor.getDate()+1);
				if(cursor.getDay()==0){
					week++;
				}
			};
			var currentStartTime;
			var currentCalendars;
			clearTimeout(timer);
			timer=setTimeout(function(){
				var currentMonth = new Date(date.getTime());
				currentMonth.setDate(1);
				currentMonth.setHours(0);
				currentMonth.setMinutes(0);
				currentMonth.setSeconds(0);
				var startTime=currentMonth.getTime();
				currentMonth.setMonth(currentMonth.getMonth() + 1);
				var endTime=currentMonth.getTime();
				currentStartTime=startTime;
				

				var params = {
					"startTime" : startTime,
					"endTime" : endTime
				};
				$.getJSON("/calendars/getAllSC2CalendarsByTime",params, function(calendars) {
					if(currentStartTime != startTime)return;
					currentCalendars=calendars;
					for(var i=0;i<calendars.length;i++){
						var calendar=calendars[i];
						if(calendar.startTime < startTime) {
							var calendarDate=new Date(startTime);
						}else {
							var calendarDate=new Date(calendar.startTime);
							calendarDate.setHours(0);
							calendarDate.setMinutes(0);
							calendarDate.setSeconds(0);
							calendarDate.setMilliseconds(0);
						}
						while(calendarDate.getTime() < Math.min(endTime, calendar.endTime)){
							var date=calendarDate.getDate();
							var el=$(".w-activity-calendar .calendar .date[date="+date+"]");
							var savedCalendars=el.data("savedCalendars");
							if(!savedCalendars){
								savedCalendars=[];
								setStatus(el,true);
							}
							savedCalendars.push(calendar);
							el.data("savedCalendars",savedCalendars);
							el.data("calendarDate",new Date(calendarDate.getTime()));
							calendarDate.setDate(date+1);
						}
					}
				});
				
				/*
				CalendarBean.getAllSC2CalendarsByTime(startTime,endTime,function(calendars){
					if(currentStartTime != startTime)return;
					currentCalendars=calendars;
					for(var i=0;i<calendars.length;i++){
						var calendar=calendars[i];
						if(calendar.startTime < startTime) {
							var calendarDate=new Date(startTime);
						}else {
							var calendarDate=new Date(calendar.startTime);
							calendarDate.setHours(0);
							calendarDate.setMinutes(0);
							calendarDate.setSeconds(0);
							calendarDate.setMilliseconds(0);
						}
						while(calendarDate.getTime() < Math.min(endTime, calendar.endTime)){
							var date=calendarDate.getDate();
							var el=$(".w-activity-calendar .calendar .date[date="+date+"]");
							var savedCalendars=el.data("savedCalendars");
							if(!savedCalendars){
								savedCalendars=[];
								setStatus(el,true);
							}
							savedCalendars.push(calendar);
							el.data("savedCalendars",savedCalendars);
							el.data("calendarDate",new Date(calendarDate.getTime()));
							calendarDate.setDate(date+1);
						}
					}
				});
			 */
			},500);
		};
		$(".w-activity-calendar .calendar .navbtn.prev").click(function(){
			date.setMonth(date.getMonth()-1);
			updateCalendar();
		});
		$(".w-activity-calendar .calendar .navbtn.next").click(function(){
			date.setMonth(date.getMonth()+1);
			updateCalendar();
		});
		updateCalendar();
	}
}
