import orderBy from 'lodash/orderBy';
import format from 'date-fns/format';
import { loadPhoto } from './gallery';

const DATE_FORMAT = 'MMMM, YYYY';
const PHOTO_PROTOCOL = 'photo://';

export { loadPhoto, loadImage } from './gallery';

export const stripFrontmatter = markdown => markdown.replace(/[+-]{3}[\s\S]*[+-]{3}/, '');

export const getLines = text => text.split('\n').filter(Boolean);

export const getFirstImage = markdown => {
	const match = markdown.match(/!\[[^\]]*\]\(([^)'"\s]*)\)/);
	return match && match[1];
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
