import fs from 'fs';
import path from 'path';
import { memoize } from 'lodash';
import { decode } from 'utf8';
import exifParser from 'exif-parser';
import readIptc from 'node-iptc';
import num2fraction from 'num2fraction';
import { printError } from 'fledermaus/lib/util';

export const loadPhoto = memoize((folder, name) => {
	const filepath = path.resolve(folder, `${name}.jpg`);

	let buffer;
	try {
		buffer = fs.readFileSync(filepath);
	}
	catch (exception) {
		printError(`Cannot load photo ${name}.jpg, exiting...`);
		process.exit(1);
	}

	const parser = exifParser.create(buffer);
	const exif = parser.parse();

	const iptc = readIptc(buffer);

	return parseMetadata(name, exif, iptc);
}, (folder, name) => `${folder}/${name}`);

function parseMetadata(name, { imageSize, tags }, iptc) {
	return {
		name,
		slug: slugify(name),
		width: imageSize.width,
		height: imageSize.height,
		timestamp: tags.DateTimeOriginal && tags.DateTimeOriginal * 1000,
		exif: exifString(tags.ExposureTime, tags.FNumber, tags.FocalLength, tags.ISO),
		artist: utf8(tags.Artist),
		latitude: tags.GPSLatitude,
		longitude: tags.GPSLongitude,
		altitude: tags.GPSAltitude,
		title: utf8(iptc.object_name),
		caption: utf8(iptc.caption),
		location: locationString(
			utf8(iptc.country_or_primary_location_name),
			utf8(iptc.city),
			utf8(iptc.sub_location)
		),
		keywords: iptc.keywords ? iptc.keywords.map(decode) : [],
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
		.replace(/Artem-Sapegin/ig, '')
		.replace(/Sapegin-Artem/ig, '')
		.replace(/Olga-Flegontova/ig, '')
		.replace(/5D/ig, '')
		.replace(/20D/ig, '')
		.replace(/MG/ig, '')
		.replace(/Edit/ig, '')
		.replace(/HDR/ig, '')
		.replace(/--+/ig, '-')
		.replace(/(^-|-$)/ig, '')
	;
}

/**
 * Convert binary string to UTF-8.
 *
 * @param {string} string
 * @returns {string}
 */
export function utf8(string) {
	if (typeof string === 'string') {
		return decode(string);
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
		.replace(/-[a-z]+$/, '')
	;
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
	return asList([
		location,
		city,
		country,
	]);
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
