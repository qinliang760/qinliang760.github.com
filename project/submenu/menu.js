/**
 * Dynamically create and position certain menus and sub menus (JSON objects) depending on specific conditions.
 *
 * @copyright   2010, Blizzard Entertainment, Inc
 * @class       Menu
 * @requires    Page
 * @example
 *
 *      Menu.data = {
 *          children: [
 *              {
 *                  label: "Foo",
 *                  url:   "/foo/bar"
 *              }
 *          ]
 *      }
 *
 */
var Core=Core||{};
Core.baseUrl="/";
var Menu = {

	/**
	 * Base menu object data.
	 */
	data: {},

	/**
	 * Menu object data indexed by path.
	 */
	dataIndex: {},

	/**
	 * The main container element.
	 */
	container: null,

	/**
	 * The element that opened the drop down menu.
	 */
	node: null,

	/**
	 * Element ID to prepend to cached menus.
	 */
	idName: 'menu-tier',

	/**
	 * Wrapper class name for all sub menus.
	 */
	className: 'flyout-menu',

	/**
	 * Timer to kill the menu.
	 */
	timer: null,

	/**
	 * Collection of timers for children.
	 */
	timers: {},

	/**
	 * Timer to open/close the menu after a duration.
	 */
	openTimer: null,

	/**
	 * Currently opened children.
	 */
	children: {},

	/**
	 * Configuration.
	 */
	config: {},

	/**
	 * Initialize the class a store the container.
	 *
	 * @param url
	 * @param config
	 * @constructor
	 */
	initialize: function(url, config) {
		Menu.config = $.extend({}, {
			duration: 750,
			dataUrl: {},
			colWidth: 200,
			colMax: 15
		}, config);

		Menu.container = $('<div/>').attr('id', 'menu-container').appendTo('body');
		Menu.container
			.unbind()
			.mouseleave(function() {
				Menu.timer = window.setTimeout(function() {
					Menu.hide();
				}, Menu.config.duration);
			})
			.mouseenter(function() {
				window.clearTimeout(Menu.timer);
			});

		// If no data to fetch, exit early
		if (!url) {
			return false;
		}

		// Get the data
		Menu.load('base', url);

		// Bind the handlers
		$('.ui-breadcrumb li a').each(function(key, crumb) {
			var anchor = $(crumb),
				url = anchor.attr('href').replace(Core.baseUrl, '/');/*change "" to "/"*/
			anchor.mouseover(function() {
				Menu.show(this, url);
			});
		});
	},

	/**
	 * Hide / reset the menu system.
	 */
	hide: function() {
		window.clearTimeout(Menu.timer);
		window.clearTimeout(Menu.openTimer);

		Menu.container.find('div').hide();

		if (Menu.node) {
			Menu.node.removeClass('opened');
			Menu.node = null;
		}
	},

	/**
	 * Hide the child node if it exists based on url.
	 *
	 * @param url
	 */
	hideChild: function(url) {
		if (!Menu.children[url])
			return;

		Menu.children[url]
			.children('a:first, span:first').removeClass('opened').end()
			.children('.'+ Menu.className).hide();
	},

	/**
	 * Load a dataset from a location.
	 *
	 * @param set
	 * @param url
	 */
	load: function(set, url) {
		if (Menu.data[set])
			return;

var data={
    "children": [
        {
            "children": [
                {
                    "label": "新闻",
                    "url": "/articles/1001"
                },
                {
                    "label": "公告",
                    "url": "/articles/1007"
                },
                {
                    "label": "活动",
                    "url": "/articles/1008"
                },
                 {
                    "label": "攻略",
                    "url": "/articles/46022"
                }
            ],
            "label": "新闻",
            "url": "/articles/1001/"
        },
        {
            "children": [
                {
                    "label": "下载游戏",
                    "url": "/download"
                },
                {
                    "label": "注册账号",
                    "url": "https://www.battlenet.com.cn/account/creation/tos.html?style=sc2-trial&theme=sc2"
                },
                {
                    "label": "免费模式",
                    "url": "/free"
                },
                {
                    "label": "充值购买",
                    "url": "/pay"
                },
                {
                    "label": "CD-Key激活",
                    "url": "https://www.battlenet.com.cn/account/management/claim-code.html"
                },
                {
                    "children": [
                        {
                            "label": "了解星际",
                            "url": "/xs/gaishu"
                        },
                        {
                            "label": "战前准备",
                            "url": "/xs/xiazai"
                        },
                        {
                            "label": "开始战斗",
                            "url": "/xs/kaishi"
                        }
                    ],
                    "label": "新手入门",
                    "url": "/xs"
                }
            ],
            "label": "马上玩星际",
            "url": "/download"
        },
        {
            "children": [
                {
                    "children": [
                        {
                            "label": "人类",
                            "url": "/race/terran"
                        },
                        {
                            "label": "星灵",
                            "url": "/race/protoss"
                        },
                        {
                            "label": "异虫",
                            "url": "/race/zerg"
                        }
                    ],
                    "label": "种族介绍",
                    "url": "/race"
                },
                {
                    "children": [
                        {
                            "label": "执政官",
                            "url": "/unit/archon"
                        },
                        {
                            "label": "爆虫",
                            "url": "/unit/baneling"
                        },
                        {
                            "label": "女妖",
                            "url": "/unit/banshee"
                        },
                        {
                            "label": "战列巡航舰",
                            "url": "/unit/battlecruiser"
                        },
                        {
                            "label": "巢虫领主",
                            "url": "/unit/brood-lord"
                        },
                        {
                            "label": "航母",
                            "url": "/unit/carrier"
                        },
                        {
                            "label": "巨像",
                            "url": "/unit/colossus"
                        },
                        {
                            "label": "腐化者",
                            "url": "/unit/corruptor"
                        },
                        {
                            "label": "黑暗圣堂武士",
                            "url": "/unit/dark-templar"
                        },
                        {
                            "label": "工蜂",
                            "url": "/unit/drone"
                        },
                        {
                            "label": "幽灵",
                            "url": "/unit/ghost"
                        },
                        {
                            "label": "恶火",
                            "url": "/unit/hellion"
                        },
                        {
                            "label": "高阶圣堂武士",
                            "url": "/unit/high-templar"
                        },
                        {
                            "label": "刺蛇",
                            "url": "/unit/hydralisk"
                        },
                        {
                            "label": "不朽者",
                            "url": "/unit/immortal"
                        },
                        {
                            "label": "感染者",
                            "url": "/unit/infestor"
                        },
                        {
                            "label": "幼虫",
                            "url": "/unit/larva"
                        },
                        {
                            "label": "劫掠者",
                            "url": "/unit/marauder"
                        },
                        {
                            "label": "陆战队员",
                            "url": "/unit/marine"
                        },
                        {
                            "label": "医疗运输机",
                            "url": "/unit/medivac"
                        },
                        {
                            "label": "母舰",
                            "url": "/unit/mothership"
                        },
                        {
                            "label": "异龙",
                            "url": "/unit/mutalisk"
                        },
                        {
                            "label": "坑道虫",
                            "url": "/unit/nydus-worm"
                        },
                        {
                            "label": "侦测器",
                            "url": "/unit/observer"
                        },
                        {
                            "label": "王虫",
                            "url": "/unit/overlord"
                        },
                        {
                            "label": "眼虫",
                            "url": "/unit/overseer"
                        },
                        {
                            "label": "凤凰",
                            "url": "/unit/phoenix"
                        },
                        {
                            "label": "探机",
                            "url": "/unit/probe"
                        },
                        {
                            "label": "虫后",
                            "url": "/unit/queen"
                        },
                        {
                            "label": "铁鸦",
                            "url": "/unit/raven"
                        },
                        {
                            "label": "收割者",
                            "url": "/unit/reaper"
                        },
                        {
                            "label": "蟑螂",
                            "url": "/unit/roach"
                        },
                        {
                            "label": "SCV",
                            "url": "/unit/scv"
                        },
                        {
                            "label": "机械哨兵",
                            "url": "/unit/sentry"
                        },
                        {
                            "label": "攻城坦克",
                            "url": "/unit/siege-tank"
                        },
                        {
                            "label": "追猎者",
                            "url": "/unit/stalker"
                        },
                        {
                            "label": "雷神",
                            "url": "/unit/thor"
                        },
                        {
                            "label": "雷兽",
                            "url": "/unit/ultralisk"
                        },
                        {
                            "label": "维京战机",
                            "url": "/unit/viking"
                        },
                        {
                            "label": "虚空辉光舰",
                            "url": "/unit/void-ray"
                        },
                        {
                            "label": "折跃棱镜",
                            "url": "/unit/warp-prism"
                        },
                        {
                            "label": "狂热者",
                            "url": "/unit/zealot"
                        },
                        {
                            "label": "跳虫",
                            "url": "/unit/zergling"
                        },
                        {
                            "label": "恶蝠",
                            "url": "/unit/hellbat"
                        },
                        {
                            "label": "寡妇雷",
                            "url": "/unit/widow-mine"
                        },
                        {
                            "label": "母舰核心",
                            "url": "/unit/mothership-core"
                        },
                        {
                            "label": "先知",
                            "url": "/unit/oracle"
                        },
                        {
                            "label": "风暴战舰",
                            "url": "/unit/tempest"
                        },
                        {
                            "label": "虫群宿主",
                            "url": "/unit/swarm-host"
                        },
                        {
                            "label": "飞蛇",
                            "url": "/unit/viper"
                        }
                    ],
                    "label": "单位数据",
                    "url": "/unit/"
                },
                {
                    "children": [
                        {
                            "label": "人类",
                            "url": "/race/terran/techtree"
                        },
                        {
                            "label": "星灵",
                            "url": "/race/protoss/techtree"
                        },
                        {
                            "label": "异虫",
                            "url": "/race/zerg/techtree"
                        }
                    ],
                    "label": "科技树",
                    "url": "/race/terran/techtree"
                },
                {
                    "children": [
                        {
                            "label": "截图",
                            "url": "/media/screenshots"
                        },
                        {
                            "label": "原画",
                            "url": "/media/artwork"
                        },
                        {
                            "label": "漫画作品",
                            "url": "/media/comics"
                        },
                        {
                            "label": "视频",
                            "url": "/media/videos"
                        },
                        {
                            "label": "壁纸",
                            "url": "/media/wallpapers"
                        },
                        {
                            "label": "玩家画廊",
                            "url": "/media/fanart"
                        },
                        {
                            "label": "音频",
                            "url": "/media/audio"
                        },
                        {
                            "label": "暴雪漫画",
                            "url": "/media/blizzard-comics/kerrigan-hope-and-vengeance/"
                        },
                        {
                            "label": "下载",
                            "url": "/download"
                        }
                    ],
                    "label": "视频与图片",
                    "url": "/media/"
                },
                {
                    "children": [
                        {
                            "label": "精彩剧情",
                            "url": "/heart-of-the-swarm-preview/story"
                        },
                        {
                            "label": "任务介绍",
                            "url": "/heart-of-the-swarm-preview/missions"
                        },
                        {
                            "label": "游戏玩点",
                            "url": "/heart-of-the-swarm-preview/gameplay"
                        },
                        {
                            "label": "视频截图",
                            "url": "/heart-of-the-swarm-preview/media"
                        },
                        {
                            "label": "常见问题",
                            "url": "/heart-of-the-swarm-preview/faq"
                        }
                    ],
                    "label": "虫群之心",
                    "url": "/heart-of-the-swarm-preview"
                },
                {
                    "label": "2.1版本预览",
                    "url": "/patch21-preview/"
                }
            ],
            "label": "游戏资料",
            "url": "/race/"
        },
        {
            "children": [
                {
                    "children": [
                        {
                            "label": "起义呐喊",
                            "url": "/lore/the-story-of-starcraft/chapter1"
                        },
                        {
                            "label": "异虫主宰",
                            "url": "/lore/the-story-of-starcraft/chapter2"
                        },
                        {
                            "label": "艾尔陨落",
                            "url": "/lore/the-story-of-starcraft/chapter3"
                        },
                        {
                            "label": "母巢之战•坚守 ",
                            "url": "/lore/the-story-of-starcraft/chapter4"
                        },
                        {
                            "label": "母巢之战•铁腕",
                            "url": "/lore/the-story-of-starcraft/chapter5"
                        },
                        {
                            "label": "母巢之战•刀锋女王 ",
                            "url": "/lore/the-story-of-starcraft/chapter6"
                        },
                        {
                            "label": "自由之翼•第一部分",
                            "url": "/lore/the-story-of-starcraft/chapter7"
                        },
                        {
                            "label": "自由之翼•第二部分 ",
                            "url": "/lore/the-story-of-starcraft/chapter8"
                        },
                        {
                            "label": "自由之翼•第三部分  ",
                            "url": "/lore/the-story-of-starcraft/chapter9"
                        }
                    ],
                    "label": "剧情故事",
                    "url": "/lore/the-story-of-starcraft/chapter1/"
                },
                {
                    "children": [
                        {
                            "label": "吉姆·雷诺",
                            "url": "/hero/jim-raynor"
                        },
                        {
                            "label": "泰凯斯·芬利",
                            "url": "/hero/tychus-findlay"
                        },
                        {
                            "label": "阿克图尔斯·蒙斯克",
                            "url": "/hero/arcturus-mengsk"
                        },
                        {
                            "label": "凯瑞甘",
                            "url": "/hero/kerrigan"
                        },
                        {
                            "label": "马特·霍纳",
                            "url": "/hero/matt-horner"
                        },
                        {
                            "label": "泽拉图",
                            "url": "/hero/zeratul"
                        },
                        {
                            "label": "瓦伦里安·蒙斯克",
                            "url": "/hero/valerian-mengsk"
                        },
                        {
                            "label": "加布里埃尔·托什",
                            "url": "/hero/gabriel-tosh"
                        },
                        {
                            "label": "艾蕊尔·汉森",
                            "url": "/hero/ariel-hanson"
                        },
                        {
                            "label": "罗瑞·斯旺",
                            "url": "/hero/rory-swann"
                        },
                        {
                            "label": "艾格·斯台特曼",
                            "url": "/hero/egon-stetmann"
                        },
                        {
                            "label": "霍瑞斯·沃菲尔德",
                            "url": "/hero/horace-warfield"
                        },
                        {
                            "label": "米罗·卡琴斯基",
                            "url": "/hero/milo-kachinsky"
                        },
                        {
                            "label": "格莱文·希尔",
                            "url": "/hero/graven-hill"
                        },
                        {
                            "label": "伊兹莎",
                            "url": "/hero/izsha"
                        },
                        {
                            "label": "阿巴瑟",
                            "url": "/hero/abathur"
                        },
                        {
                            "label": "扎加拉",
                            "url": "/hero/zagara"
                        },
                        {
                            "label": "诺娃",
                            "url": "/hero/nova"
                        }
                    ],
                    "label": "游戏角色",
                    "url": "/hero/"
                },
                {
                    "children": [
                        {
                            "label": "撤离",
                            "url": "/lore/short-stories/the-exit/1"
                        },
                        {
                            "label": "工程团的斗士",
                            "url": "/lore/short-stories/the-fightin-scee-vees/1"
                        },
                        {
                            "label": "势如破竹",
                            "url": "/lore/short-stories/momentum/1"
                        },
                        {
                            "label": "失落的维京",
                            "url": "/lore/short-stories/lost-vikings/1"
                        },
                        {
                            "label": "航母 ",
                            "url": "/lore/short-stories/carrier/1"
                        },
                        {
                            "label": "黑幕笼罩",
                            "url": "/lore/short-stories/in-the-dark/1"
                        },
                        {
                            "label": "虚空之镜 ",
                            "url": "/lore/short-stories/lens-of-the-void/1"
                        },
                        {
                            "label": "酸液灼烧",
                            "url": "/lore/short-stories/acid-burns/1"
                        },
                        {
                            "label": "神圣的使者",
                            "url": "/lore/short-stories/great-one/1"
                        },
                        {
                            "label": "小兵希恩",
                            "url": "/lore/short-stories/the-education-of-PFC-shane/1"
                        },
                        {
                            "label": "梦寐以求的剧本",
                            "url": "/lore/short-stories/command-performance/1"
                        },
                        {
                            "label": "不凡的王虫",
                            "url": "/lore/short-stories/just-an-overlord/1"
                        },
                        {
                            "label": "冰窟",
                            "url": "/lore/short-stories/icehouse/1"
                        },
                        {
                            "label": "冰冷对称",
                            "url": "/lore/short-stories/cold-symmetry/1"
                        },
                        {
                            "label": "狂暴",
                            "url": "/lore/short-stories/frenzy/1"
                        },
                        {
                            "label": "驯虫计划",
                            "url": "/lore/short-stories/the-teacher/1"
                        },
                        {
                            "label": "战争上演",
                            "url": "/lore/short-stories/a-war-on/1"
                        },
                        {
                            "label": "浴血之战",
                            "url": "/lore/short-stories/in-the-blood/1"
                        },
                        {
                            "label": "巨像",
                            "url": "/lore/short-stories/colossus/1"
                        },
                        {
                            "label": "轰鸣",
                            "url": "/lore/short-stories/marauder/1"
                        },
                        {
                            "label": "间接伤害",
                            "url": "/lore/short-stories/odin/1"
                        },
                        {
                            "label": "天崩地裂",
                            "url": "/lore/short-stories/broken-wide/1"
                        },
                        {
                            "label": "母舰",
                            "url": "/lore/short-stories/mothership/1"
                        },
                        {
                            "label": "拟态雏虫",
                            "url": "/lore/short-stories/changeling/1"
                        }
                    ],
                    "label": "星际小说",
                    "url": "/lore/"
                },
                {
                    "children": [
                        {
                            "label": "艾尔",
                            "url": "/planet/aiur"
                        },
                        {
                            "label": "查尔",
                            "url": "/planet/char"
                        },
                        {
                            "label": "克哈",
                            "url": "/planet/korhal"
                        },
                        {
                            "label": "玛.萨拉",
                            "url": "/planet/mar-sara"
                        },
                        {
                            "label": "尤摩扬",
                            "url": "/planet/umoja"
                        },
                        {
                            "label": "塞罗",
                            "url": "/planet/shiloh"
                        },
                        {
                            "label": "新福尔松",
                            "url": "/planet/new-folsom"
                        },
                        {
                            "label": "塔桑尼斯",
                            "url": "/planet/tarsonis"
                        },
                        {
                            "label": "莫瑞亚",
                            "url": "/planet/moria"
                        },
                        {
                            "label": "布莱克西斯",
                            "url": "/planet/braxis"
                        },
                        {
                            "label": "卡亚迪尔",
                            "url": "/planet/kaldir"
                        },
                        {
                            "label": "法厄同",
                            "url": "/planet/phaeton"
                        },
                        {
                            "label": "Xt39323",
                            "url": "/planet/xt39323"
                        }
                    ],
                    "label": "科普卢星区",
                    "url": "/planet/"
                }
            ],
            "label": "星际背景",
            "url": "/lore/the-story-of-starcraft/chapter1"
        },
        {
            "children": [
                {
                    "label": "玩法精选",
                    "url": "/gameguide/"
                },
                {
                    "children": [
                        {
                            "label": "精选地图",
                            "url": "/maps/16002"
                        },
                        {
                            "label": "RPG地图",
                            "url": "/maps/16006"
                        },
                        {
                            "label": "塔防地图",
                            "url": "/maps/16007"
                        },
                        {
                            "label": "对战地图",
                            "url": "/maps/16008"
                        },
                        {
                            "label": "官方自定义地图",
                            "url": "/maps/16003"
                        },
                        {
                            "label": "官方对战地图",
                            "url": "/maps/16004"
                        }
                    ],
                    "label": "游戏大厅",
                    "url": "/maps/"
                },
                {
                    "children": [
                        {
                            "label": "动作者作弊命令",
                            "url": "/maps/tutorials/actor/"
                        },
                        {
                            "label": "数据模块",
                            "url": "/maps/tutorials/data/"
                        },
                        {
                            "label": "触发器模块",
                            "url": "/maps/tutorials/trigger/"
                        },
                        {
                            "label": "地形模块",
                            "url": "/maps/tutorials/terrain/"
                        },
                        {
                            "label": "地图发布",
                            "url": "/maps/tutorials/publishing/"
                        },
                        {
                            "label": "发射物移动器",
                            "url": "/maps/tutorials/missile-movers/"
                        },
                        {
                            "label": "编辑器示例教程：扫雷",
                            "url": "/maps/tutorials/mine/"
                        },
                        {
                            "label": "编辑器示例教程：塔防",
                            "url": "/maps/tutorials/tower-defence/"
                        }
                    ],
                    "label": "编辑器教程",
                    "url": "/maps/tutorials/"
                },
                {
                    "label": "随身副官APP",
                    "url": "/fg/"
                },
                {
                    "label": "星际教官",
                    "url": "http://winwin.163.com/jiaoguan"
                }
            ],
            "label": "攻略与地图",
            "url": "/gameguide/"
        },
        {
            "children": [
                {
                    "label": "天梯排名",
                    "url": "http://www.battlenet.com.cn/sc2/zh/ladder/grandmaster/wings-of-liberty"
                },
                {
                    "label": "赛事日历",
                    "url": "/calendar"
                },
                {
                    "label": "高校星联赛",
                    "url": "http://csl.163.com"
                },
                {
                    "label": "线上冠军赛",
                    "url": "http://soc.163.com"
                }
            ],
            "label": "电子竞技",
            "url": "http://www.battlenet.com.cn/sc2/zh/ladder/grandmaster"
        },
        {
            "children": [
                {
                    "children": [
                        {
                            "label": "综合讨论",
                            "url": "http://www.battlenet.com.cn/sc2/zh/forum/#forum46605"
                        },
                        {
                            "label": "游戏讨论",
                            "url": "http://www.battlenet.com.cn/sc2/zh/forum/#forum46596"
                        }
                    ],
                    "label": "官方论坛",
                    "url": "http://www.battlenet.com.cn/sc2/zh/forum"
                },
                {
                    "label": "外挂举报",
                    "url": "/wg"
                },
                {
                    "label": "推广大使",
                    "url": "http://winwin.163.com"
                },
                {
                    "label": "周边商城",
                    "url": "http://bmall.163.com"
                }
            ],
            "label": "社区与活动",
            "url": "http://www.battlenet.com.cn/sc2/zh/forum/"
        }
    ],
    "label": "《星际争霸II》",
    "url": "/home/"
};
//modify by jay ajax change to no ajax
		/*$.ajax({
			url: Core.baseUrl + url,
			dataType: 'json',
			success: function(data) {*/
				Menu.data[set] = data;
				Menu.dataIndex[set] = {};
				Menu._populate(data, set);

				// Add classes for specific situations
				var anchors = $('.ui-breadcrumb li a'),
					length = anchors.length - 1;

				anchors.each(function(i) {
					var self = $(this),
						url = self.attr('href').replace(Core.baseUrl, '/'),/*change "" to "/"*/
						idx = Menu.dataIndex[set][url];

					if (idx) {
						if (idx.children && length == i) {
							self.parent().addClass('children');
						}

						if (!idx.children) {
							self.parent().addClass('childless');
						}
					}
				});
			/*}
		});*/

		Menu.config.dataUrl[set] = url;
	},

	/**
	 * An onclick alternative to show().
	 *
	 * @param node
	 * @param path
	 * @param options
	 */
	open: function(node, path, options) {
		options = $.extend({}, { set: 'base' }, options || {});

		Menu.node = $(node);

		var data = Menu.dataIndex[options.set][path] || null;

		if (data && data.children) {
			if ($('#' + Menu._id(path, options.set) ).is(':visible')) {
				Menu.hide();
			} else {
				Menu._display(path, options);
			}
		}
	},

	/**
	 * Show a specific menu at a specific location.
	 * Used in conjunction with onmouseover.
	 *
	 * @param node
	 * @param path
	 * @param options
	 */
	show: function(node, path, options) {
		options = $.extend({}, { set: 'base' }, options || {});
		if (!Menu.dataIndex[options.set][path]) {
			return;
		}

		if ($('#' + Menu._id(path, options.set) ).is(':visible')) {
			return;
		}

		Menu.hide();
		Menu.node = $(node);

		Menu.openTimer = window.setTimeout(function() {
			Menu._display(path, options);
		}, 200);

		Menu.node
			.unbind('mouseleave mouseenter')
			.mouseleave(function() {
				window.clearTimeout(Menu.openTimer);

				Menu.timer = window.setTimeout(function() {
					Menu.hide();
				}, Menu.config.duration);
			})
			.mouseenter(function() {
				window.clearTimeout(Menu.timer);
			});
	},

	/**
	 * Create the div/ul elements and append it to the parent.
	 * Cycle through the links and create the li/a elements, and build children if available.
	 *
	 * @param parent - Parent node to add to
	 * @param menu - Object containing children
	 * @param cache
	 */
	_build: function(parent, menu, cache) {
		var div = $('<div>').addClass(Menu.className),
			uls = [];

		if (cache)
			div.attr('id', cache);

		$.each(menu.children, function(key, data) {
			var tag = (data.url) ? 'a' : 'span',
				li = $('<li/>'),
				item = $('<' + tag + '/>', Menu._prepare(data)).appendTo(li);

			if (data.description) {
				item.append('<span class="desc">'+ data.description +'</span>');
			}

			if (data.parentClass) {
				li.addClass(data.parentClass);
			}

			if (data.children) {
				item.addClass('children');
			}

			li.hover(
				function() {
					Menu.hideChild(menu.url);

					if (data.children) {
						var self = $(this);

						self.children('a:first, span:first').addClass('opened');

						if (self.find('.'+ Menu.className).length === 0) {
							Menu._build(this, data, false);
						}

						Menu._position(self.children('.'+ Menu.className));

						Menu.children[menu.url] = self;

						window.clearTimeout(Menu.timers[menu.url]);
					}
				},
				function() {
					if (data.children) {
						Menu.timers[menu.url] = window.setTimeout(function() {
							Menu.hideChild(menu.url);
						}, Menu.config.duration);
					}
				}
			);

			// Determine which list
			var index = Math.ceil((key + 1) / Menu.config.colMax) - 1;

			if (menu.children.length <= (Menu.config.colMax + 3))
				index = 0;

			if (!uls[index]) {
				uls[index] = $('<ul/>');
			}

			li.appendTo(uls[index]);
		});

		// Append
		for (var i = 0; i <= (uls.length - 1); ++i) {
			$(uls[i]).appendTo(div);
		}

		if (uls.length > 1) {
			div.css('width', (uls.length * Menu.config.colWidth));
		}

		div.appendTo(parent);
	},

	/**
	 * Position the parent menu at the location.
	 *
	 * @param path
	 * @param options
	 */
	_display: function(path, options) {
		if (!Menu.dataIndex[options.set][path]) {
			return;
		}

		var data = Menu.dataIndex[options.set][path],
			center = (options.center) || (options === true),
			id = Menu._id(path, options.set);

		if (data && data.children) {
			var targetMenu = $('#'+ id);

			if (targetMenu.length > 0) {
				targetMenu.fadeIn('fast');
			} else {
				Menu._build(Menu.container, data, id);
			}

			Menu.node.addClass('opened');

			// Position menu accordingly
			var nodeOffset = Menu.node.parent().offset(), 
				nodeWidth = Menu.node.parent().width(),
				x = nodeOffset.left,
				y = nodeOffset.top + Menu.node.outerHeight(),
				opts = {
					top: y +'px',
					position: 'absolute',
					visibility: 'visible',
					zIndex: '75'
				};

			if (center) {
				var width = Math.round(nodeWidth / 2) - Math.round(Menu.config.colWidth / 2);
				opts.left = (x + width) +'px';
			} else {
				opts.left = x +'px';
			}

			Menu.container.css(opts).show();
		}
	},

	/**
	 * Generate a DOM id.
	 *
	 * @param path
	 * @param set
	 */
	_id: function(path, set) {
		var id = Menu.idName + '-' + set;

		if (Menu.dataIndex[set][path].id)
			id += Menu.dataIndex[set][path].id;

		return id;
	},

	/**
	 * Show the element, and reposition it if it goes off the page.
	 *
	 * @param element
	 */
	_position: function(element) {
		element.show();

		if (element.find('ul').length <= 1) {
			var offset = element.offset(),
				width = element.outerWidth(),
				x = offset.left + width;

			if (x >= $(window).width()) {//modify by jay Page.dimensions.width change to $(window).width()
				element.css('left', -width);
			}
		}
	},

	/**
	 * Populate the class with data returned from the server.
	 *
	 * @param node
	 * @param set
	 */
	_populate: function(node, set) {
		if (!Menu.dataIndex[set][node.url]) {
			node.id = (node.url ? node.url.replace(/[^\-a-zA-Z0-9\/]/ig, '') : '');
			node.id = node.id.replace(/\//ig, '-');

			if (node.id.substr(-1) === '-') {
				node.id = node.id.substr(0, (node.id.length - 1));
			}

			Menu.dataIndex[set][node.url] = node;
		}

		if (node.children) {
			for (var i = 0, child; child = node.children[i]; i++) {
				Menu._populate(child, set);
			}
		}
	},

	/**
	 * Prepare the element params based on a whitelist.
	 *
	 * @param obj
	 */
	_prepare: function(obj) {
		var label = obj.label || '',
			mapping = { html: label.replace(/&/ig, '&amp;'), rel: 'np' },
			params = {};

		if (obj.url != null) {
			//mapping.href = Core.baseUrl + obj.url;
			mapping.href = obj.url.replace(Core.baseUrl, '/');
		}

		$.each(mapping, function(key, value) {
			if (value)
				params[key] = value;
		});

		return params;
	}

};
