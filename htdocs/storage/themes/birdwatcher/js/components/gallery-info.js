// Author: Artem Sapegin, http://sapegin.me, 2014

/*global tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	var _doc = $(document);

	var GalleryInfo = tamia.extend(tamia.Component, {
		binded: 'update',

		init: function() {
			_doc.on('photochanged', this.update_);
		},

		update: function(event, frame) {
			this.elem.tmpl('photo-info', frame);
		}
	});

	tamia.initComponents({'gallery-info': GalleryInfo});

}(window, jQuery));
