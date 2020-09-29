import fs from 'fs';
import path from 'path';
import exifr from 'exifr';
import getImageColors from 'get-image-colors';
import probe from 'probe-image-size';
import { cacheGet, cacheSet } from './cache';
import { uploadPhoto } from './upload';

/* eslint-disable no-console  */

const photosFolder = path.resolve(__dirname, '../../photos');

// Keep Promises here to prevent loading the same photo multiple times
const pendingPhotos = {};

/**
 * Join non-empty array items with a comma.
 *
 * @param {Array} array
 * @returns {string}
 */
function asList(array) {
	return array.filter(value => !!value).join(', ');
}

/**
 * Convert file name to slug.
 *
 * @param {string} name
 * @returns {string}
 */
export function slugify(name) {
	return name
		.replace(/\.jpg$/i, '')
		.replace(/_/g, '-')
		.replace(/Artem-Sapegin/gi, '')
		.replace(/Sapegin-Artem/gi, '')
		.replace(/5D/gi, '')
		.replace(/20D/gi, '')
		.replace(/MG/gi, '')
		.replace(/Edit/gi, '')
		.replace(/Pano/gi, '')
		.replace(/HDR/gi, '')
		.replace(/--+/gi, '-')
		.replace(/(^-|-$)/gi, '');
}

/**
 * Convert URL to slug.
 *
 * @param {string} url
 * @returns {string}
 */
export function urlToSlug(url) {
	return url
		.replace(/^\/photos\/\w+\//, '')
		.replace(/\.jpg$/i, '')
		.replace(/-[a-z]+$/, '');
}

/**
 * Cleanup photo caption
 *
 * @param {string} caption
 * @returns {string}
 */
function captionString(caption = '') {
	if (caption.startsWith('Processed with VSCO')) {
		return '';
	}

	return caption;
}

/**
 * Return dominant color of an image
 *
 * @param {Buffer} buffer
 * @returns {string}
 */
async function dominantColor(buffer) {
	const colors = await getImageColors(buffer, { type: 'image/jpeg', count: 1 });
	return colors[0].hex();
}

function readImage(filepath) {
	try {
		return fs.readFileSync(filepath);
	} catch (err) {
		// eslint-ignore-next-line no-console
		console.error(`\n\nCannot load photo ${filepath}, exiting...\n\n`);
		process.exit(1);
	}
	return undefined;
}

function enhanceMetadata({ name, width, height, mtimeMs, color, exif = {} }) {
	return {
		name,
		color,
		width,
		height,
		slug: slugify(name),
		modified: Math.floor(mtimeMs),
		timestamp: exif.DateTimeOriginal && Date.parse(exif.DateTimeOriginal),
		title: exif.ObjectName || '',
		caption: captionString(exif.Caption),
		location: asList([exif.Country, exif.City, exif.Sublocation]),
		keywords: exif.Keywords || [],
	};
}

const loadPhotoReal = async name => {
	const filepath = path.resolve(photosFolder, `${name}.jpg`);

	try {
		await uploadPhoto(filepath);
	} catch (err) {
		console.log(`Cannot upload ${name} to Cloudinary`, err);
	}

	const buffer = await readImage(filepath);

	const { mtimeMs } = fs.statSync(filepath);

	const { width, height } = probe.sync(buffer);

	const exif = await exifr.parse(buffer, {
		iptc: true,
		exif: true,
		gps: false,
	});

	const color = dominantColor(buffer);

	return enhanceMetadata({ name, mtimeMs, width, height, exif, color });
};

export const loadPhoto = async name => {
	const cached = cacheGet(name);
	if (cached) {
		return cached;
	}

	if (pendingPhotos[name]) {
		return pendingPhotos[name];
	}

	console.log(`Loading photo ${name}...`);

	const promise = loadPhotoReal(name);
	pendingPhotos[name] = promise;

	const photo = await promise;
	cacheSet(name, photo);
	return photo;
};
