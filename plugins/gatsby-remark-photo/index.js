const visit = require('unist-util-visit');
const { loadPhoto } = require('../../src/util/gallery');
const { isPhotoUrl, getPhotoNameFromUrl } = require('../../src/util/node');

/*
Replace photo Markdown image tags with a custom tag:

![Pizza](photo://pizza)
->
<x-photo name="pizza" alt="Pizza"></x-photo>
*/

const hasOnlyImagesNodes = node =>
	node.children.every(child => {
		return child.type === 'image' || (child.type === 'text' && child.value.trim() === '');
	});

module.exports = ({ markdownAST }) => {
	visit(markdownAST, 'paragraph', async node => {
		if (!hasOnlyImagesNodes(node)) {
			return;
		}

		const photos = await Promise.all(
			node.children
				.filter(({ url }) => isPhotoUrl(url))
				.map(async ({ url, title }) => {
					title = title || '';
					const name = getPhotoNameFromUrl(url);
					const { width, height, color } = await loadPhoto(name);
					return `<x-photo name="${name}" caption="${title}" width="${width}" height="${height}" color="${color}"></x-photo>`;
				})
		);

		node.value = photos.join('\n');
		node.type = 'html';
		node.children = null;
	});
};
