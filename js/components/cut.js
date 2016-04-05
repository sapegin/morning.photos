import { Component, registerComponent, onEvent, toggleState } from 'tamia';

class Cut extends Component {
	static binded = 'onExpand';

	init() {
		this.linkElem = this.elem.querySelector('.js-more-link');
		onEvent(this.linkElem, 'click', this.onExpand);
	}

	onExpand(event) {
		event.preventDefault();
		toggleState(this.linkElem, 'hidden');
		toggleState(this.elem.querySelector('.js-more-content'), 'hidden');
	}
}

registerComponent('u-cut', Cut);
