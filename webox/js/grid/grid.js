(function($){
	$.ns("mediav");
	mediav.Grid = function(box, options){
		var Cls = this;
		this.tpl_row = "<tr {#style}>";
		this.settings = $.extend({
			//"cm" : [{title: '日期', name : 'date', width : 100, sortable : true, align: 'left'}],
			"showCheckbox": true,
			"showStar": true,
			"fixedTitle": true
			//"handlePage" : $.noop,
			//"handleStar" : $.noop		
		}, options);
		this.show_pagebar = this.settings['handlePage'];

		this.box = box;
		this.j_box = $("#" + box);
		if (0 == this.j_box.length) return;
		this.j_box.css("position", "relative");

		//debugger;
		var table_html, cols_attr = [],	htmls = [], w/*, last_css = "", last_index = 0*/,sort_rel="";	
		table_html = '<div class="mvgrid"><table style="width:100%;table-layout:fixed;" border="0" cellpadding="0" cellspacing="0" class="grid">';
		htmls.push('<thead><tr class="mvgridth">');
		
		if (this.settings.showStar)
		{
			htmls.push('<th align="center">&nbsp;</th>');	
			this.tpl_row += '<td align="center"><span class="whiteIcon noborder{#star}" rid="{#ID}"></span></td>';
			cols_attr.push('<col width="25px">');
		}

		if (this.settings.showCheckbox)
		{
			htmls.push('<th align="center"><input type="checkbox" name="chkAll" /></th>');	
			this.tpl_row += '<td align="center"><input type="checkbox" name="chkItem" id="chkItem_{#ID}" value="{#ID}" /></td>';
			cols_attr.push('<col width="30px">');
		}

		//last_index = this.settings.cm.length - 1;
		$.each(this.settings.cm, function(i, v){	
			if(v.sortable){
				sort_class=' class="sort"';	
			}else{
				sort_class="";	
			}
			Cls.tpl_row += ('<td align="{#align}">{#{#name}}</td>'.supplant({
				"name": v.name,
				"align": v.align
				//"lastcss": last_css
			}));
			htmls.push('<th align="{#align}" nowrap="nowrap"{#sort_class}>{#title}</th>'.supplant({
				"align": v.talign || "center",
				"title": v.title,
				"sort_class": sort_class
			}));

			w = v.width;
			if (-1 == v.width.toString().indexOf("%"))
			{
				w = w + "px";
			}

			cols_attr.push('<col width="' + w + '">');
		});
		this.tpl_row += "</tr>";
		htmls.push('</tr></thead><tbody></tbody></table>');

		if (this.show_pagebar)
		{
			htmls.push('<table width="100%" border="0" cellpadding="0" cellspacing="0" class="pagebar">');
			htmls.push('<tr><td width="100">&nbsp;</td><td align="right">');
			htmls.push('<div class="pageArea clearFix"><a class="prevBtn prevBtnDis" href="javascript:;" rel="prev">上一页</a> <span class="pagebarStat"></span> <a class="nextBtn nextBtnDis" href="javascript:;" rel="next">下一页</a></div>');
			htmls.push('</td></tr>');
			htmls.push('</table>');
		}

		htmls.push('</div>');

		
		this.j_box.html(table_html + cols_attr.join("") + htmls.join(""));
		//console.log(table_html + cols_attr.join("") + htmls.join(""));
		//qinliang add btn start
/*		$(".btnStyle").hover(function(){
		$(this).toggleClass("btnHover").find(".btnInsideStyle").toggleClass("btnInsideHover");							  
		})
		$(".btnStyle").mousedown(function(){
		$(this).removeClass("btnHover").find(".btnInsideStyle").removeClass("btnInsideHover");							  
		}).mouseup(function(){
		$(this).addClass("btnHover").find(".btnInsideStyle").addClass("btnInsideHover");	
		})*/
		//qinliang add btn end
		// Hover event on tr
		//alert(1);
		$("table.grid tr", this.j_box).live("mouseover", function(){
			$(this).addClass("hover");
		})
		.live("mouseout", function(){
			$(this).removeClass("hover");
		});

		$("table.pagebar a", this.j_box).live("click", function(){
			if($(this).hasClass("prevBtnDis") || $(this).hasClass("nextBtnDis")){
				return false;
			}else{
				var page = $(this).attr("pageindex");
				//console.log(page);
				Cls.settings["handlePage"](page);					
			}													

			
		});

		//sql sort start
		$(".mvgrid table.grid th.sort", this.j_box).live("click", function(){
			var thIndex=$(".mvgrid table.grid th").index(this);
			if(!Cls.settings.showCheckbox && !Cls.settings.showStar){
				var cmIndex=thIndex;					
			}else{
				cmIndex=thIndex-2;	
			}
			if(Cls.show_pagebar){
				if(Cls.settings.cm[cmIndex].sortable){
					$(this).attr("title",thIndex).siblings().attr("title"," ");				
					if($(this).hasClass("desc")){								 
						$(this).removeClass("desc").addClass("asc");
					}else if($(this).hasClass("asc")){
						$(this).removeClass("asc").addClass("desc");
					}else{
						$(this).addClass("asc").siblings(".sort").attr("class","sort");
					}
					if($(this).parent(".mvgrid").find("table.pagebar a[rel=next]").hasClass("nextBtnDis")){
						var page =$("table.pagebar a[rel=last]").attr("pageindex");	
					}else{
						var page =$("table.pagebar a[rel=next]").attr("pageindex")-1;						
					}
					Cls.settings["handlePage"](page);
	/*				$(".mvgrid table.grid tr").each(function(){
						$(this).children("td").eq(thIndex).addClass("select");										 
					})	*/			
				}
			}else{
				if(Cls.settings.cm[thIndex].sortable){
					if($(this).hasClass("desc")){								 
						$(this).removeClass("desc").addClass("asc");
					}else if($(this).hasClass("asc")){
						$(this).removeClass("asc").addClass("desc");
					}else{
						$(this).addClass("asc").siblings(".sort").attr("class","sort");
					}
					//for strat
					var rows=$(".mvgrid table.grid").find("tr");
					var ar=[];
					//alert(rows.eq(1).find("td").eq(thIndex).text());
					for(i=1;i<rows.length;i++){
						ar[i-1]=[rows.eq(i).find("td").eq(thIndex).text(),rows.eq(i).clone(true)]
					}	
					if($(this).hasClass("asc")){
						ar.sort(function(a,b){	
							var i=parseFloat(b[0].replace(/(\$|\,)/g,'')),n=parseFloat(a[0].replace(/(\$|\,)/g,''));
							if(!Cls.settings.cm[thIndex].sorttype){
								return a.toString().localeCompare(b.toString());	
							}else{
								return n-i;	
							}
						});						
					}else{
						ar.sort(function(a,b){	
							var i=parseFloat(b[0].replace(/(\$|\,)/g,'')),n=parseFloat(a[0].replace(/(\$|\,)/g,''));
							if(!Cls.settings.cm[thIndex].sorttype){
								return b.toString().localeCompare(a.toString());	
							}else{
								return i-n;	
							}
							
						});
					}
					
					for(var i=rows.length-1;i>0;i--){
						rows.eq(i).remove();	
					}
					for(var i=0;i<ar.length;i++){
						$(".mvgrid table.grid").append(ar[i][1]);	
					}
					$("table.grid tr:odd", this.j_box).addClass("odd");
					$("table.grid tr:even", this.j_box).removeClass("odd");
					//alert(ar.toString());
					//for end
	
				}
					
			}
		});			
		//sql sort end
		$(":checkbox[name=chkAll]", this.j_box).click(function(){
			var checked = this.checked;
			$(":checkbox[name=chkItem]", this.j_box).each(function(){
				this.checked = checked;	
				if($(this).parents("tr").hasClass("select")){
					$(this).parents("tr").removeClass("select");
				}
			});	
		});	
		$(":checkbox[name=chkItem]", this.j_box).live("click",function(){
			$(this).parents("tr").toggleClass("select");					 
		})

		$("span.whiteIcon", this.j_box).live("click", function(){
			var t = $(this), star;
			if (t.hasClass("redIcon"))
			{
				t.removeClass("redIcon");
				star = false;
			}
			else
			{
				t.addClass("redIcon");
				star = true;
			}
			if ("function" == typeof Cls.settings["handleStar"])
			{
				Cls.settings["handleStar"].call(this, t.attr("rid"), star);
			}
		});	

		if (this.settings.fixedTitle)
		{
			
			var self = $("table.grid", this.j_box).clone(true).prependTo(this.j_box).wrap("<div></div>").parent().hide();
			self.find(".grid").children('tbody').remove();
			$(window).resize(function(){
				self.width($(".mvgrid").width());
			})
			//self.width(this.j_box.width()-17).css("top","0");
			this.fixed_header = {	
				element: self,
				height:	$(self).height(),
				y: 0
			};

			$(window).scroll(function() {								  
				var e = Cls.fixed_header,
					p, pt, ph;
					
				p=e.element.parent();//alert(p.attr("id"));debugger;
				//if(p.css("display")!="none"){
				if(p.is(':visible')){
					st = parseInt($(window).scrollTop());
					pt = parseInt($(".mvgrid").parent().offset().top);
					//pt = parseInt(p.offset().top);
					ph = parseInt(p.height());
				//if (st > pt && st + e.height < pt + ph)
					if (pt-st<=0 && st + e.height < pt + ph)
					{
						//self.width($(self).next().width());
						self.width($(".mvgrid").width());
						var bro=$.browser;
						if($.browser.msie){
							if(bro.version==6.0){
								e.element.show().css({ position: 'absolute',top: st - pt - 3 });
							}else if(bro.version==7.0){
								e.element.show().css({ position: 'fixed',top:'0',left:p.offset().left+'px'});//251	
							}else{
								e.element.show().css({ position: 'fixed',top:'0'});									
							}
						}else{
							e.element.show().css({ position: 'fixed',top:'0'});	
						}
						//e.element.show().css({ position: 'absolute', top: st - pt - 3 })
						//e.element.show().css({ position: 'fixed',top:'0'})
					}
					else
					{
						e.element.hide();
					}
				}
			});

		}


	};

	mediav.Grid.prototype = {

		"setData" : function(json){
			//return;
			var self = this;
			var tpl = self.tpl_row,
				htmls = [];
			$.each(json.result, function(i, v){		
				v.style = (i % 2 != 0) ? 'class="odd"' : '';
				v.star = ("1" == v.star) ? ' redIcon' : '';
				
				for (var v2 in v)
				{
					//console.log(v2);
					if ("star" == v2)
					{
						continue;
					}
					
					if (v[v2] == null || v[v2] == undefined || 0 == $.trim(v[v2].toString()).length)
					{
						v[v2] = "--";
					}
				}
				htmls.push(tpl.supplant(v));
			});

//			$("table.grid tr:not(:first)", self.j_box).remove().html("");
//			$("table.grid tr:first", self.j_box).after(htmls.join(""));

			//$("table.grid tbody", self.j_box).remove().html("");
			$("table.grid tbody", self.j_box).html(htmls.join(""));
			//$("table.grid tr:odd", this.j_box).addClass("odd");

			//$("table.pagebar tr td:last", self.j_box).html(self.pagination(json.paginal));
			if (self.show_pagebar)
			{
				self.pagination(json.paginal);
			}
			
		},

		"getSelected" : function(){
			var ids = $(":checkbox[name=chkItem]", this.j_box).fieldValue();
			return ids;
		},

		/**
		{"total":49,"pages":5,"size":10,"current":1}
		 */
		"pagination" : function(data)
		{
			var j_pagebar = $("table.pagebar", this.j_box),
				page = parseInt(data.current),
				size = parseInt(data.size),
				total = parseInt(data.total),
				total2 = page * size,
				html = '';

			if (total2 > total) total2 = total;

			html = (page - 1) * size + 1;
			html += " - ";
			html += total2;
			html += (' of ' + data.total);
			$("span.pagebarStat", j_pagebar).html(html);

			//debugger;
			$("a[rel=first]", j_pagebar).attr("pageindex", "1");
			
			//上一页
			if (data.current > 1)
			{
				$("a[rel=prev]", j_pagebar).attr("pageindex", (page - 1).toString()).removeClass("prevBtnDis");
			}
			else
			{
				$("a[rel=prev]", j_pagebar).addClass("prevBtnDis");
			}

			//下一页
			if (data.current < data.pages)
			{
				$("a[rel=next]", j_pagebar).attr("pageindex", (page + 1).toString()).removeClass("nextBtnDis");
			}
			else
			{
				$("a[rel=next]", j_pagebar).addClass("nextBtnDis");				
			}

			$("a[rel=last]", j_pagebar).attr("pageindex", data.pages.toString());

		}

	
	};



 })(jQuery);