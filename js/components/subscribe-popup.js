import { Component, registerComponent, onEvent, appear, disappear } from 'tamia';
import hasTouch from 'has-touch';
import 'gliojs';

const SHOWN_KEY = 'SubscribePopupShown';
const INIT_TIMEOUT = 20000;
const FOCUS_TIMEOUT = 100;

class SubscribePopup extends Component {
	static binded = 'onClose onShow onKeyDown';

	init() {
		setTimeout(() => {
			if (!this.isActive()) {
				return;
			}

			this.containerElem = this.elem.querySelector('.js-subscribe-container');
			glio.init(['top', this.onShow]);
		}, INIT_TIMEOUT);
	}

	isActive() {
		try {
			return (
				// Touch device
				!hasTouch &&
				// Subscribed to newsletter
				!(window.mixpanel && window.mixpanel.get_distinct_id().indexOf('@') !== -1) &&
				// Already seen the popup
				!localStorage.getItem(SHOWN_KEY)
			);
		}
		catch (exception) {
			return false;
		}
	}

	onShow() {
		localStorage.setItem(SHOWN_KEY, 'true');

		appear(this.containerElem);

		const fieldElem = this.elem.querySelector('.js-subscribe-email');
		setTimeout(() => fieldElem.focus(), FOCUS_TIMEOUT);

		const closeElem = this.elem.querySelector('.js-subscribe-close');
		onEvent(closeElem, 'click', this.onClose);

		onEvent(window, 'keydown', this.onKeyDown);
	}

	onClose() {
		disappear(this.containerElem);
	}

	onKeyDown(event) {
		if (event.which === 27) {  // Escape
			this.onClose();
		}
	}
}

registerComponent('u-subscribe-popup', SubscribePopup);
