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
			html: ['/home/project/webroot/tmpl/common/template.ftl'],
			options: {
			      root: '/home/project/webroot/',
			      dest:"/home/project/webroot/"
			}			
		},
		usemin: {
			html: ['/home/project/webroot/tmpl/common/template.ftl']
		},
		cssmin: {
			minify: {
		        expand: true,
		        cwd   : '/home/project/webroot/css/',
		        src   : ['**/*.css'],
		        dest  : '/home/project/webroot/css/'/*,
		        ext   : '.min.css'*/				
			}
		},
		uglify: {
	      production : {
	        src     : ['**/*.js'],
	        cwd     : '/home/project/webroot/js/',
	        dest    : '/home/project/webroot/js/',
	        expand  : true/*,
	        ext     : '.min.js',*/
	      }
		}				

	})

 	grunt.loadNpmTasks('grunt-usemin');
 	grunt.loadNpmTasks('grunt-contrib-concat');
 	grunt.loadNpmTasks('grunt-contrib-uglify');
 	grunt.loadNpmTasks('grunt-contrib-cssmin');

  	grunt.registerTask('default', ['useminPrepare','concat', 'uglify', 'cssmin','usemin']);

}

