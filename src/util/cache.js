import fs from 'fs';
import path from 'path';
import onDeath from 'death';

const CACHE_FILE = path.resolve(__dirname, '../../data/photos.json');

// Read cache file
const cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));

let hasChanged = false;

export const cacheGet = key => cache[key];

export const cacheSet = (key, value) => {
	cache[key] = value;
	hasChanged = true;
};

// Save file cache on exit
onDeath(() => {
	if (hasChanged) {
		fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, '  '));
	}
});
