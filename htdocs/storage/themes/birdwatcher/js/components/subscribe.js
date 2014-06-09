/* Author: Artem Sapegin, http://sapegin.me, 2014 */

;(function($) {
	'use strict';

	var Subscribe = tamia.extend(tamia.Component, {
		binded: 'error',

		init: function() {
			this.elem.on('error.form.tamia', this.error_);
		},

		error: function(event, data) {
		 	return data.msg ? data.msg.replace(/^\d+\s+\-\s+/, '') : null;
		}
	});

	tamia.initComponents({'subscribe': Subscribe});

}(jQuery));
