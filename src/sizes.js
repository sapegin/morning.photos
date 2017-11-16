// Prerequisites:
// brew install homebrew/science/vips --with-mozjpeg

import fs from 'fs-extra';
import path from 'path';
import { set } from 'lodash';
import sharp from 'sharp';
import glob from 'glob';
import readIptc from 'node-iptc';
import { start } from 'fledermaus';
import { getPhotoFilename } from '../js/util/util';
import { slugify, utf8 } from '../src/util/gallery';

/* eslint-disable no-console */

const SIZES_JSON = 'data/sizes.json';
const INPUT_DIR = 'photos';
const OUTPUT_DIR = 'public/photos';
const SIZES = [
	{
		name: 'large',
		width: 1600,
		height: 1200,
		quality: 87,
		sharp: [1, 0.1, 0.7],
	},
	{
		name: 'medium',
		width: 1024, // Text page width
		height: 1024,
		quality: 90,
		sharp: [1, 0.12, 0.62],
	},
	{
		name: 'small',
		width: 502, // Half of text page width + 20px gap
		quality: 85,
		thumb: true,
		sharp: [1, 0.1, 0.6],
	},
	{
		name: 'thumb',
		width: null,
		height: 270, // Height of thumbnails row
		quality: 85,
		thumb: true,
		sharp: [1, 0.1, 0.6],
	},
];

start('Generating images...');

sharp.simd(true);

// Create output folders
fs.mkdirsSync(path.dirname(SIZES_JSON));
SIZES.forEach(size => fs.mkdirsSync(path.join(OUTPUT_DIR, size.name)));

// Read original photos list
const photos = glob.sync(path.join(INPUT_DIR, '/*.jpg'));

// Read sizes database
const previousSizes = fs.existsSync(SIZES_JSON) ? fs.readJsonSync(SIZES_JSON) : {};

// Remove deleted photos from sizes database
const sizes = photos.reduce((filteredSizes, photo) => {
	const slug = getSlug(photo);
	if (previousSizes[slug]) {
		filteredSizes[slug] = previousSizes[slug];
	}
	return filteredSizes;
}, {});

// Save sizes database before exit
process.on('exit', () => {
	fs.outputJsonSync(SIZES_JSON, sizes, { spaces: 2 });
});

// Resize ’em all!
photos.forEach(photo => {
	// Skip not modified photos
	if (!isNewerThan(photo, getPublicFilePath(photo, SIZES[0].name))) {
		return;
	}

	const slug = getSlug(photo);

	console.log(slug);

	const buffer = fs.readFileSync(photo);
	const iptc = readIptc(buffer);

	const baseImage = sharp(buffer);
	baseImage.metadata().then(metadata => {
		SIZES.forEach(size => {
			if (size.process) {
				if (!size.process(metadata)) {
					return;
				}
			}

			let image = baseImage
				.clone()
				.resize(size.width, size.height)
				.max()
				.jpeg(jpegOptions)
				.sharpen(...size.sharp);

			let jpegOptions = {
				quality: size.quality,
			};

			if (!size.thumb) {
				image = image.withMetadata();

				jpegOptions = {
					...jpegOptions,
					progressive: true,
					withoutChromaSubsampling: true,
					trellisQuantisation: true,
					optimiseScans: true,
				};
			}

			const filepath = getPublicFilePath(photo, size.name);
			image.toFile(filepath, (err, { width, height } = {}) => {
				if (err) {
					console.log(err);
					return;
				}

				set(sizes, [slug, 'title'], utf8(iptc.object_name) || '');
				set(sizes, [slug, size.name], {
					width,
					height,
				});
			});
		});
	});
});

/**
 * Return public file path for a given size.
 *
 * @param {string} originalPath
 * @param {size} size
 * @returns {string}
 */
function getPublicFilePath(originalPath, size) {
	const slug = getSlug(originalPath);
	const filename = getPhotoFilename(slug, size);
	return path.join(OUTPUT_DIR, size, filename);
}

/**
 * Return photo slug from a path.
 *
 * @param {string} filepath
 * @returns {string}
 */
function getSlug(filepath) {
	return slugify(path.basename(filepath, '.jpg'));
}

/**
 * Return true if the first file is newer than the second.
 *
 * @param {string} a First file.
 * @param {string} b Second file.
 * @returns {boolean}
 */
function isNewerThan(a, b) {
	return getFileModTime(a) > getFileModTime(b);
}

/**
 * Return file modification time or false file doesn’t exist.
 *
 * @param {string} filepath
 * @returns {Date|boolean}
 */
function getFileModTime(filepath) {
	if (!fs.existsSync(filepath)) {
		return false;
	}
	return fs.statSync(filepath).mtime;
}
