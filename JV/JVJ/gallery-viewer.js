var GalleryViewer = {
	/**
	 * boolean to determine if init() has been run yet
     */
    initialized: false,

    /**
     * array to cache film strip responses
     */
    filmStripCache: {},

    /**
     * temporary keywords (not applied until hit 'apply')
     */
    tempKeywords: "",

    /**
     * list of keywords for filtering
     */
    keywords: "",

    /**
     * Id of the current item
     */
    currentId:         "",

    /**
     * Type of gallery, can be images or videos
     */
    galleryType: "images",

    /**
     * data key for ajax call
     */
    dataKey: null,

    /**
     * array to cache thumbnail pages
     */
    thumbnailPageCache: {},

    pageTimeout:       null,
    slideTimeout:      null,
    
    /*
     * 评论锁定
     **/
    commenton: null ,

    /**
     * Current thumbnail page
     */
    currentThumbnailPage: 1,
    commentLoadTimeout: null, //timer for the delay of loading comments
    metaDataTimeout:    null, //timer for the delay of loading meta data
    imagePreloadTimeout: null, //timer for the delay of preloading images
    imageTimeout:       null, //time for the delay of setting the viewing image
    /*
     * Constants
     */
    THUMBNAIL_HOLDER_HEIGHT: 630,

    /**
     * total height of thumbnail including borders, margin, and padding
     */
    THUMBNAIL_HEIGHT: 90,

    /**
     * ids of elements used in script
     */
    AJAX_CONTAINER_ID: "#item-viewer",
    PREV_LINK_ID:      "#previous-item",
    NEXT_LINK_ID:      "#next-item",
    THUMBNAIL_LIST_ID: "#media-thumbnails .thumbnail-link",
    AJAX_URL:          "media/meta-data",
    PAGING_NODE:       "#thumbnail-page",
    PRELOAD_CONTAINER_ID: "#media-preload-container",
    META_CONTAINER_ID: "#media-meta-data",
    FLASH_CONTAINER_ID: "#flash-container",
    COMMENTS_NODE_ID:  "#media-comments",

    /**
     * Initializes the image viewer class, caches necessary data
     */
    init: function() {
        //store containers
        GalleryViewer.preloadContainer = $(GalleryViewer.PRELOAD_CONTAINER_ID);
        GalleryViewer.metaDataContainer = $(GalleryViewer.META_CONTAINER_ID);

        if (GalleryViewer.galleryType == "images") {
            GalleryViewer.currentImage = document.getElementById("current-image");
        }

        //store data key
        if (dataKey) {
            GalleryViewer.dataKey = dataKey;
        }

        if (!GalleryViewer.commentsNode) {
            GalleryViewer.commentsNode = $(GalleryViewer.COMMENTS_NODE_ID);
        }

        if (!GalleryViewer.flashContainer) {
            GalleryViewer.flashContainer = $(GalleryViewer.FLASH_CONTAINER_ID);
        }

        if (!GalleryViewer.loadCommentCache) {
            GalleryViewer.loadCommentCache = GalleryViewer.commentsNode.html();
        }

        //cache thumbnail nodes (link and img)
        var tempNodeList = [];
        var tempImageList = [];
        try {
            var indicesLength = indices.length;
            for (var x = 0; x < indicesLength; x++) {
                tempNodeList[x] = $("#" + indices[x]);
                tempImageList[x] = tempNodeList[x].find("span");
            }
        } catch(e) { }

        GalleryViewer.thumbnailLinkNodes = tempNodeList;
        GalleryViewer.thumbnailImageNodes = tempImageList;

        GalleryViewer.initialized = true;
    },
    /*
     * Load item based on its id and the gallery type
     */
    loadItem: function(nodeId) {

        if (!GalleryViewer.initialized) {
            GalleryViewer.init();
        }

        if (!GalleryViewer.dataKey) {
            return;
        }

        var oldIndex = (GalleryViewer.currentId == "") ? 0 : GalleryViewer.getIndex(GalleryViewer.currentId);
        var newIndex = GalleryViewer.getIndex(nodeId);

        if (oldIndex != newIndex || newIndex==0) {//modify by jay
            //set comments node back to 'Loading comments...'
            GalleryViewer.commentsNode.html(GalleryViewer.loadCommentCache);

            //set hash for bookmarking
            location.hash = "/" + nodeId;
            GalleryViewer.currentId = nodeId;

            //set new active thumbnail
            GalleryViewer.thumbnailLinkNodes[oldIndex].removeClass("active-film-strip-thumb-wrapper");
            GalleryViewer.thumbnailLinkNodes[newIndex].addClass("active-film-strip-thumb-wrapper");

            //ensure thumbnails are all loaded
            GalleryViewer.loadFilmStripThumbnails(scrollOffset);

            //ensure selected image is on the scroll bar
            var scrollOffset = GalleryViewer.getScrollOffset();

            GalleryViewer.nudgeScrollContent((newIndex + 1) * GalleryViewer.THUMBNAIL_HEIGHT, oldIndex, newIndex, GalleryViewer.THUMBNAIL_HEIGHT);

            //load cached meta data	modfiy by jay
            /*if (GalleryViewer.filmStripCache[nodeId]) {
                GalleryViewer.metaDataContainer.html(GalleryViewer.filmStripCache[nodeId]);
                GalleryViewer.loadComments(nodeId, 0);

                //preload two next/previous images
                if (GalleryViewer.galleryType == "images") {
                	//GalleryViewer.preloadImages(GalleryViewer.getPreloadIndices(newIndex, (oldIndex < newIndex)), "large");
                }
            } else {*/
                //hide image or video so we can see loader
                if (GalleryViewer.galleryType == "images") {
                    GalleryViewer.currentImage.style.display = "none";
                } else {
                    //unload swf
                    var videoObj = swfobject.getObjectById("flash-video");

					if (videoObj) {
                        swfobject.removeSWF("flash-video");
                        var newDiv = document.createElement("div");
                        newDiv.id = "flash-video";
                        GalleryViewer.flashContainer.html(newDiv);
                    }
                }

                if (GalleryViewer.metaDataTimeout != null) {
                	clearTimeout(GalleryViewer.metaDataTimeout);
                }

                GalleryViewer.metaDataTimeout = setTimeout(function(){
                	//fetch data
                    $.ajax({
                        type: "GET",
                        url: "/" + GalleryViewer.AJAX_URL,
	                    data: ({
	                        id: nodeId,
	                        dataKey: GalleryViewer.dataKey
	                    }),
                        dataType: "html",
                        success: function(msg) {//jay#1 msg变成接收大图地址，图片说明，关键字，下载
                            //set meta data and cache
							var msg=eval("("+msg+")");
							var uploadDate =msg.uploadDate;
							var keywords=msg.keywords;
							var submitman=msg.submit;
							var detailJson = eval("("+msg.detailJson+")"); //added by yuandg
							commenton=msg.commentOn;							
						
							var keys=[];
							var title=msg.title;
							
							if(keywords.length){								
								for(var i=0;i<keywords.length;i++){
									keys.push('<a href="?keywords='+keywords[i].key+'">'+keywords[i].value+'</a>');
								}
								keys="<span style='border-left:1px solid #005A8E; font-size:14px; padding:0 10px;margin-left:10px'>关键词："+keys.join("，")+"</span>";	
							}else{
								keys="";	
							}
							
							//modified by yuandg
							var downloadHtml="";
							var resolutionsHtml="";
							if(typeof detailJson.full != "undefined") {
								downloadHtml='<p><a target="_blank" href="'+detailJson.full+'">下载完整图片</a></p>';
							}
							var resolutionList = detailJson.resolutionList;
							if((typeof resolutionList != "undefined") && (resolutionList.length > 0)) {
								for(var i=0;i<resolutionList.length;i++){
									for(var resolution in resolutionList[i]){
										resolutionsHtml+='<a style="padding:0 5px; display:inline-block" target="_blank" href='+resolutionList[i][resolution]+'>'+resolution+'</a>,';	
									}
								}
								resolutionsHtml="<p style='word-break:break-all;word-wrap:break-word'>分辨率："+resolutionsHtml.substring(0,resolutionsHtml.length-1)+"</p>";
							}
							var titleHtml='';
							if(typeof title != 'undefined'){
								titleHtml='<p style="font-size:18px">'+title+'</p>';
							}else{
								titleHtml='';
							}
							
							var submitMan=''
							if(typeof submitman != 'undefined' && submitman != ''){
								submitMan=' <span style="border-left:1px solid #005A8E; padding-right:6px"></span>提交人：'+submitman;
							}else{
								submitMan='';
							}
							
						
							var html=titleHtml+'<p>上传日期：'+uploadDate+keys+submitMan+'</p>'+downloadHtml + resolutionsHtml;
							
							
							itemPaths[newIndex]=detailJson.large;
                            GalleryViewer.metaDataContainer.html(html);
                            GalleryViewer.filmStripCache[nodeId] = html;
                            GalleryViewer.loadComments(nodeId, 0);
					//for keywords
					$(".keyword-filter").each(function(){
						var key=$(this).attr("ref");
						if(keys.indexOf(key)!=-1){
							$(this).addClass("checked");	
						}else{
							$(this).removeClass("checked");	
						}	
					})							
							
            //set image modify by jay
            if (GalleryViewer.galleryType == "images") {
                var tempImage = new Image();
                tempImage.src = itemPaths[newIndex];//modify by jay
                GalleryViewer.imageLoader(tempImage);
            } else if (GalleryViewer.galleryType == "videos") {
				var path=detailJson.flvPath;
				var w=detailJson.width;
				var h=detailJson.height;
                GalleryViewer.setVideo(path,w,h);
            }
                            //preload two next/previous images
                            if (GalleryViewer.galleryType == "images") {
                                //GalleryViewer.preloadImages(GalleryViewer.getPreloadIndices(newIndex, (oldIndex < newIndex)), "large");
                            }
                        },
                        error: function(msg) {

                        }
                    });
                }, 200);

            }


        //}
    },
    imageLoader: function(loadingImage) {
    	clearTimeout(GalleryViewer.imageTimeout);

        if (loadingImage.complete) {
            GalleryViewer.currentImage.src = loadingImage.src;
            GalleryViewer.currentImage.style.display = "";
        } else {
        	GalleryViewer.currentImage.style.display = "none";
            GalleryViewer.imageTimeout = setTimeout(function() { GalleryViewer.imageLoader(loadingImage) }, 300);
        }
    },
    setVideo: function(path,w,h) {//modify by jay

        var currentVideoData = path;
        /*var newFlashVars = $.extend({//modify by jay
            flvPath:   Flash.videoBase + currentVideoData.flv,
            flvWidth:  currentVideoData.w,
            flvHeight:         currentVideoData.h,
            captionsPath:      "",
            captionsDefaultOn: (Core.locale != "en-us" && Core.locale != "en-gb")
        }, Flash.defaultVideoFlashVars);*/
		
		var newFlashVars={
			flvPath:currentVideoData,
			flvWidth:w,
			flvHeight:h,
			autoPlay:true
		}
		//add captions
        /*if (typeof currentVideoData.captionsPath != "undefined" && currentVideoData.captionsPath != "") {
            newFlashVars.captionsPath = currentVideoData.captionsPath;
        } else {
            delete newFlashVars.captionsPath;
        }

        //change rating if needed
        if (typeof currentVideoData.customRating != "undefined" && currentVideoData.customRating != "") {
        	if (currentVideoData.customRating == "NONE") {
            	delete newFlashVars.ratingPath;
            } else {
            	newFlashVars.ratingPath = currentVideoData.customRating;
            }
        } else {
            newFlashVars.ratingPath = Flash.ratingImage;
        }*/

        //generate no cache string
            var noCache = new Date();
            noCache = "?nocache=" + noCache.getTime();
Flash.videoPlayer = 'http://nos.netease.com/sc2/1/style/gameinfo/content/global-video-player/themes/sc2/video-player.swf';
        swfobject.embedSWF(Flash.videoPlayer + noCache, "flash-video", w, h, Flash.requiredVersion, Flash.expressInstall, newFlashVars, Flash.defaultVideoParams, {}, GalleryViewer.flashEmbedCallback);
		//swfobject.embedSWF(Flash.videoPlayer + noCache, "flash-video", 400, 400, Flash.requiredVersion, Flash.expressInstall, newFlashVars, Flash.defaultVideoParams, {}, GalleryViewer.flashEmbedCallback);

    },
    /*
     * @param int[] itemIndices
     * @param string suffix
     */
    preloadImages: function(itemIndices, suffix) {

    	//delay preloading of images incase of fast paging
    	if (GalleryViewer.imagePreloadTimeout != null) {
    		clearTimeout(GalleryViewer.imagePreloadTimeout);
    	}

    	GalleryViewer.imagePreloadTimeout = setTimeout(function() {
    		var index = itemIndices.length - 1;

            if (index >= 0) {
                do {
                    var imagePreload = new Image();
                    imagePreload.src = itemPaths[itemIndices[index]] + "-" + suffix + ".jpg";
                    GalleryViewer.preloadContainer.append(imagePreload);

                    //preload next thumbnail as well
                    if (suffix == "large") {
                    	var smallImagePreload = new Image();
                    	smallImagePreload.src = itemPaths[itemIndices[index]] + "-small.jpg";

                    	GalleryViewer.setImageBackground(smallImagePreload, GalleryViewer.thumbnailLinkNodes[itemIndices[index]]);

                    }
                }
                while (index--);
            }
    	}, 400);

        GalleryViewer.preloadMetaData(itemIndices);
    },
    /*
     * @param int[] itemIndices
     */
    preloadMetaData: function(metaDataIndex) {

        var nodeId = indices[metaDataIndex];

            if (!GalleryViewer.filmStripCache[nodeId]) {
                $.ajax({
                    type: "GET",
                    url: "/" + GalleryViewer.AJAX_URL,
                    data: ({
                        id: nodeId,
                        dataKey: GalleryViewer.dataKey,
                        preload: "preload"
                    }),
                    dataType: "html",
                    success: function(msg) {
                        GalleryViewer.filmStripCache[nodeId] = msg;
                    }
                });
            }

    },
    getPreloadIndices: function(currentIndex, movingForward) {
        var preloadIndex = 0;
        var nextPreloadIndex = 0;

        if (movingForward) {
            preloadIndex = GalleryViewer.getNextIndex(currentIndex);
            nextPreloadIndex = GalleryViewer.getNextIndex(preloadIndex);
        } else {
            preloadIndex = GalleryViewer.getPreviousIndex(currentIndex);
            nextPreloadIndex = GalleryViewer.getPreviousIndex(preloadIndex);
        }

        return [preloadIndex, nextPreloadIndex];
    },
    /*
     * Custom index function for faster look up
     */
    getIndex: function(id) {
        var index = indices.length - 1;

        if (index >= 0 && id != "") {
            do {
                if (indices[index] == id) {
                    return index;
                }
            }
            while (index--);
        }

        return 0;
    },
    /*
     * Get next item based on item type
     */
    getNextItem: function(id) {
        if (id && id != "") {
            GalleryViewer.loadItem(id);
        } else {
            if (GalleryViewer.currentId == "") GalleryViewer.currentId = indices[0];

            GalleryViewer.loadItem(GalleryViewer.getNextId(GalleryViewer.getIndex(GalleryViewer.currentId)));
        }
    },
    /*
     * Get previous item based on item type
     */
    getPreviousItem: function(id) {
        if (GalleryViewer.currentId == "") GalleryViewer.currentId = indices[0];

        GalleryViewer.loadItem(GalleryViewer.getPreviousId(GalleryViewer.getIndex(GalleryViewer.currentId)));
    },
    getNextId: function(index) {
        return indices[GalleryViewer.getNextIndex(index)];
    },
    getPreviousId: function(index) {
        return indices[GalleryViewer.getPreviousIndex(index)];
    },
    getNextIndex: function(index) {
        return ((index + 1 == indices.length) ? 0 : index + 1);
    },
    getPreviousIndex: function(index) {
        return ((index > 0) ? index - 1 : indices.length - 1);
    },
    getNextPage: function() {
		var options={target:"commentPage",total:numThumbnailPages,urlPattern:"$0"};
        if (location.hash && location.hash != "") {
            var page = location.hash.substring(2) * 1;

            if (page + 1 > numThumbnailPages) {
				Utils.mediaPage(options,1);
                GalleryViewer.loadPage(1);
            } else {
				Utils.mediaPage(options,page+1);
                GalleryViewer.loadPage(page + 1);
				 
            }
        } else if (numThumbnailPages >= 2) {
			Utils.mediaPage(options,2);
            GalleryViewer.loadPage(2);
        }
    },
    getPreviousPage: function() {
		var options={target:"commentPage",total:numThumbnailPages,urlPattern:"$0"};
        if (location.hash && location.hash != "") {
            var page = location.hash.substring(2) * 1;
			
            if (page > 1){ 
				Utils.mediaPage(options,page-1);
				GalleryViewer.loadPage(page - 1);
			}else{ 
				Utils.mediaPage(options,numThumbnailPages);
				GalleryViewer.loadPage(numThumbnailPages);
			}
			
        } else {
			Utils.mediaPage(options,numThumbnailPages);
            GalleryViewer.loadPage(numThumbnailPages);
        }
    },
    loadPage: function(page) {
        if (!GalleryViewer.initialized) {
            GalleryViewer.init();
        }

        if (!GalleryViewer.dataKey) {
            return;
        }

        if (!GalleryViewer.thumbnailPageNode) {
            GalleryViewer.thumbnailPageNode = $(GalleryViewer.PAGING_NODE);
        }
		//page nav add active modify by jay\

		//$(".pagination-wrapper a[data-pagenum="+page+"]").parent().addClass("current").siblings().removeClass("current");
        GalleryViewer.currentThumbnailPage = page;		
		//set nav active
		//$("#sub-nav > a[href*='"+GalleryViewer.dataKey+"']").addClass("active").siblings().removeClass("active");
		
        location.hash = "/" + page;

        //update page display
        GalleryViewer.currentPageDisplay.text(page);
		//if(page==1){return}
        if (GalleryViewer.thumbnailPageCache[page]) {
            GalleryViewer.thumbnailPageNode.html(GalleryViewer.thumbnailPageCache[page]);
        } else {
            //get data
            $.ajax({
                type: "GET",
                url: "/media/thumbnail-page",
                data: ({
                    page: page,
                    dataKey: dataKey,
                    keywords: keywordParameter
                }),
                dataType: "html",
                success: function(msg) {//modify by jay
					var msg=eval("("+msg+")");
					var html="";
					var dataKey=msg.dataKey;
					var medias=msg.medias;
					var imgStyle="";
					keywordParameter=="''"?keywordParameter="":"";
					var floatHtml="";
					
					//$("#currentKeywords").html(keywordParameter);	
					for (var i=0;i<medias.length;i++){
						if((i+1)%4==0){
							imgStyle=" style='margin-right:0'";	
							floatHtml='<span class="clear"></span>';
							
						}else{
							imgStyle="";
							floatHtml="";	
						}
						if(typeof medias[i].title != "undefined"){
							var title='<span class="thumb-title">'+medias[i].title+'</span>';
						}else{
							var title="";
						}
						//var backgroundImage = new Image();
                    	//backgroundImage.src = imgPath;
						
						//style="background-image: url('+imgPath+');"
						//modified by yuandg
						html+='<a'+imgStyle+' href="/media/'+dataKey+'/?keywords='+keywordParameter+'&view#/'+medias[i].id+'" class="thumb-wrapper"><span class="thumb-bg thumbnail-loader"><span class="thumb-frame" data-thumbsrc="'+medias[i]["index-thumb"]+'"></span></span>'+title+'</a>'+floatHtml;
					}
					html="<div class='f-cb'>"+html+"</div>";
					//$("#thumbnail-page a.thumb-wrapper").removeClass("thumbnail-loader");
//$("#thumbnail-page a.thumb-wrapper > span").css("background","none");
//$("#thumbnail-page a.thumb-wrapper").addClass("thumbnail-loader");debugger;					
					
                    GalleryViewer.thumbnailPageNode.html(html);					
                    GalleryViewer.handleLoadPage(page);
					//for keywords
					$(".keyword-filter").each(function(){
						var key=$(this).attr("ref");
						if(keywordParameter.indexOf(key)!=-1){
							$(this).addClass("checked");	
						}else{
							$(this).removeClass("checked");	
						}	
					})
                },
                error: function(msg) {

                }
            });
        }
    },
    handleLoadPage: function(page) {
        if (!GalleryViewer.initialized) {
            GalleryViewer.init();
        }

        if (!GalleryViewer.thumbnailPageNode) {
            GalleryViewer.thumbnailPageNode = $(GalleryViewer.PAGING_NODE);
        }

        GalleryViewer.remainingImagesToLoad = $(".index-thumb", GalleryViewer.thumbnailPageNode).length;

        $(".thumbnail-loader", GalleryViewer.thumbnailPageNode).each(function(i) {
            var thumbNode = this;
            var imgSrc = $(".thumb-frame", thumbNode).attr("data-thumbsrc");

            //load images
            var tempImage = new Image();
            tempImage.src = imgSrc;
            setTimeout(function() {
              GalleryViewer.loadThumbnailPageFrame(tempImage, imgSrc, $(thumbNode), page || 1);
            }, 100);
        });
    },
    loadThumbnailPageFrame: function(image, src, target, page) {
        if (image.complete) {

            GalleryViewer.setImageBackground(image, target);
            GalleryViewer.remainingImagesToLoad--;

            if (GalleryViewer.remainingImagesToLoad == 0 && GalleryViewer.currentThumbnailPage == page) {
                GalleryViewer.thumbnailPageCache[page] = GalleryViewer.thumbnailPageNode.html();
            }
        } else {
            setTimeout(function () {
                GalleryViewer.loadThumbnailPageFrame(image, src, target, page)
            }, 100);
        }

    },
    nudgeScrollContent: function(margin, oldIndex, newIndex, imageSize) {
        var scrollPaneHeight = 615;
        var currentOffset = GalleryViewer.getScrollOffset();
        
   

        //thumb is cut off at top
        var topLimit = newIndex * imageSize;
        if (currentOffset > topLimit) {
           oScrollbar.tinyscrollbar_update(topLimit);
        }

        //thumb is cut off at bottom
        if (newIndex > 6) {
            var bottomLimit = (newIndex - 6) * imageSize;
            if (currentOffset < bottomLimit) {
                oScrollbar.tinyscrollbar_update(bottomLimit);
            }
        }
    },
    prepareKeywords: function(triggerNode, activeClass, targetPath) {
        //set call back for this dropdown
        Toggle.callback = GalleryViewer.cancelFilter;

        //fetch keywords from DOM (TODO: make better)
        if (GalleryViewer.keywords == "") {
            var keywordData = document.getElementById("keyword-list");
            if (keywordData) GalleryViewer.keywords = keywordData.innerHTML;
        }

        //assign temporary keywords
        GalleryViewer.tempKeywords = GalleryViewer.keywords;

        //trigger the open
        Toggle.open(triggerNode, activeClass, targetPath);
					//for keywords modify by jay
					var href=location.href;
					$(".keyword-filter").each(function(){
						var key=$(this).attr("ref");
						if(href.indexOf(key)!=-1){
							$(this).addClass("checked");	
						}else{
							$(this).removeClass("checked");	
						}	
					})		
    },
    buildKeywords: function(node, keyword) {
		$(node).toggleClass("checked");
        /*if (GalleryViewer.tempKeywords.indexOf(keyword + ",") == -1) {
            GalleryViewer.tempKeywords += keyword + ",";
            node.className = "keyword-filter checked";
        } else {
            GalleryViewer.tempKeywords = GalleryViewer.tempKeywords.replace(keyword + ",", "");
            node.className = "keyword-filter";
        }*/
    },
    /*
     * Join keyworks and refresh page with new urls
     */
    applyKeywordFilter: function(onFilmStripView) {
		var keyArr=[];
		$(".keyword-filter").each(function(){
			if($(this).hasClass("checked")){
				var key=$(this).attr("ref");
				keyArr.push(key);
			}	
		})//modify by jay
		GalleryViewer.keywords=keyArr.join(",")+",";
        //GalleryViewer.keywords = GalleryViewer.tempKeywords;

        var urlPrepend = "?";

        if (typeof onFilmStripView == "boolean" && onFilmStripView) {
            urlPrepend = "?view=&";
        }

        if (GalleryViewer.keywords != "") {
            location.href = urlPrepend + "keywords=" + GalleryViewer.keywords.substring(0, GalleryViewer.keywords.length - 1);
        } else {
            location.href = location.pathname + (urlPrepend == "?" ? "" : urlPrepend);
        }
    },
    /*
     * Cancels the selected filters and resets back
     */
    cancelFilter: function() {

        //close element
        document.getElementById("filter-options").style.display = "none";

        $("#filter-options .keyword-filter").each(function(){

            var id = this.id.split("keyword-", 2)[1];

            if (GalleryViewer.keywords.indexOf(id) == -1) {
                this.className = "keyword-filter";
            } else {
                this.className = "keyword-filter checked";
            }
        });
    },
    getViewableRange: function(offsetTop) {
        if (!offsetTop) var offsetTop = GalleryViewer.getScrollOffset();

        var minThumbnailIndex = Math.floor(offsetTop / GalleryViewer.THUMBNAIL_HEIGHT);
        var maxThumbnailIndex = Math.ceil((offsetTop + GalleryViewer.THUMBNAIL_HOLDER_HEIGHT) / GalleryViewer.THUMBNAIL_HEIGHT) - 1;

        //make sure index doesn't go above max range
        if (maxThumbnailIndex >= indices.length) maxThumbnailIndex = indices.length - 1;

        return [minThumbnailIndex, maxThumbnailIndex];
    },
    loadFilmStripThumbnails: function(offsetTop) {

    	if (GalleryViewer.slideTimeout != null) {
    		clearTimeout(GalleryViewer.slideTimeout);
    	}

        GalleryViewer.slideTimeout = setTimeout(function() {

            if (!GalleryViewer.initialized) {
                GalleryViewer.init();
            }

            if (!offsetTop) {
                var offsetTop = GalleryViewer.getScrollOffset();
            }

            var thumbnailBounds = GalleryViewer.getViewableRange(offsetTop);
            var minThumbnailIndex = thumbnailBounds[0];
            var maxThumbnailIndex = thumbnailBounds[1];

            for (var x = minThumbnailIndex; x <= maxThumbnailIndex; x++) {
                if (GalleryViewer.thumbnailLinkNodes[x].hasClass("thumbnail-loader")) {
                    var bg = GalleryViewer.thumbnailImageNodes[x].attr("data-thumbsrc");

                    var backgroundImage = new Image();
                    backgroundImage.src = bg;

                    GalleryViewer.setImageBackground(backgroundImage, GalleryViewer.thumbnailLinkNodes[x]);
                }
            }
        }, 100);
    },
    thumbSlide: function() {
      clearTimeout(GalleryViewer.slideTimeout);
        GalleryViewer.slideTimeout = setTimeout(function () {
            GalleryViewer.loadFilmStripThumbnails()
        }, 100);
    },
    setImageBackground: function(backgroundImage, target) {

    	if (backgroundImage.complete) {
    		target.css("background-image", "url(' " + backgroundImage.src + "')").removeClass("thumbnail-loader");
//modify by jay
    		//if (Core.isIE(6)) {
	          //target.hide().show();
	        //}
    	} else {
    		setTimeout(function() { GalleryViewer.setImageBackground(backgroundImage, target) }, 100);
    	}


    },
    loadComments: function(nodeId, commentsPage) {
	
		
		
		
		if(commenton==1){
			Public.appendComment("/comments/show/M-"+nodeId,"media-comments",960);
			Public.commentsInt();
		}else if(commenton==0){
			var divBox=$('<div style="background: #011E4B;border: 4px solid #011E4B; border-radius: 4px 4px 4px 4px; color: #00D683; margin-top:10px; text-align:center">该评论已锁定！</div>')
			$('#media-comments').append(divBox)
		}

		
        /*if (!GalleryViewer.initialized) {
            GalleryViewer.init();
        }

        if (!nodeId) {
        	nodeId = (GalleryViewer.currentId != "" ) ? GalleryViewer.currentId : indices[0];
        }

        var nodeIndex = GalleryViewer.getIndex(nodeId);

        if (!commentsPage) {
        	var hashInfo = GalleryViewer.getHashInfo();
            commentsPage = (hashInfo.length >= 3) ? hashInfo[2] : 1;

            if (typeof commentsPage == "undefined" || commentsPage == "") {
            	commentsPage = 1;
            }
        }


        //set hash for bookmarking
        if (commentsPage > 1) {
            location.hash = "/" + nodeId + "&commentsPage=" + commentsPage;
        } else {
            location.hash = "/" + nodeId;
        }

        //generate no cache string if needed
        var noCache = new Date().getTime() ; //modify by jay

        //check for keywords
        var keywordData = document.getElementById("keyword-list");
        if (keywordData) {
            GalleryViewer.keywords = keywordData.innerHTML;
        }

        var keywordsData = (GalleryViewer.keywords != "") ? GalleryViewer.keywords.substring(0, GalleryViewer.keywords.length - 1) : "";

        if (GalleryViewer.commentLoadTimeout != null) {
        	clearTimeout(GalleryViewer.commentLoadTimeout);
        }

        GalleryViewer.commentLoadTimeout = setTimeout(function() {
            $.ajax({
                type: "GET",
                url: "/media/comments",
            data: ({
                id: nodeId,
                    dataKey: GalleryViewer.dataKey,
                    //discussionSig: discussionSigs[nodeIndex], modify by jay 
                    noCache: noCache,
                    keywords: keywordsData,
                    page: commentsPage
                }),
                dataType: "html",
                success: function(msg) {

                	GalleryViewer.commentsNode
                		.stop(true, true)
                		.fadeOut(200, function() {
	                		GalleryViewer.commentsNode
	                			.html(msg)
	                			.fadeIn(200);
	                	});
                },
                error: function(msg) {
                    GalleryViewer.commentsNode.html($("#comments-error-retry").html());
                }
            });
        }, 400);*/
    },
    getHashInfo: function() {
        if (location.hash) {
            return(/#\/([^&]*)(?:&commentsPage=(.*))?/.exec(location.hash));
        } else {
            return [];
        }
    },
    getScrollOffset: function() {
        return Math.abs(parseInt(GalleryViewer.filmStripThumbnails.css("top")));
    },
    /**
     * Display error when flash is not installed
     */
    flashEmbedCallback: function(e) {
    	if (!e.success) {
    		//show flash not installed error messages    		
    		//GalleryViewer.flashContainer.html(Flash.getFlashError());
			GalleryViewer.flashContainer.html("flash no install");//modify by jay
    		
    		//hide loader
    		$("#film-strip-ajax-target").css("background", "none");
    	}    	
    }
   
};

//set vars
GalleryViewer.galleryType = galleryType;
GalleryViewer.flashContainer = $(GalleryViewer.FLASH_CONTAINER_ID);
var oScrollbar;

$(document).ready(function() {
    //film-strip initializers
    if (viewType == "film-strip") {

        //get flash rrready
        if (GalleryViewer.galleryType == "videos") {
            Flash.initialize();
        }

        //if (indices.length > 7) {
            oScrollbar = $('#film-strip');
            //$(document).ready(function(){
                oScrollbar.tinyscrollbar( {
                    scrollbarSelector: '.viewport-scrollbar',
                    viewportSelector: '.viewport-content',
                    overviewSelector: "#film-strip-thumbnails",

                    slideCallback: function () {
                        GalleryViewer.loadFilmStripThumbnails(GalleryViewer.getScrollOffset());
                    }
                });
            //});
        //}

        //cache elements for scrolling
        GalleryViewer.filmStripThumbnails = $("#film-strip-thumbnails");
        GalleryViewer.scrollThumb = $("#scroll-thumb");
        GalleryViewer.scrollThumbHeight = GalleryViewer.scrollThumb.outerHeight();
        GalleryViewer.scrollRatio = ((indices.length * GalleryViewer.THUMBNAIL_HEIGHT) - 615)/(615 - GalleryViewer.scrollThumbHeight); //scroll thumb : track ratio
        //set first image to active if no hash, load its comments and show image
        if (!(location.hash && location.hash != "")) {

            $("#" + indices[0]).addClass("active-film-strip-thumb-wrapper");
            if (GalleryViewer.galleryType == "videos") {
                //GalleryViewer.setVideo(0);				
            } else {
                GalleryViewer.currentImage = document.getElementById("current-image");
                GalleryViewer.currentImage.style.display = "";
            }
			GalleryViewer.loadItem(indices[0]);//modify by jay
            //GalleryViewer.loadComments(indices[0], 0);
        } else {
            var hashInfo = GalleryViewer.getHashInfo();
            var imageKey = hashInfo[1];

            //first item doesn't need AJAX call, preload next and last image
            if (indices[0] == imageKey) {

                $("#" + indices[0]).addClass("active-film-strip-thumb-wrapper");
                //GalleryViewer.loadComments(indices[0], 0);

                if (GalleryViewer.galleryType == "videos") {
                    //GalleryViewer.setVideo(0);
					GalleryViewer.loadItem(indices[0]);
                } else {
                	//GalleryViewer.preloadImages([GalleryViewer.getNextIndex(0), GalleryViewer.getPreviousIndex(0)], 'large');
                	GalleryViewer.currentImage = document.getElementById("current-image");
                	GalleryViewer.currentImage.style.display = "";
					GalleryViewer.loadItem(imageKey);
                }
            } else if (GalleryViewer.getIndex(imageKey) > 0) {
                GalleryViewer.loadItem(imageKey);
            }
        }
    }
    //thumbnail page initializers
    else if (viewType == "thumbnail-page") {

        GalleryViewer.currentPageDisplay = $("#start-page")

        if (!(location.hash && location.hash != "")) {
        	 GalleryViewer.loadPage(1);
        } else {
            var hashInfo = GalleryViewer.getHashInfo();
            var pageKey = parseInt(hashInfo[1]);
            if (!isNaN(pageKey)) {
                GalleryViewer.loadPage(pageKey);
            }
        }
    }
});


//allow paging with arrow keys
$(document).keydown(function (currentEvent) {
    if (GalleryViewer) {
        var keyNum = (window.event) ? currentEvent.keyCode : currentEvent.which;

        var currentTarget = currentEvent.target;

        if (!($(currentTarget).is("textarea") || $(currentTarget).is("input[type='text']"))) {
            if (keyNum == 37) {
                if (viewType == "film-strip") GalleryViewer.getPreviousItem();
                else if (viewType == "thumbnail-page") GalleryViewer.getPreviousPage();
            } else if (keyNum == 39) {
                if (viewType == "film-strip") GalleryViewer.getNextItem();
                else if (viewType == "thumbnail-page") GalleryViewer.getNextPage();
            }
        }
    }
});






