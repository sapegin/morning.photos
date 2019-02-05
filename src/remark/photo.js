const visit = require('unist-util-visit');
const { loadPhoto } = require('../../src/util/gallery');
const { isPhotoUrl, getPhotoNameFromUrl } = require('../../src/util/node');

/*
Replace photo Markdown image tags with a custom tag:

![Pizza](photo://pizza)
->
<Photo src="photo://pizza" alt="Pizza" />
*/

const hasOnlyPhotos = node =>
	node.children &&
	node.children.every(child => {
		return (
			(child.type === 'image' && isPhotoUrl(child.url)) ||
			(child.type === 'text' && child.value.trim() === '')
		);
	});

const hasOnlyImages = node =>
	node.children &&
	node.children.every(child => {
		return child.type === 'image' || (child.type === 'text' && child.value.trim() === '');
	});

module.exports = function attacher() {
	return async function transformer(tree, file, next) {
		// Collect all image tags
		const allPhotoTags = [];
		visit(tree, 'paragraph', node => {
			if (!hasOnlyPhotos(node)) {
				return;
			}
			allPhotoTags.push(...node.children);
		});

		// Load all photos
		const allPhotos = await Promise.all(
			allPhotoTags.map(({ url }) => loadPhoto(getPhotoNameFromUrl(url)))
		);

		// Replace image tags with a component
		visit(tree, 'paragraph', node => {
			// Replace photos with a custom Photo component
			if (hasOnlyPhotos(node)) {
				const photos = node.children.map(({ url, alt, title }) => {
					alt = alt || '';
					title = title || '';
					const name = getPhotoNameFromUrl(url);
					const { width, height, modified, color } = allPhotos.find(photo => photo.name === name);
					return `<Photo src="${name}" alt="${alt}" title="${title}" width={${width}} height={${height}} modified={${modified}} color="${color}" />`;
				});

				node.value = photos.join('\n');
				node.type = 'html';
				node.children = null;
			}

			// Remove paragraphs around images
			if (hasOnlyImages(node)) {
				const images = node.children.map(({ url, alt, title }) => {
					alt = alt || '';
					title = title || '';
					return `<Photo src="${url}" alt="${alt}" title="${title}" />`;
				});

				node.value = images.join('\n');
				node.type = 'html';
				node.children = null;
			}
		});

		next();
	};
};
