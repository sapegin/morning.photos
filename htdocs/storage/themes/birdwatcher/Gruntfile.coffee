# gruntjs.com

module.exports = (grunt) ->
	'use strict'

	require('load-grunt-tasks')(grunt)

	debug = !!grunt.option('debug')

	grunt.initConfig
		banner: '/*! Author: Artem Sapegin, http://sapegin.me, <%= grunt.template.today("yyyy") %> */\n'
		coffeelint:
			options: grunt.file.readJSON('.coffeelintrc')
			files: '<%= coffee.main.src %>'
		dot:
			main:
				options:
					variable: '__templates'
				src: 'templates/*.html'
				dest: 'build/_templates.js'
		modernizr:
			devFile: 'bower_components/modernizr/modernizr.js'
			outputFile: 'build/modernizr.js'
			extra:
				load: false
			files: [
				'build/scripts.js'
				'build/styles.css'
			]
		bower_concat:
			main:
				dest: 'build/_bower.js'
				exclude: [
					'jquery'
					'modernizr'
				]
		coffee:
			main:
				expand: true
				src: [
					"js/components/*.coffee"
					"js/*.coffee"
				]
				dest: '.'
				ext: '.js'
		concat:
			main:
				src: [
					'<%= bower_concat.main.dest %>'
					'<%= dot.main.dest %>'
					'js/mylibs/jquery.tagfilter.js'
					'tamia/vendor/*.js'
					'tamia/tamia/tamia.js'
					'tamia/tamia/component.js'
					'js/components/*.js'
					'js/main.js'
				]
				dest: 'build/scripts.js'
		uglify:
			options:
				banner: '<%= banner %>'
				compress:
					global_defs:
						DEBUG: debug
			main:
				files:
					'<%= concat.main.dest %>': '<%= concat.main.dest %>'
		stylus:
			options:
				'include css': true
				urlfunc: 'embedurl'
				banner: '<%= banner %>'
				define:
					DEBUG: debug
				paths: [
					'tamia'
				]
				use: [
					() -> (require 'autoprefixer-stylus')('last 2 versions', 'ie 8', 'ie 9')
					debug or (require 'csso-stylus')
				]
			compile:
				files:
					'build/styles.css': 'styles/index.styl'
		copy:
			main:
				files: [
					expand: true
					cwd: 'bower_components/fotorama/'
					src: '*.png'
					dest: 'build/'
				]
		webfont:
			icons:
				options:
					relativeFontPath: 'fonts/'
					stylesheet: 'styl'
				src: 'icons/*.svg'
				dest: 'build/fonts'
		watch:
			livereload:
				options:
					livereload: true
				files: [
					'<%= concat.main.dest %>'
					'build/styles.css'
				]
			dot:
				options:
					atBegin: true
				files: '<%= dot.main.src %>'
				tasks: ['dot']
			coffee:
				options:
					atBegin: true
				files: '<%= coffee.main.src %>'
				tasks: 'coffee'
			concat:
				options:
					atBegin: true
				files: [
					'<%= concat.main.src %>'
					'<%= dot.main.dest %>'
				]
				tasks: ['concat']
			stylus:
				options:
					atBegin: true
				files: 'styles/**/*'
				tasks: ['stylus']

	grunt.registerTask 'default', ['stylus', 'coffeelint', 'dot', 'bower_concat', 'coffee', 'modernizr', 'concat', 'uglify', 'copy']
	grunt.registerTask 'default', ['stylus', 'dot', 'bower_concat', 'coffee', 'modernizr', 'concat', 'uglify', 'copy']
