var galleryType ="images";
var dataKey = "artwork";
var viewType = "film-strip";
var indices = ["artwork-starcraft05", "artwork-starcraft06", "book-devilsdue", "artwork-jim-raynor", "artwork-starcraft02", "artwork-starcraft03", "artwork-starcraft04", "artwork-sonsofkorhal", "artwork-zerg01", "cin-protoss-carrier", "heavens-devils", "mengsk-fervor", "scv", "fruit-dealer", "artwork_blizzcon2007_marine", "artwork_blizzcon2007_protoss01", "artwork_blizzcon2008_zeratu", "artwork_blizzcon_poster2", "artwork_tassadar", "artwork_ghostblizzcon", "artwork_icon_heart_protoss", "artwork_icon_heart_terran", "artwork_icon_heart_zerg", "artwork_icon_protoss", "artwork_icon_terran", "artwork_icon_zerg01", "artwork_interior_final01", "artwork_interior_final02", "artwork_mengsk", "artwork_relic_crater", "artwork_starcraft", "artwork_tatoo_reaper", "artwork_tattoo01", "artwork_warfield01", "artwork_warfield02", "artwork_whendarknessandshadowcollide", "artwork_wolf_buckle", "artwork_zeratulorthos", "artwork_zeratulorthos2", "artwork_zeratul_paint", "artwork_zeratul_poster1", "artwork_zeratul_poster2", "artwork_zeratul_rings", "artwork_zergerking", "artwork_zergling", "artwork_zergswarm", "building_merchaven", "building_protoss_forge", "building_terran_armory", "building_terran_bunker", "building_terran_fusioncore", "building_terran_ghost_academy", "building_terran_reactor", "building_terran_refinery", "building_terran_sensortower", "building_terran_techlab", "building_zerg_extractor", "building_zerg_hatchery", "building_zerg_hive", "building_zerg_lair", "building_zerg_nyduscanal", "building_zerg_spawningpool", "building_zerg_spinecrawlerwalk", "building_zerg_ultraliskcavern", "cin_korhal_palace", "cin_assemblyarm", "cin_blizzcon_dropship", "cin_footsteps", "cin_hand", "cin_kerrigan_hydra", "cin_ls_", "cin_marine_01", "cin_marine_02", "cin_marine_03", "cin_marine_back", "cin_marine_pose_01", "cin_mc01_v9", "cin_mc02_v3", "cin_mc03_lightingop", "cin_mc04_gtung", "cin_mc05_shotconcept", "cin_mt030_4k_overpaint", "cin_mt080_", "cin_paintover", "cin_relic_crater__zealot", "cin_sb22", "cin_sb56", "cin_sb83", "cin_sb84", "cin_sc29", "cin_sc66", "cin_sc86", "cin_sc91", "cin_sc96_occlusion", "cin_sc96_v20_light", "cin_sc97_v8", "cin_selendis", "cin_shackles_and_removal", "cin_shotconcept", "cin_thetemple_01", "cin_thetemple_02", "cin_thetemple_03", "cin_thetemple_04", "cin_thetemple_05", "cin_thetemple_06", "cin_thetemple_07", "cin_thetemple_08", "cin_thetemple_09", "cin_thetemple_10", "cin_thetemple_11", "cin_thetemple_12", "cin_thetemple_13", "cin_zeartul01", "cin_zeratul_back", "cin_zeratul_bandolier", "cin_zeratul_footguard", "cin_zeratul_gauntlet", "cin_zeratul_grapplinghook", "cin_zeratul_knee", "cin_zeratul_mine", "cin_zeratul_pulsemine", "cin_zeratul_shoulder", "cin_zeratul_z_head01", "cin_zeratul_z_head02", "env_auir", "env_auir7", "env_battle", "env_bel_shir1", "env_bel_shir2", "env_braken", "env_bridge", "env_char", "env_char2", "env_crash_protoss", "env_dezergroom1", "env_dezergroom2", "env_kel_mor", "env_kerrigan_", "env_korhal", "env_marsara", "env_mar_sara_bar", "env_sp3", "env_tarsonis1", "env_tarsonis2", "env_terran_city", "poster_bowling", "poster_casino_port_zion", "poster_doctor_hansen", "poster_hanginghydralisk", "poster_holiday_tychus", "poster_nuke", "poster_raynors_raiders", "poster_tired_of_life", "poster_tosh_screamers", "poster_wanted_raynor", "unit_protoss_auirship", "unit_protoss_colossus", "unit_protoss_dark_templar01", "unit_protoss_dark_templar02", "unit_protoss_immortal", "unit_protoss_mothership00", "unit_protoss_mothership01", "unit_protoss_phaseprism", "unit_protoss_phoenix", "unit_protoss_stalker", "unit_protoss_twilightarchon", "unit_protoss_voidseekery", "unit_protoss_zealot01", "unit_protoss_zealot02", "unit_terran_autoturret", "unit_terran_battlecruiser", "unit_terran_liberator01", "unit_terran_marauder", "unit_terran_thor", "unit_zerg_baneling", "unit_zerg_changeling", "unit_zerg_infestery", "artwork_armorer", "artwork_brady_valerian", "artwork_swann", "artwork_valerian", "cin_swann", "planet-agria", "planet-aiur", "planet-avernus", "planet-belshir", "planet-braxisalpha", "planet-castanar", "planet-char", "planet-korhal", "planet-marsara", "planet-marsaraold", "planet-meinhoff", "planet-monlyth", "planet-newfolsom", "planet-portzion", "planet-redstone", "planet-shakuras", "planet-tarsonis", "planet-typhon", "planet-tyrador", "planet-ulaan", "planet-ulnar", "planet-valhalla", "planet-xil", "planet-zhakuldas", "loading-hyperion2", "loading-hyperion3", "loading-hyperion4", "loading-hyperion5", "loading-hyperion6", "loading-hyperion7", "loading-hyperion8", "loading-hyperion9", "loading_terran_005", "loading-hyperionlab", "loading-zeratul01", "cin_wings_drhansen01", "cin_wings_drhansen02", "cin_wings_terran05", "cin_wings_terran06", "cin_wings_tosh01", "cin_wings_tychus02", "cin_wings_warfield", "cin_wings_kachinsky", "planet_braxis", "planet_moria", "planet_shilo", "planet_umoja", "portrait_femalecivilian2", "portrait_femalecivilian3", "portrait_femalecivilian4", "portrait_femaledominionofficer1", "portrait_firebat", "portrait_firebat_mercenary", "portrait_ghost", "portrait_goliath", "portrait_goliath_mercenary", "portrait_han", "portrait_hanson", "portrait_hellion", "portrait_hercules", "portrait_hightemplar", "portrait_hill", "portrait_horner", "portrait_hydralisk", "portrait_immortal", "portrait_infested_colonist", "portrait_infested_marine", "portrait_infestor", "portrait_joriumstockpile", "portrait_karak", "portrait_karass", "portrait_kerrigan", "portrait_larva", "portrait_leviathan", "portrait_lockwell", "portrait_lurker", "portrait_lyote", "portrait_malecivilian1", "portrait_malecivilian10", "portrait_malecivilian11", "portrait_malecivilian2", "portrait_malecivilian3", "portrait_malecivilian4", "portrait_malecivilian5", "portrait_malecivilian6", "portrait_malecivilian7", "portrait_malecivilian8", "portrait_malecivilian9", "portrait_marauder", "portrait_maraudermercenary", "portrait_marine", "portrait_marine1", "portrait_marine10", "portrait_marine2", "portrait_marine3", "portrait_marine4", "portrait_marine5", "portrait_marine6", "portrait_marine7", "portrait_marine8", "portrait_marine9", "portrait_marinemercenary", "portrait_medic", "portrait_medivac", "portrait_mengskhologram", "portrait_mohandar", "portrait_mothership", "portrait_mule", "portrait_mutalisk", "portrait_narud", "portrait_nydusworm", "portrait_nyon", "portrait_nova", "portrait_observer", "portrait_orlan", "portrait_overlord", "portrait_overmind", "portrait_overseer", "portrait_phoenix", "portrait_preserver1", "portrait_preserver2", "portrait_preserver3", "portrait_probe", "portrait_queen", "portrait_raven", "portrait_raynorcommander", "portrait_raynormarine", "portrait_reaper", "portrait_roach", "portrait_sarah", "portrait_scantipede", "portrait_sciencevessel", "portrait_scientist1", "portrait_scientist2", "portrait_scientistfemale", "portrait_scourge", "portrait_scout", "portrait_scv", "portrait_selendis", "portrait_sentry", "portrait_siegetank", "portrait_siegetankmercenary", "portrait_spectre", "portrait_stalker", "portrait_stetmann", "portrait_stetmannmedic", "portrait_swann1", "portrait_swannmarauder", "portrait_swarmhost", "portrait_symbiote", "portrait_taldarimexecutor", "portrait_tassadar", "portrait_thor", "portrait_toshportrait", "portrait_tychus", "portrait_ultralisk", "portrait_ursadak", "portrait_urun", "portrait_utilitybot", "portrait_valerian", "portrait_vermillion", "portrait_vikingfighter", "portrait_vikingmercenaryfighter", "portrait_voidray", "portrait_vulture", "portrait_warbot", "portrait_warfield", "portrait_warpprism", "portrait_wraith", "portrait_ybarra", "portrait_zealot", "portrait_zeratul", "portrait_zergling", "portrait_adjutant", "portrait_annabelle", "portrait_archon", "portrait_arcturus", "portrait_artanis", "portrait_baneling", "portrait_banelingcocoon", "portrait_banshee", "portrait_bansheemercenary", "portrait_battlecruiser", "portrait_battlecruisermercenary", "portrait_bralik", "portrait_broodlord", "portrait_brutalisk", "portrait_cade", "portrait_carrier", "portrait_carrionbird", "portrait_changeling", "portrait_cocoon", "portrait_colossus", "portrait_confederateadjutant", "portrait_cooper", "portrait_corruptor", "portrait_cybercat", "portrait_darktemplar", "portrait_darktemplar2", "portrait_diamondback", "portrait_dominionmarauder", "portrait_dominionmarine1", "portrait_dominionmarine2", "portrait_dominionmarine3", "portrait_dominionmarine4", "portrait_dominionmarine5", "portrait_dominionmarine6", "portrait_dominionmarine7", "portrait_dominionmarine8", "portrait_dominionmarine9", "portrait_dominionofficer1", "portrait_drone", "portrait_earl", "portrait_egg", "portrait_executor", "portrait_femalecivilian1"];



(function(c){var a=["DOMMouseScroll","mousewheel"];c.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var d=a.length;d;){this.addEventListener(a[--d],b,false)}}else{this.onmousewheel=b}},teardown:function(){if(this.removeEventListener){for(var d=a.length;d;){this.removeEventListener(a[--d],b,false)}}else{this.onmousewheel=null}}};c.fn.extend({mousewheel:function(d){return d?this.bind("mousewheel",d):this.trigger("mousewheel")},unmousewheel:function(d){return this.unbind("mousewheel",d)}});function b(f){var d=[].slice.call(arguments,1),g=0,e=true;f=c.event.fix(f||window.event);f.type="mousewheel";if(f.wheelDelta){g=f.wheelDelta/120}if(f.detail){g=-f.detail/3}d.unshift(f,g);return c.event.handle.apply(this,d)}})(jQuery);

/*!
 * Tiny Scrollbar 1.65
 * http://www.baijs.nl/tinyscrollbar/
 *
 * Copyright 2010, Maarten Baijs
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/gpl-2.0.php
 *
 * Date: 10 / 05 / 2011
 * Depends on library: jQuery
 *
 */
var scrollBarRatio = 0;
(function($){
	$.tiny = $.tiny || { };

	$.tiny.scrollbar = {
		options: {
			axis: 'y', // vertical or horizontal scrollbar? ( x || y ).
			wheel: 40,  //how many pixels must the mouswheel scroll at a time.
			scroll: true, //enable or disable the mousewheel;
			size: 'auto', //set the size of the scrollbar to auto or a fixed number.
			sizethumb: 'auto', //set the size of the thumb to auto or a fixed number.
			trackSelector: '.track',
            thumbSelector: '.thumb',
            scrollbarSelector: '.scrollbar',
            viewportSelector: '.viewport',
            overviewSelector: '.overview',
            minThumbSize: 50, //minimum width or height of the scrollbar thumb
            slideCallback: null  //callback function on slide
		}
	};

	$.fn.tinyscrollbar = function(options) {
		var options = $.extend({}, $.tiny.scrollbar.options, options);
		this.each(function(){ $(this).data('tsb', new Scrollbar($(this), options)); });
		return this;
	};
	$.fn.tinyscrollbar_update = function(sScroll) { return $(this).data('tsb').update(sScroll); };

	function Scrollbar(root, options){
		var oSelf = this;
		var oWrapper = root;
		var oViewport = { obj: $(options.viewportSelector, root) };
		var oContent = { obj: $(options.overviewSelector, root) };
		var oScrollbar = { obj: $(options.scrollbarSelector, root) };
		var oTrack = { obj: $(options.trackSelector, oScrollbar.obj) };
		var oThumb = { obj: $(options.thumbSelector, oScrollbar.obj) };
		var sAxis = options.axis == 'x', sDirection = sAxis ? 'left' : 'top', sSize = sAxis ? 'Width' : 'Height';
		var iScroll, iPosition = { start: 0, now: 0 }, iMouse = {};

		function initialize() {
			oSelf.update();
			setEvents();
			return oSelf;
		}
		this.update = function(sScroll){
			oViewport[options.axis] = oViewport.obj[0]['offset'+ sSize];
			oContent[options.axis] = oContent.obj[0]['scroll'+ sSize];
			oContent.ratio = oViewport[options.axis] / oContent[options.axis];
			oScrollbar.obj.toggleClass('disable', oContent.ratio >= 1);
			oTrack[options.axis] = options.size == 'auto' ? oViewport[options.axis] : options.size;
			oThumb[options.axis] = Math.min(oTrack[options.axis], Math.max(0, ( options.sizethumb == 'auto' ? (oTrack[options.axis] * oContent.ratio) : options.sizethumb )));

			if (oThumb[options.axis] < options.minThumbSize) {
                oThumb[options.axis] = options.minThumbSize;
                options.sizethumb = options.minThumbSize;
            }


			oScrollbar.ratio = options.sizethumb == 'auto' ? (oContent[options.axis] / oTrack[options.axis]) : (oContent[options.axis] - oViewport[options.axis]) / (oTrack[options.axis] - oThumb[options.axis]);
			iScroll = (sScroll == 'relative' && oContent.ratio <= 1) ? Math.min((oContent[options.axis] - oViewport[options.axis]), Math.max(0, iScroll)) : 0;
			iScroll = (sScroll == 'bottom' && oContent.ratio <= 1) ? (oContent[options.axis] - oViewport[options.axis]) : isNaN(parseInt(sScroll)) ? iScroll : parseInt(sScroll);



			scrollBarRatio = oScrollbar.ratio;

			setSize();
		};
		function setSize(){
			oThumb.obj.css(sDirection, iScroll / oScrollbar.ratio);
			oContent.obj.css(sDirection, -iScroll);
			iMouse['start'] = oThumb.obj.offset()[sDirection];
			var sCssSize = sSize.toLowerCase();
			oScrollbar.obj.css(sCssSize, oTrack[options.axis]);
			oTrack.obj.css(sCssSize, oTrack[options.axis]);
			oThumb.obj.css(sCssSize, oThumb[options.axis]);
		};
		function setEvents(){
			oThumb.obj.bind('mousedown', start);
			oThumb.obj[0].ontouchstart = function(oEvent){
				oEvent.preventDefault();
				oThumb.obj.unbind('mousedown');
				start(oEvent.touches[0]);
				return false;
			};
			oTrack.obj.bind('mouseup', drag);
			if(options.scroll && this.addEventListener){
				oWrapper[0].addEventListener('DOMMouseScroll', wheel, false);
				oWrapper[0].addEventListener('mousewheel', wheel, false );
			}
			else if(options.scroll){oWrapper[0].onmousewheel = wheel;}
		};
		function start(oEvent){
			iMouse.start = sAxis ? oEvent.pageX : oEvent.pageY;
			var oThumbDir = parseInt(oThumb.obj.css(sDirection));
			iPosition.start = oThumbDir == 'auto' ? 0 : oThumbDir;
			$(document).bind('mousemove', drag);
			document.ontouchmove = function(oEvent){
				$(document).unbind('mousemove');
				drag(oEvent.touches[0]);
			};
			$(document).bind('mouseup', end);
			oThumb.obj.bind('mouseup', end);
			oThumb.obj[0].ontouchend = document.ontouchend = function(oEvent){
				$(document).unbind('mouseup');
				oThumb.obj.unbind('mouseup');
				end(oEvent.touches[0]);
			};
			return false;
		};
		function wheel(oEvent){
			if(!(oContent.ratio >= 1)){
				oEvent = $.event.fix(oEvent || window.event);
				var iDelta = oEvent.wheelDelta ? oEvent.wheelDelta/120 : -oEvent.detail/3;
				iScroll -= iDelta * options.wheel;
				iScroll = Math.min((oContent[options.axis] - oViewport[options.axis]), Math.max(0, iScroll));
				oThumb.obj.css(sDirection, iScroll / oScrollbar.ratio);
				oContent.obj.css(sDirection, -iScroll);
				oEvent.preventDefault();

				if (options.slideCallback != null) {
                    options.slideCallback();
                }
			};
		};
		function end(oEvent){
			$(document).unbind('mousemove', drag);
			$(document).unbind('mouseup', end);
			oThumb.obj.unbind('mouseup', end);
			document.ontouchmove = oThumb.obj[0].ontouchend = document.ontouchend = null;
			return false;
		};
		function drag(oEvent){
			if(!(oContent.ratio >= 1)){
				iPosition.now = Math.min((oTrack[options.axis] - oThumb[options.axis]), Math.max(0, (iPosition.start + ((sAxis ? oEvent.pageX : oEvent.pageY) - iMouse.start))));
				iScroll = iPosition.now * oScrollbar.ratio;
				oContent.obj.css(sDirection, -iScroll);
				oThumb.obj.css(sDirection, iPosition.now);

				if (options.slideCallback != null) {
                    options.slideCallback();
                }
			}
			return false;
		};

		return initialize();
	};
})(jQuery);