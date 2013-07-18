/* Author: Artem Sapegin, http://sapegin.me, 2013 */

/*global utils:false */
;(function ($) {
	'use strict';

	$.fn.tmpl = function(tmplId, data) {
		return $(this).html(window.__templates[tmplId](data));
	};

	utils.initComponents({
		'featured-album': function(elem) {
			var container = $(elem);
			var photos = window.__photos;

			container.fotorama({
				nav: false,
				transition: 'dissolve',
				loop: true,
				autoplay: 15000,
				width: '100%',
				minHeight: 500,
				maxHeight: '100%',
				fit: 'cover',
				ratio: '1.5'
			});

			var fotorama = container.data('fotorama');
			fotorama.load(shuffle(photos));
		},
		'photo-album': function(elem) {
			function update() {
				gallery.addClass('is-activated');
				var frame = fotorama.activeFrame;
				frame.title = frame.info.title || '***';
				frame.permalink = location.href.replace(/\/photos\/\d+\/$/, '/photos/' + frame.id + '/');
				frame.albumHref = albumHref;
				frame.album = albumName;

				// Update URL
				history.pushState('', frame.title, frame.permalink);

				// Update page title
				document.title = window.__templates['photo-title']({
					title: frame.title,
					siteTitle: siteTitle
				});

				// Update info and share
				infoPane.tmpl('photo-info', frame);

				updateNav();
			}

			function updateNav() {
				prevButton.toggleClass('is-disabled', fotorama.activeIndex === 0);
				nextButton.toggleClass('is-disabled', fotorama.activeIndex === fotorama.data.length-1);
			}

			function resize() {
				fotorama.resize({
					width: gallery.width(),
					height: gallery.height()
				});
			}

			var photos = window.__photos;
			var currentId = window.__photos_current_id;
			var startIndex = 0;
			$.each(photos, function(index, value) {
				if (photos[index].id === currentId) {
					startIndex = index;
					return false;
				}
			});

			var container = $(elem);
			var gallery = container.find('.js-gallery');
			var sharePane = container.find('.js-share');
			var infoPane = container.find('.js-info');
			var prevButton = container.find('.js-prev');
			var nextButton = container.find('.js-next');
			var siteTitle = $('.js-site-title').text();
			var albumLinkElem = $('.js-album-link');
			var albumHref = albumLinkElem.attr('href');
			var albumName = albumLinkElem.text();

			gallery.fotorama({
				nav: false,
				keyboard: true,
				transition: 'crossfade',
				width: gallery.width(),
				height: gallery.height()
			});

			var fotorama = gallery.data('fotorama');
			fotorama.load(photos);
			fotorama.show({index: startIndex, time: 0});
			gallery.on('fotorama:show', update);

			container.on('click', '.js-prev', function() {
				fotorama.show('<');
				updateNav();
			});
			container.on('click', '.js-next', function() {
				fotorama.show('>');
				updateNav();
			});

			updateNav();

			$(window).resize(resize);
		},

		'tag-filter': {tagFilter: {
			barSelector: '.js-filter',
			linkSelector: '.js-filter-tag'
		}}
	});

	// Fisher–Yates Shuffle
	// http://bost.ocks.org/mike/shuffle/
	function shuffle(array) {
		// While there remain elements to shuffle
		var m = array.length;
		while (m) {
			// Pick a remaining element
			var i = Math.floor(Math.random() * m--);

			// And swap it with the current element
			var t = array[m];
			array[m] = array[i];
			array[i] = t;
		}

		return array;
	}

}(jQuery));
