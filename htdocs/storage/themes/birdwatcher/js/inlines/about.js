(function() {
	var count = 34;
		visible = 6,
		interval = 3000,
		urlTpl = 'http://birdwatcher.ru/images/about/me{num}.jpg',
		imgTpl = '<img src="{url}" alt="" class="about-triptych__photo {cls} js-img">',
		photos = [],
		imgs = [],
		placeholders = null,
		lastPhoto = null;

	for (var photoIdx = 1; photoIdx <= count; photoIdx++) {
		photos.push(urlTpl.replace('{num}', photoIdx));
	}
	photos = shuffle(photos);

	for (var photoIdx = 1; photoIdx <= visible + 1; photoIdx++) {
		var img = (new Image);
		img.src = photos[photoIdx];
		imgs.push(img);
	}

	function tick() {
		var imgs = randomImg(),
			newImg, oldImg;

		if (/\bis-hidden\b/.test(imgs[0].className)) {
			oldImg = imgs[1];
			newImg = imgs[0];
		}
		else {
			oldImg = imgs[0];
			newImg = imgs[1];
		}

		newImg.src = nextUrl();
		newImg.className = newImg.className.replace(/\s+is-hidden/, '');
		oldImg.className += ' is-hidden';

		(new Image).src = photos[0];
		setTimeout(tick, interval);
	}

	function randomImg() {
		var num;
		do {
			num = Math.floor(Math.random() * visible);
		} while (num === lastPhoto)
		lastPhoto = num;
		return placeholders[num].getElementsByClassName('js-img');
	}

	function nextUrl() {
		var url = photos.shift();
		photos.push(url);
		return url;
	}

	function makeImg(url, cls) {
		return imgTpl
			.replace('{url}', url)
			.replace('{cls}', cls || '');
	}

	window.initPhotos = function() {
		placeholders = document.getElementsByClassName('js-instagram');
		for (var placeholderIdx = 0; placeholderIdx < placeholders.length; placeholderIdx++) {
			placeholders[placeholderIdx].innerHTML = makeImg(nextUrl()) + makeImg('', 'is-hidden') + placeholders[placeholderIdx].innerHTML;
		}
		setTimeout(tick, interval);
	}
})();
