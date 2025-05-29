// Upload all photos to Cloudinary and creates JSON files with metadata for
// Astro collections
// Requires CLOUDINARY_URL environment variable, like:
// CLOUDINARY_URL=cloudinary://XXX:YYY@ZZZ
// You can find it in the Cloudinary console: https://cloudinary.com/console/

// TODO: Update metadata on file change
// TODO: Reupload files on file change

import path from 'node:path';
import fs from 'fs-extra';
import { globSync } from 'glob';
import cloudinary from 'cloudinary';
import ExifReader from 'exifreader';
import getImageColors from 'get-image-colors';
import probe from 'probe-image-size';
import type { Photo } from '../src/types/Photo';

const PHOTO_DIR = 'photos';
const DEST_DIR = 'src/content/photos';

if (!process.env.CLOUDINARY_URL) {
	console.error('CLOUDINARY_URL environmental variable is required');
	process.exit(1);
}

/**
 * Load an image, or crash on error.
 */
function readImage(filepath: string) {
	try {
		return fs.readFileSync(filepath);
	} catch {
		console.error(`Cannot load photo ${filepath}, exiting…`);
		process.exit(1);
	}
}

/**
 * Load a photo JSON file from an Astro collection folder.
 */
function readMetadata(slug: string) {
	const filepath = path.join(DEST_DIR, `${slug}.json`);
	if (fs.existsSync(filepath)) {
		return fs.readJSONSync(filepath, 'utf8');
	} else {
		return undefined;
	}
}

/**
 * Upload an image at a given path to Cloudinary.
 */
export function uploadPhoto(filepath: string) {
	return new Promise((resolve, reject) => {
		const { size } = fs.statSync(filepath);
		if (size > 10_000_000) {
			reject('File is larger than 10 MB');
			return;
		}

		cloudinary.v2.uploader.upload(
			filepath,
			{
				folder: 'photos/',
				use_filename: true,
				unique_filename: false,
				resource_type: 'auto',
			},
			(error, result) => {
				if (error) {
					reject(error);
				}
				resolve(result);
			}
		);
	});
}

/**
 * Convert file name to a slug:
 * IMG_3312 → 3312
 */
function slugify(name: string) {
	return name
		.replace(/\.jpg$/i, '')
		.replaceAll('_', '-')
		.replaceAll(/[^0-9-]/gi, '')
		.replaceAll(/--+/gi, '-')
		.replaceAll(/(^-|-$)/gi, '');
}

/**
 * Join non-empty array items with a comma:
 * ['Foo', null, 'Bar'] → 'Foo, Bar'
 */
function asList(array: (string | undefined | null)[]) {
	return array.filter(Boolean).join(', ');
}

/**
 * Parse EXIF date strings and convert them to integer timestamps:
 * 2025:02:13 18:25:59 → 1739467559000
 */
function parseExifDate(dateString?: string) {
	if (dateString === undefined) {
		return undefined;
	}

	// EXIF dates are stored as strings like `2025:02:13 18:25:59`. To be able
	// to parse them, we need to convert `:`s in the date section to `-`s
	const dateStringCorrected = dateString.replace(
		/^(\d{4}):(\d{2}):(\d{2})/,
		'$1-$2-$3'
	);

	const parsedDate = Date.parse(dateStringCorrected);
	return parsedDate ? new Date(parsedDate) : undefined;
}

/**
 * Format date as a human-readable string:
 * 1601459608000 → 'September 2020'
 */
function formatDate(timestamp: Date) {
	return new Intl.DateTimeFormat('en', {
		year: 'numeric',
		month: 'long',
	}).format(timestamp);
}

/**
 * Return dominant color of an image.
 */
async function getDominantColor(buffer: Buffer) {
	const colors = await getImageColors(buffer, { type: 'image/jpeg', count: 1 });
	return colors[0].hex();
}

/**
 * Create a Photo object to store in Astro collections.
 */
function enhanceMetadata({
	name,
	slug,
	width,
	height,
	mtimeMs,
	color,
	exif,
}: {
	name: string;
	slug: string;
	width: number;
	height: number;
	mtimeMs: number;
	color: string;
	exif: ExifReader.Tags;
}): Photo {
	const date = parseExifDate(exif.DateTimeOriginal?.description);
	return {
		name,
		slug,
		color,
		width,
		height,
		modified: new Date(mtimeMs),
		timestamp: date,
		formattedDate: date ? formatDate(date) : undefined,
		title: exif['Object Name']?.description ?? '',
		caption: exif['Caption/Abstract']?.description ?? '',
		location: asList([
			exif.Sublocation?.description,
			exif.City?.description,
			exif.Country?.description,
		]),
		keywords: Array.isArray(exif.Keywords)
			? exif.Keywords.map((x) => x.description)
			: [],
		rating: exif.Rating?.value ? Number(exif.Rating?.value) : 0,
	};
}

console.log();
console.log('[PHOTOS] Gathering photos...');

fs.ensureDirSync(DEST_DIR);

const photoFiles = globSync(`${PHOTO_DIR}/*.jpg`);

console.log();
console.log('[PHOTOS] Loading photos...');

let count = 0;

for (const filepath of photoFiles) {
	const { name } = path.parse(filepath);
	const slug = slugify(name);

	const metadata = readMetadata(slug);

	if (metadata) {
		// Skip we already have the photo on the site
		continue;
	}

	console.log(`👉 Reading ${name}…`);

	const buffer = readImage(filepath);

	console.log(`🪩 Processing ${name}…`);

	const { mtimeMs } = fs.statSync(filepath);

	const { width, height } = probe.sync(buffer) ?? { width: 0, height: 0 };

	const exif = ExifReader.load(buffer);

	const color = await getDominantColor(buffer);

	const photo = enhanceMetadata({
		name,
		slug,
		mtimeMs,
		width,
		height,
		exif,
		color,
	});

	// console.log('🐴 photo', photo);

	console.log(`🛸 Uploading ${name}…`);

	// Upload to Cloudinary
	await uploadPhoto(filepath);

	console.log(`💾 Saving ${name}…`);

	// And save as an Astro collection item
	fs.writeJSONSync(path.join(DEST_DIR, `${slug}.json`), photo, { spaces: 2 });

	count++;
}

console.log();
console.log(`[PHOTOS] ${count} photos added`);
