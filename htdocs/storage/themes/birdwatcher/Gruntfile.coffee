# gruntjs.com

module.exports = (grunt) ->
	'use strict'

	require('load-grunt-tasks')(grunt)

	debug = !!grunt.option('debug')

	grunt.initConfig
		banner: '/*! Author: Artem Sapegin, http://sapegin.me, <%= grunt.template.today("yyyy") %> */\n'
		dot:
			main:
				options:
					variable: '__templates'
				src: 'templates/*.html'
				dest: 'build/_templates.js'
		jshint:
			options:
				jshintrc: '.jshintrc'
			files: [
				'js/*.js'
				'js/components/*.js'
			]
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
		concat:
			main:
				src: [
					'<%= bower_concat.main.dest %>'
					'<%= dot.main.dest %>'
					'js/mylibs/jquery.tagfilter.js'
					'tamia/vendor/*.js'
					'tamia/tamia/tamia.js'
					'tamia/tamia/component.js'
					'tamia/modules/form/script.js'
					'js/components/*.js'
					'js/main.js'
				]
				dest: 'build/scripts.js'
		uglify:
			options:
				compress:
					global_defs:
						DEBUG: debug
			main:
				options:
					banner: '<%= banner %>'
				files:
					'<%= concat.main.dest %>': '<%= concat.main.dest %>'
			inlines:
				files: [
					expand: true
					cwd: 'js/inlines/'
					src: '*.js'
					dest: 'build/inlines/'
				]
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
		fingerprint:
			assets:
				src: [
					'build/scripts.js'
					'build/modernizr.js'
					'build/styles.css'
				]
				filename: 'info.json',
				template: grunt.file.read('templates/info.json')
		replace:
			fotorama:
				files:
					'build/fotorama.css': 'bower_components/fotorama/fotorama.css'
				options:
					patterns: [
						match: /background:url\(fotorama(@2x)?.png\) no-repeat(;background-size:96px 160px)?/g
						replacement: ''
					]
		webfont:
			icons:
				options:
					relativeFontPath: 'fonts/'
					stylesheet: 'styl'
					embed: true
				src: 'icons/*.svg'
				dest: 'build/fonts'
		shell:
			docpad:
				options:
					stdout: true
					execOptions:
						cwd: '../../../../docpad'
				command: 'node_modules/.bin/docpad generate --silent'
		watch:
			livereload:
				options:
					livereload: true
				files: [
					'<%= concat.main.dest %>'
					'build/styles.css'
					'build/inlines/*.js'
				]
			dot:
				options:
					atBegin: true
				files: '<%= dot.main.src %>'
				tasks: ['dot']
			concat:
				options:
					atBegin: true
				files: [
					'<%= concat.main.src %>'
					'<%= dot.main.dest %>'
				]
				tasks: ['concat']
			inlines:
				options:
					atBegin: true
				files: [
					'js/inlines/*.js'
				]
				tasks: ['uglify:inlines']
			stylus:
				options:
					atBegin: true
				files: 'styles/**/*'
				tasks: ['stylus']

	grunt.registerTask 'docpad', ['shell:docpad']
	grunt.registerTask 'default', ['jshint', 'webfont', 'replace', 'stylus', 'dot', 'bower_concat', 'modernizr', 'concat', 'uglify', 'fingerprint']
	grunt.registerTask 'deploy', ['replace', 'stylus', 'dot', 'bower_concat', 'modernizr', 'concat', 'uglify', 'fingerprint']
