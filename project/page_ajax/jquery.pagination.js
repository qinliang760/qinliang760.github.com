var Pager={
		/* example: Utils.createPaging({target:"paging",total:20,current:16,urlPattern:"/article/$0"}); */
		createPaging:function(options) {
			var htmls=[];
			var range=2;
			var getUrl=function(n){
				return options.urlPattern.replace("$0",n);
			};
			if(options.current>1){
				htmls.push('<a href="'+getUrl(options.current-1)+'" class="prev"><span>上一页</span></a>');
			}else{
				htmls.push('<a href="#" class="prev hide"><b></b></a>');
			}

			var numStart,numEnd;
			if(options.current-range>1){
				numStart=options.current-range;
				numEnd=options.current+range;
			}else{
				numStart=1;
				numEnd=range*2-numStart+2;
			}
			if(numEnd>options.total){
				numStart-=numEnd-options.total;
				numStart=Math.max(numStart,1);
				numEnd=options.total;
			}
			if(numStart>1){
				htmls.push('<a class="num" href="'+getUrl(1)+'"><span>1</span></a><span class="ellipsis">...</span>');
			}
			var decorationClass=["bdt","bdl","bdb","bdr","rctl","rctr","rcbl","rcbr"];
			var decoration="";
/*			for(var i=0;i<8;i++){
				decoration+='<div class="'+decorationClass[i]+'"><b></b></div>';
			}*/
			for(var i=numStart;i<=numEnd;i++){
				var nd=Math.floor(Math.log(i)/Math.log(10))+1;
				if(i==options.current){
					htmls.push('<a class="current" href="javascript:void(0);"><span class="selnum nd'+nd+'">'+i+decoration+'</span></a>');
				}else{
					htmls.push('<a href="'+getUrl(i)+'" class="num nd'+nd+'"><span>'+i+decoration+'</span></a>');
				}
			}
			if(numEnd<options.total){
				htmls.push('<span class="ellipsis">...</span><a class="num" href="'+getUrl(options.total)+'"><span>'+options.total+'</span></a>');
			}
			if(options.current<options.total){
				htmls.push('<a href="'+getUrl(options.current+1)+'" class="next"><span>下一页</span></a>');
			}else{
				htmls.push('<a href="#" class="next hide"><b></b></a>');
			}
			
			htmls.push('<span class="page-prompt">共'+options.total+'页 到第</span>');
			htmls.push('<input class="page-input" maxlength="5"/>');
			htmls.push('<span class="page-prompt">页</span>');
			htmls.push('<a href="#" class="submit"><span>确定</span></a>');
			
			var submit=function(){
				var toPage = Number(target.find("input.page-input").val());
				toPage = Math.max(Math.min(toPage, options.total), 1);
				target.find("a.submit").attr("href", getUrl(toPage));
			};
			
			var target=$(document.getElementById(options.target));
			target.html(htmls.join(''));
			target.find("input.page-input").keydown(function(event){
				if(event.which==13){
					event.preventDefault();
					submit();
					window.location.href=target.find("a.submit").attr("href");
				}
			});
			target.find("a.submit").click(submit);
		},
		
		formatTable : function (selector) {
			var selector=selector?selector:$(".w-artcomm .content table");
			selector=selector.filter(function(index){
				return !$(this).data("formatted");
			});
			selector.wrap("<div class='table-wrapper-outer'><div class='table-wrapper-inner' /></div>");
			selector.find("tr:even td").addClass("even");
			selector.find("tr:odd td").addClass("odd");
			selector.attr("border", "0");
		},
		createMediaPaging:function(options) {
			this.mediaPage(options);
			$(".ui-pagination a").live("click",function(){
				var num=parseInt($(this).text());
				Utils.mediaPage(options,num);
				GalleryViewer.loadPage(num);
			})

		},
		mediaPage:function(options,num){
			var htmls=[];
			var range=5;
			var getUrl=function(n){
				return options.urlPattern.replace("$0",n);
			};
			if(num==null){
				options.current=parseInt(location.hash.split("#/")[1]);	
			}else{
				options.current=num;
			}
			
			var numStart,numEnd;
			if(options.current-range>1){
				numStart=options.current-range;
				numEnd=options.current+range;
			}else{
				numStart=1;
				numEnd=range*2-numStart+2;
			}
			if(numEnd>options.total){
				numStart-=numEnd-options.total;
				numStart=Math.max(numStart,1);
				numEnd=options.total;
			}
			if(numStart>1){
				htmls.push('<li><a class="nd1" href="javascript:void(0)">1</a></li><span class="ellipsis"> ... </span>');
			}

			for(var i=numStart;i<=numEnd;i++){
				var nd=Math.floor(Math.log(i)/Math.log(10))+1;
				if(i==options.current){
					htmls.push('<li class="current"><a href="javascript:void(0)" class="nd'+nd+'">'+i+'</span></a></li>');
				}else{
					htmls.push('<li><a data-pagenum='+i+' href="javascript:void(0)" class="num nd'+nd+'">'+i+'</a></li>');
				}
			}
			if(numEnd<options.total){
				htmls.push('<span class="ellipsis"> ... </span><li><a class="nd1" href="javascript:void(0)">'+options.total+'</a></li>');
			}

			
			var target=$(document.getElementById(options.target));
			target.html("<ul class='ui-pagination'>"+htmls.join('')+"</ul>");			
		},		
		_:null	
}		
