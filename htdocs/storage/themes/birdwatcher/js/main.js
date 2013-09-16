/* Author: Artem Sapegin, http://sapegin.me, 2013 */

/*global utils:false */
;(function ($) {
	'use strict';

	$.fn.tmpl = function(tmplId, data) {
		return $(this).html(window.__templates[tmplId](data));
	};

	utils.initComponents({
		'featured-album': function(elem) {
			function resize() {
				contentContainer.css('margin-top', container.height());
			}

			var container = $(elem);
			var contentContainer = $('.js-content');
			var photos = window.__photos;

			container.fotorama({
				nav: false,
				transition: 'dissolve',
				loop: true,
				autoplay: 7000,
				width: '100%',
				minHeight: 300,
				maxHeight: '100%',
				fit: 'cover'
			});
			container.on('fotorama:load', resize);

			var fotorama = container.data('fotorama');
			fotorama.load(photos);

			$(window).resize(resize);
		},
		'photo-album': function(elem) {
			function update() {
				gallery.addClass('is-activated');
				var frame = fotorama.activeFrame;
				currentId = frame.id;
				frame.title = frame.info.title || '***';
				frame.permalink = location.href.replace(urlRegExp, '/photos/' + currentId + '/');
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

			function isFirst() {
				return fotorama.activeIndex === 0;
			}

			function isLast() {
				return fotorama.activeIndex === fotorama.data.length-1;
			}

			function updateNav() {
				prevButton.toggleClass('is-disabled', isFirst());
				nextButton.toggleClass('is-disabled', isLast());
			}

			function resize() {
				fotorama.resize({
					width: gallery.width(),
					height: gallery.height()
				});
			}

			function idToIndex(id) {
				var index;
				$.each(photos, function(idx, val) {
					if (photos[idx].id === id) {
						index = idx;
						return false;
					}
				});
				return index;
			}

			var photos = window.__photos;
			var currentId = window.__photos_current_id;
			var urlRegExp = /\/photos\/(\d+)\/$/;
			var startIndex = idToIndex(currentId);
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
				if (isFirst()) return;
				fotorama.show('<');
				updateNav();
			});
			container.on('click', '.js-next', function() {
				if (isLast()) return;
				fotorama.show('>');
				updateNav();
			});

			updateNav();

			$(window).resize(resize);

			$(window).on('popstate', function(event) {
				var m = window.location.href.match(urlRegExp);
				var id = m && m[1];
				if (!id || id === currentId) return;
				fotorama.show({index: idToIndex(id)});
			});
		},

		'tag-filter': {tagFilter: {
			barSelector: '.js-filter',
			linkSelector: '.js-filter-tag'
		}},

		'parallax': function(container) {
			if (!('pageYOffset' in window)) return;
			container = $(container);
			var speed = container.data('speed') || 0.5;
			var screenHeight = screen.height;
			$(document).scroll(function() {
				var pageY = window.pageYOffset;
				if (pageY < screenHeight) {
					container.css('transform', 'translateY(' + (-pageY * speed) + 'px)');
				}
			});
		}
	});

}(jQuery));
