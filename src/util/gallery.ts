import fs from 'fs';
import path from 'path';
import exifr from 'exifr';
import getImageColors from 'get-image-colors';
import probe from 'probe-image-size';
import { cacheGet, cacheSet } from './cache';
import { uploadPhoto } from './upload';
import { Photo } from '../types/Photo';

/* eslint-disable no-console  */

// HACK: exifr returns any
interface Exif {
	DateTimeOriginal?: string;
	ObjectName?: string;
	Caption?: string;
	Country?: string;
	City?: string;
	Sublocation?: string;
	Keywords?: string[];
}

const photosFolder = path.resolve(__dirname, '../../photos');

// Keep Promises here to prevent loading the same photo multiple times
const pendingPhotos: Record<string, Promise<Photo>> = {};

const formatDate = (timestamp: number) =>
	new Intl.DateTimeFormat('en', {
		year: 'numeric',
		month: 'long',
	}).format(timestamp);

/**
 * Join non-empty array items with a comma.
 */
function asList(array: (string | undefined | null)[]) {
	return array.filter((value) => !!value).join(', ');
}

/**
 * Convert file name to slug.
 */
export function slugify(name: string) {
	return name
		.replace(/\.jpg$/i, '')
		.replace(/_/g, '-')
		.replace(/Artem-Sapegin/gi, '')
		.replace(/Sapegin-Artem/gi, '')
		.replace(/5D/gi, '')
		.replace(/20D/gi, '')
		.replace(/I?MG/gi, '')
		.replace(/Edit/gi, '')
		.replace(/Pano/gi, '')
		.replace(/HDR/gi, '')
		.replace(/--+/gi, '-')
		.replace(/(^-|-$)/gi, '');
}

/**
 * Convert URL to slug.
 */
export function urlToSlug(url: string) {
	return url
		.replace(/^\/photos\/\w+\//, '')
		.replace(/\.jpg$/i, '')
		.replace(/-[a-z]+$/, '');
}

/**
 * Cleanup photo caption
 */
function captionString(caption = '') {
	if (caption.startsWith('Processed with VSCO')) {
		return '';
	}

	return caption;
}

/**
 * Return dominant color of an image
 */
async function dominantColor(buffer: Buffer) {
	const colors = await getImageColors(buffer, { type: 'image/jpeg', count: 1 });
	return colors[0].hex();
}

// eslint-disable-next-line consistent-return
function readImage(filepath: string) {
	try {
		return fs.readFileSync(filepath);
	} catch (err) {
		// eslint-ignore-next-line no-console
		console.error(`\n\nCannot load photo ${filepath}, exiting...\n\n`);
		process.exit(1);
	}
}

function enhanceMetadata({
	name,
	width,
	height,
	mtimeMs,
	color,
	exif = {},
}: {
	name: string;
	width: number;
	height: number;
	mtimeMs: number;
	color: string;
	exif?: Exif;
}): Photo {
	const timestamp = (exif.DateTimeOriginal && Date.parse(exif.DateTimeOriginal)) || undefined;

	return {
		name,
		color,
		width,
		height,
		slug: slugify(name),
		modified: Math.floor(mtimeMs),
		timestamp: timestamp || 0,
		formattedDate: timestamp ? formatDate(timestamp) : undefined,
		title: exif.ObjectName || '',
		caption: captionString(exif.Caption),
		location: asList([exif.Country, exif.City, exif.Sublocation]),
		keywords: exif.Keywords || [],
	};
}

const loadPhotoReal = async (name: string) => {
	const filepath = path.resolve(photosFolder, `${name}.jpg`);

	try {
		await uploadPhoto(filepath);
	} catch (err) {
		console.log(`Cannot upload ${name} to Cloudinary`, err);
	}

	const buffer = readImage(filepath);

	const { mtimeMs } = fs.statSync(filepath);

	const { width, height } = probe.sync(buffer) || { width: 0, height: 0 };

	const exif: Exif = await exifr.parse(buffer, {
		iptc: true,
		exif: true,
		gps: false,
	});

	const color = await dominantColor(buffer);

	return enhanceMetadata({ name, mtimeMs, width, height, exif, color });
};

export const loadPhoto = async (name: string) => {
	const cached = cacheGet(name);
	if (cached) {
		return cached;
	}

	if (name in pendingPhotos) {
		return pendingPhotos[name];
	}

	console.log(`Loading photo ${name}...`);

	const promise = loadPhotoReal(name);
	pendingPhotos[name] = promise;

	const photo = await promise;
	cacheSet(name, photo);
	return photo;
};
