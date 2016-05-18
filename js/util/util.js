/**
 * Convert array like object to array.
 *
 * @param {Object} list Array like object.
 * @returns {Array}
 */
export function toArray(list) {
	return Array.prototype.slice.call(list);
}

/**
 * Return photo URL.
 *
 * @param {string} slug
 * @param {string} size
 * @returns {string}
 */
export function getPhotoUrl(slug, size) {
	return `/photos/${size}/${getPhotoFilename(slug, size)}`;
}

/**
 * Return photo file name.
 *
 * @param {string} slug
 * @param {string} size
 * @returns {string}
 */
export function getPhotoFilename(slug, size) {
	return `${slug}-${size}.jpg`;
}

/**
 * Strip HTML tags.
 *
 * @param {string} html
 * @returns {string}
 */
export function stripTags(html) {
	let elem = document.createElement('div');
	elem.innerHTML = html;
	return elem.textContent || '';
}
