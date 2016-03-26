/**
 * Return photo URL.
 *
 * @param {string} slug
 * @param {string} size
 * @returns {string}
 */
export function getPhotoUrl(slug, size) {
	return `/photos/${size}/${getPhotoFilname(slug, size)}`;
}

/**
 * Return photo file name.
 *
 * @param {string} slug
 * @param {string} size
 * @returns {string}
 */
export function getPhotoFilname(slug, size) {
	return `${slug}-${size}.jpg`;
}
