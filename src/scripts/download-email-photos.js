import download from 'download';
import { getImages, getPhotoNameFromUrl } from '../util/node';
import { loadPhoto } from '../util/gallery';
import { getPhotoUrl } from '../util/photos';

const handleError = title => err => {
	// eslint-disable-next-line no-console
	console.error(title);
	// eslint-disable-next-line no-console
	console.error(err);
	process.exit(1);
};

export default async function downloadPhotos(markdown, dir) {
	const images = getImages(markdown);
	const names = images.map(getPhotoNameFromUrl);
	const photos = await Promise.all(names.map(loadPhoto)).catch(handleError('Error loading photos'));
	const urls = photos.map(photo => getPhotoUrl(photo.name, photo.timestamp, 'email'));
	await Promise.all(urls.map(url => download(url, dir))).catch(
		handleError('Error downloading photos')
	);
}
