/* Author: Artem Sapegin, http://sapegin.me, 2013 */

/*global utils:false */
;(function ($) {
	'use strict';

	$.fn.tmpl = function(tmplId, data) {
		return $(this).html(window.__templates[tmplId](data));
	};

	utils.initComponents({
		'photo-album': function(elem) {
			function update() {
				gallery.addClass('is-activated');
				var frame = fotorama.activeFrame;
				frame.title = frame.title || '***';
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
			var siteTitle = $('.js-site-title').text();
			var albumLinkElem = $('.js-album-link a');
			var albumHref = albumLinkElem.attr('href');
			var albumName = albumLinkElem.text();

			gallery.fotorama({
				nav: false,
				arrows: true,
				keyboard: true,
				transition: 'crossfade',
				width: gallery.width(),
				height: gallery.height(),
				startIndex: startIndex
			});

			var fotorama = gallery.data('api');
			gallery.on('fotorama:show', update);
			fotorama.load(photos);

			$(window).resize(resize);
		}
	});

}(jQuery));
