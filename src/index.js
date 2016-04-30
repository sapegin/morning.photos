import find from 'lodash/find';
import orderBy from 'lodash/orderBy';
import values from 'lodash/values';
import pick from 'lodash/fp/pick';
import {
	start,
	loadConfig,
	loadSourceFiles,
	filterDocuments,
	groupDocuments,
	orderDocuments,
	paginate,
	generatePages,
	savePages,
	createMarkdownRenderer,
	createTemplateRenderer,
	helpers as defaultHelpers,
} from 'fledermaus';
import { getDateTimeFormat, printError } from 'fledermaus/lib/util';
import * as customHelpers from './util/helpers';
import * as customTags from './util/tags';
import * as remarkPlugins from './util/remark';
import { loadPhoto, slugify } from './util/gallery';
import { typo, typoTitle } from './util/typo';

start('Building the site...');

const config = loadConfig('config');
const options = config.base;

let renderMarkdown = createMarkdownRenderer({
	customTags,
	plugins: values(remarkPlugins),
});
const renderTemplate = createTemplateRenderer({
	root: options.templatesFolder,
});

const helpers = { ...defaultHelpers, ...customHelpers };

let documents = loadSourceFiles(options.sourceFolder, options.sourceTypes, {
	renderers: {
		md: renderMarkdown,
	},
	// Custom front matter field parsers
	fieldParsers: {
		// Save `date` field as a timestamp
		timestamp: (timestamp, attrs) => Date.parse(attrs.date),
		// Convert `date` field to a Date object
		date: date => new Date(Date.parse(date)),
		// Strip language (`en` or `ru`) from the URL (filename)
		url: url => url.replace(/(en|ru)(\/|$)/, ''),
	},
	// Cut separator
	cutTag: options.cutTag,
});

// Oder by date, newest first
documents = orderDocuments(documents, ['-timestamp']);

/**
 * Albums and photos
 */

const albums = filterDocuments(documents, { layout: /^(Album|Report)$/ });
albums.forEach(album => {
	// Date formatter: March 2016
	const dateFormat = getDateTimeFormat(album.lang, { year: 'numeric', month: 'long' });

	// Convert cover to a slug
	if (album.cover) {
		album.cover = slugify(album.cover);
	}

	if (album.layout !== 'Album') {
		return;
	}

	// Parse photos list
	const photosList = album.content.split('\n');

	// Load photos
	let photos = photosList.map(name => {
		let photo = loadPhoto(options.photosFolder, name);
		if (!photo.timestamp) {
			printError(`Timestamp not available for photo: ${name}`);
		}
		return {
			...photo,
			date: photo.timestamp && dateFormat.format(new Date(photo.timestamp)),
		};
	});

	// Sort photos: manual, date-asc, date-desc
	if (album.order !== 'manual') {
		photos = orderBy(photos, ['timestamp'], [album.order === 'date-asc' ? 'asc' : 'desc']);
	}

	// Album JSON
	const json = album.photos = photos
		.map(
			pick(['slug', 'date', 'title', 'caption', 'location', 'exif'])
		)
		.map(photo => (
			{
				...photo,
				title: typoTitle(photo.title, photo.lang),
				caption: typo(photo.caption, photo.lang),
			}
		))
	;

	// Create document for each photo
	photos.forEach(photo => {
		documents.push({
			...photo,
			sourcePath: album.sourcePath.replace(/(\.\w+)$/, `/${photo.slug}$1`),
			url: `${album.url}/${photo.slug}`,
			lang: album.lang,
			layout: 'Photo',
			albumTitle: album.title,
			albumUrl: album.url,
			photos: json,
		});
		return photos;
	});
});

/**
 * Portfolio and travel
 */

let portfolioDoc = find(documents, { url: '/albums', lang: 'en' });
portfolioDoc.albums = filterDocuments(albums, { url: /^\/albums\//, unlisted: undefined });
let travelDoc = find(documents, { url: '/travel', lang: 'en' });
travelDoc.albums = filterDocuments(albums, { url: /^\/travel\//, unlisted: undefined });

/**
 * Blog
 */

// Group posts by language
let posts = filterDocuments(documents, { url: /^\/blog\// });
const postsByLanguage = groupDocuments(posts, 'lang');
const languages = Object.keys(postsByLanguage);

documents.push(...languages.reduce((result, lang) => {
	const docs = postsByLanguage[lang];
	let newDocs = [];

	// Pagination
	newDocs.push(...paginate(docs, {
		sourcePathPrefix: `${lang}/blog`,
		urlPrefix: '/blog',
		documentsPerPage: options.postsPerPage,
		layout: 'Posts',
		extra: {
			pageTitle: config[lang].titleBlog,
			lang,
		},
	}));

	// Tags
	const postsByTag = groupDocuments(docs, 'tags');
	const tags = Object.keys(postsByTag);
	newDocs.push(...tags.reduce((tagsResult, tag) => {
		let tagDocs = postsByTag[tag];
		let tagsNewDocs = paginate(tagDocs, {
			sourcePathPrefix: `${lang}/blog/tags/${tag}`,
			urlPrefix: `/blog/tags/${tag}`,
			documentsPerPage: options.postsPerPage,
			layout: 'Tag',
			extra: {
				total: tagDocs.length,
				lang,
				tag,
			},
		});
		return [...tagsResult, ...tagsNewDocs];
	}, []));

	// Tags list for the blog home page
	let blogHomepageDoc = find(newDocs, { url: '/blog' });
	let tagsWithCount = tags.map(tag => ({
		id: tag,
		utl: `/blog/tags/${tag}`,
		count: postsByTag[tag].length,
	}));
	blogHomepageDoc.tags = orderBy(tagsWithCount, ['count'], ['desc']);

	// RSS feed
	let feedDoc = find(documents, { url: '/feed', lang });
	feedDoc.items = docs.slice(0, options.postsInFeed).map(({ title, content, url, date }) => ({
		url,
		date,
		title,
		description: content,
	}));

	// RSS feed: photos
	// TODO

	// Add list of important posts to the main and Learn pages
	let importantPosts = filterDocuments(documents, { important: true, lang });
	let indexDoc = find(documents, { url: '/', lang });
	indexDoc.importantPosts = importantPosts;
	let learnDoc = find(documents, { url: '/learn', lang });
	if (learnDoc) {
		learnDoc.importantPosts = importantPosts;
	}

	return [...result, ...docs, ...newDocs];
}, []));

/**
 * Generate pages
 */

const pages = generatePages(documents, config, helpers, { jsx: renderTemplate });

savePages(pages, options.publicFolder);
