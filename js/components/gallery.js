import Swiper from 'swiper';
import hasTouch from 'has-touch';
import socialLikes from 'social-likes-next';
import { Component, registerComponent, onEvent, toggleState, data } from 'tamia';
import { getPhotoUrl } from '../util/util';

const URL_REG_EXP = /\/([-\d]+)$/;

// TODO: Breaks resizing
// <img data-src="${getPhotoUrl(photo.slug, 'large')}" class="lightbox-image__saver swiper-lazy">

export const slideTemplate = photo => (
	`<div class="lightbox-image swiper-slide swiper-lazy" data-background="${getPhotoUrl(photo.slug, 'large')}">
		<div class="swiper-lazy-preloader"></div>
	</div>`
);

class Gallery extends Component {
	static binded = 'onSlideChangeStart onPopState onKeyDown';

	init() {
		this.photos = window.__galleryPhotos;
		this.initialSlug = window.__galleryInitialSlug;
		this.wrapperElem = this.getElem('wrapper');
		this.siteTitle = document.querySelector('meta[property="og:site_name"]').getAttribute('content');

		this.initSlider();

		onEvent(window, 'popstate', this.onPopState);
		onEvent(window, 'keydown', this.onKeyDown);
	}

	getElem(name) {
		return this.elem.querySelector(`.js-gallery-${name}`);
	}

	initSlider() {
		// Append slides
		this.wrapperElem.innerHTML = this.photos.map(slideTemplate).join('');

		this.swiper = new Swiper(this.getElem('container'), {
			nextButton: this.getElem('next'),
			prevButton: this.getElem('prev'),
			initialSlide: this.slugToIndex(this.initialSlug),
			effect: hasTouch ? 'slide' : 'fade',
			allowSwipeToPrev: hasTouch,
			allowSwipeToNext: hasTouch,
			keyboardControl: true,
			simulateTouch: false,
			preloadImages: false,
			lazyLoading: true,
			lazyLoadingInPrevNext: true,
			lazyLoadingInPrevNextAmount: 2,
			onSlideChangeStart: this.onSlideChangeStart,
			lazyLoadingOnTransitionStart: true,
			fade: {
				crossFade: false,
			},
		});

		this.updateNav(this.swiper);
	}

	onSlideChangeStart(swiper) {
		const photo = this.photos[swiper.activeIndex];
		const title = photo.title || '***';

		// Update page title
		const pageTitle = document.title = [title, this.siteTitle].join(' — ');

		// Update URL
		const url = location.href.replace(URL_REG_EXP, `/${photo.slug}`);
		if (url !== location.href) {
			history.pushState('', pageTitle, url);
		}

		// Update navigation and info pane
		this.updateNav(swiper);
		this.updateInfo({ ...photo, url, title, pageTitle });

		// Track page view
		if (window.yaCounter218061) {
			window.yaCounter218061.hit(url, title);
		}
		if (window.mixpanel) {
			window.mixpanel.track('Photo viewed', { Title: title, Id: photo.slug });
		}
	}

	onPopState() {
		const m = location.href.match(URL_REG_EXP);
		const slug = m && m[1];
		this.swiper.slideTo(this.slugToIndex(slug));
	}

	onKeyDown(event) {
		if (event.which === 27) {  // Escape
			location.href = data(this.elem, 'albumUrl');
		}
	}

	updateNav(swiper) {
		toggleState(swiper.prevButton[0], 'disabled', swiper.isBeginning);
		toggleState(swiper.nextButton[0], 'disabled', swiper.isEnd);
	}

	updateInfo(photo) {
		const fields = [
			['info-title', photo.title],
			['info-caption', photo.caption],
			['info-location', photo.location && `${photo.location},`],
			['info-artist', photo.artist && `© ${photo.artist}`],
			['info-date', photo.date],
			['info-exif', photo.exif],
		];
		fields.forEach(([name, value]) => {
			const elem = this.getElem(name);
			elem.innerHTML = value || '';
			toggleState(elem, 'hidden', !value);
		});

		socialLikes(this.getElem('info-share'), {
			url: photo.url,
			title: photo.pageTitle,
			data: {
				// XXX
				media: 'http://morning.photos/' + getPhotoUrl(photo.slug, 'large'),
			},
		});
	}

	slugToIndex(slug) {
		return this.photos.reduce((index, photo, currentIndex) => {
			if (photo.slug === slug) {
				return currentIndex;
			}
			return index;
		}, 0);
	}
}

registerComponent('u-gallery', Gallery);
