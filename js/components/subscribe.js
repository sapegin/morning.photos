import { Component, registerComponent, data } from 'tamia';
import ajaxForm from 'tamia-ajax-form';
import { markPopupAsShown } from './subscribe-popup';

class Subscribe extends Component {
	static binded = 'onSuccess onError';

	init() {
		this.formElem = this.elem.querySelector('.js-subscribe-form');

		ajaxForm({
			form: this.formElem,
			url: data(this.elem, 'action'),
			type: 'jsonp',
			jsonpCallback: 'c',
			onSuccess: this.onSuccess,
			onError: this.onError,
		});
	}

	onSuccess() {
		const email = this.elem.querySelector('.js-subscribe-email').value;
		const from = data(this.elem, 'from');

		markPopupAsShown();
		if (window.mixpanel) {
			mixpanel.identify(email);
			mixpanel.people.set({
				$email: email,
				$created: new Date(),
			});
			mixpanel.track('Subscribed', {
				Email: email,
				From: from,
			});
		}

		return {
			result: 'success',
		};
	}

	onError(response) {
		return {
			message: response.msg && response.msg.replace(/^\d+\s+\-\s+/, ''),
		};
	}
}

registerComponent('u-subscribe', Subscribe);
