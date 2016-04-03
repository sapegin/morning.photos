import { castArray, uniq } from 'lodash';
import { getPhotoUrl } from '../../js/util/util';

/* eslint-disable no-invalid-this, no-console */

export { getPhotoUrl };

/**
 * HTML for SVG icon.
 *
 * @param {string} name
 * @returns {string}
 */
export function Icon({ name }) {
	return this.safe(this.embedFile(`icons/${name}.svg`).replace('<svg', `<svg class="icon icon_${name}"`));
}

/**
 * Sets page type (used when generation <body> classes).
 * @param {string} types...
 */
export function setPageType(...types) {
	this.pageType = uniq(castArray(this.pageType).concat(types));
}

/**
 * Return <body> classes.
 *
 * @returns {string}
 */
export function getBodyClasses(types) {
	let allTypes = [...castArray(this.pageType), ...castArray(types)];
	allTypes = allTypes
		.filter(type => !!type)
		.map(type => `page_${type}`)
	;
	return ['page'].concat(allTypes).join(' ');
}