// app.js
!function(root, factory){

    factory(root);

}(this, function(root){

    function App(){

        this.extend = function(opts){
    		_.merge(this, opts);
        };

    };

    return root.app = root.app || new App();

});

!function(root, factory){

    factory(root);

}(this, function(root){

    function Overwatch(){

        this.extend = function(opts){
    		_.merge(this, opts);
        };

    };

    return root.overwatch = !(root.overwatch instanceof Overwatch) ? new Overwatch() : root.overwatch;

});

!function(root, factory){

    factory(root, root.overwatch);

}(this, function(root, overwatch){

    function Util(){

        var util = this;
        var document = root.document;
        var body = root.document.body;

        this.width = function(){
            return root.innerWidth || document.documentElement.clientWidth || body.clientWidth;
        };

        this.height = function(){
            return root.innerHeight || document.documentElement.clientHeight || body.clientHeight;
        };

        this.sizes = function(){

            var width = util.width();

            return {
                // phones portrait
                xs: width < 400,

                // phones landscape
                sm: width >= 400 && width < 768,

                // tablet portrait
                md: width >= 768 && width < 992,

                // tablet landscape || small desktop
                lg: width >= 992 && width < 1300,

                // large desktops
                xl: width >= 1300 && width < 1600,

                // x-large desktops/ retina laptops
                xxl: width >= 1600
            };
        };

        this.mobile = function(){
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobi/i.test(window.navigator.userAgent);
        };

        this.touch = function(){
            return ('ontouchstart' in window) || (window.navigator.MaxTouchPoints > 0) || (window.navigator.msMaxTouchPoints > 0);
        };

        this.vendor = function(){
            var vendor = null;
            var style = document.documentElement.style;
            _.each(['webkit', 'Moz', 'ms', 'O'], function(prefix, key){
                if(style[prefix + 'Transform'] !== undefined){
                    vendor = prefix;
                }
            });
            return vendor;
        };

        this.size = function(){
            var size = null;
            _.each(util.sizes(), function(bool, key){
                if(bool) size = key;
            });
            return size;
        };

        this.ie = function(){
            var agent = root.navigator.userAgent;
            var ie_10down = /MSIE \d/.test(agent);
            var ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.test(agent);
            return ie_10down || ie_11up;
        };

        this.browser = function(){

            var agent = root.navigator.userAgent;
            var vendor = root.navigator.vendor;

            var gecko = /gecko\/\d/i.test(agent);
            var chrome = /Chrome\//.test(agent);
            var safari = /Apple Computer/.test(vendor);
            var edge = /Edge/.test(agent);

            return {
                ie: util.ie(),
                gecko: gecko,
                chrome: chrome,
                safari: safari,
                edge: edge
            };
        };

        this.posX = function(){
            return root.pageXOffset || root.scrollX || body.scrollLeft || document.documentElement.scrollLeft;
        };

        this.posY = function(){
            return root.pageYOffset || root.scrollY || body.scrollTop || document.documentElement.scrollTop;
        };

        this.scroll = function(){
            return body.scrollHeight > body.clientHeight && body.style.position !== 'fixed';
        };

        this.vw = function(int){
            return (util.width()/100) * int;
        };

        this.vh = function(int){
            return (util.height()/100) * int;
        };

    };

    overwatch.extend({ util: new Util() });

    return overwatch.util;

});

!function(root, factory){

    factory(root.overwatch, root.localStorage);

}(this, function(overwatch, localStorage){

    function Storage(){

        // check if localstorage is available
        this.available = function(){
            return localStorage ? true : false;
        };

        // serialize value and store by key
        this.set = function(key, value){
            localStorage.setItem(key, JSON.stringify(value));
        };

        // get value by key and deserialze
        this.get = function(key){
            return JSON.parse(localStorage.getItem(key));
        };

        // remove object from storage by key
        this.remove = function(key){
            localStorage.removeItem(key);
        };

        // clear all data in storage
        this.clear = function(){
            localStorage.clear();
        };

    };

    overwatch.extend({ storage: new Storage() });

    return overwatch.storage;

});

!function(root, factory){

    factory(root, root.overwatch);

}(this, function(root, overwatch){

    function Blackout(){

        var blackout = this;
        var util = overwatch.util;

        var pos = 0;
        var isOpen = 0;
        var $root = $(root);
        var $body = $('body');
        var $elem = $('<div class="blackout" blackout />').appendTo($body);

        function setEvents(){
            $elem.on('click.blackout', function(event){
                event.stopPropagation();
                blackout.hide();
            });
            // $root.on('resize.blackout', _.throttle(function(){
            //     if(util.width() <= 768){
            //         blackout.hide();
            //     }
            // }, 100));
            //$root.on('keyup.blackout', function(event){
            //    if(event.which === 27){
            //        blackout.hide();
            //    }
            //});
        };

        function show(){
            if(!isOpen){
                isOpen = 1;
                $elem.trigger('show');
                $elem.toggleClass('open', true);
                setEvents();
                pos = $root.scrollTop();
                $body.css({ position: 'fixed', marginTop: -pos + 'px' });
            }
        };

        function hide(){
            if(isOpen){
                isOpen = 0;
                $elem.trigger('hide');
                $elem.toggleClass('open', false);
                $body.css({ position: '', marginTop: '' });
                $root.scrollTop(pos);
                $elem.off('click.blackout');
                pos = 0;
                //$root.off('keyup.blackout');
                //$root.off('resize.blackout');
            }
        };

        this.show = show;

        this.hide = hide;

        this.open = show;

        this.close = hide;

        this.on = function(){
            $elem.on.apply($elem, arguments);
        };

        this.off = function(){
            $elem.off.apply($elem, arguments);
        };

        this.one = function(){
            $elem.one.apply($elem, arguments);
        };

    };

    overwatch.extend({ blackout: new Blackout() });

    return overwatch.blackout;

});

!function(root, factory){

    factory(root, root.overwatch);

}(this, function(root, overwatch){

    var blackout = overwatch.blackout;

    function Lightbox(){

        var lightbox = this;

        var time = 200;
        var isOpen = 0;
        var $root = $(root);
        var $body = $('body');
        var $elem = $('<div class="lightbox" lightbox="main"></div>').appendTo($body);
        var $container = $('<div class="lightbox-container"></div>').appendTo($elem);
        var $header = $('<div class="lightbox-header"></div>').appendTo($container);
        var $body = $('<div class="lightbox-body"></div>').appendTo($container);
        var $content = $('<div class="lightbox-content"></div>').appendTo($body);
        var $prev = $('<a href="#" class="lightbox-prev"></a>').appendTo($body);
        var $next = $('<a href="#" class="lightbox-next"></a>').appendTo($body);
        var $footer = $('<div class="lightbox-footer"></div>').appendTo($container);
        var $close = $('<div class="lightbox-close"></div>').appendTo($elem);

        function setEvents(){

            $elem.one('click.lightbox', function lightboxClick(event){
                event.stopPropagation();
                lightbox.hide();
                $elem.trigger('lightbox.background');
            });

            $close.one('click.lightbox', function closeButton(event){
                event.stopPropagation();
                lightbox.hide();
                $elem.trigger('lightbox.x');
            });

            $container.on('click.lightbox', function container(event){
                event.stopPropagation();
            });

            $root.on('keyup.lightbox', function keyPress(event){

                var which = event.which;

                // if key matches prevent default
                if(/37|39|32|27/.test(which)){
                    event.preventDefault();
                }

                // esc key - close modal
                if(which == 27){

                    lightbox.hide();
                    $elem.trigger('key.esc');

                // left arrow
                } else if(which == 37){

                    $elem.trigger('prev');

                // right arrow
                } else if(which == 39){

                    $elem.trigger('next');

                // space bar - if video exists pause or play
                } else if(which == 32){

                    $elem.trigger('pause');
                }
            });
        };

        function set(opts, callback){

            var opts = _.isPlainObject(opts) ? opts : {};
            var callback = _.isFunction(opts) ? opts : _.isFunction(callback) ? callback : _.noop;
            var $html = $(opts.content || null);

            if(opts.size === 'fluid'){
                $elem.toggleClass('fluid', true);
            } else {
                $elem.toggleClass('fluid', false);
            }

            if(opts.controls){
                $body.toggleClass('m-controls', true);
            } else {
                $body.toggleClass('m-controls', false);
            }

            if(opts.body){
                var $bodyHtml = $(opts.body);
                if(!$bodyHtml.length){
                    $bodyHtml = $('<div>', { html: opts.body });
                }
                $content.remove();
                $content = $bodyHtml.addClass('lightbox-content').appendTo($body);
            }

            if(opts.header){
                $header.html(opts.header);
            }

            if(opts.footer){
                $footer.html(opts.footer);
            }

            callback();
        };

        function show(){
            if(!isOpen){
                isOpen = 1;
                blackout.show();
                setEvents();
                $elem.toggleClass('open', true);
                $elem.trigger('show');
            }
            set.apply(null, arguments);
        };

        function hide(){
            if(isOpen){
                isOpen = 0;
                blackout.hide();
                $root.off('keyup.lightbox');
                $elem.toggleClass('open', false);
                $elem.trigger('hide');
                $container.off('click.lightbox');
            }
        };

        function empty(){
            $content.remove();
            $content = $('<div>');
            $header.empty();
            $footer.empty();
        };

        function init(){

            $prev.on('click.lightbox', function(event){
                event.preventDefault();
                $elem.trigger('prev');
            });

            $next.on('click.lightbox', function(event){
                event.preventDefault();
                $elem.trigger('next');
            });
        };

        this.set = set;

        this.show = show;

        this.hide = hide;

        this.open = show;

        this.close = hide;

        this.empty = empty;

        this.on = function(){
            $elem.on.apply($elem, arguments);
        };

        this.off = function(){
            $elem.off.apply($elem, arguments);
        };

        this.one = function(){
            $elem.one.apply($elem, arguments);
        };

        init();

    };

    overwatch.extend({ lightbox: new Lightbox() });

    return overwatch.lightbox;

});

!function(root, factory){

    factory(root, root.overwatch);

}(this, function(root, overwatch){

    var util = overwatch.util;
    var lightbox = overwatch.lightbox;

    // store api loaded state
	var uid = 0;
	var cache = {};
	var apiLoaded = 0;
	var apiLoading = 0;
	var apiError = 0;

	// buffer requests til api is loaded
	var apiBuffer = [];
	var errBuffer = [];

	// url strings
	var apiUrl = '//www.youtube.com/iframe_api/';
	var embedUrl = '//www.youtube.com/embed/';

	// default video player options
	var defaults = {
		id: null,
		states: {
			'-1': 'unstarted',
			'0': 'ended',
			'1': 'playing',
			'2': 'paused',
			'3': 'buffering',
			'5': 'video-cued'
		},
		params: {
			autoplay: 1,
			autohide: 1,
			controls: 1,
			modestbranding: 1,
			showinfo: 1,
			version: 3,
			enablejsapi: 1,
			wmode: 'transparent',
			rel: 0
		},
		build: {
			$play: true,
			$poster: true,
			$video: true
		},
		templates: {
			$play: function(){
				var video = this;
                var $elem = $('<div>', {
                    addClass: 'play',
                    on: {
                        click: function(){
                            if(video.loaded){
        						video.player.playVideo();
        					} else {
                                video.one('ready', function(){
                                    video.player.playVideo();
                                });
                            }
                        }
                    }
                })
				return $elem;
			},
			$poster: function(){
				return $('<div class="poster">');
			},
			$video: function(){
                var video = this;
                var $elem = $('<iframe>', {
                    addClass: 'video',
                    attr: {
                        width: '100%',
                        height: '100%',
                        allowfullscreen: true,
                        frameborder: 0,
                        src: embedUrl + video.id + '?' + $.param(video.opts.params)
                    }
                });
				return $elem;
			}
		}
	};

	function processApiBuffer(){
		for(var i = 0; i < apiBuffer.length; i++){
			apiBuffer[i]();
		}
		apiBuffer = [];
	};

	function processErrBuffer(){
		for(var i = 0; i < errBuffer.length; i++){
			errBuffer[i]();
		}
		errBuffer = [];
	};

	function loadIframeAPIScript(){

		if(!apiLoaded && !apiLoading && !apiError){

            apiLoading = 1;

            var script = $('<script>', {
                attr: {
                    async: true,
                    src: apiUrl,
                    type: 'text/javascript'
                }
            })[0];

            script.onerror = function(){
                apiLoaded = 0;
				apiError = 1;
				processErrBuffer();
            };

			// callback function when youtube api is ready
			window.onYouTubeIframeAPIReady = function(){

				apiLoaded = 1;
				apiLoading = 0;

				// process buffered requests
				processApiBuffer();
			};

            document.body.appendChild(script);
		}
	};

	/*
	* check if api is loaded, if not trigger load
	* store callbacks in buffer if not loaded
	*/
	function loadIframeAPI(done, err){

        var err = err || _.noop;
        var done = done || _.noop;

		// if api can't load run error
		if(apiError){

            err();

		// if loaded run callback
		} else if(apiLoaded){

			done();

		// if already loading push callback and error to buffers
		} else if(apiLoading){

			apiBuffer.push(done);
			errBuffer.push(err);

		// if not loaded or loading trigger load
		// and push callback and error to buffers
		} else {

			apiBuffer.push(done);
			errBuffer.push(err);
			loadIframeAPIScript();

		}
	};

	// video object constructor
	function YoutubeVideo(opts, done){

        var video = this;
        var done = done || _.noop;
        var opts = _.merge({}, defaults, opts);
        var vid = uid++;
        var elems = {};
        var $root = $(opts.elem);
        var state = null;

        function destroy(){
            $root.toggleClass(state, false);
            if(video.player.stopVideo){
        		video.player.stopVideo();
            }
            if(video.player.clearVideo){
        		video.player.clearVideo();
            }
            if(video.player.destroy){
        		video.player.destroy();
            }
            video.player = null;
    		video.$root.empty();
    		cache[vid] = null;
    	};

        function init(){

            var browser = util.browser();

            $root.toggleClass('loading', true);
            $root.toggleClass('unstarted', true);
            $root.toggleClass('m-mobile', util.mobile());
            $root.toggleClass('m-touch', util.touch());
            $root.toggleClass('m-edge', browser.edge);
            $root.toggleClass('m-ie', browser.ie);
            $root.toggleClass('m-chrome', browser.chrome);
            $root.toggleClass('m-safari', browser.safari);
            $root.toggleClass('m-gecko', browser.gecko);

            _.each(opts.build, function(bool, name){
                if(bool){
                    $root.append(elems[name] = opts.templates[name].call(video));
                }
            });

            loadIframeAPI(function(){

                video.player = new YT.Player(elems.$video[0], {

    				events: {

    					onReady: function(event){
    						video.loaded = 1;
    						video.loading = 0;
                            $root.toggleClass('loading', false);
                            $root.trigger('ready');
                            done(video);
    					},

    					onStateChange: function(event){
                            var newstate = opts.states[event.data];
    						if(state){
                                $root.toggleClass(state, false);
    						}
                            $root.toggleClass(newstate, true);
                            $root.trigger('stateChange', newstate);
    						video.state = state = newstate;
    					}
    				}
    			});

            });

            elems.$video.on('load', function(){
                $root.toggleClass('loading', false);
            });

            cache[vid] = video;

        };

        this.id = opts.id;
		this.loaded = 0;
		this.loading = 1;
		this.state = state;
        this.uid = vid;
        this.opts = opts;
        this.$root = $root;
        this.destroy = destroy;
        this.elems = elems;

        this.on = function(){
            $root.on.apply($root, arguments);
        };

        this.off = function(){
            $root.off.apply($root, arguments);
        };

        this.one = function(){
            $root.one.apply($root, arguments);
        };

        init();

	};

    function Video(){

        function create(opts, done){
            return new YoutubeVideo(opts, done);
        };

        function destroy(video){
            if(video.destroy){
                return video.destroy();
            }
        };

        function createAll(done){

            $('[video]').each(function(){

                create({
                    elem: this,
                    id: $(this).attr('video')
                }, done);

            });

        };

        function get(id){
            return cache[id];
        };

        function set(opts){
            return _.merge(defaults, opts);
        };

        function init(){

        };

        this.create = create;
        this.destroy = destroy;
        this.createAll = createAll;
        this.get = get;
        this.set = set;

        init();

    };

	loadIframeAPI();

    overwatch.extend({ video: new Video() });

    return overwatch.video;

});

/**
 * Hero Ability Showcase module
 */
!function(root, factory) {

	// amd
	if (typeof define === 'function' && define.amd){
		define('overwatch-ability-showcase', ['overwatch', 'jQuery'], factory);

	// node
	} else if (typeof exports === 'object'){
		module.exports = factory(require('overwatch', 'jQuery'));

	// browser global
	} else {
		root.overwatch['AbilityShowcase'] = factory(root.overwatch, root.jQuery);
	}

}(this, function(overwatch, $) {

	// inner element selectors
	var SELECTOR_ABILITY_NAME = '.ability-name';
	var SELECTOR_ABILITY_BUTTON = '.ability-showcase-button';
	var SELECTOR_ABILITY_BUTTON_LIST = '.ability-button-list';
	var SELECTOR_PROGRESS_SVG = '.progress-svg';

	// classes to be toggled
	var CLASS_IS_PLAYING = 'is-active';
	
	/**
	 * Ability Showcase
	 * @Constructor
	 * @param {string} showcase - Selector for this module's parent element
	 */
	function AbilityShowcase(showcase) {
		var $showcase = $(showcase);

		// cache elements
		this.$videos = $showcase.find('video');
		this.videos = this.$videos.get();
		this.$abilityName = $showcase.find(SELECTOR_ABILITY_NAME);
		this.$abilityButtons = $showcase.find(SELECTOR_ABILITY_BUTTON);
		this.$abilityButtonsList = $showcase.find(SELECTOR_ABILITY_BUTTON_LIST);
		this.$currentProgressSvg = null;
		this.currentVideo = null;

		// grab metadata from ability buttons
		this.abilities = getAbilityData(this.$abilityButtons);

		this.length = this.videos.length;

		this.currentIndex = 0;
		this.nextIndex = null;
	}

	/**
	 * Initializes this module for use.
	 *
	 * Adds video event handlers, button click event handlers, and plays the first video.
	 */
	AbilityShowcase.prototype.init = function init() {
		var self = this;

		// register video event handlers
		self.$videos.on('ended', function loadNext() {
			// play queued up video if exists, otherwise play next video
			self.play(self.getNextIndex());
		});
		self.$videos.on('playing', function updateProgressBar() {
			// animate fill progress circle, completing the animation within the total duration of the video
			var videoDurationMs = self.currentVideo.duration * 1000;
			self.$currentProgressSvg
				.velocity({
					strokeDashoffset: [ 0, 314 ]
				}, videoDurationMs, 'linear');
		});

		// queue up (preload) next video on half way mark of current video
		self.$videos.on('timeupdate', function queueNext() {
			// only preload next video if it hasn't already been queued + preloaded
			if (self.nextIndex === null) {
				var progress = getMediaProgressDec(this);
				if (progress > 0.5) {
					self.queue(self.getNextIndex());
				}
			}
		});

		// register ability button video play triggers
		self.$abilityButtonsList.on('click', 'li', function handleAbilityButtonClick() {
			var i = $(this).index();
			self.play(i);
		});

		// initialize first video
		self.load(self.currentIndex);
		self.play(self.currentIndex);
	};

	AbilityShowcase.prototype.getNextIndex = function getNextIndex() {
		return this.nextIndex !== null ? this.nextIndex : this.currentIndex + 1;
	};
	
	/**
	 * Performs various DOM interactions to display a video's "play" state.
	 *
	 * @param {int} i - index of video to perform action upon
	 */
	AbilityShowcase.prototype.displayPlay = function displayPlay(i) {
		i %= this.length;
		var ability = this.abilities[i];

		this.$abilityName.text(ability.name);
		this.$abilityButtons.eq(i).addClass(CLASS_IS_PLAYING);
		this.$videos.eq(i).addClass(CLASS_IS_PLAYING);

		// cache these elements that are repeatedly looked up
		this.currentVideo = this.videos[i];
		this.$currentProgressSvg = this.$abilityButtons.eq(i).find(SELECTOR_PROGRESS_SVG);
	};

	/**
	 * Performs various DOM interactions to display a video's "stop" state.
	 *
	 * @param {int} i - index of video to perform action upon
	 */
	AbilityShowcase.prototype.displayStop = function displayStop(i) {
		i %= this.length;
		this.$abilityButtons.eq(i).removeClass(CLASS_IS_PLAYING);
		this.$videos.eq(i).removeClass(CLASS_IS_PLAYING);

		// stop progress circle animation
		this.$abilityButtons.eq(i).find(SELECTOR_PROGRESS_SVG)
			.velocity('stop')
			.velocity({
				strokeDashoffset: 314 // default stroke dash offset
			}, 0);
	};

	/**
	 * Plays a video by its index, updates the current video index, and presents
	 * a "play" interface.
	 *
	 * If no index is provided, will play the current video.
	 *
	 * @param {int} [i=this.currentIndex] - index of video to perform action upon
	 */
	AbilityShowcase.prototype.play = function play(i) {
		// stop whatever video may currently be playing
		this.stop(this.currentIndex);

		// play specified video, otherwise default to playing current video
		this.currentIndex = (i === undefined) ? this.currentIndex : (i % this.length);

		// reset this video's progress before playing
		this.reset(this.currentIndex);

		this._play(this.currentIndex);

		// clear the next video queue
		this.nextIndex = null;
	}

	/**
	 * Stops a video by its index and presents a "stop" interface.
	 *
	 * If no index is provided, will stop all videos.
	 *
	 * @param {int} [i] - index of video to perform action upon
	 */
	AbilityShowcase.prototype.stop = function stop(i) {
		// no specific video to stop, so stop them all
		if (i === undefined) { this._stopAll(); return; }

		i %= this.length;
		// TODO: ie11 breaks because of this? why?
		this.videos[i].pause();

		this.displayStop(i);
	};

	/**
	 * Resets a video by its index to its start state. This does not pause the video.
	 *
	 * @param {int} i - index of video to perform action upon
	 */
	AbilityShowcase.prototype.reset = function reset(i) {
		i %= this.length;
		// can only reset currenttime when video is ready (on certain browsers)
		// HAVE_ENOUGH_DATA - corresponds to 'canplay' media event
		if (this.videos[i].readyState === 4) {
			this.videos[i].currentTime = 0;
		}
	};

	/**
	 * Queues a video by its index.
	 *
	 * If a video is already queued, this function does nothing.
	 *
	 * @param {int} i - index of video to perform action upon
	 */
	AbilityShowcase.prototype.queue = function queue(i) {
		// another video already queued, exit
		if (this.nextIndex !== null) { return; }

		i %= this.length;
		this.nextIndex = i;

		// trigger preload
		this.load(i);
	};

	/**
	 * Loads a video by its index.
	 *
	 * @param {int} i - index of video to perform action upon
	 */
	AbilityShowcase.prototype.load = function load(i) {
		i %= this.length;
		this.videos[i].load();
	};

	/**
	 * Plays a video by its index and presents a "play" interface.
	 *
	 * @param {int} i - index of video to perform action upon
	 */
	AbilityShowcase.prototype._play = function _play(i) {
		i %= this.length;
		this.videos[i].play();

		this.displayPlay(i);
	};

	/**
	 * Stops all videos, regardless of their play state.
	 */
	AbilityShowcase.prototype._stopAll = function _stopAll() {
		for (var i = 0; i < this.length; i++) {
			this.stop(i);
		}
	};

	/**
	 * Gets the progress of a media element.
	 *
	 * @param {HTMLMediaElement} media
	 * @return {float} Decimal value (0.0 -> 1.0) representing media element progress
	 */
	function getMediaProgressDec(media) {
		return media.currentTime / media.duration;
	}

	/**
	 * Adapter function for retrieving ability data from ability buttons.
	 *
	 * @return {Array<Object>} Array of objects, each representing hero ability data.
	 */
	function getAbilityData($abilityButtons) {
		return $.map($abilityButtons, function adaptAbilityData(button) {
			var $button = $(button);
			return {
				name: $button.data('ability-name')
			};
		});
	}

	overwatch.extend({ AbilityShowcase: AbilityShowcase });
	return AbilityShowcase;

});

!function(root, factory){

    factory(root.overwatch);

}(this, function(overwatch){

    function Animate(){

        function slideInLeft($elem, opts){
            var opts = _.merge({ duration: 300, easing: 'easeOutCirc' }, opts);
            $elem.velocity({ translateX: ['+=100%', '-100%'], translateZ: 0 }, opts);
        };

        function slideOutLeft($elem, opts){
            var opts = _.merge({ duration: 300, easing: 'easeOutCirc' }, opts);
            $elem.velocity({ translateX: ['-=100%', 0], translateZ: 0 }, opts);
        };

        this.slideInLeft = slideInLeft;
        this.slideOutLeft = slideOutLeft;

    };

    overwatch.extend({ animate: new Animate() });

    return overwatch.animate;

});

!function(root, factory){

	factory(root, root.jQuery, root.overwatch);

}(this, function(root, $, overwatch){
	var carousel = {
		defaults: {
			numToShow: 1,
			numToSlide: 1,
			animationDuration: 500,
			autoScroll: false,
			timePerSlide: 5000,
			loop: true,
			pagination: true,
			slideWidth: 0,
			gutter:12			
		},
		item_width: 0,
		klass: "carousel",
		mask_klass: "carousel-mask",
		wrapper_klass: "carousel-wrapper",
		slide_klass: "carouse-slide",
		pagination_klass: "carousel-pagination",
		page_klass: "carousel-page",
		init: function(element, options) {
			this.options = _.merge({}, this.defaults, options);
			var options = this.options;
			this.element = element;
			this.setup();
			this.calculateDimensions();
			this.addElements();
			this.setupEvents();
			if (options.autoScroll) {
				this.startSliding();
			}
		},
		setup: function() {
			var options = this.options;
			this.element.addClass(this.klass);
			this.defineObjects();
			//this.determineStatus();
			if (options.pagination) {
				this.pagination = this.buildPagination();
			}
			if (options.slideWidth) {
				this.item_width = options.slideWidth;
			}
		},
		defineObjects: function() {
			var options = this.options;
			this.wrapper = this.element.children("ul").addClass(this.wrapper_klass);
			this.items = this.wrapper.children("li");
			this.pages = Math.ceil(this.items.length / options.numToSlide);
			this.mask = $("<div/>").addClass(this.mask_klass);
			this.duration = options.animationDuration;
		},
		buildPagination: function() {
			var options = this.options,
				i = 1,
				pageContainer = $("<ul/>").attr("class", this.pagination_klass),
				html = "";
			while (i <= (this.pages - (options.numToShow - options.numToSlide))) {
				html += '<li class="' + this.page_klass;
				if (i === 1) {
					html += ' is-active'
				}
				html += '" data-page="' + i + '"';
				html += ">&nbsp</li>";
				i++;
			}
			pageContainer.html(html);
			return pageContainer;
		},
		calculateDimensions: function() {
			var options = this.options,
				self = this;

			this.items.addClass(self.slide_klass);
			
			if (options.numToShow === 1) {
				this.items.css("margin", 0);
			} else {
				this.items.css("margin", "0 "+options.gutter+"px");
			}
			if (this.item_width === 0) {
				this.item_width = this.items.first().outerWidth(true);
			}
			this.maxHeight = this.items.first().outerHeight(true)
			this.mask.css({
				width: this.item_width * options.numToShow,
				height: this.maxHeight
			});
			this.wrapper.css("width", this.item_width * this.items.length);
		},
		addElements: function() {
			var options = this.options;

			this.mask = this.wrapper.wrap(this.mask).parent();
			if (options.pagination) {
				this.element.append(this.pagination);
			}
		},
		setupEvents: function() {
			this.element.on("click", "." + this.page_klass, {self: this}, this.pageHandler);
		},
		pageHandler: function(event) {
			var self = event.data.self,
				item = $(this),
				options = self.options;

			event.preventDefault();
			self.gotoPage = item.data("page");
			self.slide();
		},
		slide: function(page, duration) {
			var self = this;
			
			this.stopSliding();
		  
			if (page && typeof page === "number") {
				this.gotoPage = page;
			}
			if (typeof duration === "number") {
				this.duration = duration;
			}
			this.slideAmount = this.getSlideAmount();

			this.wrapper.velocity({
				left: this.slideAmount
			}, this.duration, function() {
				self.callback()
			});
		},
		callback: function() {
			var options = this.options;
			if (options.pagination) {
				var items = this.pagination.find("li");
				items.removeClass("is-active");
				var item = items.get(this.gotoPage - 1);
				$(item).addClass("is-active");
			}
			this.duration = options.animationDuration;
		},
		getSlideAmount: function() {
			var options = this.options;
			return -(this.item_width * options.numToSlide * (this.gotoPage - 1));
		},
		startSliding: function(time_to_show) {
			var self = this,
				options = self.options;
			if (time_to_show && typeof time_to_show === "number") {
				options.timePerSlide = time_to_show
			}
			this.interval = setInterval(function() {
				self.gotoPage++;
				self.slide();
			}, options.timePerSlide)
		},
		stopSliding: function() {
			clearInterval(this.interval)
		},
	};

	overwatch.extend({ carousel: carousel });
});
!function(root, factory){

    factory(root, root.overwatch);

}(this, function(root, overwatch){

    var util = overwatch.util;
    var lightbox = overwatch.lightbox;
    var video = overwatch.video;
    var messages = root.messages;

    var gallery_defaults = {
        elem: null
    };

    var media_defaults = {
        id: null,
        elem: null,
        data: {},
        gallery: null,
        index: null,
        result: null
    };

    function thumbnail(media){

        var item = media.data.content;
        var type = item.type.toLowerCase();
        var content = item.image || item.pdf || item.wallpaper;

        return $('<li>', {
            addClass: 'media-item' + media.data.size == 'lg' ? ' m-lg' : '',
            attr: {
                media: media.id
            },
            html: $('<div>', {
                html: $('<a>', {
                    addClass: 'media-content m-' + type,
                    attr: {
                        href: media.video_url || content.url || content.urlWide,
                        target: '_blank'
                    },
                    css: {
                        backgroundImage: 'url(' + media.data.thumbnail + ')'
                    }
                })
            })

        });

    };

    function header(media){
        if(media.gallery){
            return [
                $('<h1>', {
                    addClass: 'gallery-title',
                    html: media.data.category
                }),
                $('<p>', {
                    addClass: 'gallery-index',
                    html: media.index + 1 + ' / ' + media.gallery.length
                })
            ];
        }
    };

    function footer(media){
        if(media.type == 'wallpaper'){

            return $('<div>', {
                addClass: 'media-sub-content m-' + media.type,
                html: (function(){
                    var results = [];
                    _.each(media.data.content.wallpaper, function(url, key){
                        results.push($('<a>', {
                            addClass: 'wallpaper-icon m-' + key.toLowerCase(),
                            attr: {
                                href: url,
                                target: '_blank'
                            },
                            html: [
                                $('<span>', { html: messages.wallpaper[key].title }),
                                $('<span>', { html: messages.wallpaper[key].dimensions })
                            ]
                        }))
                    });
                    return results;
                }())
            });

        } else {

            return $('<p>', {
                addClass: 'media-name',
                html: media.data.name
            });

        }
    };

    function Media(opts){

        var media = this;
        var opts = _.merge({}, media_defaults, opts);
        var item = opts.data.content;
        var type = item.type.toLowerCase();
        var content = item.image || item.videoYouTube || item.pdf || item.wallpaper || item.link;
        var $elem = $(opts.elem);
        var gallery = opts.gallery;

        function attach(){

            if(type == 'video_youtube'){

                var $video = $('<div video>');

                media.video = video.create({ elem: $video, id: content.youtubeId }, function(video){
                    video.player.playVideo();
                });

                lightbox.set({ body: $video, header: header(media), footer: footer(media), controls: media.gallery.length > 1 });

            } else if(type == 'pdf' || type == 'link'){

                var win = root.open(content.url, '_blank');

                if(win){
                    win.focus();
                }

            } else {
                var $div = $('<a>', {
                    addClass: 'media-item m-' + type + ' m-' + media.data.category,
                    attr: {
                        href: content.url || content.urlStandard,
                        target: '_blank'
                    },
                    css: {
                        backgroundImage: 'url(' + (content.url || content.urlStandard) + ')'
                    }
                });

                lightbox.set({ body: $div, header: header(media), footer: footer(media), controls: media.gallery.length > 1 });

            }

        };

        function detach(){

            if(media.data.type == 'video_youtube'){

                if(media.video){
                    media.video.destroy();
                }
                media.video = null;

            }

            lightbox.empty();

        };

        function init(){

            $elem.on('click', '.media-content', function(event){
                if(/video_youtube|pdf|link/.test(type) && (util.mobile() || util.touch())){

                } else {
                    event.preventDefault();
                    $elem.trigger('open', media);
                }
            });

        };

        this.attach = attach;
        this.detach = detach;
        this.data = opts.data;
        this.index = opts.index;
        this.id = opts.id;
        this.gallery = opts.gallery;
        this.$elem = $elem;
        this.type = type;

        this.on = function(){
            $elem.on.apply($elem, arguments);
        };

        this.off = function(){
            $elem.off.apply($elem, arguments);
        };

        this.one = function(){
            $elem.one.apply($elem, arguments);
        };

        init();

    };

    function MediaGallery(opts){

        var gallery = this;
        var cache = {};
        var results = [];
        var elems = {};
        var opts = _.merge({}, gallery_defaults, opts);
        var $elem = $(opts.elem);
        var active = null;
        var uid = 0;
        var isOpen = 0;

        function setEvents(){
            lightbox.on('prev', prev);
            lightbox.on('next', next);
            lightbox.on('pause', pause);
            lightbox.on('hide', close);
        };

        function add(media_opts){

            var media;

            if(!cache[media_opts.id]){
                _.merge(media_opts, {
                    index: uid++,
                    elem: (media_opts.elem || elems[media_opts.id]),
                    gallery: gallery
                });
                media = cache[media_opts.id] = new Media(media_opts);
                if(media.type !== 'pdf'){
                    media.result = results.push(media) - 1;
                }
                media.on('open', function(event, media){
                    open(media);
                });
                gallery.length++;
            }
        };

        function get(media){
            return media instanceof Media ? media : (cache[media] || results[media]);;
        };

        function to(media){
            var media = get(media);
            if(active){
                active.detach();
            }
            if(media){
                active = media;
                active.attach();
            }
        };

        function open(media){
            var media = get(media);
            to(media);

            if(media.type !== 'pdf' && media.type !== 'link'){
                if(!isOpen){
                    gallery.isOpen = isOpen = 1;
                    setEvents();
                    lightbox.open({ controls: results.length > 1 });
                }
            }
        };

        function close(){
            if(active){
                active.detach();
            }
            if(isOpen){
                gallery.isOpen = isOpen = 0;
                lightbox.off('prev', prev);
                lightbox.off('next', next);
                lightbox.off('pause', pause);
                lightbox.off('hide', close);
            }
        };

        function prev(){
            var prev = active.result > 0 ? active.result - 1 : results.length - 1;
            to(results[prev]);
        };

        function next(){
            var next = active.result < results.length - 1 ? active.result + 1 : 0;
            to(results[next]);
        };

        function pause(){
            var player = active.video.player;
            if(player){
                if(active.video.state === 'playing'){
                    player.pauseVideo();
                } else {
                    player.playVideo();
                }
            }
        };

        function init(){

            $elem.find('[media]').each(function(){
                var id = $(this).attr('media');
                elems[id] = this;
            });

        };

        this.add = add;
        this.prev = prev;
        this.next = next;
        this.pause = pause;
        this.close = close;
        this.open = open;
        this.to = to;
        this.get = get;
        this.length = 0;
        this.isOpen = 0;

        init();

    };

    function Gallery(){

        var uid = 0;
        var cache = {};

        function create(opts){
            opts.uid = uid++;
            return cache[opts.id] = new MediaGallery(opts);
        };

        function get(id){
            return cache[id];
        };

        function init(){

            $('[media-gallery]').each(function(){
                create({ elem: this, id: $(this).attr('media-gallery') });
            });

        };

        this.create = create;
        this.get = get;

        init();

    };

    overwatch.extend({ Media: Media, gallery: new Gallery() });

    return overwatch.gallery;

});

!function(root, factory) {
	factory(root.overwatch);
}(this, function(root) {

	$.extend( jQuery.easing, {
		easeOutCirc: function(x, t, b, c, d){
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		}
	});

	function MenuScroll() {

		function init(options) {
			var timeToHideMs = options.timeToHideMs;
			var menu = options.menuSelector;

			// Hide bar after delay.
			setTimeout(function() {
				$(menu).addClass("is-hidden");
			}, timeToHideMs);

			// Highlight first positioned menu option
			var sections = $("section");
			var firstSection = $(sections[0]).attr('id');
			$(menu + ' .' + firstSection).addClass("active");
			// Set up scrollspy and smooth scroll behavior.
			$(window).on('scroll', function() {
				requestAnimationFrame(
					function() {
						updateSideMenu(menu);
					}
				);
			});
			$(window).on('touchmove', function() {
				requestAnimationFrame(
					function() {
					updateSideMenu(menu);
				});
			});
			$(menu + " li a").smoothScroll({ easing: "easeOutCirc", speed: 300, offset: -72});
		}

		function updateSideMenu(menu) {
			$(menu + " li").removeClass("active");

			var jWindow = $(window);
			var windowDimensions = {
				top: jWindow.scrollTop(),
				left: jWindow.scrollLeft(),
				right: this.left + jWindow.width(),
				bottom: this.top + jWindow.height()
			};

			var sections = $("section");
			for (var i = 0; i < sections.length; i++) {
				if (isSectionVisible(sections[i], windowDimensions)) {
					$(menu + " ." + $(sections[i]).attr("id")).addClass("active");
					break;
				}
		    }
		}

		function isSectionVisible(section, wd) {
			var element = $(section);

			var elTop = element.offset().top,
				elLeft = element.offset().left,
				elRight = elLeft + element.width(),
				elBottom = elTop + element.height();
			var isIntersect = !(elLeft > wd.right ||
				elRight < wd.left ||
				elTop > wd.bottom ||
				elBottom < wd.top);
			return isIntersect;
		}

		return {
			init: init
		}

	};

	return overwatch.extend({ menuScroll: new MenuScroll() })
});

!function(root, factory){

    factory(root, root.overwatch);

}(this, function(root, overwatch){

    var util = overwatch.util;

    function Nav(){

        var open = 0;
        var bnet = 1;
        var $main = $('nav[role=main]');
        var $mobile = $('nav[role=mobile]');
        var $navbars = $('.navbars');
        var $bnet = $('.nav-mobile-menu-wrap.right');

        function hideBnet(){

            if(bnet){
                bnet = 0;
                $navbars.velocity('stop', true);
                $navbars.velocity({ top: -44 }, { duration: 200, easing: 'easeOutCirc' });
            }
        };

        function showBnet(){

            if(!bnet){
                bnet = 1;
                $navbars.velocity('stop', true);
                $navbars.velocity({ top: 0 }, { duration: 200, easing: 'easeOutCirc' });
            }
        };

        function expandNav(){

            if(!open){
                open = 1;
                $main.velocity('stop', true);
                $main.velocity({ marginTop: 0, marginLeft: 0, marginRight: 0 }, { duration: 100, easing: 'easeOutCirc' });
            }
        };

        function contractNav(){

            if(open){
                open = 0;
                $main.velocity('stop', true);
                $main.velocity({ marginTop: 20, marginLeft: 20, marginRight: 20 }, { duration: 100, easing: 'easeOutCirc' });
            }
        };

        function checkNavResize(){

            var pos = util.posY();
            var width = util.width();
            var top = 44 + 20;

            if(width <= 768){
                hideBnet();
                expandNav();
            } else if(width > 768 && pos <= top){
                showBnet();
                contractNav();
            }
        };

        function checkNavScroll(){

            var pos = util.posY();
            var scroll = util.scroll();
            var width = util.width();
            var top = 44 + 20;

            if(pos > top && scroll && width > 768){
                hideBnet()
                expandNav();
            } else if(pos <= top && scroll && width > 768){
                showBnet();
                contractNav();
            }
        };

        function init(){

            checkNavScroll();
            checkNavResize();

            // throttle to 30 fps
            $(root).on('scroll', _.throttle(checkNavScroll, 32));
            $(root).on('resize', _.throttle(checkNavResize, 32));

            $mobile.find('.nav-menu').on('click', '.m-has-children', function(event){
                event.preventDefault();
                $(this).next('.nav-menu').toggleClass('m-open');
            });

            $main.find('.m-bnet').on('click', function(event){
                event.preventDefault();
                $bnet.toggleClass('out', true);
                $('#nav-blackout').one('click', function(event){
                    event.preventDefault();
                    $bnet.toggleClass('out', false);
                });
            });
        };

        init();

        this.hideBnet = hideBnet;
        this.showBnet = showBnet
        this.expandNav = expandNav;
        this.contractNav = contractNav;

    };

    overwatch.extend({ nav: new Nav() });

    return overwatch.nav;

});

!function(root, factory){

    factory(root, root.overwatch);

}(this, function(root, overwatch){

    var util = overwatch.util;
    var lightbox = overwatch.lightbox;
    var storage = overwatch.storage;
    var datalayer = root.dataLayer;
    var location = root.location.search;

    var now = Math.floor(Date.now()/1000);
    var cache = storage.get('promo') || {};

    var promo_defaults = {
        end: null,
        start: null,
        elem: null,
        id: null,
        count: 0
    };

    function save(){
        return storage.set('promo', cache);
    };

    function set(promo){
        cache[promo.id] = promo;
        save();
    };

    function Promo(opts){

        var promo = this;
        var opts = _.defaults(opts, promo_defaults);
        var $root = $(root);
        var isOpen = 0;

        function check(){
            return opts.start <= now && opts.end > now;
        };

        function setEvents(){

            $root.on('resize.promo', _.throttle(function(){
                if(util.width() < 768){
                    close();
                }
            }, 32));

            lightbox.one('lightbox.x.promo', function() {
                if(datalayer){
                    datalayer.push({ 'event': 'overlay-dismiss', 'analytics.eventPlacement': 'X' });
                }
            });
            lightbox.one('lightbox.background.promo', function() {
                if(datalayer){
                    datalayer.push({ 'event': 'overlay-dismiss', 'analytics.eventPlacement': 'Background' });
                }
            });
            lightbox.one('key.esc.promo', function() {
                if(datalayer){
                    datalayer.push({ 'event': 'overlay-dismiss', 'analytics.eventPlacement': 'Escape' });
                }
            });
            lightbox.one('hide.promo', function(){
                close();
            });
        };

        function removeEvents(){
            $root.off('resize.promo');
            lightbox.off('hide.promo');
		//lightbox.off('lightbox.x.promo lightbox.background.promo key.esc.promo');
        };

        function open(){
            if(!isOpen){
                isOpen = 1;
                promo.count++;
                set(promo);
                setEvents();
                lightbox.open({ body: opts.elem });
            }
        };

        function close(){
            if(isOpen){
                isOpen = 0;
                removeEvents();
                lightbox.close();
                lightbox.empty();
            }
        };

        function init(){
            set(promo);
        };

        this.start = opts.start;
        this.end = opts.end;
        this.elem = opts.elem;
        this.id = opts.id;
        this.open = open;
        this.close = close;
        this.check = check;
        this.count = opts.count;

        init();

    };

    function Promos(){

        var promos = {};

        function get(id){
            return promos[id];
        };

        function create(opts){

            var $elem = $(opts.elem);
            var id = opts.id || $elem.attr('promo');

            if(!promos[id]){

                var promo = new Promo({
                    elem: opts.elem,
                    id: id,
                    start: opts.start || $elem.attr('promo-start'),
                    end: opts.end || $elem.attr('promo-end'),
                    count: cache[id] ? cache[id].count : 0
                });

                promos[id] = promo;
            }

        };

        function init(){

            $('[promo]').each(function(){
                create({ elem: this });
            });

            if(!util.mobile() && util.width() > 768 && !/promo=false/.test(location)){

                _.find(promos, function(o){
                    if(o.count < 1 && o.check()){
                        o.open();
                        if(datalayer){
                            datalayer.push({ 'event': 'overlay.load' });
                        }
                        return true;
                    }
                });

            }

        };

        this.get = get;
        this.create = create;

        init();

    };

    overwatch.extend({ promo: new Promos() });

    return overwatch.promo;

});

!function(root, factory){

    factory(root, root.overwatch);

}(this, function(root, overwatch){

    var menus = {};
    var openMenus = 0;
    var animate = overwatch.animate;
    var blackout = overwatch.blackout;

    function Menu($elem, name){

        var isOpen = 0;

        function open(){
            if(!isOpen){
                isOpen = 1;
                $elem.trigger('open');
                blackout.one('hide.slide-menu', close);
                $elem.velocity('stop', true);
                animate.slideInLeft($elem, {
                    begin: function(){
                        openMenus++;
                        if(openMenus <= 1){
                            blackout.open();
                        }
                    }
                });
            }
        };

        function close(){
            if(isOpen){
                isOpen = 0;
                $elem.trigger('close');
                blackout.off('hide.slide-menu');
                $elem.velocity('stop', true);
                animate.slideOutLeft($elem, {
                    begin: function(){
                        if(openMenus <= 1){
                            blackout.close();
                        }
                    },
                    complete: function(){
                        openMenus--;
                    }
                });
            }
        };

        function init(){
            $elem.find('.close, [close]').on('click', function(event){
                close();
            });
        };

        init();

        this.open = open;

        this.close = close;

        this.on = function(){
            return $elem.on.apply($elem, arguments);
        };

        this.off = function(){
            return $elem.off.apply($elem, arguments);
        };

        this.one = function(){
            return $elem.one.apply($elem, arguments);
        };

    };

    function Menus(){

        function open(name){
            if(name){
                return menus[name].open();
            }
            _.each(menus, function(menu, key){
                menu.open();
            });
        };

        function close(name){
            if(name){
                return menus[name].close();
            }
            _.each(menus, function(menu, key){
                menu.close();
            });
        };

        function create($elem, name){
            var $elem = $($elem);
            var name = name || $elem.attr('slide-menu');
            var menu = new Menu($elem, name);
            return menus[name] = menu;
        };

        function init(){

            $('[slide-menu]').each(function(){
                create(this);
            });

            $('[slide-menu-open]').on('click', function(event){
                var name = $(this).attr('slide-menu-open');
                open(name);
            });

            $('[slide-menu-close]').on('click', function(event){
                var name = $(this).attr('slide-menu-close');
                close(name);
            });

            $(root).on('keyup.slide-menu', function(event){
                if(event.which === 27){
                    close();
                }
            });

        };

        init();

        this.open = open;
        this.close = close;
        this.create = create;
        this.cache = menus;

    };

    overwatch.extend({ menu: new Menus() });

    return overwatch.menu;

});

/**
 * Spotlight component
 */
!function(root, factory) {

    factory(root.overwatch, root.jQuery);

}(this, function(overwatch, $) {

	var CLASS_HEADER = 'header';
	var CLASS_HOLDER = 'holder';
	var CLASS_CAPTION = 'caption';

	function Spotlight(spotlight) {
		this.$spotlight = $(spotlight);
		this.$holder = this.$spotlight.find('.' + CLASS_HOLDER);
		this.$header = this.$spotlight.find('.' + CLASS_HEADER);
		this.$caption = this.$spotlight.find('.' + CLASS_CAPTION);

		// warn about missing expected inner elements
		if (this.$header.length === 0) {
			console.warn('Spotlight could not find a header element inside: ' + spotlight);
		}
		if (this.$holder.length === 0) {
			console.warn('Spotlight could not find a holder element inside: ' + spotlight);
		}
	}

	Spotlight.prototype.setHeader = function setHeader(text) {
		this.$header.text(text);
	};

	Spotlight.prototype.setCaption = function setCaption(text) {
		this.$caption.text(text);
	};

	/**
	 * Performs an XHR to retrieve the specified image.
	 * @param url [String] - image url
	 * @param cb [Function] - callback on image load completion
	 */
	Spotlight.prototype.loadImage = function loadImage(url, cb) {
		var self = this;

		// start loading transition
		this._startTransition();

		// preload image
		url = encodeURI(url);
		$('<img/>').attr('src', url).load(function success(event) {
			// prevent memory leaks
			$(this).remove();

			self._setImage(url);

			// add end loading transition handler when holder finishes loading
			self._endTransition();

			if (cb) { cb(); }
		});
	};

	/**
	 * Performs DOM manipulation necessary to update spotlight image.
	 * @param url [String] - image url
	 */
	Spotlight.prototype._setImage = function setImage(url) {
		this.$holder.css('background-image', 'url(' + encodeURI(url) + ')');
	};

	Spotlight.prototype._startTransition = function startTransition() {
		this.$spotlight
		.velocity('stop')
		.velocity({
			opacity: 0
		}, {
			duration: 100,
            easing: 'easeOutQuad'
		});
	};

	Spotlight.prototype._endTransition = function endTransition() {
		this.$spotlight
		.velocity('stop')
		.velocity({
			opacity: [ 1, 0 ]
		}, {
			duration: 100,
            easing: 'easeOutQuad'
		});
	};

    overwatch.extend({ Spotlight: Spotlight });

	return Spotlight;

});

!function(root, factory){

    factory(root.overwatch);

}(this, function(overwatch){

    // tag elements/ modules
    function Tag(attr, items, opts){

        var tag = this;

        // hash table for elements by
        // normalized attribute value
        var cache = {};

        // hash table for callbacks
        var cbmap = {};

        // local storage helper
        var storage = overwatch.storage;

        // default rule to parse
        // for triggering callbacks
        function defaultRule(){
            return this.exec < 1 ? true : false;
        };

        // helper to normalize key names
        function toCamelCase(string){
            return string.replace(/-([a-z])/g, function(g){
                return g[1].toUpperCase();
            });
        };

        // helper to normalize attribute selector
        function fromCamelCase(string){
            return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        };

        // return local storage key string
        function storageKey(){
            return ['tags', toCamelCase(attr)].join('.');
        };

        // transform tag item to be ready
        // for serialization to localstorage
        function storageItem(item){
            return {
                created: item.created,
                exec: item.exec
            };
        }

        // create a cache item from a node
        // and previously stored object
        function cacheItem(node, prev){
            return {
                $elem: $(node),
                created: prev && prev.created || new Date().getTime(),
                exec: prev && prev.exec || 0
            };
        };

        // return the stored data for this selector
        function getStorage(){
            return storage.get(storageKey()) || {};
        };

        // set the stored data for this selector
        function setStorage(){
            var obj = getStorage();
            var keys = Object.keys(cache);
            for(var i = 0; i < keys.length; i++){
                var item = cache[keys[i]];
                obj[keys[i]] = storageItem(item);
            }
            storage.set(storageKey(), obj);
        };

        // parse an item rule
        // should always return boolean
        function parseRule(item){
            var rule = item.rule || defaultRule;
            return rule.call(item);
        };

        // trigger an item's callback by name
        // executes based on parsed rule boolean
        function trigger(name){
            var name = toCamelCase(name);
            var item = cache[name];
            var callback = cbmap[name];
            if(parseRule(item)){
                callback.call(item, item.$elem, item.exec, item.created);
                item.exec++;
                setStorage();
            }
        };

        // build cached storage
        function buildCache(attr){
            var elems = document.querySelectorAll('[' + fromCamelCase(attr) + ']');
            var store = getStorage();
            for(var i = 0; i < elems.length; i++){
                var node = elems[i];
                var id = node.getAttribute(fromCamelCase(attr));
                var prev = store[toCamelCase(id)];
                cache[toCamelCase(id)] =  cacheItem(node, prev);
            }
        };

        // add a cached item by name and config
        function addItem(name, config){
            var name = toCamelCase(name);
            var item = cache[name];
            if(item && config.rule){
                item.rule = config.rule;
            }
            if(item && config.callback){
                cbmap[name] = config.callback;
                item.trigger = function(){
                    trigger(name);
                };
                item.trigger();
            }
        };

        // add group of items by object key/value map
        function addItems(items){
            var keys = Object.keys(items);
            for(var i = 0; i < keys.length; i++){
                addItem(keys[i], items[keys[i]]);
            }
        };

        // sets the default rule for callbacks
        function setDefaultRule(rule){
            if(rule instanceof Function){
                defaultRule = rule;
            }
        };

        // initialize and build
        function init(){

            // clear storage if set
            if(opts && opts.clearStorage){
                storage.remove(storageKey());
            }

            // set default rule if set
            if(opts && opts.defaultRule){
                setDefaultRule(opts.defaultRule);
            }

            // build cache hash table
            buildCache(attr);

            // add callbacks/ rules
            addItems(items);

            // set namespace
            overwatch.tags ? null : overwatch.tags = {};

            // add to namespace cache
            overwatch.tags[toCamelCase(attr)] = tag;

            // expose api functions
            tag.cache = cache;
            tag.add = addItems;
            tag.trigger = trigger;
            tag.setDefaultRule = setDefaultRule;

            // save state to local storage
            setStorage();
        };

        init();

    };



    overwatch.extend({ Tag: Tag });

    return overwatch.Tag;

});

!function(root, factory){

    factory(root, root.overwatch);

}(this, function(root, overwatch){

    function Waypoint(){

    };

    overwatch.extend({ waypoint: new Waypoint() });

    return overwatch.waypoint;

});

/*
* hero-selector.js
* extends overwatch module with hero-selector
*/
(function(root, factory){

	// amd
	if (typeof define === 'function' && define.amd){
		define('overwatch-hero-selector', ['overwatch', 'shuffle'], factory);

	// node
	} else if (typeof exports === 'object'){
		module.exports = factory(require('overwatch', 'shuffle'));

	// browser global
	} else {
		root.overwatch['HeroSelector'] = factory(root.overwatch, root.jQuery, root.shuffle);
	}

}(this, function(overwatch, $, shuffle){

	// Allows "Filtering" of heroes
	function HeroSelector(){
		this.init = function init(options) {
			var self = this;
			self.$grid = options.$container;
			var $sizer = options.$sizer;
			self.$navigationLinks = options.$navigationLinks;
			self.itemSelector = options.itemSelector;
			
			//Init shuffle
			self.$grid.shuffle({
				itemSelector: self.itemSelector,
				speed: 200,
				easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
			});
			
			// This gets the largest order the the group, used to "push" filtered results to the 
			// top, but also keep the other items ordered properly.	
			self.largestOrder = (function() {
				var largest = 0;
				$.each($(self.itemSelector), function(key, value) {
					if(largest < $(value).data('order')) {
						largest = $(value).data('order');
					}
				});
				return largest;
			})();
			
				
			self.$navigationLinks.on('click', function() {
				var filterKey = $(this).data('filter-key');
				self.filter(filterKey);
			});
		};
	};
	
	HeroSelector.prototype.filter = function filter(filterKey) {
		var self = this;
		window.location.hash = filterKey.toLowerCase();
		
		self.$navigationLinks.parent().removeClass('active');
		$('[data-filter-key="'+filterKey+'"]', self.$navigationLinks.parent()).parent().addClass('active');
		
		if(filterKey === 'all') {
			$(self.itemSelector).children().removeClass('m-subdued m-selected');
			var opts = {};
		} else {
			var opts = {
				reverse: true,
				//Function to sort by
				by: function($el) {
					var $elChild = $($el.children()[0]);
					$elChild.removeClass('m-subdued m-selected');
				
					if($el.data('groups')[0] === filterKey) {
						$elChild.addClass('m-selected');
						// Subtract the largest order fron the order that is in the filter to
						// "push" those items to the top (make all of them rank "higher" than the others, but keep their order)
						return self.largestOrder-$el.data('order');
					}
					$elChild.addClass('m-subdued');
					// If it's not in the selected group, just keep the existing order, but opposite because the filter order is reverse.
					return ~$el.data('order');
				}
			};
		}
		
		this.$grid.shuffle('sort', opts);
	};

	// create heroSelector
	var heroSelector = new HeroSelector();
	
	// return heroSelector
	return heroSelector;

}));

!function(root, factory){

    factory(root, root.app, root.jQuery);

}(this, function(root, app, $){

	var overwatch = root.overwatch;
	var video = overwatch.video;
	var lightbox = overwatch.lightbox;

    function Helpers(){

		this.loadVideoIntoFrame = function loadVideoIntoFrame(videoId){

			var v = video.create({ elem: $('<div video>'), id: videoId }, function(video){
				video.player.playVideo();
			});

			lightbox.open({ body: v.$root });

			overwatch.lightbox.one('hide',function(){
				v.destroy();
				lightbox.empty();
			});

		};

		this.loadImageIntoFrame = function loadImageIntoFrame(imgSrc){

			overwatch.lightbox.open({
				body: $('<div>', {
					html: '<img src="' + imgSrc + '" />',
					addClass: 'img-embed'
				}),
				size: 'fluid'
			});

		};

    };

    app.extend({ helpers: new Helpers() });

    return app.helpers;

});

/**
 * Init's items needed for hero abilities videos
 */
(function(window, overwatch){
 	
	var Abilities = {

		init: function() {
	
			var mql;
	
			Abilities.desktopVideo = $(".abilities .ability-video.desktop-video");
			Abilities.videoOverlay = $(".abilities .video-overlay");
			Abilities.mobileVideo = $(".ability-video.mobile-video");
	
			Abilities.videoOverlay.hover(
				function() {
					$(this).siblings("video")[0].play();
				},
				function(e) {
					$(this).siblings("video")[0].pause();
					$(this).siblings("video")[0].load(); //this should be .currentTime = 0 but use this temporarily until solution is found for chrome
				}
			);
	
			Abilities.desktopVideo.on("click", function() {
				if (overwatch.util.ie() !== '8') {
					var currentHero = $(this).data("hero");
					var currentAbility = $(this).data("ability");
					var data = createVideoData(currentHero, currentAbility);
					var videoData = data[0];
					var videoIndex = data[1];
					Lightbox.loadHTML5Video(videoData, videoIndex);
				}
			});
	
			// We don't want to exit full screen on a desktop if a user is trying to full screen
			if (overwatch.util.mobile() === true) {
				// Pause videos if device goes into landscape mode or changes orientation.
				MediaQuery.onDesktop(function() {
					document.exitFullscreen();
					pauseVideos();
				});
			}
	
			function pauseVideos() {
				Abilities.mobileVideo.each(function(i, ele) {
					$(ele).children("video").get(0).pause();
				});
			}
	
		}
	};
	
	function createVideoData(hero, abilityKey) {
	
		var videoIndex = 0;
		var videoData = [];
	
		for(var key in heroAbilities){
			var ability = heroAbilities[key],
				abilityInfo = {};
	
			abilityInfo.title = ability.title;
			abilityInfo.subtitle = ability.subtitle;
			abilityInfo.description = ability.description;
			abilityInfo.sources = [{ type: "video/webm", src: ability.sources.webm}, {type: "video/mp4", src: ability.sources.mp4}];
			abilityInfo.contentClass = "hero-" + hero;
			abilityInfo.autoplay = true;
	
			videoData.push(abilityInfo);
	
			if (abilityKey === key) {
				videoIndex = videoData.length - 1;
			}
		}
	
		return [videoData, videoIndex];
	}

	window.Abilities = Abilities;

}(window, window.overwatch));

(function(window, overwatch){
    var util = overwatch.util;

    var GamePlayVideo = {

    	init: function(options) {
    		var $videoWraps = options.$videoWraps;

    		// Get Lightbox data from data properties
    		var $gamePlayWrap = $(".gameplay-video-wrapper.desktop-only .video-wrap");
    		$gamePlayWrap.on("click",function(){
    			Lightbox.loadEmbed([{
    				"title": $(this).data("title"),
    				"src": $(this).data("yt-id"),
    				"contentClass": $(this).id,
    				"type": "youtube"
    			}]);
    		});

    		// Embed YouTube videos.
    		var $ytVideoWraps = $(".section.game .yt-container .video-wrap");
    		$ytVideoWraps.each(function(i, video) {
    			YtEmbedder.load($(video));
    		});

    		// Apply background image to video wrap for browsers without <video> support.
    		if (util.ie() && util.ie() <= 8) {
    			util.VideoPoster($videoWraps);
    		}
    	}
    };

    window.GamePlayVideo = GamePlayVideo;

}(window, window.overwatch));

!function(root, app, overwatch){

    var util = overwatch.util;
    var $scene = $('[hero-scene]');

    var parallax_opts = {
        scalarX: 1,
        scalarY: 1,
        frictionX: 1,
        frictionY: 1
    };

    function setSceneHeight(height, padding){
        $scene[0].style.height = height;
        $scene[0].style.padding = padding;
    };

    function checkSceneHeight(){

        var width = util.width();
        var height = util.height();

        if(width * .4625 >= height - 66){
            setSceneHeight(height - 66 + 'px', 0);
        } else {
            setSceneHeight(null, null);
        }
    };

    function init(){

        var scene = new Parallax($scene.find('.scene')[0], parallax_opts);

        //checkSceneHeight();

        // throttle to 30 fps
        //$(root).on('resize', _.throttle(checkSceneHeight, 32));
    };

    app.extend({ heroScene: { init: init } });

}(this, this.app, this.overwatch);

(function(window, overwatch){
	/*
		Hero selection functionality.
	*/
	var HeroSelect = function() {
		var currentHero;

		function init(options) {
			var $section 			= options.$section;
			var $overlay 			= options.$overlay;
			var $overlayText 		= options.$overlayText;
			var $overlayTextBorder 	= options.$overlayTextBorder;
			var $overlayWrap        = options.$overlayWrap;
			var $selectionWrap 		= options.$selectionWrap;
			var classLoaded 		= options.classLoaded;

			// Handle character hover event.
			$selectionWrap.on("mouseenter", ".selection-link", function(event) {
				var $this = $(this);
				var heroSlug = $this.data("hero-slug");
				var heroRole = $this.data("hero-role");
				var heroRoleId = $this.data("hero-role-id");
				var heroOverlayImage = $this.data("hero-overlay");

				//if (heroSlug != "undefined" && Core.userAgent === "web"){
				if (heroSlug != "undefined" && !overwatch.util.mobile()){

					$section.addClass("overlay-ready");
					$overlay.attr("style","");
					$overlayWrap.addClass("loading");

					HeroSelect.currentHero = heroSlug;

					preloadImage(heroOverlayImage, heroSlug, function(preloadedImage, preloadedHero) {
						if(HeroSelect.currentHero == preloadedHero) {
							$overlayWrap.removeClass("loading");
							$overlay.attr("style", 'background-image:url(' + preloadedImage + ')');
						}
					});

					$section.addClass(classLoaded);

					// Define character description text.
					$overlayText.find("h2").html(heroSlug);
					$overlayText.find("i").attr("class","icon role-" + heroRoleId);
					$overlayText.find("p").text(heroRole);
					$overlayText.addClass(classLoaded);
					$overlayTextBorder.addClass(classLoaded);
				}

			});

			// Handle character un-hover event.
			$selectionWrap.on("mouseleave", ".selection-link", function() {
				$section.removeClass(classLoaded);
				$overlayText.removeClass(classLoaded);
				$overlayTextBorder.removeClass(classLoaded);
				$overlayWrap.removeClass("loading");
			});

			// Handle removal of highlighted portrait animation
			$(".selection-item.is-highlighted").each(function(i, highlightedItem) {
				var $highlightedItem = $(highlightedItem);

				// .selection-link is the targeted hoverable element
				$highlightedItem.find(".selection-link").each(function(i, selectionLink) {
					var $highlightedParent = $highlightedItem;

					// Need to remove the highlighted class of the parent .selection-item when
					// its child .selection-link is hovered on
					$(selectionLink).on("mouseenter", function(event) {
						$highlightedParent.removeClass("is-highlighted");
						$(this).off("mouseenter");
					});
				});
			});
		}

		/**
		 * Starts image preload
		 */
		function preloadImage(loadingImagePath, id, callback) {

			var tempImage = new Image();

			$(tempImage).load(function(){
				if(callback){
					callback(tempImage.src, id)
				}
			});

			tempImage.src = loadingImagePath;
		}

		return {
			init: init
		};
	}();

	window.HeroSelect = HeroSelect;
}(window, window.overwatch));
/**
 * Init's items needed for hero summary
 */
(function(window, overwatch){
	
	var HeroSummary = {
	
		init: function(options) {
	
			var $ytVideoWraps = options.$ytVideoWraps;
			var $videoWraps = options.$videoWraps;
			var $characterDemoVideo = options.$characterDemoVideo;
			var $abilitiesButton = $(".btn-abilities");
	
			$characterDemoVideo.on("click",function(){
				Lightbox.loadEmbed([{
					"title": $(this).data("hero"),
					"src": $(this).data("yt-id"),
					"type": "youtube"
				}]);
			});
	
			$ytVideoWraps.each(function(i, parent) {
				YtEmbedder.load($(parent));
			});
			
			$abilitiesButton.on("click", function() {
				$.smoothScroll({
				      scrollTarget: '#abilities'
				    });
				    return false;
			});
	
			// Apply background image to video wrap for browsers without <video> support.
			if (overwatch.util.ie() === "8") {
				overwatch.util.VideoPoster($videoWraps);
			}
		}
	};

	window.HeroSummary = HeroSummary;

}(window, window.overwatch));

!function(root, app, overwatch){

    var util = overwatch.util;

    var particle_opts = {
        "particles": {
            "number": {
                "value": 50,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#fff"
            },
            "shape": {
                "type": "image",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": root.messages.img.hanzo,
                    "width": 100,
                    "height": 79
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 30,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false,
                "distance": 100,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 2
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "bottom",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": false,
                    "mode": "repulse"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 0.5
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 4,
                    "duration": 0.3,
                    "opacity": 1,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    };

    function init(){

        var keys = [];
        var konami = '38,38,40,40,37,39,37,39,66,65';
        var $doc = $(root.document);
        var $body = $('body');

        $doc.on('keydown', function(event){

            keys.push(event.keyCode);

            if(keys.toString().indexOf(konami) >= 0){

                $body.addClass('konami');
                $doc.off('keydown', arguments.callee);
                $doc.trigger('konami');

            }

        });

        $doc.one('konami', function(){
            if(!util.mobile() && !util.touch() && util.width() > 768){
                $body.append('<div class="egg" id="egg-particles">');
                particlesJS('egg-particles', particle_opts);
            }
        });

    };

    init();

}(this, this.app, this.overwatch);

(function(window, overwatch){
	/*
		Landing trailers functionality.
	*/
	var LandingTrailers = function() {

		function init(options) {
			var $desktopTrailers = options.$desktopTrailers;
			var $mobileTrailers = options.$mobileTrailers;

			var videoData = [];

			// Get lightbox content from data properties
			$desktopTrailers.each(function(index){
				videoData.push({
					"title": $(this).data("title"),
					"src": $(this).data("yt-id"),
					"contentClass": $(this).id,
					"type": "youtube",
					"autoplay": true
				});

				$(this).on("click", function(){
					Lightbox.loadEmbed(videoData, index)
				});
			});

			$mobileTrailers.each(function(i, trailer) {
				YtEmbedder.load($(trailer));
			});
		}

		return {
			init: init
		};
	}();

	window.LandingTrailers = LandingTrailers;

}(window, window.overwatch));
/*
	Overwatch (non-mobile) main menu functionality.
*/
(function(window, overwatch){

    var MainMenu = function() {

    	function init(options) {
    		var $window = $(window);

    		// Menus
    		var $menuMainWrap = options.$menuMainWrap;
    		var $menuMain = options.$menuMain;
    		var $socialMenuMain = options.$socialMenuMain;

    		// Menu pin
    		var $menuMainPin = options.$menuMainPin;

    		// Buy button
    		var $buyButtonWrap = options.$buyButtonWrap;

    		// Other options
    		var hiddenClass = options.hiddenClass;
    		var fixedClass = options.fixedClass;
    		var menuMainThreshold = options.menuMainThreshold;
    		var previousScrollTop = 0;

    		// Scroll functionality for main menu.
    		$window.on("scroll", function() {
    			var scrollTop = $window.scrollTop();
    			// need to do this check since ie11 in windows 8.1 fires scroll event more than once
    			if (scrollTop !== previousScrollTop) {
    				// Hide menu if scroll pos is greater than threshold.
    				var hideMenu = scrollTop > menuMainThreshold;

    				// Hide menu if scrolled down.
    				hideMenu = hideMenu && scrollTop > previousScrollTop;

    				$menuMainWrap.toggleClass(hiddenClass, hideMenu);
    				previousScrollTop = scrollTop;
    			}

    			$menuMain.toggleClass(fixedClass, scrollTop > 44);
    			$socialMenuMain.toggleClass(fixedClass, scrollTop > 44);

    			updateBuyButton(scrollTop);
    		});

    		$menuMainPin.on("mouseenter", function() {
    			$menuMainWrap.removeClass(hiddenClass);
    		});

    		function updateBuyButton(scrollTop) {
    			$buyButtonWrap.toggleClass(fixedClass, scrollTop > 44);
    		}
    	}

    	return {
    		init: init
    	};

    };

    window.MainMenu = MainMenu();

}(window, window.overwatch));

(function(){

    var Maps = {
    	section: null,
    	navItem: null,
    	mapPanel: null,
    	mapList: null,
    	mapItem: null,

    	init: function() {
    		Maps.section = $(".map.section");
    		Maps.controls = $(".map-controls");
    		Maps.navItem = $(".map-nav-item");
    		Maps.navItemDesc = $(".map-nav-description");
    		Maps.mapItem = $(".map");

    		Maps.getMap();

    		Maps.navItem.on("click",function(){
    			var selectedType = $(this).attr("data-map-type");
    			var selectedMap = $(".map-info[data-map-type='" + selectedType + "']")
    								.find(".map-list")
    								.find(".map-name")
    								.first()
    								.attr("data-map");
    			Maps.updatePanel(selectedType,selectedMap);
    		});

    		Maps.mapItem.on("click",function() {
    			Maps.updatePanel($(this)
    				.closest(".map-info")
    				.attr("data-map-type"),
    				$(this).attr("data-map"));
    		});

            /*
            * scroll to map by name based on url hash
            * need to setTimeout because of other scroll position js somewhere
            * $scrollspy and nav menu seems to interfere
            */
            function scrollByHash(){
                Maps.scrollTo(window.location.hash.slice(1));
            };

            setTimeout(scrollByHash, 500);

            // listen for hash changes
            // works on all browsers and ie8
            $(window).on('hashchange', function(){
                scrollByHash();
            });

            // listen for popstate changes
            // works on all browsers > ie9
            $(window).on('popstate', function(){
                scrollByHash();
            });
    	},

    	updatePanel: function(type,map) {
    		$(".map-nav-item").removeClass("active");
    		$(".map-nav-description").removeClass("active");
    		$(".map-info").removeClass("active");
    		$(".map-screen").removeClass("active");

    		$(".map-nav-item[data-map-type='" + type + "']").addClass("active");
    		$(".map-nav-description[data-map-type='" + type + "']").addClass("active");
    		$(".map-info[data-map-type='" + type + "']").addClass("active");
    		$(".map-name[data-map='" + map + "']").addClass("active");
    		$(".map-screen[data-map=" + map + "]").addClass("active");

    		Maps.getMap();
    	},

    	getMap: function() {
    		var activeMap = $(".map-screen.active").attr("data-map");
    		var activeType = $(".map-screen.active").attr("data-map-type");

    		Maps.mapItem.removeClass("active");

    		$(".map-info[data-map-type='" + activeType + "']")
    			.find(".map[data-map='" + activeMap + "']")
    			.addClass("active");
    	},

        /*
        * scroll to map section and click map by name
        * expects name to match a mapItem data-map value
        * ex: kings-row | hanamura | temple-of-anubis
        */
        scrollTo: function(name){
            if(!name) return;
            var $elem = Maps.mapItem.filter(['[data-map=', name, ']'].join(''));
            if($elem[0]){
                $('html, body').animate({
                    scrollTop: $('#objectives').offset().top
                }, 200, function(){
                    $elem.click();
                });
            }
        }

    };

    window.Maps = Maps;

}(window, window.overwatch));

(function(window, overwatch){

    var MediaLightbox = {
		init: function(options) {
			this.bindScreenshots();
			this.bindArtwork();
			this.bindVideos();
		},

		bindScreenshots: function() {
			var self = this;

			$(".web .screenshots-list a").bind('click', function(event) {
				var curElem = $(this);
				var images = self.getSectionList("screenshots");
				var index = self.indexOf(images, curElem, 0);
				Lightbox.loadImage(images, index);
				event.preventDefault();
			});
		},

		bindArtwork: function() {
			var self = this;

			$(".web .artwork-list a").bind('click', function(event) {
				var curElem = $(this);
				var images = self.getSectionList("artwork");
				var index = self.indexOf(images, curElem, 0);
				Lightbox.loadImage(images, index);
				event.preventDefault();
			});
		},

		bindVideos: function() {
			var self = this;

			$(".web .videos-list a").bind('click', function(event) {
				var curElem = $(this);
				var videos = self.getSectionList("videos");
				var index = self.indexOf(videos, curElem, 0);
				Lightbox.loadEmbed(videos, index);
				event.preventDefault();
			});

		},

		getSectionList: function(sectionName) {
			var elemList = [];
			$("." + sectionName + "-list li").each(function(curIndex) {
				elemList.push($(this).data());
			});

			return elemList;
		},

		/**
		 * Returns the index of a particular Element in the data object haystack.
		 * Will return -1 if not found.
		 */
		indexOf: function(haystack, sourceObj, notFound) {
			if (typeof notFound == 'undefined') {
				notFound = -1;
			}
			var needle = $(sourceObj);
			for(var i = 0; i < haystack.length; i++) {
				if (needle.data("key") === haystack[i].key) {
					return i;
				}
			}
			return notFound;
		}
	};

    window.MediaLightbox = MediaLightbox;

}(window, window.overwatch));

/**
 * MediaQuery allows for registering MediaQueryList objects with
 * varying media queries.
 *
 * @author Alex Nakorn (anakorn@blizzard.com)
 */

(function(window, overwatch, Utilities){

    var MediaQuery = function() {

    	/**
    	 * MediaQueryList cache.
    	 *
    	 * @type {Object}
    	 * @see https://developer.mozilla.org
    	 * 		/en-US/docs/Web/Guide/CSS/Testing_media_queries
    	 */
    	var mqlCache = {};

    	/**
    	 * Default configuration for MediaQuery.
    	 *
    	 * @type {Object}
    	 */
    	var config = {
    		defaultMediaQuery: "(max-width: 760px)"
    	};

    	/**
    	 * Registers a callback on orientationchange events.
    	 *
    	 * @param  {Function} cb - Callback function to be called on event trigger
    	 */
    	function onOrientationChange(cb) {
    		window.addEventListener("orientationchange", cb);
    	}

    	/**
    	 * Registers a callback on a MediaQueryList called when a media query
    	 * is matched.
    	 *
    	 * @param  {MediaQueryListListener} cb - Function called with media query result
    	 * @param  {String} mq - Media query expression
    	 */
    	function onMatch(cb, mq) {
    		var mql = getMql(mq);

    		if (mql) {
    			mql.addListener(function(m) {
    				if (m.matches) {
    					return cb();
    				}
    			});
    		}
    	}

    	/**
    	 * Registers a callback on a MediaQueryList called when a media query
    	 * is NOT matched.
    	 *
    	 * @param  {MediaQueryListListener} cb - Function called with media query result
    	 * @param  {String} mq - Media query expression
    	 */
    	function onUnmatch(cb, mq) {
    		var mql = getMql(mq);

    		if (mql) {
    			mql.addListener(function(m) {
    				if (!m.matches) {
    					return cb();
    				}
    			});
    		}
    	}

    	/**
    	 * Registers a callback on a MediaQueryList called when a media query
    	 * is matched.
    	 *
    	 * @deprecated Use onMatch instead
    	 * @param  {MediaQueryListListener} cb - Function called with media query result
    	 * @param  {String} mq - Media query expression
    	 */
    	function onMobile(cb, mq) {
    		return onMatch(cb, mq);
    	}

    	/**
    	 * Registers a callback on a MediaQueryList called when a media query
    	 * is NOT matched.
    	 *
    	 * @deprecated Use onUnmatch instead
    	 * @param  {MediaQueryListListener} cb - Function called with media query result
    	 * @param  {String} mq - Media query expression
    	 */
    	function onDesktop(cb, mq) {
    		return onUnmatch(cb, mq);
    	}

    	/**
    	 * Returns a MediaQueryList listening to a given media query.
    	 *
    	 * @param  {String} mq - Media query expression
    	 * @return {MediaQueryList}
    	 */
    	function getMql(mq) {
    		if (!window.matchMedia) { return null; }

    		// default mq if override isn't provided
    		var mq = mq || config.defaultMediaQuery;

    		// remove whitespace from mq
    		mq = overwatch.util.removeWhitespace(mq);

    		// return cached mql if exists, otherwise create new one and return it
    		return mqlCache[mq] || registerMql(mq);
    	}

    	/**
    	 * Registers and returns a MediaQueryList listening to a given media query.
    	 *
    	 * @private
    	 * @param  {String} mq - Media query expression
    	 * @return {MediaQueryList}
    	 */
    	function registerMql(mq) {
    		// remove whitespace from mq
    		mq = overwatch.util.removeWhitespace(mq);

    		// cache new mql
    		return mqlCache[mq] = window.matchMedia(mq);
    	}

    	/**
    	 * Interface
    	 * @see http://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
    	 */
    	return {
    		supported: (typeof window.matchMedia === "function"),
    		config: config,
    		onOrientationChange: onOrientationChange,
    		onMatch: onMatch,
    		onUnmatch: onUnmatch,
    		onMobile: onMobile,
    		onDesktop: onDesktop,
    		getMql: getMql
    	};

    };

    window.MediaQuery = MediaQuery();

}(window, window.overwatch, window.Utilities));

(function(window, overwatch){

    var Media = {
        init: function(options) {
            this.triggerHover();
        },

        // This is for tablets that are not using mobile mode, to fix wonky behavior for hover states on wallpapers.
        triggerHover: function() {
            $(".wallpaper-list .media-wrap").on('touchend', function(event) {
                $(this).addClass("hovered");
            });
        }
    };

    window.Media = Media;

}(window, window.overwatch));

!function(root, factory){

    factory(root, root.app, root.overwatch);

}(this, function(root, app, overwatch){

    var util = overwatch.util;
    var $grid = $('.news-panels');

    $grid.find('.grid-item.youtube').on('click', 'a', function(event){
        var id = $(this).attr('data-id');
        if(!util.mobile() && !util.touch()){
            event.preventDefault();
            app.helpers.loadVideoIntoFrame(id);
        }
    });

});

!function(root, factory){

    factory(root, root.app);

}(this, function(root, app){

    function Util(){

        this.shuffleArray = function shuffle(array) {
			var currentIndex = array.length, temporaryValue, randomIndex ;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {

				// Pick a remaining element...
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				// And swap it with the current element.
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}

			return array;
		};

		this.removeWhitespace = function(string) {
			return string.replace(/\s/g, "");
		};

		/*
			http://underscorejs.org/#now

			Returns an integer timestamp for the current time, using the fastest method
			available in the runtime. Useful for implementing timing/animation functions.
		*/
		this.now = Date.now || function() {
			return new Date().getTime();
		};

		/**
		 * Returns a function that can only be invoked once, regardless of how many
		 * times it's actually called.
		 *
		 * @param  Function func - The function to be invoked once
		 */
		this.once = function(func) {
			var result;
			return function() {
				if (func) {
					result = func.apply(this, arguments);
					func = null;
				}
				return result;
			};
		};

		/**
		 * http://underscorejs.org/#debounce
		 * Returns a function, that, as long as it continues to be invoked,
		 * will not be triggered. The function will be called after it stops
		 * being called for N milliseconds. If immediate is passed, trigger
		 * the function on the leading edge, instead of the trailing.
		 *
		 * @param  Function func - Function to be debounced
		 * @param  int wait - How long to wait between successive calls to func
		 * @param  boolean immediate - Whether to call func on leading edge (rather
		 *   than trailing edge)
		 */

		this.debounce = function(func, wait, immediate) {
			var timeout, args, context, timestamp, result;

			var later = function() {
				var last = Utilities.now() - timestamp;

				if (last < wait && last >= 0) {
					timeout = setTimeout(later, wait - last);
				} else {
					timeout = null;
					if (!immediate) {
						result = func.apply(context, args);
						if (!timeout) context = args = null;
					}
				}
			};

			return function() {
				context = this;
				args = arguments;
				timestamp = Utilities.now();
				var callNow = immediate && !timeout;
				if (!timeout) timeout = setTimeout(later, wait);
				if (callNow) {
					result = func.apply(context, args);
					context = args = null;
				}

				return result;
			};
		};

		/*
			Applies video poster to video wrap element as a fallback for IE8 HTML5 videos.

			Parameters
			- $videoWraps: jQuery object representing selected <video-wrap-element>'s

			Expects the following DOM hierarchy:
				<video-wrap-element>
					<video poster="NOT UNDEFINED">
		*/
		this.VideoPoster = function($videoWraps) {
			for (var i = $videoWraps.length - 1; i >= 0; i--) {
				var $videoWrap = $($videoWraps[i]);
				var $video = $videoWrap.find("video");
				var posterSrc = $video.attr("poster");
				$videoWrap.css("background-image", "url(" + posterSrc + ")");
			};
		};


    };

    app.extend({ util: new Util() });

    return app.util;

});

(function(window, overwatch){

    var util = overwatch.util;

    var YtEmbedder = function() {
        return {
        	defaultConfig: {
        		"fs": 1,
        		"rel": 0,
        		"showinfo": 0,
        		"autohide": 1,
        		"enablejsapi": 1,
        		"modestbranding": 1,
        		"wmode": "opaque"
        	},
        	queue: [],

        	/*
        		Queues the creation of a YouTube Iframe to the specified element.
        	*/
        	load: function($parent, config, ytId) {
        		var _this = this;
        		this.queue.push(function() {
        			return _this.appendIframeTo($parent, config, ytId);
        		});
        	},
        	/*
        		Creates an YouTube Iframe and appends it to the specified element.
        	*/
        	appendIframeTo: function($parent, config, ytId) {
        		var config = config || this.defaultConfig;
        		var ytId = ytId || $parent.data("ytId");

        		var placeholder = $("<div>").appendTo($parent).get(0);
        		return new this.YT.Player(placeholder, {
        			videoId: ytId,
        			playerVars: config
        		});
        	},
        	/*
        		Loads YouTube Iframe API and all queued videos.
        	*/
        	init: function() {
        		var _this = this;

        		// window.onYouTubeIframeAPIReady = function() {
        		// 	_this.YT = YT;
        		// 	embedVideos();
        		// };

        		function embedVideos() {
        			for (var i = _this.queue.length - 1; i >= 0; i--) {
        				var player = _this.queue[i]();
        				preparePlayer(player);
        			};
        		}

        		function preparePlayer(player) {
        			// We don't want to exit full screen on a desktop if a user is trying to full screen
        			if (util.mobile()) {
        				// Pause videos if device goes into landscape mode or changes orientation.
        				MediaQuery.onDesktop(function() {
        					document.exitFullscreen();
        					player.pauseVideo();
        				});
        			}
        		}

        		// $("<script>")
        		// 	.attr("src", "https://www.youtube.com/iframe_api")
        		// 	.appendTo($("body"));
        	}
        }
    };

    window.YtEmbedder = new YtEmbedder();
    overwatch.extend({ YtEmbedder: new YtEmbedder() });

}(window, window.overwatch));

;"use strict";
window.overwatch = window.overwatch || {};
window.overwatch.BuyMediator = (function(overwatch) {

	/**
	 * [callbackMap description]
	 * @type {Object}
	 */
	var callbackMap = {};

	var Sku = null,
		Country = null,
		Platform = null,
		PrimaryRetailer = null,
		SecondaryRetailer = null;

	function init(config) {
		Sku = config.Sku;
		Country = config.Country;
		Platform = config.Platform;
		PrimaryRetailer = config.PrimaryRetailer;
		SecondaryRetailer = config.SecondaryRetailer;

		on(Sku.eventNameChange, function(sku) {
			//
			Platform.updateList(sku.id);

			//
			var currentPlatform = Platform.getCurrent();
			var country = Country.getCurrent();

			PrimaryRetailer.setCurrentRetailerByPlatformAndSkuIdAndCountryCode(currentPlatform, sku.id, country);
			SecondaryRetailer.setCurrentRetailersByCountryCodeAndSkuIdAndPlatform(country, sku.id, currentPlatform);
		});

		on(Country.eventNameChange, function(country) {
			//
			Sku.updateList(country);
		});

		on(Platform.eventNameChange, function(platform) {
			//
			var sku = Sku.getCurrent();
			var country = Country.getCurrent();

			PrimaryRetailer.setCurrentRetailerByPlatformAndSkuIdAndCountryCode(platform, sku.id, country);
			SecondaryRetailer.setCurrentRetailersByCountryCodeAndSkuIdAndPlatform(country, sku.id, platform);
		});

		on(PrimaryRetailer.eventNameChange, function(retailer) {
		});

		on(SecondaryRetailer.eventNameChange, function(retailers) {
		});
	}

	function on(event, cb, context) {
		context = context || this;
		var callbackList = (callbackMap[event] = callbackMap[event] || []);
		callbackList.push({ context: context, callback: cb });
	}

	function publish(event) {
		var callbackList = callbackMap[event] || [];
		var args = Array.prototype.slice.call(arguments, 1);
		for (var i = 0; i < callbackList.length; i++) {
			var callbackObj = callbackList[i];
			var context = callbackObj.context;
			var cb = callbackObj.callback;
			cb.apply(context, args);
		}
	}

	return {
		init: init,
		on: on,
		publish: publish
	};

}(window.overwatch));

;"use strict";
window.overwatch = window.overwatch || {};
window.overwatch.CountryModel = {

	Mediator: null,
	
	eventNameChange: null,

	current: null,

	$doc: $(document),

	init: function(config) {
		this.Mediator = config.Mediator;
		this.eventNameChange = config.eventNameChange;
		this.current = config.current;
	},

	getCurrent: function() {
		return this.current;
	},

	setCurrent: function(country) {
		this.current = country;
		this._publish();
	},

	_publish: function() {
		this.Mediator.publish(this.eventNameChange, this.current);
	}

};

(function(window, document, $){

	overwatch.buy = overwatch.buy || {};
	overwatch.buy.navigation = overwatch.buy.navigation || {};
	overwatch.buy.navigation.init = function init() {
		var $nav = $('.edition-select');
		var $active = $nav.children('.active');
		var $thing = $active.children('.active-splash');
		var Mediator = window.overwatch.BuyMediator;
		var util = window.overwatch.util;

		// get the window offset value for resolutions > 2560
		function windowOffset(){
			var w = util.width();
			return w > 2560 ? (w - 2560)/2 : 0;
		};

		// set position and width of $thing
		// account for skew effect and height differences
		// http://stackoverflow.com/a/9284016
		function setPosition(opts){

			var opts = opts || { duration: 0 };

			// get active item boundingRect
			var rect = $active[0].getBoundingClientRect();

			// set new values
			// account for skew effect on boundingRect and
			// active item height being 84% of active-splash
			//debugger;
			$thing.velocity({
				left: (rect.left - windowOffset()),// + ((Math.tan(0.25) * (rect.height * 0.84)) / 2),
				width: $active[0].clientWidth
			}, opts);
		};

		if(typeof $thing[0] !== 'undefined') {
			// wait till DOM is ready before reading boundingRect values
			$(document).on('ready', function(event){

				// get initial boundingRect
				var rect = $thing[0].getBoundingClientRect();

				// account for the transform skew affect on boundingRect
				// clientWidth to get actual width without skew affect on boundngRect
				$thing.velocity({
					left: (rect.left - windowOffset()), // + ((Math.tan(0.25) * rect.height) / 2),
					width: $thing[0].clientWidth
				}, {
					duration: 0,
					complete: function(){

						// append to the navigation container
						// after setting values is complete
						// or sometimes we get fouc
						$thing = $thing.appendTo($nav.parent());
					}
				});


				// handle nav item clicks
				Mediator.on("ow.sku.change", function(sku){

					// set current active tab
					$active = $nav.find("[data-sku-change='" + sku.id + "']");


					// set the new position/ width
					setPosition({ duration: 200, easing: 'easeOutQuad' });
				});

				// set resize event after document.ready becuase some browsers
				// trigger a resize event at an earlier time
				// and we would get incorrect values set on the object
				$(window).on('resize', function(){

					// set the new position/ width
					setPosition();
				});

				// update position on buy form open and close
				$(document).on('ow.buy.form.show ow.buy.form.hide', function(){

					// set the new position/ width
					setPosition();
				});

			});
		}
	};

})(window, window.document, window.jQuery);

;"use strict";
window.overwatch = window.overwatch || {};
window.overwatch.PlatformModel = {

	Mediator: null,
	
	eventNameChange: null,

	defaultList: null,

	currentList: null,

	current: null,

	defaultPlatform: null,

	$doc: $(document),

	// TODO: externalize
	platformExceptions: null,

	init: function(config) {
		var self = this;

		this.Mediator = config.Mediator;
		this.eventNameChange = config.eventNameChange;
		this.defaultList = config.defaultPlatformList;
		this.currentList = this.defaultList;
		this.current = config.current;
		this.defaultPlatform = config.defaultPlatform;
		this.platformExceptions = config.platformExceptions;
	},

	updateList: function(skuId) {
		// filter out platform exceptions (platforms that don't support provided sku)
		var exceptions = this.platformExceptions[skuId];
		if (exceptions) {
			this.currentList = this.defaultList
				.filter(function filterUnsupported(platform) {
					return exceptions.indexOf(platform) === -1;
				});
		} else {
			this.currentList = this.defaultList;
		}

		// reset current platform if it's no longer supported after sku change
		if (this.currentList.indexOf(this.current) === -1) {
			this.setCurrent(this.defaultPlatform);
		}
	},

	getList: function() {
		return this.currentList;
	},

	getUnavailableList: function() {
		var currentList = this.currentList;
		return this.defaultList
			.filter(function filterSupported(platform) {
				return currentList.indexOf(platform) === -1;
			});
	},

	getCurrent: function() {
		return this.current;
	},

	setCurrent: function(platform) {
		this.current = platform;
		this._publish();
	},

	_publish: function() {
		this.Mediator.publish(this.eventNameChange, this.current);
	}

};

;"use strict";
window.overwatch = window.overwatch || {};

window.overwatch.PrimaryRetailerModel = {

	Mediator: null,

	eventNameChange: null,

	retailerMap: null,

	currentRetailer: null,

	platformMap: null,

	$doc: $(document),

	init: function(config) {
		var self = this;

		this.eventNameChange = config.eventNameChange;
		this.retailerMap = config.retailerMap;
		this.currentRetailer = config.currentRetailer;
		this.platformMap = config.platformMap;
		this.Mediator = config.Mediator;
	},

	getCurrentRetailer: function() {
		return this.currentRetailer;
	},

	setCurrentRetailerByPlatformAndSkuIdAndCountryCode: function(platform, skuId, countryCode) {
		var newRetailer = null;
		var retailerName = this.platformMap[platform].shopName || this.platformMap[platform].name;
		var retailer = this.retailerMap[platform] || {};
		var href = this._getRetailerUrl(retailer, skuId, countryCode);
		if (href) {
			newRetailer = {
				name: retailerName,
				platform: retailer.platform,
				href: href
			};
		}
		this.setCurrentRetailer(newRetailer);
	},

	setCurrentRetailer: function(retailer) {
		this.currentRetailer = retailer;
		this._publish();
	},

	_getRetailerUrl: function(retailer, skuId, countryCode) {
		var url = null;
		if (skuId === "ORIGINS" && retailer.countryLinkOrigins && retailer.countryLinkOrigins[countryCode]) {
			url = retailer.countryLinkOrigins[countryCode];
		} else if (skuId === "BASIC" && retailer.countryLinkBasic && retailer.countryLinkBasic[countryCode]) {
			url = retailer.countryLinkBasic[countryCode];
		} else if (skuId === "COLLECTORS" && retailer.countryLinkCollectors && retailer.countryLinkCollectors[countryCode]) {
			url = retailer.countryLinkCollectors[countryCode];
		} else if (retailer.skuLinks) {
			url = retailer.skuLinks[skuId];
		}
		return url;
	},

	_publish: function() {
		this.Mediator.publish(this.eventNameChange, this.currentRetailer);
	}

};

window.overwatch.SecondaryRetailerModel = {

	Mediator: null,

	eventNameChange: null,

	retailerMap: null,

	currentRetailers: null,

	$doc: $(document),

	init: function(config) {
		var self = this;

		this.Mediator = config.Mediator;
		this.eventNameChange = config.eventNameChange;
		this.retailerMap = config.retailerMap;
		this.currentRetailers = config.currentRetailers || [];
	},

	getCurrentRetailers: function() {
		return this.currentRetailers;
	},

	setCurrentRetailersByCountryCodeAndSkuIdAndPlatform: function(countryCode, skuId, platform) {
		var retailers = this.retailerMap[countryCode] || [];

		retailers = retailers
			.filter(function filterPlatform(retailer) {
				// either platform matches OR platform isn't specific (unspecified = all platforms)
				return retailer.platform === null || retailer.platform === platform;
			})
			.filter(function removeUnsupportedSku(retailer) {
				var href = retailer.skuLinks[skuId];
				return href !== undefined;
			})
			.map(function simpleRetailerTransform(retailer) {
				return {
					name: retailer.name,
					href: retailer.skuLinks[skuId]
				};
			});

		if (retailers.length === 0) {
			retailers = null;
		}

		this.setCurrentRetailers(retailers);
	},

	setCurrentRetailers: function(retailers) {
		this.currentRetailers = retailers;
		this._publish();
	},

	_publish: function() {
		this.Mediator.publish(this.eventNameChange, this.currentRetailers);
	}

};

(function(window, document, $){
	
	var $doc = $(document);
	var $thing = $('.learn-more-tip-container');
	
	// wait til dom is ready before reading boundingRect values
	$doc.on('ready', function(event){
		
		var visible = 1;
		
		// handles hiding the scroll btn and removes scroll event
		function hideScroll(){
			visible = 0;
			$doc.off('scroll.learnmore');
			$thing.velocity('fadeOut', {
				duration: 200,
				easing: 'easeOutQuart',
				complete: function(){
					$thing.detach();
				}
			});
		};
					
		// handle page scroll on btn click
		$thing.on('click', function(event){
			event.preventDefault();
			if(visible){
				var $detail = $('.detail.active');
				$detail.velocity('scroll', {
					duration: 200,
					easing: 'easeOutQuart'
				});
				hideScroll();
			}
		});
	});
	
})(window, window.document, window.jQuery);

;"use strict";
window.overwatch = window.overwatch || {};
window.overwatch.SkuModel = {

	Mediator: null,

	eventNameChange: null,

	countrySkuMap: null,

	currentList: null,

	current: null,

	currentIndex: null,

	$doc: $(document),

	/**
	 * [init description]
	 * 
	 * @param [config] {Object} Config object
	 * @param [config.eventNameChange] 
	 * @param [config.countrySkuMap] 
	 * @param [config.currentList] 
	 * @param [config.defaultId] 
	 */
	init: function(config) {
		var self = this;

		this.Mediator = config.Mediator;
		this.eventNameChange = config.eventNameChange;
		this.countrySkuMap = config.countrySkuMap;
		this.currentList = config.currentList;

		// initializes 'current' and 'currentList' and fires initial change event
		this.setCurrentById(config.defaultId);
	},

	getCurrent: function() {
		return this.current;
	},

	getPrevious: function() {
		var prev = this._mod(this.currentIndex - 1, this.currentList.length);
		return this.currentList[prev];
	},

	getNext: function() {
		var next = this._mod(this.currentIndex + 1, this.currentList.length);
		return this.currentList[next];
	},

	getCurrentById: function(id) {
		for (var i = this.currentList.length - 1; i >= 0; i--) {
			var sku = this.currentList[i];
			if (sku.id === id) {
				return sku;
			}
		};
		console.error(id + " SKU not found.");
	},

	setCurrent: function(sku) {
		this.current = sku;
		this.currentIndex = this.currentList.indexOf(sku);
		this._publish();
	},

	setCurrentById: function(id) {
		var sku = this.getCurrentById(id);
		this.setCurrent(sku);
	},

	updateList: function(countryCode) {
		this.currentList = this.countrySkuMap[countryCode];
		this.setCurrentById(this.current.id);
	},

	_publish: function() {
		this.Mediator.publish(this.eventNameChange, this.current);
	},

	_mod: function(x, y) {
		return (((x % y) + y) % y);
	}

};

//Landing trailers functionality.
(function(window, document, $){

	function init(opts){

		// video player params
		var params = {
			rel: 0,
			autoplay: 0,
			autohide: 1,
			controls: 1,
			modestbranding: 1,
			showinfo: 0,
			version: 3,
			enablejsapi: 1,
			wmode: 'opaque',
		};

		// root element to append video
		var $elem = opts.$videoTrailer;

		// mobile utilites
		var util = window.overwatch.util;

		// load youtube iframe api
		// $("<script>")
		// 	.attr("src", "https://www.youtube.com/iframe_api")
		// 	.appendTo($("body"));

		// create a video and append to the page
		// creates iframe on mobile
		// and uses iframe api on non-mobile devices
		function createPlayer(){

			// get the youtube video id
			var id = $elem.data('ytId');

			// append iframe for mobile devices
			if(util.mobile() || util.touch()){

				// hide image overlay
				$elem.toggleClass('active', true);

				// create the iframe and append to $elem
				var $iframe = $('<iframe/>',{
					attr: {
						width: '100%',
						height: '100%',
						allowFullScreen: true,
						frameBorder: 0,
						src: 'https://www.youtube.com/embed/' + id + '?' + $.param(params)
					}
				}).appendTo($elem);

			// handle non-mobile devices
			} else {

				// create placeholder div
				var $div = $('<div/>').appendTo($elem);

				// create player and embed video
				var player = new window.YT.Player($div[0], {
					videoId: id,
					playerVars: params,
					events: {
						onReady: function(event){
							$elem.on('click', function(){
								event.target.playVideo();
								$elem.toggleClass('active', true);
							});
						}
					}
				});

				$elem.on('click', function(event){
					event.preventDefault();
					$elem.toggleClass('active', true);
				});
			}
		};

		window.onYouTubeIframeAPIReady = function(){
			createPlayer();
		};

	};

	window.overwatch.OriginsTrailers = {
		init: init
	};

})(window, window.document, window.jQuery);

(function(window, overwatch){

	$('.blog-load-more a').click(loadMoreNews);

	var currentPage = 1;

	function loadMoreNews() {
		currentPage++;
		$.get('/' + window.blizzard.urlLocale + '/blog/next-posts', {page: currentPage})
		.then(function processNextPosts(results) {
			$('.blog-roll .blog-list').append(results.content);

			if (results.totalPages == results.page) {
				$('.blog-load-more').hide();
				return false;
			}
		});
	}
}(window, window.overwatch));

(function(window, overwatch, $){

	overwatch.buy = overwatch.buy || {};
	overwatch.buy.init = function init() {
		var config = window.ow.buyConfig;

		var $window = $(window);
		var $document = $(document);
		var $body = $("body");

		var SkuModel = window.overwatch.SkuModel;
		var CountryModel = window.overwatch.CountryModel;
		var PlatformModel = window.overwatch.PlatformModel;
		var PrimaryRetailerModel = window.overwatch.PrimaryRetailerModel;
		var SecondaryRetailerModel = window.overwatch.SecondaryRetailerModel;
		var Mediator = window.overwatch.BuyMediator;
		var OriginsTrailers = window.overwatch.OriginsTrailers;

		var platformRetailerNameMap = {
			'pc': 'Battle.net Shop',
			'xbox-one': 'Microsoft Store',
			'ps4': 'PlayStation Store'
		};

		SkuModel.init({
			eventNameChange: "ow.sku.change",
			countrySkuMap: config.skus,
			currentList: config.skus[config.defaultCountry],
			defaultId: config.defaultSkuId,
			Mediator: Mediator
		});

		CountryModel.init({
			eventNameChange: "ow.country.change",
			current: config.defaultCountry,
			Mediator: Mediator
		});

		PlatformModel.init({
			eventNameChange: "ow.platform.change",
	            defaultPlatformList: Object.keys(config.platformMap),
			platformMap: config.platformMap,
			current: config.defaultPlatform,
			defaultPlatform: "pc", // TODO: Externalize
			platformExceptions: {
				"BASIC": ["xbox-one", "ps4"]
			},
			Mediator: Mediator
		});

		PrimaryRetailerModel.init({
			eventNameChange: "ow.retailer-primary.change",
			retailerMap: config.primaryRetailerMap,
			platformMap: config.platformMap,
			currentRetailer: config.primaryRetailerMap[config.defaultPlatform],
			Mediator: Mediator
		});

		SecondaryRetailerModel.init({
			eventNameChange: "ow.retailer-secondary.change",
			retailerMap: config.secondaryRetailerMap,
			currentRetailers: config.secondaryRetailerMap[config.defaultCountry],
			Mediator: Mediator
		});

		Mediator.init({
			Sku: SkuModel,
			Country: CountryModel,
			Platform: PlatformModel,
			PrimaryRetailer: PrimaryRetailerModel,
			SecondaryRetailer: SecondaryRetailerModel
		});

		OriginsTrailers.init({
			$videoTrailer: $(".video-wrap")
		});

		// navigation ui
		var $navTabsItems = $(".nav-tabs-item[data-sku-change]");
		var $navPagerLeft = $(".nav-pager-left");
		var $navPagerRight = $(".nav-pager-right");

		// product info panels
		var $skuSpecificBlocks = $("[data-sku-display].is-showable-block");

		// buy bar ui
		var $retailerToggleButtons = $(".retailer-menu-btn, .mobile-retailer-menu-btn, .js-close");
		var $retailerWrapDigital = $(".retailer-wrap.digital");
		var $retailerWrapPhysical = $(".retailer-wrap.physical");
		var $primaryRetailerBtn = $retailerWrapDigital.find(".primary-retailer-btn");
		var $retailerPhysicalList = $retailerWrapPhysical.find(".link-list");
		var $pricePreview = $(".price-preview");
		var $price = $(".price, .js-price");

		// order form
		var $form = $(".order-form"); // retailer choices
		var $formFields = $(".order-form fieldset");
		var $platformSelect = $(".order-form .radio-list-item input[type='radio']");
		var $productSplash = $(".js-product-splash");

		// order form warning labels
		var $platformWarning = $(".platform-warning");
		var unsupportedPlatformWarningSelector = ".js-platform-warning-label-platform-unsupported";
		var unsupportedPlatformWarningRedirectSelector = ".js-platform-warning-label-redirect";

		var retailersShown = false;
		var retailerListItemClass = "link-list-item";
		var retailerButtonClass = "link-list-link";

		var activeClass = "active";
		var hiddenClass = "hidden";

		var currentScrollTop = 0;

		// error messages cache
		var errorMessages = window.ow.errorMessages.buy;

		// get an error message by type and name
		// set $elem html and add sku change event handlers
		function setErrorMsg($elem, type, name){

			// get messages list
			var list = errorMessages[type];

			// get message by name
			var message = list[name] || list['base'];

			// set message as html, add data-sku event handler
			$elem.html(message).find('[data-sku-change]').on('click', function(){
				SkuModel.setCurrentById($(this).attr('data-sku-change'));
			});
		};

		// store each price element and parent
		var priceElems = [];

		// get the elem and parent for each price
		for(var i = 0; i < $price.length; i++){
			priceElems.push({ $elem: $($price[i]), $parent: $($price[i]).parent() });
		}

		// hide/show price elements based on platform and price
		function updatePriceElems(){

			// get the currrent platform
			var platform = PlatformModel.current;

			// get the current price
			var price = SkuModel.current.price;

			// if platform is pc, append price elems to parent
			// if not pc or no price found, detach price elems from dom
			for(var i = 0; i < priceElems.length; i++){
				if(platform !== 'pc' || !price){
					priceElems[i].$elem.detach();
				} else {
					priceElems[i].$parent.append(priceElems[i].$elem);
				}
			}
		};

		// toggle order form
		$retailerToggleButtons.click(function toggleOrderForm(event) {
			retailersShown = !retailersShown;
			if (retailersShown) {
				$document.trigger("ow.buy.form.show");
			} else {
				$document.trigger("ow.buy.form.hide");
			}
			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
		});

		// analytics
		$(".blackout.js-close").click(function() {
			publishBuyBarGtmEvent("Close - Background");
		});
		$(".close.x.js-close").click(function() {
			publishBuyBarGtmEvent("Close - X");
		});
		$retailerWrapDigital.on("click", ".primary-retailer-btn", function() {
			var retailerName = platformRetailerNameMap[PlatformModel.getCurrent()];
			publishBuyBarGtmEvent("Click - " + retailerName);
		});
		$retailerWrapPhysical.on("click", ".link-list-link", function() {
			var retailerName = this.textContent;
			publishBuyBarGtmEvent("Click - Retail - " + retailerName);
		});

		// react to form hide events
		$document.on("ow.buy.form.show", function hideOrderForm() {
			retailersShown = true;

			// Fix order form position
			currentScrollTop = $window.scrollTop();
			setFixedPage(true, currentScrollTop);

			// Toggle buy bar & form display
			$('.buy-bar-container').addClass('open');
			$form.addClass(activeClass);
			$pricePreview.addClass(activeClass);

			// analytics
			publishBuyBarGtmEvent("Open");
		});

		$document.on("ow.buy.form.hide", function showOrderForm() {
			retailersShown = false;

			// Unfix order form position
			setFixedPage(false, currentScrollTop);

			// Toggle buy bar & form display
			$('.buy-bar-container').removeClass('open');
			$form.removeClass(activeClass);
			$pricePreview.removeClass(activeClass);
		});

		// fire country change events
		var $countrySelect = $(".js-country-select");
		$countrySelect.on("change", function fireCountryChange() {
			var country = $(this).val();
			var previousCountry = CountryModel.getCurrent();
			CountryModel.setCurrent(country);
			var currentCountry = CountryModel.getCurrent();

			// analytics
			publishCountryGtmEvent(previousCountry, currentCountry);
		});

		// fire sku change events
		var $skuSelect = $("[data-sku-change]");
		$skuSelect.click(function fireSkuChange(event) {
			var skuId = $(this).attr("data-sku-change");
			SkuModel.setCurrentById(skuId);
			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
		});

		// fire platform change events
		$platformSelect.click(function firePlatformChange(event) {
			var platform = $(this).val();
			PlatformModel.setCurrent(platform);
		});

		// react to sku change
		var oldsku = null;
		var $items = $('body, .buy-bar');
		Mediator.on("ow.sku.change", function handleSkuChange(sku) {
			var skuPrev = SkuModel.getPrevious();
			var skuNext = SkuModel.getNext();

			$items.toggleClass(sku.id.toLowerCase(), true);
			if(oldsku && oldsku !== sku){
				$items.toggleClass(oldsku.id.toLowerCase(), false);
			}

			updatePrice(sku.price);
			updateOverview(sku);
			updateTabbedNav(sku);
			updatePagerNav(skuPrev, skuNext);

			var unavailablePlatforms = PlatformModel.getUnavailableList();
			validatePlatformSelection(unavailablePlatforms, sku);

			// update price elements
			updatePriceElems();

			oldsku = sku;
		});

		// react to primary retailer change
		Mediator.on("ow.retailer-primary.change", function handlePrimaryRetailerChange(retailer) {
			updateDigital(retailer);
		});

		// react to secondary retailer change
		Mediator.on("ow.retailer-secondary.change", function handleSecondaryRetailerChange(retailers) {
			updatePhysical(retailers);
		});


		// react to platform change
		Mediator.on("ow.platform.change", function handlePlatformChange(platform) {

			updatePlatformSelection(platform);

			// update product splash
			$productSplash.attr("data-platform-display", platform);

			// update price elements
			updatePriceElems();
		});

		function updatePrice(price) {
			$price.html(price);
		}

		function updatePlatformSelection(platform) {
			$platformSelect.filter("[value='" + platform + "']").prop("checked", true);
		}

		// error message for digital retailer
		var $digitalErrorMsg = $('<div class="error-msg"></div>');

		// updates digital retailer button
		function updateDigital(retailer) {

			// check if retailers exist and is not null
			var doesRetailerExist = retailer !== null;

			// if no retailer append error message
			if (!doesRetailerExist) {
				setErrorMsg($digitalErrorMsg, 'digital');
				$retailerWrapDigital.append($digitalErrorMsg);
				$primaryRetailerBtn.detach();

			// else remove error message
			} else {
				$digitalErrorMsg.detach();
				$retailerWrapDigital.append($primaryRetailerBtn);
				$primaryRetailerBtn.attr("href", retailer.href);
				$primaryRetailerBtn.find("span").text(retailer.name);
			}
		}

		// error message for digital retailer
		var $physicalErrorMsg = $('<div class="error-msg"></div>');

		// updates physical retailer list
		function updatePhysical(retailers) {

			// check if physical retailers exist and not null
			var doRetailersExist = retailers !== null && retailers.length;

			// if no retailers append error message
			if (!doRetailersExist) {
				$retailerPhysicalList.empty();
				setErrorMsg($physicalErrorMsg, 'physical', SkuModel.current.id.toLowerCase());
				$retailerWrapPhysical.append($physicalErrorMsg);

			// else remove error message and append list
			} else {
				var retailersFrag = createPhysicalRetailerList(retailers);
				$physicalErrorMsg.detach();
				$retailerPhysicalList.empty();
				$retailerPhysicalList.append(retailersFrag);
			}
		};

		updatePhysical(overwatch.SecondaryRetailerModel.currentRetailers);

		function updateOverview(sku) {
			// show/hide sku content
			$skuSpecificBlocks.removeClass(activeClass);
			$skuSpecificBlocks.filter("[data-sku-display='" + sku.id + "']").addClass(activeClass);
		}

		function updateTabbedNav(sku) {
			// update tabbed nav
			$navTabsItems.removeClass("m-active");
			$navTabsItems.filter("[data-sku-change='" + sku.id + "']").addClass('m-active');
		}

		function updatePagerNav(skuPrev, skuNext) {
			// update pager nav
			$navPagerLeft.attr("data-sku-change", skuPrev.id);
			$navPagerRight.attr("data-sku-change", skuNext.id);
			$navPagerLeft.find(".nav-pager-thumb-custom-text").html(skuPrev.id);
			$navPagerRight.find(".nav-pager-thumb-custom-text").html(skuNext.id);
		}

		function validatePlatformSelection(unavailablePlatforms, sku) {
			// hide all warnings initially
			$platformWarning.removeClass(activeClass);

			// enable all inputs
			$platformSelect.prop("disabled", false);

			// disable inputs for platforms that aren't supported
			$platformSelect.each(function disableInput(i, select) {
				var platform = select.value;

				// platform is supported so no need to disable. early exit
				if (unavailablePlatforms.indexOf(platform) === -1) { return; }

				// disable
				select.setAttribute("disabled", true);

				// display warning
				var $platformWarning = $(select).siblings(".platform-warning");
				$platformWarning.addClass(activeClass);
				$platformWarning.find(unsupportedPlatformWarningSelector).text(sku.id);
				$platformWarning.find(unsupportedPlatformWarningRedirectSelector)
					.text("Overwatch: Origins Edition")
					.click(function() {
						SkuModel.setCurrentById("ORIGINS");
						PlatformModel.setCurrent(platform);
						if (event.preventDefault) {
							event.preventDefault();
						} else {
							event.returnValue = false;
						}
					});
			});
		}

		// platform list parent
		var $platform = $('.buy-bar .radio-list');

		// platform elems cache
		var platformElems = {};

		// default platforms
		var platformDefaults = overwatch.PlatformModel.defaultList;

		// platform error message
		var $platformErrorMsg = $('<li class="radio-list-item error-msg"></li>');

		// get the root <li> element for each platform
		for(var i = 0; i < platformDefaults.length; i++){
			var key = platformDefaults[i];
			platformElems[key] = $platformSelect.filter('[value=' + key + ']').parent();
		}

		// handle showing/ hide of errors for platforms
		function platformError(){

			// get currrent platform list
			var list = overwatch.PlatformModel.currentList;

			// if only one platform available, remove others and show message
			if(list.length === 1){
				var key = list[0];
				PlatformModel.setCurrent(key);
				for(var i in platformElems){
					if(i !== key){
						platformElems[i].detach();
					} else {
						$platform.append(platformElems[i]);
					}
				}

				// set the error message contents and append
				setErrorMsg($platformErrorMsg, 'platform', key);
				$platform.append($platformErrorMsg);

			// otherwise append all items
			} else {
				for(var i in platformElems){
					$platformErrorMsg.detach();
					$platform.append(platformElems[i]);
				}
			}

		};
		// get the title element for custom select
		var $selectText = $('.custom-select .select-title .text');

		// set the current country name for select title
		function updateSelect(){
			var country = CountryModel.current;
			$selectText.text($countrySelect.find('option[value=' + country + ']').text());
		};

		updateSelect();

		// handle platform message update on sku change
		Mediator.on('ow.sku.change', function(data){
			platformError();
		});

		// handle platform message update on country change
		Mediator.on('ow.country.change', function(data){
			updateSelect();
			platformError();
		});

		function createPhysicalRetailerList(retailers) {
			var frag = document.createDocumentFragment();

			retailers = window.app.util.shuffleArray(retailers);

			for (var i = 0; i < retailers.length; i++) {
				var retailer = retailers[i];

				var li = document.createElement("li");
				li.className = "link-list-item";

				var anchor = document.createElement("a");
				anchor.className = "link-list-link";
				anchor.setAttribute("href", retailer.href);
				anchor.setAttribute("target", "_blank");
				anchor.textContent = retailer.name;

				li.appendChild(anchor);
				frag.appendChild(li);
			};

			return frag;
		}

		function setFixedPage(fixed, scrollTop) {
			$body.css("position", fixed ? "fixed" : "static");
			$body.css("top", fixed ? -scrollTop : "auto");
			if (!fixed) {
				$window.scrollTop(scrollTop);
			}
		}

		// gtm event publish helper
		function publishBuyBarGtmEvent(placement) {
			var sku = SkuModel.getCurrent();
			var platform = PlatformModel.getCurrent();
			var country = CountryModel.getCurrent();
			var eventPanel = "product:" + sku.id + " - platform:" + platform + " - country:" + country;

			if(window.dataLayer) {
				window.dataLayer.push({
					"analytics.eventPanel": eventPanel,
					"analytics.eventPlacement": placement,
					"event": "buyBar"
				});
			}
		}
		function publishCountryGtmEvent(previous, current) {
			var sku = SkuModel.getCurrent();
			var platform = PlatformModel.getCurrent();
			var eventPanel = "product:" + sku.id + " - platform:" + platform;

			if(window.dataLayer) {
				window.dataLayer.push({
					"analytics.eventPanel": eventPanel,
					"analytics.eventPlacement": previous + " > " + current,
					"event": "buyCountrySwitch"
				});
			}
		}

		// trigger view updates from platform change (platform can be set from query param)
		PlatformModel.setCurrent(config.defaultPlatform);

		// alphabetize country dropdown
		var $countrySelectOptions = $countrySelect.find("option");
		var newCountryOptions = $countrySelectOptions.sort(function(a, b) {
			return a.text.charAt(0).toLowerCase().charCodeAt(0) - b.text.charAt(0).toLowerCase().charCodeAt(0);
		});
		$countrySelect.empty().append(newCountryOptions);
	};

}(window, window.overwatch, window.jQuery));

!function(root, factory){

    factory(root, root.app, root.overwatch, root.jQuery);

}(this, function(root, app, overwatch, $){

	var util = overwatch.util;

	function init(){

		var video = $('#scroll-to-play')[0];
		var visited = 0;

		function checkScroll(){
			var rect = video.getBoundingClientRect();
	        if(rect.top <= rect.height/2){
	        	if(!visited){
	        		visited = 1;
	        		video.play();
	        	}
	        }
		};

		// throttle to 30fps
		$(root.document).on('scroll resize', _.throttle(checkScroll, 32));

		$('.overwatch-trailer').on('click', function(event){
            var id = $(this).attr('data-yt-id');
            if(!util.mobile() && !util.touch()){
				event.preventDefault();
				app.helpers.loadVideoIntoFrame(id);
			}
		});

		checkScroll();
		root.Maps.init();
	};

	app.extend({ game: { init: init }});

});

(function(window, overwatch, MainMenu){

	document.exitFullscreen = document.exitFullscreen || document.mozCancelFullscreen || document.webkitExitFullscreen || _.noop;


    window.Login = {
        open: function(){
            window.location = '?login';
        }
    };

	MainMenu.init({
		$menuMainWrap: $(".menu-main-wrap"),
		$menuMain: $(".menu-main"),
		$socialMenuMain: $(".menu-social.desktop-only"),
		$menuMainPin: $(".menu-main-wrap .menu-main-pin"),
		$buyButtonWrap: $(".erebos-button-container"),
		menuMainThreshold: 100,
		hiddenClass: "menu-hidden",
		fixedClass: "is-fixed"
	});

	YtEmbedder.init();

    $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function() {
		var isFullScreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen || null;
		$(document.body).toggleClass('is-fullscreen', isFullScreen);
	});

}(window, window.overwatch, window.MainMenu));

(function(window, app, overwatch, $, _){
	var hero_details = {};
	
	hero_details.setupMediaEvents = function setupMediaEvents() {
		$(".media-thumbnail").on("click",function() {
			var mediaType = $(this).data('media-type');
			
			switch (mediaType) {
				case 'youtube':
					var videoId = $(this).data("yt-id");
					app.helpers.loadVideoIntoFrame(videoId);
					break;
				case 'img':
					app.helpers.loadImageIntoFrame($(this).attr('href'));
					break;
				default: 
					return true;
					break;
			}
			return false;
		});
	};

	hero_details.loadTabs = function() {
		var link_tab = window.location.hash.substr(1),
			$details = $('#details'),
			heroVideo = $details.find(".hero-detail-video"),
			heroBg = $details.find(".hero-detail-background"),
			tabs = $("#details-tabs");

		this.tabs = new Foundation.Tabs(tabs);		
				
		// change story background when story tab selected
		tabs.on('change.zf.tabs', function toggleStoryBackground() {
			var $tab = $(this).find('[aria-selected="true"]');
			var tabName = $tab.attr('aria-controls');
			if (tabName === 'story') {
				heroVideo.removeClass("is-active");
				heroBg.addClass("is-active");
			} else {
				heroVideo.addClass("is-active");
				heroBg.removeClass("is-active");
			}
		});

		if(link_tab){
			this.tabs.selectTab('#'+link_tab);
		}
	};

	hero_details.loadShowcase = function loadShowcase() {
		var $showcase = $('.ability-showcase');
		var abilityShowcase = new overwatch.AbilityShowcase('.ability-showcase');
		var init = false;
		var playing = false;

		var resizeFn = _.debounce(function toggleShowcaseByVisibility() {
			var visible = $showcase.is(':visible');
			if (visible && !init) {
				// visible, needs initialization
				abilityShowcase.init();
				init = true;
				playing = true;
			} else if (visible && !playing) {
				// visible, but stopped and needs to play
				abilityShowcase.play();
				playing = true;
			} else if (!visible) {
				// not visible, just stop
				abilityShowcase.stop();
				playing = false;
			}
		}, 250);
		
		$(window).on('resize', resizeFn);

		// kick off init script
		resizeFn();
	};
	
	hero_details.init = function init() {
		this.setupMediaEvents();
		this.loadTabs();
		this.loadShowcase();
	};

	app.extend({ hero_details: hero_details });

}(window, window.app, window.overwatch, window.jQuery, window._));

(function(window, app, overwatch){
	var heroes = {};
	heroes.init = function init() {
		overwatch.HeroSelector.init({
			$container: $('#heroes-selector-container'),
			$sizer: false,
			$navigationLinks: $('#hero-selector-navigation-selector .navigation-link'),
			itemSelector: '#heroes-selector-container .hero-portrait-detailed-container'
		});
		
		var hash = location.href.substr(location.href.indexOf('#')+1).toUpperCase();
		if(['OFFENSE', 'DEFENSE', 'TANK', 'SUPPORT'].indexOf(hash) !== -1) {
			overwatch.HeroSelector.filter(hash);
		}
		
	};
	app.extend({ heroes: heroes });
}(window, window.app, window.overwatch));

(function(window, app, overwatch, $, _) {
	var home = {};

	var util = overwatch.util;

	var CLASS_PORTRAIT_ACTIVE = 'is-active';

	//https://gist.github.com/webcyou/a1093f2f1b4533cf3f7a
	//TODO move to lib for other people?
	var whichAnimationEvent = function whichAnimationEvent(){
		var t,
				el = document.createElement("fakeelement");

		var animations = {
			"animation"			: "animationend",
			"OAnimation"		 : "oAnimationEnd",
			"MozAnimation"	 : "animationend",
			"WebkitAnimation": "webkitAnimationEnd"
		};

		for (t in animations){
			if (el.style[t] !== undefined){
				return animations[t];
			}
		}
		return false;
	}();

	// TODO: can make this generic enough to run on all pages for all spotlight components if we standardize on expected data attribs
	home.registerSpotlight = function registerSpotlight(element) {
		var spotlight = new overwatch.Spotlight(element);
		var $portraitGroup = $('.js-hero-portrait-group');
		var lastSelectedName = '';
		var $lastPortrait = null;
		var $spotlightEl = $(element);

		$portraitGroup.on('mouseenter touchend', '.hero-portrait', handlePortraitSelect);

		function handlePortraitSelect(e) {
			//Only do this if the spotlight is showing, not on mobile
			if(!$spotlightEl.is(':visible')) {
				return;
			}
			var $this = $(this);
			var data = $this.data();
			var url = data['heroImage'];
			var name = data['heroName'];
			var description = data['heroDescription'];
			$this.addClass(CLASS_PORTRAIT_ACTIVE);

			// prevent loading same image if we're hovering over the same portrait
			if (lastSelectedName !== name) {
				if ($lastPortrait) { $lastPortrait.removeClass(CLASS_PORTRAIT_ACTIVE); }
				spotlight.loadImage(url, function setText() {
					spotlight.setHeader(name);
					spotlight.setCaption(description);
				});
				$lastPortrait = $this;
				lastSelectedName = name;
				e.preventDefault();
			}
		};

		// initialize spotlight with the first in the portrait group
		var $firstPortrait = $portraitGroup.find('.hero-portrait').first();
		$firstPortrait.trigger('mouseenter');

		// activate/deactivate hero portrait based on desktop/tablet
		var resizeFn = _.debounce(function () {
			if ($spotlightEl.is(':visible')) {
				// enable
				$lastPortrait = $lastPortrait || $firstPortrait;
				$lastPortrait.trigger('mouseenter');
			} else {
				// disable
				$portraitGroup.find('.hero-portrait').removeClass(CLASS_PORTRAIT_ACTIVE);
			}
		}, 250);

		$(window).on('resize', resizeFn);
	};

	home.trailerSetup = function trailerSetup() {
		$(".intro-trailer, .video-cta").on("click", function(event){
			var videoId = $(this).data("yt-id");
			if(!util.mobile() && !util.touch()){
				event.preventDefault();
				app.helpers.loadVideoIntoFrame(videoId);
			}
		});
	};

	home.rotatingCTA = function rotatingCTA() {
		var $allBtnArt = $('.buy-cta .btn-art');
		var currentTransIn = 1;
		var currentTransOut = 0;

		var transIn = function transIn(index) {
			$($allBtnArt[index]).removeClass('trans-out').addClass('trans-in');
		};

		var transOut = function transOut(index) {
			$($allBtnArt[index]).removeClass('trans-in').addClass('trans-out');
		};

		$.each($allBtnArt, function(index, el) {
			$(el).on(whichAnimationEvent, function(e) {
				if($(this).hasClass('trans-in')) {
					//TODO perhaps use MOD to simplify?
					currentTransIn = (index+1 > $allBtnArt.length-1) ? 0 : index+1;
					currentTransOut = index;
					transOut(currentTransOut);
					transIn(currentTransIn);
				}
			});
		});

		if(whichAnimationEvent !== false) {
			setTimeout(function() {
				$allBtnArt.removeClass('fallback');
				transIn(currentTransIn);
				transOut(currentTransOut);
			}, 3000);
		}
	};

	home.fftfBGTransition = function fftfBGTransition() {
		var $backgrounds = $('.bg-fftf');
		var currentTransIn = 0;
		var currentTransOut = 2;

		var transIn = function transIn(index) {
			$($backgrounds[index]).removeClass('trans-out').addClass('trans-in');
		};

		var transOut = function transOut(index) {
			$($backgrounds[index]).removeClass('trans-in').removeClass('trans-out').addClass('trans-out-latest');
		};

		$.each($backgrounds, function(index, el) {
			$(el).on(whichAnimationEvent, function(e) {
				if($(this).hasClass('trans-in')) {
					//TODO perhaps use MOD to simplify?
					currentTransIn = (index+1 > $backgrounds.length-1) ? 0 : index+1;
					currentTransOut = index;
					$backgrounds.removeClass('trans-out-latest').addClass('trans-out');
					transOut(currentTransOut);
					transIn(currentTransIn);
				}
			});
		});
	};

	home.init = function init() {
		// register all spotlight components on this page
		Array.prototype.forEach.call(document.querySelectorAll('.spotlight'), this.registerSpotlight);
		this.trailerSetup();
		this.rotatingCTA();
		this.fftfBGTransition();
	};

	app.extend({ home: home });

}(window, window.app, window.overwatch, window.jQuery, window._));

(function(window, overwatch, Media, MediaLightbox, SecondaryMenu){

	// TODO: Figure out if we need this
    // if ($('body').hasClass('media')) {
    //     MediaLightbox.init();
    //     Media.init();
    // }
    var media = {};
    media.init = function init() {
	    overwatch.menuScroll.init({
	        menuSelector: "#sub-nav-menu",
	        timeToHideMs: 5000,
	    });
    };
    media.init();
    app.extend({ media: media });
}(window, window.overwatch, window.Media, window.MediaLightbox, window.SecondaryMenu));

//# sourceMappingURL=app.js.map
