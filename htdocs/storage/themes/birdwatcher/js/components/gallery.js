// Author: Artem Sapegin, http://sapegin.me, 2014

/*global tamia:false, yaCounter218061:false, mixpanel:false*/
;(function(window, $, undefined) {
	'use strict';

	var _win = $(window);
	var _doc = $(document);

	/* jshint camelcase:false */
	var photosList = window.__photos;
	var currentId = window.__photos_current_id;
	/* jshint camelcase:true */

	var Gallery = tamia.extend(tamia.Component, {
		binded: 'update prev next resize',

		init: function() {
			this.photos = photosList;
			this.siteTitle = $('meta[property="og:site_name"]').attr('content');
			this.urlRegExp = /\/photos\/(\d+)\/$/;

			var startIndex = this.idToIndex(currentId);

			this.gallery = this.elem.find('.js-gallery');
			this.prevButton = this.elem.find('.js-prev');
			this.nextButton = this.elem.find('.js-next');

			this.gallery.fotorama({
				nav: false,
				arrows: false,
				keyboard: true,
				click: true,
				swipe: true,
				trackpad: false,
				transition: Modernizr.touch ? 'slide' : 'crossfade',
				width: '100%',
				height: this.gallery.height()
			});

			this.fotorama = this.gallery.data('fotorama');
			this.fotorama.load(this.photos);
			this.fotorama.show({index: startIndex, time: 0});
			this.gallery.on('fotorama:show', this.update_);

			this.elem.on('click', '.js-prev', this.prev_);
			this.elem.on('click', '.js-next', this.next_);
			this.updateNav();

			_win.resize(this.resize_);

			this.inPopState = false;
			var onload = true;
			_win.on('popstate', function(event) {
				var m = window.location.href.match(this.urlRegExp);
				var id = m && m[1];
				if (!id || onload) {
					onload = false;
					return;
				}
				this.inPopState = true;
				this.fotorama.show({index: this.idToIndex(id)});
			}.bind(this));
		},

		update: function() {
			var frame = this.fotorama.activeFrame;
			frame.title = frame.info.title || '***';

			// Update page title
			var pageTitle = document.title = tamia.tmpl('photo-title', {
				title: frame.title,
				siteTitle: this.siteTitle
			});

			// Update URL
			if (!this.inPopState) {
				frame.permalink = location.href.replace(this.urlRegExp, '/photos/' + frame.id + '/');
				history.pushState('', pageTitle, frame.permalink);
			}
			this.inPopState = false;

			// Track page view
			if (window.yaCounter218061) yaCounter218061.hit(frame.permalink, frame.title);
			if (window.mixpanel) mixpanel.track('Photo viewed', {Title: frame.title, Id: frame.id});

			this.updateNav();

			_doc.trigger('photochanged', frame);
		},

		next: function() {
			if (this.isLast()) return;
			this.fotorama.show('>');
			this.updateNav();
		},

		prev: function() {
			if (this.isFirst()) return;
			this.fotorama.show('<');
			this.updateNav();
		},

		isFirst: function() {
			return this.fotorama.activeIndex === 0;
		},

		isLast: function() {
			return this.fotorama.activeIndex === this.fotorama.data.length-1;
		},

		updateNav: function() {
			this.prevButton.toggleState('disabled', this.isFirst());
			this.nextButton.toggleState('disabled', this.isLast());
		},

		resize: function() {
			this.fotorama.resize({
				width: this.gallery.width(),
				height: this.gallery.height()
			});
		},

		idToIndex: function(id) {
			var index = null;
			var photos = this.photos;
			$.each(photos, function(idx, val) {
				if (photos[idx].id === id) {
					index = idx;
					return false;
				}
			});
			return index;
		}
	});

	tamia.initComponents({gallery: Gallery});

}(window, jQuery));
