// Prerequisites:
// brew install homebrew/science/vips --with-mozjpeg

import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';
import glob from 'glob';
import readIptc from 'node-iptc';
import { start } from 'fledermaus';
import { getPhotoFilname } from '../src/util/util';
import { slugify } from '../src/util/gallery';

/* eslint-disable no-console */

export const SIZES_JSON = 'data/sizes.json';
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
		width: 1024,
		height: 1024,
		quality: 90,
		sharp: [1, 0.15, 0.65],
	},
	{
		name: 'small',
		width: 241,
		height: 161,
		quality: 85,
		thumb: true,
		sharp: [1, 0.1, 0.6],
		process: ({ width, height }) => width > height,
	},
	{
		name: 'thumb',
		width: null,
		height: 270,
		quality: 85,
		thumb: true,
		sharp: [1, 0.1, 0.6],
	},
	{
		name: 'insta',
		width: 328,
		height: 382,
		quality: 85,
		thumb: true,
		sharp: [1, 0.1, 0.65],
		process: ({ width, height }) => width === height,
	},
];

start('Generating images...');

sharp.simd(true);

// Create output folders
fs.mkdirsSync(path.dirname(SIZES_JSON));
SIZES.forEach(size => fs.mkdirsSync(path.join(OUTPUT_DIR, size.name)));

// Sizes database
let sizes = fs.existsSync(SIZES_JSON) ? fs.readJsonSync(SIZES_JSON) : {};
process.on('exit', () => {
	fs.outputJsonSync(SIZES_JSON, sizes, { spaces: 2 });
});

// Original photos
const photos = glob.sync(path.join(INPUT_DIR, '/*.jpg'));

photos.forEach(photo => {
	// Skip not modified photos
	if (!isNewerThan(photo, getPublicFilePath(photo, SIZES[0]))) {
		return;
	}

	const photoName = getPhotoName(photo);

	console.log(photoName);

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
				.quality(size.quality)
				.sharpen(...size.sharp)
			;

			if (!size.thumb) {
				image = image
					.progressive()
					.withMetadata()
					.withoutChromaSubsampling()
					.trellisQuantisation()
					.optimiseScans()
				;
			}

			const filepath = getPublicFilePath(photo, size.name);
			image.toFile(filepath, (err, { width, height } = {}) => {
				if (err) {
					console.log(err);
					return;
				}

				if (!sizes[photoName]) {
					sizes[photoName] = {
						title: iptc.object_name,
					};
				}
				sizes[photoName][size.name] = {
					width,
					height,
				};
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
	const photoName = getPhotoName(originalPath);
	const filename = getPhotoFilname(photoName, size);
	return path.join(OUTPUT_DIR, size, filename);
}

/**
 * Return photo name from a path.
 *
 * @param {string} filepath
 * @returns {string}
 */
function getPhotoName(filepath) {
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
