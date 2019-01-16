const visit = require('unist-util-visit');
const { loadPhoto } = require('../../src/util/gallery');
const { isPhotoUrl, getPhotoNameFromUrl } = require('../../src/util/node');

/*
Replace photo Markdown image tags with a custom tag:

![Pizza](photo://pizza)
->
<Photo name="pizza" alt="Pizza" />
*/

const hasOnlyImagesNodes = node =>
	node.children.every(child => {
		return child.type === 'image' || (child.type === 'text' && child.value.trim() === '');
	});

module.exports = function attacher() {
	return async function transformer(tree, file, next) {
		// Collect all image tags
		const allPhotoTags = [];
		visit(tree, 'paragraph', node => {
			if (!hasOnlyImagesNodes(node)) {
				return;
			}
			allPhotoTags.push(...node.children.filter(({ url }) => isPhotoUrl(url)));
		});

		// Load all photos
		const allPhotos = await Promise.all(
			allPhotoTags.map(({ url }) => loadPhoto(getPhotoNameFromUrl(url)))
		);

		// Replace image tags with a component
		visit(tree, 'paragraph', node => {
			if (!hasOnlyImagesNodes(node)) {
				return;
			}

			const photos = node.children
				.filter(({ url }) => isPhotoUrl(url))
				.map(({ url, alt, title }) => {
					alt = alt || '';
					title = title || '';

					const name = getPhotoNameFromUrl(url);
					const { width, height, color } = allPhotos.find(photo => photo.name === name);

					return `<Photo name="${name}" alt="${alt}" title="${title}" width={${width}} height={${height}} color="${color}" />`;
				});

			node.value = photos.join('\n');
			node.type = 'html';
			node.children = null;
		});

		next();
	};
};
