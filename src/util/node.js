import orderBy from 'lodash/orderBy';
import format from 'date-fns/format';
import { loadPhoto } from './gallery';

const DATE_FORMAT = 'MMMM, YYYY';
const PHOTO_PROTOCOL = 'photo://';
const FRONTMATTER_REGEXP = /[+-]{3}[\s\S]*[+-]{3}/;
const IMAGES_REGEXP = /!\[[^\]]*\]\(([^)'"\s]*)\)/g;

export { loadPhoto, loadImage } from './gallery';

export const stripFrontmatter = markdown => markdown.replace(FRONTMATTER_REGEXP, '');

export const splitFrontmatter = markdown => {
	const rest = stripFrontmatter(markdown);
	return {
		frontmatter: markdown.substring(0, markdown.length - rest.length),
		rest,
	};
};

export const getLines = text => text.split('\n').filter(Boolean);

export const getImages = markdown => {
	const images = [];
	IMAGES_REGEXP.lastIndex = 0;
	let match = IMAGES_REGEXP.exec(markdown);
	while (match != null) {
		images.push(match[1]);
		match = IMAGES_REGEXP.exec(markdown);
	}
	return images;
};

export const getFirstImage = markdown => {
	return getImages(markdown)[0];
};

export const isPhotoUrl = url => url && url.startsWith(PHOTO_PROTOCOL);

export const getPhotoNameFromUrl = url => {
	return isPhotoUrl(url) && url.substring(PHOTO_PROTOCOL.length);
};

export const getAlbumFromNames = async (names, { orderby, limit, slug }) => {
	// Load photos
	const photos = await Promise.all(
		names.map(async name => {
			const photo = await loadPhoto(name);
			return {
				...photo,
				slug: `${slug}/${photo.slug}`,
				timestamp: photo.timestamp || 0, // Photos without timestamp should be in the end
				formattedDate: photo.timestamp && format(photo.timestamp, DATE_FORMAT),
			};
		})
	);

	// Sort photos: manual, date-asc, date-desc
	const sortedPhotos =
		orderby === 'manual' ? photos : orderBy(photos, [orderby || 'timestamp'], ['desc']);

	return limit ? sortedPhotos.slice(0, limit) : sortedPhotos;
};

export const typo = markdown => {
	// Skip typography enhancement on older Node versions
	if (parseInt(process.versions.node) < 8) {
		return markdown;
	}

	const richtypo = require('richtypo').default;
	const rules = require('richtypo-rules-en').default;
	const { frontmatter, rest } = splitFrontmatter(markdown);
	return frontmatter + richtypo(rules, rest);
};
