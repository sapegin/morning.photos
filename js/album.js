// Based on https://github.com/ed-lea/jquery-collagePlus

import throttle from 'lodash/throttle';
import { toArray } from './util/util';

let margin = 10;

function resizeRow(elems, rowWidth) {
	let elemsCnt = elems.length;
	let margins = elemsCnt * margin;
	let albumWidthAdjusted = containerWidth - margins;
	let overPercent = albumWidthAdjusted / (rowWidth - margins);
	let trackWidth = 0;

	for (let photoIdx = 0; photoIdx < elemsCnt; photoIdx++) {
		let photo = elems[photoIdx];
		let img = photo.img;
		let fw = Math.floor(photo.w * overPercent);
		let fh = Math.floor(photo.h * overPercent);
		let isLast = photoIdx >= elemsCnt - 1;

		trackWidth += fw + margin;

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

		if (rowWidth > containerWidth && elemsCnt) {
			resizeRow(elems, rowWidth);
			elems = [];
			rowWidth = 0;
		}
	}

	// Set original sizes for last (not full) row
	for (photoIdx = 0, elemsCnt = elems.length; photoIdx < elemsCnt; photoIdx++) {
		photo = elems[photoIdx];
		let img = photo.img;
		img.width = photo.w;
		img.height = photo.h;
	}
}

let container = document.querySelector('.js-thumbs');
let containerWidth = container.offsetWidth;
let photos = toArray(container.querySelectorAll('.js-img'));
let elems = [];
let rowWidth = 0;

let allElems = photos.map(img => {
	let w = Number(img.getAttribute('width'));
	let h = Number(img.getAttribute('height'));

	// console.log(w, h)

	let elem = { img, w, h };
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
