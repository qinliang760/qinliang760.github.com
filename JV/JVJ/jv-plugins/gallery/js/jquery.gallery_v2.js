/*
 * gallery
 *
 * Copyright (c) 2014 Jay
 * Licensed under the MIT license.
 */

(function($){
    /**
     * 
     * @class gallery
     * @constructor
     */
    JV.gallery = function(Jnode, cfg) {
        var self = this;
        var defaults = {
            nextClass:".next",
            prevClass:".previous",
            thumbnails:"#film-strip-thumbnails a",//右侧小图
            currentImage:"#current-image",//当前大图
            oScrollbar:"#film-strip",
            data:{
                galleryType:"images",
                indices:['fanart-0209','fanart-0208','fanart-0207','fanart-0192','fanart-0206','fanart-0205','fanart-0204','fanart-0203','fanart-0202','fanart-0201','fanart-0200','fanart-0199','fanart-0198','fanart-0197','fanart-0196','fanart-0195','fanart-0194','fanart-0193','fanart-0191','fanart-0190','fanart-0189','fanart-0188','fanart-0187','fanart-0186','fanart-0185','fanart-0184','fanart-0183','fanart-0182','fanart-0181','fanart-0180','fanart-0179','fanart-0178','fanart-0177','fanart-0176','fanart-0175','fanart-0174','fanart-0173','fanart-0172','fanart-0171','fanart-0170','fanart-0169','fanart-0168','fanart-0167','fanart-0166','fanart-0165','fanart-0164','fanart-0163','fanart-0162','fanart-0161','fanart-0160','fanart-0159','fanart-0158','fanart-0157','fanart-0156','fanart-0155','fanart-0154','fanart-0153','fanart-0152','fanart-0151','fanart-0150','fanart-0149','fanart-0148','fanart-0147','fanart-0146','fanart-0145','fanart-0144','fanart-0143','fanart-0142','fanart-0141','fanart-0140','fanart-0139','fanart-0138','fanart-0137','fanart-0136','fanart-0135','fanart-0134','fanart-0133','fanart-0132','fanart-0131','fanart-0130','fanart-0129','fanart-0128','fanart-0127','fanart-0126','fanart-0125','fanart-0124','fanart-0123','fanart-0122','fanart-0121','fanart-0120','fanart-0119','fanart-0118','fanart-0117','fanart-0116','fanart-0115','fanart-0114','fanart-0113','fanart-0112','fanart-0111','fanart-0110','fanart-0109','fanart-0108','fanart-0107','fanart-0106','fanart-0105','fanart-0104','fanart-0103','fanart-0102','fanart-0101','fanart-0100','fanart-0099','fanart-0098','fanart-0097','fanart-0096','fanart-0095','fanart-0094','fanart-0093','fanart-0092','fanart-0091','fanart-0090','fanart-0089','fanart-0088','fanart-0087','fanart-0086','fanart-0085','fanart-0084','fanart-0083','fanart-0082','fanart-0081','fanart-0080','fanart-0079','fanart-0078','fanart-0077','fanart-0076','fanart-0075','fanart-0074','fanart-0073','fanart-0072','fanart-0071','fanart-0070','fanart-0069','fanart-0068','fanart-0067','fanart-0066','fanart-0065','fanart-0064','fanart-0063','fanart-0062','fanart-0061','fanart-0060','fanart-0059','fanart-0058','fanart-0057','fanart-0056','fanart-0055','fanart-0054','fanart-0053','fanart-0052','fanart-0051','fanart-0050','fanart-0049','fanart-0048','fanart-0047','fanart-0046','fanart-0045','fanart-0044','fanart-0043','fanart-0042','fanart-0041','fanart-0040','fanart-0039','fanart-0038','fanart-0037','fanart-0036','fanart-0035','fanart-0034','fanart-0033','fanart-0032','fanart-0031','fanart-0030','fanart-0029','fanart-0028','fanart-0027','fanart-0026','fanart-0025','fanart-0024','fanart-0023','fanart-0022','fanart-0021','fanart-0020','fanart-0019','fanart-0018','fanart-0017','fanart-0016','fanart-0015','fanart-0014','fanart-0013','fanart-0012','fanart-0011','fanart-0010','fanart-0009','fanart-0008','fanart-0007','fanart-0006','fanart-0005','fanart-0004','fanart-0003','fanart-0002','fanart-0001']            }
        };
        this.items = $(Jnode);
        this.cfg = $.extend({}, defaults, cfg); //合并defaults和cfg，不修改defaults
        this.data=this.cfg.data;

        this.galleryType=this.data.galleryType;
        this.viewType=this.data.viewType;
        this.indices=this.data.indices;
        this.itemPaths=this.data.itemPaths;

        this.next=$(this.cfg.nextClass,this.items);
        this.prev=$(this.cfg.prevClass,this.items);
        this.thumbnails=$(this.cfg.thumbnails,this.items);
        this.currentImage=$(this.cfg.currentImage,this.items);
        this.oScrollbar=$(this.cfg.oScrollbar);
        this.init();

    };
  
  JV.gallery.prototype = {
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
    THUMBNAIL_HOLDER_HEIGHT: 630,//一屏小图的高度

    /**
     * total height of thumbnail including borders, margin, and padding
     */
    THUMBNAIL_HEIGHT: 90,//一个小图的高度

    /**
     * ids of elements used in script
     */

    FLASH_CONTAINER_ID: "#flash-container",

    /**
     * Initializes the image viewer class, caches necessary data
     */
    init: function() {
        var self=this,
            data=self.data;


        if (self.galleryType == "images") {
            //self.currentImage = document.getElementById("current-image");
        }

        //store data key
        if (data.dataKey) {
            self.dataKey = data.dataKey;
        }

        if (!self.flashContainer) {
            self.flashContainer = $(self.FLASH_CONTAINER_ID);
        }

        //cache thumbnail nodes (link and img)
        var tempNodeList = [];
        var tempImageList = [];
        try {
            var indicesLength = self.indices.length;
            for (var x = 0; x < indicesLength; x++) {
                tempNodeList[x] = $("#thumbnail_" + self.indices[x]);
                tempImageList[x] = tempNodeList[x].find("span");
            }
        } catch(e) { }

        self.thumbnailLinkNodes = tempNodeList;
        self.thumbnailImageNodes = tempImageList;

        this.startGallery();//开始加载图片
        this.thumbnailsHandle();//小图片事件
    },
    /*
     * Load item based on its id and the gallery type
     */
    loadItem: function(nodeId) {
        var self=this;

        var oldIndex = (!self.currentId) ? 0 : self.getIndex(self.currentId);
        var newIndex = self.getIndex(nodeId);
        if (oldIndex != newIndex || newIndex==0) {//modify by jay


            //set hash for bookmarking
            //location.hash = "/" + nodeId;
            self.currentId = nodeId;

            //set new active thumbnail
            self.thumbnailLinkNodes[oldIndex].removeClass("active-film-strip-thumb-wrapper");
            self.thumbnailLinkNodes[newIndex].addClass("active-film-strip-thumb-wrapper");

            

            //ensure selected image is on the scroll bar
            var scrollOffset = self.getScrollOffset();

            //ensure thumbnails are all loaded
            self.loadFilmStripThumbnails(scrollOffset);

            self.nudgeScrollContent((newIndex + 1) * self.THUMBNAIL_HEIGHT, oldIndex, newIndex, self.THUMBNAIL_HEIGHT);

                //hide image or video so we can see loader
                if (self.galleryType == "images") {
                    self.currentImage.hide();
                } else {
                    //unload swf
                    var videoObj = swfobject.getObjectById("flash-video");

                    if (videoObj) {
                        swfobject.removeSWF("flash-video");
                        var newDiv = document.createElement("div");
                        newDiv.id = "flash-video";
                        self.flashContainer.html(newDiv);
                    }
                }

                /*if (self.metaDataTimeout != null) {
                    clearTimeout(self.metaDataTimeout);
                }*/
                var large_img=$("#thumbnail_"+nodeId).attr("data-large");
                self.currentImage.attr("src",large_img);
                self.currentImage.imgpreload(function(){
                    self.currentImage.show();
                })

                //self.imageLoader(tempImage);

        }        


        //}
    },
    imageLoader: function(loadingImage) {
        var self=this;
        //clearTimeout(self.imageTimeout);

        if (loadingImage.complete) {
            self.currentImage.attr("src",loadingImage.src);
            self.currentImage.css("display","");
        } else {
            self.currentImage.css("display","none");
            //self.imageTimeout = setTimeout(function() { self.imageLoader(loadingImage) }, 300);
        }
    },
    setVideo: function(path,w,h) {//modify by jay
        var self=this;

        var currentVideoData = path;
        
        var newFlashVars={
            flvPath:currentVideoData,
            flvWidth:w,
            flvHeight:h,
            autoPlay:true
        }

        //generate no cache string
            var noCache = new Date();
            noCache = "?nocache=" + noCache.getTime();
            Flash.videoPlayer = 'http://nos.netease.com/sc2/1/style/gameinfo/content/global-video-player/themes/sc2/video-player.swf';
            swfobject.embedSWF(Flash.videoPlayer + noCache, "flash-video", w, h, Flash.requiredVersion, Flash.expressInstall, newFlashVars, Flash.defaultVideoParams, {}, self.flashEmbedCallback);

    },
    /*
     * Custom index function for faster look up
     */
    getIndex: function(id) {
        var self=this;

        return _.indexOf(self.indices,id);

    },
    /*
     * Get next item based on item type
     */
    getNextItem: function(id) {
        var self=this;
        if (id && id != "") {
            self.loadItem(id);
        } else {
            if (self.currentId == "") self.currentId = self.indices[0];

            self.loadItem(self.getNextId(self.getIndex(self.currentId)));
        }
    },
    /*
     * Get previous item based on item type
     */
    getPreviousItem: function(id) {
        var self=this;
        if (self.currentId == "") self.currentId = indices[0];

        self.loadItem(self.getPreviousId(self.getIndex(self.currentId)));
    },
    getNextId: function(index) {
        var self=this;
        return self.indices[self.getNextIndex(index)];
    },
    getPreviousId: function(index) {
        var self=this;
        return self.indices[self.getPreviousIndex(index)];
    },
    getNextIndex: function(index) {
        var self=this;
        return ((index + 1 == self.indices.length) ? 0 : index + 1);
    },
    getPreviousIndex: function(index) {
        var self=this;
        return ((index > 0) ? index - 1 : self.indices.length - 1);
    },

    nudgeScrollContent: function(margin, oldIndex, newIndex, imageSize) {
        var self=this;
        var scrollPaneHeight = 615;
        var currentOffset = self.getScrollOffset();
        
   

        //thumb is cut off at top
        var topLimit = newIndex * imageSize;
        if (currentOffset > topLimit) {
           self.oScrollbar.tinyscrollbar_update(topLimit);
        }

        //thumb is cut off at bottom
        if (newIndex > 6) {
            var bottomLimit = (newIndex - 6) * imageSize;
            if (currentOffset < bottomLimit) {
                self.oScrollbar.tinyscrollbar_update(bottomLimit);
            }
        }
    },
    getViewableRange: function(offsetTop) {
        var self=this;
        if (!offsetTop) var offsetTop = self.getScrollOffset();

        var minThumbnailIndex = Math.floor(offsetTop / self.THUMBNAIL_HEIGHT);
        var maxThumbnailIndex = Math.ceil((offsetTop + self.THUMBNAIL_HOLDER_HEIGHT) / self.THUMBNAIL_HEIGHT) - 1;
        //make sure index doesn't go above max range
        if (maxThumbnailIndex >= self.indices.length) maxThumbnailIndex = self.indices.length - 1;

        return [minThumbnailIndex, maxThumbnailIndex];
    },
    loadFilmStripThumbnails: function(offsetTop) {
        var self=this;

        if (self.slideTimeout != null) {
            clearTimeout(self.slideTimeout);
        }

        self.slideTimeout = setTimeout(function() {


            if (!offsetTop) {
                var offsetTop = self.getScrollOffset();
            }

            var thumbnailBounds = self.getViewableRange(offsetTop);
            var minThumbnailIndex = thumbnailBounds[0];
            var maxThumbnailIndex = thumbnailBounds[1];
            //console.log(minThumbnailIndex+"=========="+maxThumbnailIndex);

            for (var x = minThumbnailIndex; x <= maxThumbnailIndex; x++) {
                if (self.thumbnailLinkNodes[x].hasClass("thumbnail-loader")) {
                    var bg = $(self.thumbnailImageNodes[x]).attr("data-thumbsrc");

                    var backgroundImage = new Image();
                    backgroundImage.src = bg;

                    self.setImageBackground(backgroundImage, self.thumbnailLinkNodes[x]);
                }
            }
        }, 100);
    },
    thumbSlide: function() {
        var self=this;
      clearTimeout(self.slideTimeout);
        self.slideTimeout = setTimeout(function () {
            self.loadFilmStripThumbnails()
        }, 100);
    },
    setImageBackground: function(backgroundImage, target) {
        var self=this;
        if (backgroundImage.complete) {
            $(target).css("background-image", "url(' " + backgroundImage.src + "')").removeClass("thumbnail-loader");

        } else {
            setTimeout(function() { self.setImageBackground(backgroundImage, target) }, 100);
        }


    },
    getHashInfo: function() {
        var hs=location.hash;
        if (hs) {
            return hs.replace("#","");
        } else {
            return "";
        }
    },
    getScrollOffset: function() {
        var self=this;
        return Math.abs(parseInt(self.filmStripThumbnails.css("top")));
    },
    /**
     * Display error when flash is not installed
     */
    flashEmbedCallback: function(e) {
        var self=this;
        if (!e.success) {

            self.flashContainer.html("flash no install");//modify by jay
            
            //hide loader
            $("#film-strip-ajax-target").css("background", "none");
        }       
    },
    startGallery:function(){
        var self=this,
            indices=self.indices;
           //film-strip initializers 滚动条图片展示
                //get flash rrready
                if (self.galleryType == "videos") {

                }



                        self.oScrollbar.tinyscrollbar( {
                            scrollbarSelector: '.viewport-scrollbar',//滚动条
                            viewportSelector: '.viewport-content',//滚动显示的小图片
                            overviewSelector: "#film-strip-thumbnails",

                            slideCallback: function () {
                                self.loadFilmStripThumbnails(self.getScrollOffset());
                            }
                        });



                //cache elements for scrolling
                self.filmStripThumbnails = $("#film-strip-thumbnails");
                self.scrollThumb = $("#scroll-thumb");
                self.scrollThumbHeight = self.scrollThumb.outerHeight();
                self.scrollRatio = ((indices.length * self.THUMBNAIL_HEIGHT) - 615)/(615 - self.scrollThumbHeight); //scroll thumb : track ratio                                
                
                //set first image to active if no hash, load its comments and show image
                if (!(location.hash && location.hash != "")) {//如果地址栏没有传参数

                    $("#" + indices[0]).addClass("active-film-strip-thumb-wrapper");
                    if (self.galleryType == "videos") {
                        //self.setVideo(0);                
                    } else {
                        self.currentImage.show();
                    }
                    self.loadItem(indices[0]);//modify by jay

                } else {//如果地址有参数
                    var hashInfo = self.getHashInfo();
                    var imageKey = hashInfo;

                    //first item doesn't need AJAX call, preload next and last image
                    if (indices[0] == imageKey) {

                        $("#" + indices[0]).addClass("active-film-strip-thumb-wrapper");
                        //self.loadComments(indices[0], 0);

                        if (self.galleryType == "videos") {
                            //self.setVideo(0);
                            self.loadItem(indices[0]);
                        } else {
                            //self.preloadImages([self.getNextIndex(0), self.getPreviousIndex(0)], 'large');
                            self.currentImage.show();
                            self.loadItem(imageKey);
                        }
                    } else if (self.getIndex(imageKey) > 0) {
                        self.loadItem(imageKey);
                    }
                }


                

                 
    },//start gallery
    thumbnailsHandle:function(){
        var self=this;

        //next click
        self.next.bind("click",function(){
            self.getNextItem();
        })

        //prev click
        self.prev.bind("click",function(){
            self.getPreviousItem();  
        })

        //thumbnails click
        self.thumbnails.bind("click",function(){
            var id=$(this).attr("id").replace("thumbnail_","");
            location.href=location.protocol + "//" + location.host+location.pathname+"#"+id;
            self.loadItem(id);
        })
    }

  };//prototype end


 })(jQuery);