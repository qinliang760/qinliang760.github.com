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
		pkg: grunt.file.readJSON('package.json'),
		useminPrepare: {//all html
			html: ["<%= pkg.path.tmpl %>"],
			options: {
			      root: "<%= pkg.path.root %>",
			      dest:"<%= pkg.path.root %>"
			}			
		},
		usemin: {
			html: ["<%= pkg.path.tmpl %>"]
		},
		cssmin: {//all css dir and sub dir
			minify: {
		        expand: true,
		        cwd   : "<%= pkg.path.cssRoot %>",
		        src   : ['**/*.css', '!*.min.css'],
		        dest  : "<%= pkg.path.cssRoot %>",
		        ext   : '.min.css'				
			}
		},
		uglify: {//js css dir and sub dir
	      production : {
	        src     : ['**/*.js'],
	        cwd     : "<%= pkg.path.jsRoot %>",
	        dest    : "<%= pkg.path.jsRoot %>",
	        expand  : true,
	        ext     : '.min.js',
	      }
		}				

	})

 	grunt.loadNpmTasks('grunt-usemin');
 	grunt.loadNpmTasks('grunt-contrib-concat');
 	grunt.loadNpmTasks('grunt-contrib-uglify');
 	grunt.loadNpmTasks('grunt-contrib-cssmin');

  //grunt.registerTask('default', ['useminPrepare','concat', 'uglify', 'cssmin','usemin']);
  //grunt.registerTask('default', ['cssmin','uglify']);
}

