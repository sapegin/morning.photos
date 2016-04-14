import Swiper from 'swiper';
import shuffle from 'lodash/shuffle';
import hasTouch from 'has-touch';
import { Component, registerComponent, addState } from 'tamia';
import { slideTemplate } from './gallery';

class Featured extends Component {
	init() {
		const photos = shuffle(window.__featuredPhotos).map(slug => ({ slug }));
		const wrapperElem = this.elem.querySelector('.js-featured-wrapper');
		wrapperElem.innerHTML = photos.map(slideTemplate).join('');

		new Swiper(this.elem.querySelector('.js-featured-container'), {
			effect: hasTouch ? 'slide' : 'fade',
			allowSwipeToPrev: hasTouch,
			allowSwipeToNext: hasTouch,
			keyboardControl: false,
			simulateTouch: false,
			preloadImages: false,
			lazyLoading: true,
			lazyLoadingInPrevNext: true,
			lazyLoadingInPrevNextAmount: 2,
			lazyLoadingOnTransitionStart: true,
			autoplay: 7000,
			onInit: this.onGalleryInit,
			fade: {
				crossFade: true,
			},
		});
	}

	onGalleryInit() {
		addState(document.querySelector('.js-content'), 'ok');
	}
}

registerComponent('u-featured', Featured);
