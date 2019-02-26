import path from 'path';
import download from 'download';
import { getImages, getPhotoNameFromUrl } from '../util/node';
import { loadPhoto } from '../util/gallery';
import { getPhotoUrl } from '../util/photos';

const DOWNLOAD_DIR = path.resolve(__dirname, '../../newsletter');

const handleError = title => err => {
	// eslint-disable-next-line no-console
	console.error(title);
	// eslint-disable-next-line no-console
	console.error(err);
	process.exit(1);
};

export default async function downloadPhotos(markdown) {
	const images = getImages(markdown);
	const names = images.map(getPhotoNameFromUrl);
	const photos = await Promise.all(names.map(loadPhoto)).catch(handleError('Error loading photos'));
	const urls = photos.map(photo => getPhotoUrl(photo.name, photo.timestamp, 'email'));
	await Promise.all(urls.map(url => download(url, DOWNLOAD_DIR))).catch(
		handleError('Error downloading photos')
	);
}
