// eslint-disable-next-line no-global-assign
require = require('esm')(module);

const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const {
	getAlbumFromNames,
	getLines,
	getFirstImage,
	getPhotoNameFromUrl,
	loadPhoto,
} = require('./src/util/node');

const template = layout => path.resolve(`src/layouts/${layout || 'Page'}.js`);

exports.onCreateWebpackConfig = ({ actions }) => {
	// Turn off source maps
	actions.setWebpackConfig({ devtool: false });
};

exports.onCreateNode = async ({ node, getNode, actions: { createNodeField } }) => {
	if (node.internal.type === 'MarkdownRemark') {
		// Add slug without trailing slash
		const slug = createFilePath({ node, getNode }).slice(0, -1);
		createNodeField({
			node,
			name: 'slug',
			value: slug || '/',
		});

		// Add main photo
		const firstImageSrc = getFirstImage(node.rawMarkdownBody);
		const name = getPhotoNameFromUrl(firstImageSrc);
		if (name) {
			const { width, height } = await loadPhoto(name);
			createNodeField({
				node,
				name: 'cover',
				value: name,
			});
			createNodeField({
				node,
				name: 'coverSize',
				value: { width, height },
			});
		}
	}
};

exports.createPages = ({ graphql, actions: { createPage } }) => {
	return new Promise((resolve, reject) => {
		graphql(`
			{
				allMarkdownRemark(
					# Make sure that the New album will be the last and we'll
					# have all the photos available
					sort: { fields: [frontmatter___position], order: DESC }
				) {
					edges {
						node {
							rawMarkdownBody
							frontmatter {
								layout
								title
								orderby
								limit
							}
							fields {
								slug
							}
						}
					}
				}
			}
		`).then(result => {
			if (result.errors) {
				reject(result.errors);
			}

			const allPhotoNames = [];

			result.data.allMarkdownRemark.edges.forEach(
				async ({
					node: {
						rawMarkdownBody,
						frontmatter: { layout, title, order },
						fields: { slug },
					},
				}) => {
					const extraContext = {};

					// Add photos data to album pages
					if (slug.startsWith('/albums/')) {
						const names = getLines(rawMarkdownBody);
						allPhotoNames.push(...names);

						const photos = await getAlbumFromNames(names.length > 0 ? names : allPhotoNames, {
							slug,
							order,
						});

						// Create pages for all photos in an album
						photos.forEach((photo, index) => {
							createPage({
								path: photo.slug,
								component: template('Photo'),
								context: {
									...photo,
									prev: (photos[index - 1] || {}).slug,
									next: (photos[index + 1] || {}).slug,
									album: title,
								},
							});
						});

						extraContext.photos = photos;
					}

					// Create a page for a Markdown document
					createPage({
						path: slug,
						component: template(layout),
						context: {
							...extraContext,
							title,
							slug,
						},
					});
				}
			);

			resolve();
		});
	});
};
