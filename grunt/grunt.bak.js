/*
 * grunt
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		mincss: {//all css dir and sub dir
			dist: ['src/css/**/*.css']
		},		
		mindirect: {//all css dir and sub dir
			dist: ['src/js/**/*.js']
		},
		useminPrepare: {//all html
			html: 'E:/work/webshell/src/js.tpl',
			options: {
			      root: 'E:/work/webshell'
			    }			
		},
		usemin: {
			html: ['E:/work/webshell/src/js.tpl']
		},
		min: {
			dist: {
				src: "http://nos.netease.com/blz/1/jslibs/jquery.lightBox.js",
				dest: "dist/all.js"
			}
		}		


	})

	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-mincss');
	grunt.loadNpmTasks('grunt-mindirect');
	grunt.registerTask("compile:all css min", "mincss");
	grunt.registerTask("compile:all js min", "mindirect");
	grunt.registerTask("compile:html", "useminPrepare usemin concat min");
	grunt.registerTask("default",["compile:html"]);
}

