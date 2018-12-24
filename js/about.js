import range from 'lodash/range';
import sample from 'lodash/sample';
import shuffle from 'lodash/shuffle';
import { toArray } from './util/util';

const PHOTOS_NUMBER = 34;
const VISIBLE_PHOTOS = 6;
const UPDATE_INTERVAL = 3000;

const urlTemplate = num => `/images/about/me${num}.jpg`;
const imgTemplate = (url, cls = '') =>
	`<img src="${url}" alt="" class="photo-grid__img ${cls} js-img">`;

let lastPhoto;

// Shuffled photo URLs
const photos = shuffle(range(1, PHOTOS_NUMBER + 1).map(urlTemplate));

function tick() {
	const images = getRandomImg();

	let newImg;
	let oldImg;
	if (images[0].classList.contains('is-hidden')) {
		oldImg = images[1];
		newImg = images[0];
	} else {
		oldImg = images[0];
		newImg = images[1];
	}

	requestAnimationFrame(() => oldImg.classList.add('is-hidden'));

	newImg.src = getNextUrl();
	setTimeout(() => requestAnimationFrame(() => newImg.classList.remove('is-hidden')));

	// Preload next photo
	new Image().src = photos[0];

	setTimeout(tick, UPDATE_INTERVAL);
}

function getRandomImg() {
	const availableIndexes = range(VISIBLE_PHOTOS);
	availableIndexes.splice(lastPhoto, 1);
	lastPhoto = sample(availableIndexes);
	return placeholders[lastPhoto].querySelectorAll('.js-img');
}

function getNextUrl() {
	const url = photos.shift();
	photos.push(url);
	return url;
}

// Run
const placeholders = toArray(document.querySelectorAll('.js-instagram'));
placeholders.forEach(placeholder => {
	placeholder.insertAdjacentHTML(
		'afterbegin',
		imgTemplate(getNextUrl()) + imgTemplate('', 'is-hidden')
	);
});
setTimeout(tick, UPDATE_INTERVAL);
