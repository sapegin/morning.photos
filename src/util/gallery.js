import fs from 'fs';
import path from 'path';
import exifParser from 'exif-parser';
import readIptc from 'node-iptc';

// TODO: cache results to JSON file

export function loadPhoto(folder, name) {
	const filepath = path.resolve(folder, `${name}.jpg`);
	const buffer = fs.readFileSync(filepath);

	const parser = exifParser.create(buffer);
	const exif = parser.parse();

	const iptc = readIptc(buffer);

	return parseMetadata(name, exif, iptc);
}

function parseMetadata(name, { imageSize, tags }, iptc) {
	return {
		name,
		slug: slugify(name),
		width: imageSize.width,
		height: imageSize.height,
		timestamp: tags.DateTimeOriginal * 1000,
		exif: exifString(tags.ExposureTime, tags.FNumber, tags.FocalLength, tags.ISO),
		artist: tags.Artist,
		latitude: tags.GPSLatitude,
		longitude: tags.GPSLongitude,
		altitude: tags.GPSAltitude,
		title: iptc.object_name,
		caption: iptc.caption,
		location: locationString(iptc.country_or_primary_location_name, iptc.city, iptc.sub_location),
		keywords: iptc.keywords,
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
		.replace(/-Artem-Sapegin/i, '')
		.replace(/Artem-Sapegin-/i, '')
		.replace(/-5D/i, '')
		.replace(/-20D/i, '')
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
		exposureTime && `${exposureTime} sec`,
		aperture && `f/${aperture}`,
		focalLength && `${focalLength}mm`,
		iso && `ISO ${iso}`,
	]);
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
