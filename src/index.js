import orderBy from 'lodash/orderBy';
import pick from 'lodash/fp/pick';
import {
	start,
	loadConfig,
	loadSourceFiles,
	filterDocuments,
	generatePages,
	savePages,
	createMarkdownRenderer,
	createTemplateRenderer,
	helpers as defaultHelpers,
} from 'fledermaus';
import { getDateTimeFormat } from 'fledermaus/lib/util';
import * as customHelpers from './util/helpers';
import { loadPhoto } from './util/gallery';

start('Building the site...');

const config = loadConfig('config');
const options = config.base;

const renderMarkdown = createMarkdownRenderer();
const renderTemplate = createTemplateRenderer({
	root: options.templatesFolder,
});

const helpers = { ...defaultHelpers, ...customHelpers };

let documents = loadSourceFiles(options.sourceFolder, options.sourceTypes, {
	renderers: {
		md: renderMarkdown,
	},
});

const albums = filterDocuments(documents, { layout: 'album' });
albums.forEach(album => {
	// Date formatter: March 2016
	const dateFormat = getDateTimeFormat(album.lang, { year: 'numeric', month: 'long' });

	// Parse photos list
	const photosList = album.content.split('\n');

	// Load photos
	let photos = photosList.map(name => {
		let photo = loadPhoto(options.photosFolder, name);
		return {
			...photo,
			date: dateFormat.format(new Date(photo.timestamp)),
		};
	});

	// Sort photos: manual, date-asc, date-desc
	if (album.order !== 'manual') {
		photos = orderBy(photos, ['timestamp'], [album.order === 'date-asc' ? 'asc' : 'desc']);
	}

	// Album JSON
	const json = album.photos = photos.map(
		pick(['slug', 'date', 'title', 'caption', 'location', 'exif', 'keywords'])
	);

	// Create document for each photo
	photos.forEach(photo => {
		documents.push({
			...photo,
			sourcePath: album.sourcePath.replace(/(\.\w+)$/, `/${photo.slug}$1`),
			url: `${album.url}/${photo.slug}`,
			lang: album.lang,
			layout: 'photo',
			albumTitle: album.title,
			albumUrl: album.url,
			photos: json,
		});
		return photos;
	});
});

let pages = generatePages(documents, config, helpers, { ect: renderTemplate });

savePages(pages, options.publicFolder);
