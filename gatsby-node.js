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
	typo,
} = require('./src/util/node');

const POSTS_PER_PAGE = 20;

const template = layout => path.resolve(`src/layouts/${layout || 'Page'}.js`);

const get = (l, i) => l[i] || {};

const getPrefetchPhotos = (photos, start) => [
	{
		name: get(photos, start).name,
		modified: get(photos, start).modified,
	},
	{
		name: get(photos, start + 1).name,
		modified: get(photos, start + 1).modified,
	},
];

exports.onCreateWebpackConfig = ({ actions }) => {
	// Turn off source maps
	actions.setWebpackConfig({ devtool: false });
};

exports.onCreateNode = async ({ node, getNode, actions: { createNodeField } }) => {
	if (node.internal.type === 'Mdx') {
		const slug = createFilePath({ node, getNode, trailingSlash: false });

		// Typography
		if (!slug.startsWith('/albums/')) {
			node.rawBody = typo(node.rawBody);
		}

		// Add slug
		createNodeField({
			node,
			name: 'slug',
			value: slug,
		});

		// Add cover photo URL
		const firstImageSrc = getFirstImage(node.rawBody);
		if (firstImageSrc) {
			const name = getPhotoNameFromUrl(firstImageSrc);
			createNodeField({
				node,
				name: 'cover',
				value: name || firstImageSrc,
			});

			// Add cover photo modification time and dimensions
			const { modified, width, height } = name
				? await loadPhoto(name)
				: await loadImage(path.join(__dirname, 'static', firstImageSrc));
			createNodeField({
				node,
				name: 'coverModified',
				value: modified,
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
				allMdx(
					# Make sure that the New album will be the last and we'll
					# have all the photos available
					sort: { fields: [frontmatter___position, frontmatter___date], order: DESC }
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

			const pages = result.data.allMdx.edges;
			pages.forEach(
				async (
					{
						node: {
							rawBody,
							frontmatter: { layout, title, order, limit },
							fields: { slug },
						},
					},
					index
				) => {
					const extraContext = {};

					// Add photos data to album pages
					if (slug.startsWith('/albums/')) {
						const names = getLines(stripFrontmatter(rawBody));
						allPhotoNames.push(...names);

						const photos = await getAlbumFromNames(names.length > 0 ? names : allPhotoNames, {
							slug,
							order,
							limit,
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
									prefetch: getPrefetchPhotos(photos, index + 1).filter(Boolean),
								},
							});
						});

						extraContext.photos = photos;
					}

					// Create blog list pages
					if (slug === '/blog') {
						const posts = pages.filter(page => page.node.fields.slug.startsWith('/blog/'));
						const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);
						Array.from({ length: numPages }).forEach((_, page) => {
							createPage({
								path: page === 0 ? slug : `${slug}/${page + 1}`,
								component: template(layout),
								context: {
									slug,
									limit: POSTS_PER_PAGE,
									skip: page * POSTS_PER_PAGE,
									nextPage: page + 1 < numPages ? `${slug}/${page + 2}` : undefined,
								},
							});
						});
						return;
					}

					// Add prev / next links to blog posts
					if (slug.startsWith('/blog/')) {
						const prev = pages[index - 1];
						if (prev && prev.node.fields.slug.startsWith('/blog/')) {
							extraContext.prev = prev.node.fields.slug;
							extraContext.prevTitle = prev.node.frontmatter.title;
						}

						const next = pages[index + 1];
						if (next && next.node.fields.slug.startsWith('/blog/')) {
							extraContext.next = next.node.fields.slug;
							extraContext.nextTitle = next.node.frontmatter.title;
						}
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
