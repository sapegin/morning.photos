import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import flatCache from 'flat-cache';
import { decode } from 'utf8';
import imageSize from 'image-size';
import exifParser from 'exif-parser';
import readIptc from 'node-iptc';
import num2fraction from 'num2fraction';
import getImageColors from 'get-image-colors';

const getImageSize = promisify(imageSize);

const photosFolder = path.resolve(__dirname, '../../photos');

// Read file cache
const cache = flatCache.load('photos.json', path.resolve(__dirname, '../../data'));

// Save file cache on exit
process.on('exit', () => {
	cache.save(true);
});

export const loadPhoto = async name => {
	const cached = cache.getKey(name);
	if (cached) {
		return cached;
	}

	console.log(`Loading photo ${name}...`);

	const photo = await loadPhotoReal(photosFolder, name);
	cache.setKey(name, photo);
	return photo;
};

export const loadPhotoReal = async (folder, name) => {
	const filepath = path.resolve(folder, `${name}.jpg`);

	const buffer = readImage(filepath);

	const { mtimeMs } = fs.statSync(filepath);

	const parser = exifParser.create(buffer);
	const { imageSize, tags } = parser.parse();

	const iptc = readIptc(buffer);

	const colors = await getImageColors(buffer, 'image/jpeg');
	const color = colors[0].hex();

	return parseMetadata({ name, mtimeMs, imageSize, tags, iptc, color });
};

export const loadImage = async filepath => {
	const { width, height } = await getImageSize(filepath);
	return {
		width,
		height,
	};
};

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

function parseMetadata({ name, mtimeMs, imageSize, tags, iptc, color }) {
	return {
		name,
		color,
		slug: slugify(name),
		width: imageSize.width,
		height: imageSize.height,
		modified: Math.floor(mtimeMs),
		timestamp: tags.DateTimeOriginal && tags.DateTimeOriginal * 1000,
		exif: exifString(tags.ExposureTime, tags.FNumber, tags.FocalLength, tags.ISO),
		artist: utf8(tags.Artist),
		title: utf8(iptc.object_name),
		caption: utf8(iptc.caption),
		location: locationString(
			utf8(iptc.country_or_primary_location_name),
			utf8(iptc.city),
			utf8(iptc.sub_location)
		),
		keywords: iptc.keywords ? iptc.keywords.map(utf8) : [],
	};
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
		.replace(/HDR/gi, '')
		.replace(/--+/gi, '-')
		.replace(/(^-|-$)/gi, '');
}

/**
 * Convert binary string to UTF-8.
 *
 * @param {string} string
 * @returns {string}
 */
export function utf8(string) {
	if (typeof string === 'string') {
		try {
			return decode(string);
		} catch (err) {
			return '';
		}
	}
	return string;
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
 * Comma separated location: `Berlin, Germany`.
 *
 * @param {string} [country]
 * @param {string} [city]
 * @param {string} [location]
 * @returns {string}
 */
function locationString(country, city, location) {
	return asList([location, city, country]);
}

/**
 * Short exposure info: 30 sec, f/18, 118mm, ISO 100
 * @param {number} [exposureTime]
 * @param {number} [aperture]
 * @param {number} [focalLength]
 * @param {number} [iso]
 * @returns {string}
 */
function exifString(exposureTime, aperture, focalLength, iso) {
	return asList([
		exposureTime && `${formatExposure(exposureTime)} sec`,
		aperture && `f/${aperture}`,
		focalLength && `${focalLength}mm`,
		iso && `ISO ${iso}`,
	]);
}

/**
 * Convert exposure time to human readable format.
 *
 * @param {number} exposureTime
 * @returns {string}
 */
function formatExposure(exposureTime) {
	if (exposureTime < 1) {
		return num2fraction(exposureTime);
	}
	return String(exposureTime);
}

/**
 * Join non-empty array items with a comma.
 *
 * @param {Array} array
 * @returns {string}
 */
function asList(array) {
	return array.filter(value => !!value).join(', ');
}
