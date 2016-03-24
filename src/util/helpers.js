import fs from 'fs-extra';
import util from './util';
import { SIZES_JSON } from '../sizes';

// Sizes database
// console.log('ccc', SIZES_JSON);
let sizes = {};
if (SIZES_JSON) {
	sizes = fs.readJsonSync(SIZES_JSON);
}

// Photo URL
export function photo(name, size) {
	const filename = util.getPhotoFilname(name, size);
	const url = util.getPhotoUrl(name, size);
	const { width, height } = sizes[filename];
	return `<img src="${url}" width="${width}" height="${height}" alt="">`;
}

