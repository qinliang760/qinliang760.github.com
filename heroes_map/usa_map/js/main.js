define([
	"jquery"/*,
	"bnet-modal"*/
], function ($) {
	"use strict";
	return {
		init: function(options) {
			this.listenersBound = false;
			this.modalTrigger = ".marketing-content";
			this.$modalEl = $("#modal");
			if (options.$modalElem != null) {
				this.$modalEl = options.$modalElem;
			}
			if (options.modalTrigger != null) {
				this.modalTrigger = options.modalTrigger;
			}
			this.$modalTrigger = $(this.modalTrigger);
			this.bindHandlers();
		},
		bindHandlers: function() {
			var that = this;
			if (this.listenersBound !== true) {
				$("body").on("click", this.modalTrigger, function(e) {
					e.preventDefault();
					var $this = $(this);
					if ($this.data("type") === "video") {
						$("<div class='sixteen-nine'><iframe src='//www.youtube.com/embed/" + $this.data("src") + "?autoplay=1&amp;wmode=opaque' frameborder='0' allowfullscreen='' class='sixteen-nine__media'></iframe></div><div class='close'><span class='fa fa-times'></span></div>").appendTo(that.$modalEl);
					}
					if ($this.data("type") === "image") {
						var id = $this.find("img").data("full-image");
						$("<img src='" + window.encodeURI(id) + "' /><div class='close'><span class='fa fa-times'></span></div>").appendTo(that.$modalEl);
					}
					that.$modalEl.modal("show");
				});

				$("body").on("click", ".modal-backdrop, .modal .close", function(ev) {
					if ($(ev.target).is("img")) {
						return;
					}
					that.$modalEl.modal("hide");
					that.$modalEl.empty();
				});
				this.listenersBound = true;
			}
		},
		unbind: function() {
			if (this.$modalTrigger != null) {
				$("body").off("click", this.modalTrigger);
			}
			this.listenersBound = false;
		}
	};
});
