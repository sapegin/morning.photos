/**
 * Return photo URL.
 *
 * @param {string} name
 * @param {string} size
 * @returns {string}
 */
export function getPhotoUrl(name, size) {
	return `/photos/${size}/${getPhotoFilname(name, size)}`;
}

/**
 * Return photo file name.
 *
 * @param {string} name
 * @param {string} size
 * @returns {string}
 */
export function getPhotoFilname(name, size) {
	return `${name}-${size}.jpg`;
}
