
var SC2ModelRotator = ModelRotator.extend({

	/**
	 * Store specific unit information.
	 *
	 * frame width, number of frames per sequence, xoffset, yoffset
	 */
	overwrites: {
		"thor": 		[250, 31],
		"ultralisk": 	[300, 31],
		"dark-templar": [212, 30],
		"colossus": 	[212, 30],
		"mothership": 	[230, 29],
		"mutalisk": 	[212, 60],
		"archon": 		[212, 36],
		"overlord": 	[212, 32],
		"zergling": 	[212, 30],
		"baneling": 	[212, 30],
		"overseer":		[212, 29],
		"broodlord": 	[212, 30],
		"warp-prism": 	[212, 28],
		"voidray": 		[212, 30]
	}

});