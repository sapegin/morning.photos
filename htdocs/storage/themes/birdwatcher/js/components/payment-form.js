/* Author: Artem Sapegin, http://sapegin.me, 2014 */

;(function($) {
	'use strict';

	var PaymentForm = tamia.extend(tamia.Component, {
		binded: 'changeType changeSumm submit',

		init: function() {
			tamia.trace(this, 'PaymentForm');

			this.elem.on('click', '.js-payment-form-type', this.changeType_);
			this.elem.on('input change', '.js-payment-form-summ', this.changeSumm_);
			this.elem.on('submit', this.submit_);

			this.elem.trigger('unlock.form.tamia');  // To prevent disabled submit button in Firefox after Back button pressed
		},

		changeType: function(event) {
			var target = $(event.currentTarget);
			this.toggleMode('type', target.val());
		},

		changeSumm: function(event) {
			var target = $(event.currentTarget);
			this.toggleMode('cost', target.val() === '0' ? 'free' : 'paid');
		},

		submit: function(event) {
			event.preventDefault();

			// Prepare data
			var formValues = this.getFormData(this.elem);
			if (formValues.summ === '0') formValues.type = 'free';
			var paymentData = this.getProviderData(formValues.type);
			if (!paymentData) return;
			var requestData = this.getRequestData(formValues, paymentData);

			// Create and submit form

			var form = $('<form>', {
				action: requestData.action,
				method: 'post'
			});

			_.each(requestData.form, function(value, key) {
				$('<input>', {
					type: 'hidden',
					name: key,
					value: value
				}).appendTo(form);
			});

			$('body').append(form);

			form.submit();
		},

		getFormData: function(form) {
			var array = form.serializeArray();
			var names = _.pluck(array, 'name');
			var values = _.pluck(array, 'value');
			return _.object(names, values);
		},

		getProviderData: function(type) {
			return window.paymentData.providers[type];
		},

		getRequestData: function(values, provider) {
			// Clone other provider
			if (provider.clone) {
				provider = $.extend(true, this.getProviderData(provider.clone), provider);
			}

			// Test mode
			if (window.paymentTest && provider.test) {
				provider = $.extend(true, provider, provider.test);
			}

			delete values.type;
			if (!provider.form) provider.form = {};
			var data = provider.form;
			var extras = provider.extras;

			// Find places for extra fields
			var extrasToAdd = _.pick(extras, function(value, key) {
				return key in values;
			});
			_.each(extrasToAdd, function(value, key) {
				data[value] = values[key];
			});

			// Pack extra fields that don't have their place in the form to JSON
			if (extras.json) {
				var extrasToJson = _.omit(values, function(value, key) {
					return key in extras;
				});
				data[extras.json] = JSON.stringify(extrasToJson);
			}

			return provider;
		},

		toggleMode: function(group, mode) {
			var prefix = 'payment-form_';
			var node = this.elem[0];
			node.className = node.className.replace(new RegExp(prefix + group + '_\\w+'), prefix + group + '_' + mode);
		}
	});

	tamia.initComponents({'payment-form': PaymentForm});

}(jQuery));
