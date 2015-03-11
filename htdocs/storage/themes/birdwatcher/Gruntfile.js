// gruntjs.com

module.exports = function(grunt) {
	'use strict';

	require('tamia-grunt')(grunt, {
		tamia: {
			author: 'Artem Sapegin, http://sapegin.me'
		},
		concat: {
			main: {
				nonull: true,
				src: [
					'<%= bower_concat.main.dest %>',
					'<%= dot.main.dest %>',
					'js/mylibs/jquery.tagfilter.js',
					'tamia/vendor/*.js',
					'tamia/tamia/tamia.js',
					'tamia/tamia/component.js',
					'tamia/modules/form/script.js',
					'tamia/modules/modal/script.js',
					'js/components/*.js',
					'js/main.js'
				],
				dest: 'build/scripts.js'
			}
		},
		uglify: {
			inlines: {
				files: [
					{
						expand: true,
						cwd: 'js/inlines/',
						src: '*.js',
						dest: 'build/inlines/'
					}
				]
			}
		},
		dot: {
			main: {
				options: {
					variable: '__templates'
				},
				src: 'templates/*.html',
				dest: 'build/_templates.js'
			}
		},
		fingerprint: {
			assets: {
				src: [
					'build/scripts.js',
					'build/modernizr.js',
					'build/styles.css'
				],
				filename: 'info.json',
				template: grunt.file.read('templates/info.json')
			}
		},
		replace: {
			fotorama: {
				files: {
					'build/fotorama.css': 'bower_components/fotorama/fotorama.css'
				},
				options: {
					patterns: [
						{
							match: /background:url\(fotorama(@2x)?.png\) no-repeat(;background-size:96px 160px)?/g,
							replacement: ''
						}
					]
				}
			}
		},
		webfont: {
			icons: {
				options: {
					relativeFontPath: 'fonts/',
					stylesheet: 'styl',
					embed: true
				},
				src: 'icons/*.svg',
				dest: 'build/fonts'
			}
		},
		shell: {
			docpad: {
				options: {
					stdout: true,
					execOptions: {
						cwd: '../../../../docpad'
					}
				},
				command: 'node_modules/.bin/docpad generate --silent'
			}
		},
		watch: {
			dot: {
				options: {
					atBegin: true
				},
				files: '<%= dot.main.src %>',
				tasks: ['dot']
			},
			inlines: {
				options: {
					atBegin: true
				},
				files: [
					'js/inlines/*.js'
				],
				tasks: ['uglify:inlines']
			}
		},
		browserSync: {
			dev: {
				options: {
					server: '../../../../docpad/out/ru/'
				}
			}
		}
	});

	grunt.registerTask('docpad', ['shell:docpad']);
	grunt.registerTask('default', ['webfont', 'replace', 'scripts', 'stylus', 'dot', 'fingerprint']);
	grunt.registerTask('deploy', ['replace', 'scripts', 'stylus', 'dot', 'fingerprint']);
};
