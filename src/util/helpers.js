import fs from 'fs-extra';
import tag from 'html-tag';
import { getPhotoUrl } from './util';

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
		const error = `<b>Sizes not found for photo: ${slug}</b>`;
		console.error(error);
		return error;
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
