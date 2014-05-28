// Author: Artem Sapegin, http://sapegin.me, 2014

/*global tamia:false, ga:false*/
;(function(window, $, undefined) {
	'use strict';

	var _win = $(window);
	var _doc = $(document);

	tamia.initComponents({
		'featured-album': function(elem) {
			var resize = function() {
				contentContainer.css('margin-top', container.height());
			};

			var load = function() {
				$('body').addState('ok');
			};

			var container = $(elem);
			var contentContainer = $('.js-content');
			var photos = window.__photos;

			container.fotorama({
				nav: false,
				arrows: false,
				keyboard: false,
				click: false,
				swipe: false,
				trackpad: false,
				transition: 'dissolve',
				loop: true,
				autoplay: 7000,
				width: '100%',
				minHeight: 300,
				maxHeight: '100%',
				fit: 'cover'
			});
			container.on('fotorama:load', resize);
			container.on('fotorama:load', load);

			var fotorama = container.data('fotorama');
			fotorama.load(photos);

			_win.resize(resize);
		},

		'tag-filter': {
			tagFilter: {
				barSelector: '.js-filter',
				linkSelector: '.js-filter-tag'
			}
		},

		'parallax': function(elem) {
			if (Modernizr.touch) return;
			if (!window.pageYOffset) return;

			var container = $(elem);
			var speed = container.data('speed') || 0.5;
			var screenHeight = screen.height;
			$(window).scroll(function() {
				var pageY = window.pageYOffset;
				if (pageY < screenHeight) {
					var offset = -pageY * speed;
					container.css('transform', 'translateY(' + offset + 'px)');
				}
			});
		},

		'touch-toggle': function(elem) {
			if (!Modernizr.touch) return;

			elem = $(elem);
			elem.click(function() {
				var pressed = elem.hasState('pressed');
				elem.closest('.js-touch-toggle-container').find('.is-pressed').removeState('pressed');
				elem.toggleState('pressed', !pressed);
			});
		},

		'essay-excerpts': function(elem) {
			$(elem).on('click', '.js-more-link', function(event) {
				if (event.metaKey || event.ctrlKey) return;
				var link = $(event.currentTarget);
				link.closest('.js-more').find('.js-more-content').trigger('appear.tamia');
				link.remove();
				event.preventDefault();
			});
		}
 	});

	// Track Social Likes activity
	_doc.on('popup_opened.social-likes', function(event, service, win) {
	    ga('send', 'social', service, 'share', location.href);
	});

}(window, jQuery));
