import fs from 'fs';
import path from 'path';
import onDeath from 'death';
import { Photo } from '../types/Photo';

const CACHE_FILE = path.resolve(__dirname, '../../data/photos.json');

// Read cache file
const cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')) as Record<string, Photo>;

let hasChanged = false;

export const cacheGet = (key: string) => cache[key];

export const cacheSet = (key: string, value: Photo) => {
	cache[key] = value;
	hasChanged = true;
};

// Save file cache on exit
onDeath((signal) => {
	if (hasChanged) {
		fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, '  '));
	}
	if (signal === 'SIGINT') {
		process.exit();
	}
});
