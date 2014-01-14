// Based on https://github.com/ed-lea/jquery-collagePlus
(function() {
	if (!document.querySelectorAll) return;

	var margin = 10;

	function resizeRow(elems, rowWidth) {
		var elemsCnt = elems.length;
		var margins = elemsCnt * margin;
		var albumWidthAdjusted = containerWidth - margins;
		var overPercent = albumWidthAdjusted / (rowWidth - margins);
		var trackWidth = 0;

		for (var photoIdx = 0; photoIdx < elemsCnt; photoIdx++) {
			var photo = elems[photoIdx];
			var img = photo.img;
			var fw = Math.floor(photo.w * overPercent);
			var fh = Math.floor(photo.h * overPercent);
			var isLast = !(photoIdx < elemsCnt - 1);

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

		var rowWidth = 0;
		var elems = [];
		for (var photoIdx = 0, elemsCnt = allElems.length; photoIdx < elemsCnt; photoIdx++) {
			var photo = allElems[photoIdx];

			elems.push(photo);

			rowWidth += photo.w + margin;

			if (rowWidth > containerWidth && elemsCnt) {
				resizeRow(elems, rowWidth);
				elems = [];
				rowWidth = 0;
			}
		}
	}

	function throttle(fn, threshhold) {
		var last;
		var deferTimer;
		return function() {
			var now = +(new Date);
			var args = arguments;
			if (last && now < last + threshhold) {
				clearTimeout(deferTimer);
				deferTimer = setTimeout(function() {
					last = now;
					fn.apply(this, args);
				}, threshhold);
			}
			else {
				last = now;
				fn.apply(this, args);
			}
		};
	}

	var container = document.querySelector('.js-thumbs');
	var containerWidth = container.offsetWidth;
	var elems = [];
	var allElems = [];
	var rowWidth = 0;
	var photos = container.querySelectorAll('.js-img');
	var targetHeight = parseInt(photos[0].getAttribute('height'), 10);

	for (var photoIdx = 0, photosCnt = photos.length; photoIdx < photosCnt; photoIdx++) {
		var img = photos[photoIdx];
		var w = parseInt(img.getAttribute('width'), 10);
		var h = parseInt(img.getAttribute('height'), 10);

		var elem = {img: img, w: w, h: h};
		elems.push(elem);
		allElems.push(elem);

		rowWidth += w + margin;

		if (rowWidth > containerWidth && photosCnt) {
			resizeRow(elems, rowWidth);
			elems = [];
			rowWidth = 0;
		}
	}

	var resize_ = throttle(resize, 20);
	window.addEventListener('resize', resize_, false);
}());
