import fs from 'fs-extra';
import tag from 'html-tag';
import { getPhotoUrl } from '../../js/util/util';

/* eslint-disable no-invalid-this, no-console */

const SIZES_JSON = 'data/sizes.json';

// Sizes database
const sizes = fs.readJsonSync(SIZES_JSON);

export { getPhotoUrl };

/**
 * <img> tag for photo.
 *
 * @param {string} slug
 * @param {string} size
 * @param {string} alt
 * @param {string} className
 * @returns {string}
 */
export function photo({ slug, size, alt, className }) {
	const src = getPhotoUrl(slug, size);
	const photoSizes = sizes[slug];
	if (!photoSizes) {
		const error = `Sizes not found for photo: ${slug}`;
		console.error(error);
		return `<b>${error}</b>`;
	}
	const { width, height } = photoSizes[size];
	return tag('img', {
		src,
		width,
		height,
		alt,
		class: className,
	});
}

/**
 * HTML for SVG icon.
 *
 * @param {string} name
 * @returns {string}
 */
export function icon(name) {
	return this.embedFile(`icons/${name}.svg`).replace('<svg', `<svg class="icon icon_${name}"`);
}
