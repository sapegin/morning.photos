// eslint-disable-next-line no-global-assign
require = require('esm')(module);

const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const {
	stripFrontmatter,
	getAlbumFromNames,
	getLines,
	getFirstImage,
	getPhotoNameFromUrl,
	loadImage,
	loadPhoto,
} = require('./src/util/node');

const template = layout => path.resolve(`src/layouts/${layout || 'Page'}.js`);

const get = (l, i) => l[i] || {};

exports.onCreateWebpackConfig = ({ actions }) => {
	// Turn off source maps
	actions.setWebpackConfig({ devtool: false });
};

exports.onCreateNode = async ({ node, getNode, actions: { createNodeField } }) => {
	if (node.internal.type === 'Mdx') {
		// Add slug without trailing slash
		const slug = createFilePath({ node, getNode }).slice(0, -1);
		createNodeField({
			node,
			name: 'slug',
			value: slug || '/',
		});

		// Add cover photo URL
		const firstImageSrc = getFirstImage(node.rawBody);
		if (firstImageSrc) {
			createNodeField({
				node,
				name: 'cover',
				value: firstImageSrc,
			});

			// Add cover photo dimensions
			const name = getPhotoNameFromUrl(firstImageSrc);
			const { width, height } = name
				? await loadPhoto(name)
				: await loadImage(path.join(__dirname, 'static', firstImageSrc));
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
				allMdx(
					# Make sure that the New album will be the last and we'll
					# have all the photos available
					sort: { fields: [frontmatter___position], order: DESC }
				) {
					edges {
						node {
							rawBody
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

			result.data.allMdx.edges.forEach(
				async ({
					node: {
						rawBody,
						frontmatter: { layout, title, order },
						fields: { slug },
					},
				}) => {
					const extraContext = {};

					// Add photos data to album pages
					if (slug.startsWith('/albums/')) {
						const names = getLines(stripFrontmatter(rawBody));
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
									album: title,
									prev: get(photos, index - 1).slug,
									next: get(photos, index + 1).slug,
									prefetch: [
										get(photos, index + 1).name,
										get(photos, index + 2).name,
										get(photos, index + 3).name,
									].filter(Boolean),
								},
							});
						});

						extraContext.photos = photos;
						extraContext.prefetch = [get(photos, 0).name, get(photos, 1).name, get(photos, 2).name];
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
