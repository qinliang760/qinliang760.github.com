/**
 * @fileoverview
 * @author jay
 * @module Slider
 **/
(function($) {
    $.ns("JV");

    /**
     * 
     * @class Slider
     * @constructor
     * @extends Base

        参数1  Jnode 设置slider的区域
        参数2：设置参数


     */
    JV.Slider = function(Jnode, cfg) {
        var self = this;
        var defaults = {
            sliderListId: "", //导航ID
            sliderNum: "",
            largeImg: ".imgLarge",
            fullImg: ".download a",
            showIndex: 0


        }
        this.items = $(Jnode);
        this.cfg = $.extend({}, defaults, cfg); //合并defaults和cfg，不修改defaults
        this.largeImg = $(this.cfg.largeImg, this.items);
        this.fullImg = $(this.cfg.fullImg, this.items);
        this.showIndex = parseInt(this.cfg.showIndex);
        this.init();

    }

    JV.Slider.prototype = {
        init: function() {
            var self = this;
            self.setSlider(); //设置slider
            self.setSliderHandle(); //设置slider点击

        },


        setSlider: function() {
            var self = this,
                slider = $("#" + self.cfg.sliderListId),
                slide_li = slider.find("li"),
                loading = $(".imgload", self.items);

            slide_li.eq(this.showIndex).addClass('active').siblings().removeClass("active");;    
            self.items.imageScroll({
                showPic: 5,
                imgWrapId: self.cfg.sliderListId,
                btnActive: false,
                prevCallback: function() {
                    var active = slider.find("li.active");
                    var index = active.attr("rel");
                    if (index == 0) {
                        if (self.cfg.sliderNum != "") {
                            current_num.text(1);
                        }

                        return false;
                    } else {
                        if (self.cfg.sliderNum != "") {
                            current_num.text(index);
                        }
                        index--;
                    }

                    loading.show();
                    self.largeImg.hide();
                    slide_li.eq(index).addClass('active').siblings().removeClass("active");

                    var large_url = slide_li.eq(index).data("large"),
                        full_url = slide_li.eq(index).data("full");

                    if (self.cfg.largeImg != "") {
                        self.largeImg.attr("src", large_url);
                        self.largeImg.imgpreload(function() {


                            loading.hide();
                            self.largeImg.show();

                        });


                    }
                    if (self.cfg.fullImg != "") {
                        self.fullImg.attr("href", large_url);
                    }

                },
                nextCallback: function() {
                    var active = slider.find("li.active");
                    var index = active.attr("rel"),
                        page = parseInt(index) + 2;
                    if (index == slide_li.length - 1) {
                        if (self.cfg.sliderNum != "") {
                            current_num.text(slide_li.length);
                        }
                        return false;
                    } else {
                        index++;
                        if (self.cfg.sliderNum != "") {
                            current_num.text(page);
                        }
                    }

                    slide_li.eq(index).addClass('active').siblings().removeClass("active");
                    loading.show();
                    self.largeImg.hide();

                    var large_url = slide_li.eq(index).data("large"),
                        full_url = slide_li.eq(index).data("full");

                    if (self.cfg.largeImg != "") {
                        self.largeImg.attr("src", large_url);
                        self.largeImg.imgpreload(function() {


                            loading.hide();
                            self.largeImg.show();

                        });
                    }
                    if (self.cfg.fullImg != "") {
                        self.fullImg.attr("href", large_url);
                    }

                }
            });
        },
        setSliderHandle: function() {
            var self = this;
            var li = $("#" + self.cfg.sliderListId).find("li");
            li.live('click', function() {
                var img = self.largeImg,
                    fullLink = self.fullImg,
                    loading = $(".imgload", self.items);
                var t = $(this),
                    index = t.attr("rel"),
                    type = t.parent().attr("rel"),
                    large_url = t.data("large"),
                    full_url = t.data("full");

                t.addClass('active').siblings().removeClass('active');

                loading.show();
                img.hide();
                img.attr("src", large_url);
                img.imgpreload(function() {

                    loading.hide();
                    img.show();

                });
                fullLink.attr("href", full_url);
            });
        }
    }; //prototype



})(jQuery);