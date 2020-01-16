import orderBy from 'lodash/orderBy';
import richtypo from 'richtypo';
import rules from 'richtypo-rules-en';
import { loadPhoto } from './gallery';

const PHOTO_PROTOCOL = 'photo://';
const IMAGES_REGEXP = /!\[[^\]]*\]\(([^)'"\s]*)\)/g;

export { loadPhoto, loadImage } from './gallery';

const formatDate = timestamp =>
	new Intl.DateTimeFormat('en', {
		year: 'numeric',
		month: 'long',
	}).format(timestamp);

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

export const isPhotoUrl = url => url && url.startsWith(PHOTO_PROTOCOL);

export const getPhotoNameFromUrl = url => {
	return isPhotoUrl(url) && url.substring(PHOTO_PROTOCOL.length);
};

export const getAlbumFromNames = async (names, { orderby, limit, slug, filter }) => {
	// Load photos
	const photos = await Promise.all(
		names.map(async name => {
			const photo = await loadPhoto(name);
			return {
				...photo,
				slug: `${slug}/${photo.slug}`,
				timestamp: photo.timestamp || 0, // Photos without timestamp should be in the end
				formattedDate: photo.timestamp && formatDate(photo.timestamp),
			};
		})
	);

	const filteredPhotos = filter ? filter(photos) : photos;

	// Sort photos: manual, date-asc, date-desc
	const sortedPhotos =
		orderby === 'manual'
			? filteredPhotos
			: orderBy(filteredPhotos, [orderby || 'timestamp'], ['desc']);

	return limit ? sortedPhotos.slice(0, limit) : sortedPhotos;
};

export const typo = markdown => {
	return richtypo(rules, markdown);
};
