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

		useminPrepare: {//all html
			html: 'E:/myfile/git_new/qinliang760.github.com/grunt/project/html/js.tpl',
			options: {
			      root: 'E:/myfile/git_new/qinliang760.github.com/grunt/project/',
			      dest:"E:/myfile/git_new/qinliang760.github.com/grunt/project/"
			}			
		},
		usemin: {
			html: ['E:/myfile/git_new/qinliang760.github.com/grunt/project/html/js.tpl']
		},
		cssmin: {//all css dir and sub dir
			minify: {
		        expand: true,
		        cwd   : 'project/css/',
		        src   : ['**/*.css', '!*.min.css'],
		        dest  : 'project/css/',
		        ext   : '.min.css'				
			}
		},
		uglify: {//all css dir and sub dir
	      production : {
	        src     : ['**/*.js'],
	        cwd     : 'project/js/',
	        dest    : 'project/js/',
	        expand  : true,
	        ext     : '.min.js',
	      }
		}				

	})

 	grunt.loadNpmTasks('grunt-usemin');
 	grunt.loadNpmTasks('grunt-contrib-concat');
 	grunt.loadNpmTasks('grunt-contrib-uglify');
 	grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['useminPrepare','concat', 'uglify', 'cssmin','usemin']);
  //grunt.registerTask('default', ['cssmin','uglify']);
}

