// Author: Artem Sapegin, http://sapegin.me, 2014

/*global tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	var _doc = $(document);

	var GalleryShare = tamia.extend(tamia.Component, {
		binded: 'update',

		init: function() {
			_doc.on('photochanged', this.update_);
			this.titleTemplate = this.elem.data('title-template');
		},

		update: function(event, frame) {
			this.elem.socialLikes({
				title: tamia.stmpl(this.titleTemplate, {title: frame.title}),
				url: frame.permalink,
				data: {
					media: frame.img.replace(',xlarge.jpg', ',medium_large.jpg')
				}
			});
		}
	});

	tamia.initComponents({'gallery-share': GalleryShare});

}(window, jQuery));
