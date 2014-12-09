var Wook={
  init:function(){
      this.handler = null;
      this.page = 0;
      this.isLoading = false;
      this.pageShow=20;
      this.isEnd=false;
      this.apiURL='data.json';

      this.loadData();
      this.setScroll();
      this.setLightBox();


  },
  setScroll:function(){
    $(window).bind('scroll', Wook.onScroll);    
  },
  onScroll:function(){
        if(!Wook.isLoading) {
          var closeToBottom = ($(window).scrollTop() + $(window).height() > $(document).height()-100);
          if(closeToBottom) {
            Wook.loadData();
          }
        }    
  },
  loadData:function(){

        Wook.isLoading = true;
		
        if(!Wook.isEnd){
		  $('.load-end').hide();
		  $('.load-more').hide();
          $('#loaderCircle').show();		 
          $.ajax({
            url: Wook.apiURL,
            //dataType: 'jsonp',
            dataType:"json",
            data: {page: Wook.page,time:new Date().getTime()}, // Page parameter to make sure we load new data
            success: Wook.onLoadData			
          });
        }else{
			$('.load-more').hide();
			$('.load-end').show();	
		}
  },
  onLoadData:function(data){

              
        
        var maxPage=Math.ceil(data.length/Wook.pageShow);


        // Increment page index for future calls.
        Wook.page++;

        //to max
        if(Wook.page==maxPage){
          Wook.isEnd=true;
        }

        var n=(Wook.page-1)*Wook.pageShow;

        // Create HTML for the images.
        var html = '';
        var i=n, length=Wook.pageShow*Wook.page, image;
        for(; i<length; i++) {
          image = data[i];
          if(typeof image=="undefined"){
            break;
          }
          html += '<li>';

          // Image tag (preview in Wookmark are 200px wide, so we calculate the height based on that).
          html += '<img data-width="'+image.width+'" data-height="'+image.height+'" src="'+image.url+'" width="230" height="'+Math.round(image.height/image.width*230)+'">';
		  		  
		  html += '<span class="player-name">' + image.name + '</span>';
		  
          // Image title.
          html += '<p>'+ image.title + '</p>';
		  
		  html += '<span class="play-icon"></span>';

          html += '</li>';
        }

        // Add image HTML to the page.
        $('#tiles').append(html);

		$('#tiles li').hover(
			function(){
				$(this).find('.player-name').addClass('player-name-hover');
				$(this).find('p').css('color','#fff');
				$(this).find('.play-icon').show().css('top',$(this).find('img').height()/$(this).find('img').width()*115);
			},
			function(){
				$(this).find('.player-name').removeClass('player-name-hover');
				$(this).find('p').css('color','#7b7f85');
				$(this).find('.play-icon').hide();
			}
		);
		
		

        // Apply layout.
        Wook.applyLayout();
  },
  applyLayout:function(){
      var options = {
        autoResize: true, // This will auto-update the layout when the browser window is resized.
        container: $('#tiles'), // Optional, used for some extra CSS styling
        offset: 25, // Optional, the distance between grid items
        itemWidth: 230 // Optional, the width of a grid item
      };    
        options.container.find("img").imgpreload(function() {
          
          // Create a new layout handler when images have loaded.
          handler = $('#tiles li');
          handler.wookmark(options);
          $('#loaderCircle').hide();
		  $('.load-more').show();
          Wook.isLoading = false;
        });
  },
  setLightBox:function(){
    var handler = $('#tiles li');
    handler.live("click",function(){
      var t=$(this),
          img=t.find("img"),
          img_url=img.attr("src"),
          img_w=img.attr("data-width"),
          img_h=img.attr("data-height");

      var imgHtml='<img width="'+img_w+'" height="'+img_h+'" src="'+img_url+'">'    

      $.hos.lightBox(imgHtml,{model:true});    
    })
  }
}