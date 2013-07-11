# gruntjs.com

module.exports = (grunt) ->
	'use strict'

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

	debug = !!grunt.option('debug')

	grunt.initConfig
		banner: '/*! Author: Artem Sapegin, http://sapegin.me, <%= grunt.template.today("yyyy") %> */\n'
		jshint:
			options:
				jshintrc: '.jshintrc'
			files: [
				'js/main.js'
			]
		dot:
			main:
				options:
					variable: '__templates'
				src: 'templates/*.html'
				dest: 'build/templates.js'
		concat:
			main:
				src: [
					'js/libs/fotorama/fotorama.js'
					'js/libs/hashnav.js'
					'js/mylibs/jquery.tagfilter.js'
					'tamia/tamia/tamia.js'
					'<%= dot.main.dest %>'
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
				define:
					DEBUG: debug
				paths: [
					'tamia'
				]
			compile:
				files:
					'build/styles.css': 'styles/index.styl'
		copy:
			main:
				files: [
					expand: true, cwd: 'js/libs/fotorama/', src: '*.png', dest: 'build/'
				]
		webfont:
			icons:
				options:
					relativeFontPath: 'fonts/'
					stylesheet: 'styl'
				src: 'icons/*.svg'
				dest: 'build/fonts'
		watch:
			options:
				livereload: true
			concat:
				files: [
					'<%= concat.main.src %>'
					'<%= dot.main.dest %>'
				]
				tasks: ['concat']
			stylus:
				files: 'styles/**/*'
				tasks: ['stylus']
			dot:
				files: '<%= dot.main.src %>'
				tasks: ['dot']

	grunt.registerTask 'default', ['stylus', 'jshint', 'dot', 'concat', 'uglify', 'copy']
	grunt.registerTask 'deploy', ['stylus', 'concat', 'uglify', 'copy']
