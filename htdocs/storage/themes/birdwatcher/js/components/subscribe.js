/* Author: Artem Sapegin, http://sapegin.me, 2014 */

;(function($) {
	'use strict';

	var Subscribe = tamia.extend(tamia.Component, {
		binded: 'success error',

		init: function() {
			this.elem.on({
				'success.form.tamia': this.success_,
				'error.form.tamia': this.error_
			});
		},

		success: function(event, data) {
			var email = this.elem.find('.js-subscribe-email').val();
			var from = this.elem.data('subscribe-from');
			mixpanel.identify(email);
			mixpanel.people.set({$email: email, $created: new Date()});
		 	mixpanel.track('Subscribed', {Email: email, From: from});
		},

		error: function(event, data) {
		 	return data.msg ? data.msg.replace(/^\d+\s+\-\s+/, '') : null;
		}
	});

	tamia.initComponents({'subscribe': Subscribe});

}(jQuery));
