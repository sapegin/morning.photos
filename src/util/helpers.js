import { castArray, uniq, sample } from 'lodash';
import {
	og,
	meta,
	getFirstParagraph,
	getFirstImage,
	cleanHtml,
} from 'fledermaus/lib/util';
import { getPhotoUrl } from '../../js/util/util';
import { slugify } from './gallery';

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
 * Return site name (different for blog pages).
 *
 * @returns {string}
 */
export function getSiteName() {
	return this.url.startsWith('/blog') ? this.option('titleBlog') : this.option('title');
}

/**
 * Title to use in a <title> tag.
 *
 * @param {string} $1.title Custom title.
 * @param {boolean} $1.suffix Do not append suffix if `false`.
 * @return {string}
 */
export function getPageTitle({ title, suffix } = {}) {
	if (this.pageTitle) {
		return this.pageTitle;
	}
	if (title || this.title) {
		if (suffix === undefined) {
			suffix = ' — ' + this.getSiteName();
		}
		return cleanHtml(title || this.title) + (suffix || '');
	}

	return this.option('title');
}

/**
 * OG, Twitter Card and other meta tags
 * @returns {Array}
 */
export function getMetaTags() {
	let tags = [];

	if (this.noIndex) {
		tags.push(meta('robots', 'noindex follow'));
	}

	let title = this.getPageTitle({ suffix: false }) || this.title || this.option('title');
	let description = this.description || this.caption;
	let content = this.content;
	let image = this.image || this.cover || this.slug;

	let twType = 'summary';
	let ogType = 'article';

	if (this.url === '/') {
		ogType = 'website';
		title = this.option('title');
	}

	if (this.url === '/' || this.url === '/blog') {
		image = sample(this.option('featured'));
	}

	if (image && !image.startsWith('http') && !image.startsWith('/')) {
		image = this.getPhotoUrl(slugify(image), 'medium');
	}

	if (content && !image) {
		let firstImage = getFirstImage(content);
		if (firstImage) {
			image = firstImage;
		}
	}

	if (image) {
		twType = 'summary_large_image';
		image = this.absolutizeUrl(image);
		tags.push(og('og:image', image));
		tags.push(meta('twitter:image', image));
	}

	if (!description) {
		if (content) {
			let firstParagraph = getFirstParagraph(content);
			if (firstParagraph) {
				description = firstParagraph;
			}
		}
		if (!description) {
			description = this.option('titleLong');
		}
	}

	tags.push(
		meta('description', description),
		og('og:type', ogType),
		og('og:title', title),
		og('og:url', this.absolutizeUrl(this.url)),
		og('og:site_name', this.getSiteName()),
		og('og:description', description),
		og('fb:app_id', this.option('fbapp')),
		meta('twitter:card', twType),
		meta('twitter:site', '@' + this.option('twitter'))
	);

	return tags;
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
 * @param {array} types
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

/**
 * Append partner ID to given URL.
 *
 * @param {string} url
 * @returns {string}
 */
export function getBuyLink(url) {
	const partners = this.option('partners');
	for (let partner in partners) {
		if (url.includes(partner)) {
			return url + partners[partner];
		}
	}
	return url;
}
