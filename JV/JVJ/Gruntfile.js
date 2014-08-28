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
			html: ["<%= pkg.path.tmpl %>/**/*.html"],
			options: {
			      root: "<%= pkg.path.root %>",
			      dest:"<%= pkg.path.root %>"
			}			
		},
		usemin: {
			html: ["<%= pkg.path.tmpl %>/**/*.html"]
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
	        ext     : '.mn.js',
	      }
		},
		connect: {
			options: {
				port: 8080,
				hostname: '127.0.0.1', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
				livereload: 35729 //声明给 watch 监听的端口
			},

			server: {
				options: {
					open: false,
					base:"."
				}
			}
		},
/*		watch: {
			livereload: {
				options: {
					livereload: '<%=connect.options.livereload%>' //监听前面声明的端口  35729
				},

				files: [ //下面文件的改变就会实时刷新网页
					'<%=connect.server.options.base%>/**'//监听主目录下的所有文件
				]
			}
		},*/
		watch: {
			livereload: {
				options: {
					livereload: true
				},

				files: [ //下面文件的改变就会实时刷新网页
					'<%=connect.server.options.base%>/**'//监听主目录下的所有文件
				]
			}
		},		
		jshint: {
			all: ['jv-plugins/**/*.js']
		}
	})

 	grunt.loadNpmTasks('grunt-usemin');
 	grunt.loadNpmTasks('grunt-contrib-concat');
 	grunt.loadNpmTasks('grunt-contrib-uglify');
 	grunt.loadNpmTasks('grunt-contrib-cssmin');
 	grunt.loadNpmTasks('grunt-contrib-connect'); 	
 	grunt.loadNpmTasks('grunt-contrib-watch');
 	grunt.loadNpmTasks('grunt-contrib-jshint');
 	grunt.loadNpmTasks('grunt-contrib-imagemin');
 	grunt.loadNpmTasks('grunt-contrib-htmlmin'); 	 	

  grunt.registerTask('default', ['useminPrepare','concat', 'uglify', 'cssmin','usemin','watch']);
  //grunt.registerTask('default', ['connect','watch']);
}

