// Based on https://github.com/ed-lea/jquery-collagePlus

import throttle from 'lodash/throttle';
import { toArray } from './util/util';

const margin = 10;

function resizeRow(elems, rowWidth) {
	const elemsCnt = elems.length;
	const margins = elemsCnt * margin;
	const albumWidthAdjusted = containerWidth - margins;
	const overPercent = albumWidthAdjusted / (rowWidth - margins);
	let trackWidth = 0;

	for (let photoIdx = 0; photoIdx < elemsCnt; photoIdx++) {
		const photo = elems[photoIdx];
		const img = photo.img;
		let fw = Math.floor(photo.w * overPercent);
		const fh = Math.floor(photo.h * overPercent);
		const isLast = photoIdx >= elemsCnt - 1;

		trackWidth += fw + margin;

		// Adjust the last item by a few extra pixels to fill the row
		if (isLast && trackWidth < containerWidth) {
			fw += containerWidth - trackWidth;
		}

		img.width = fw;
		img.height = fh;
	}
}

function resize() {
	containerWidth = container.offsetWidth;

	let rowWidth = 0;
	let elems = [];
	let photo;
	let photoIdx;
	let elemsCnt;
	for (photoIdx = 0, elemsCnt = allElems.length; photoIdx < elemsCnt; photoIdx++) {
		photo = allElems[photoIdx];

		elems.push(photo);

		rowWidth += photo.w + margin;

		if (rowWidth >= containerWidth) {
			resizeRow(elems, rowWidth);
			elems = [];
			rowWidth = 0;
		}
	}

	// Set original sizes for last (not full) row
	for (photoIdx = 0, elemsCnt = elems.length; photoIdx < elemsCnt; photoIdx++) {
		photo = elems[photoIdx];
		const img = photo.img;
		img.width = photo.w;
		img.height = photo.h;
	}
}

const container = document.querySelector('.js-thumbs');
let containerWidth = container.offsetWidth;
const photos = toArray(container.querySelectorAll('.js-img'));
let elems = [];
let rowWidth = 0;

const allElems = photos.map(img => {
	const w = Number(img.getAttribute('width'));
	const h = Number(img.getAttribute('height'));

	const elem = {
		img,
		w,
		h,
	};
	elems.push(elem);

	rowWidth += w + margin;

	if (rowWidth > containerWidth && photos.length) {
		resizeRow(elems, rowWidth);
		elems = [];
		rowWidth = 0;
	}

	return elem;
});

window.addEventListener('resize', throttle(resize, 20), false);
