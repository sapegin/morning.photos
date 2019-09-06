import path from 'path';
import { createFilePath } from 'gatsby-source-filesystem';
import { stripFrontmatter, getAlbumFromNames, getLines, typo } from './src/util/node';

const template = layout => path.resolve(`src/layouts/${layout || 'Page'}.tsx`);

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

const getHorizontalPhotos = photos => photos.filter(({ width, height }) => width > height);

export function onCreateWebpackConfig({ actions }) {
	// Turn off source maps
	actions.setWebpackConfig({ devtool: false });
}

export function onCreateNode({ node, getNode, actions: { createNodeField } }) {
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
	}
}

export function createPages({ graphql, actions: { createPage } }) {
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
		`).then(({ errors, data: { allMdx: { edges: pages } } }) => {
			if (errors) {
				reject(errors);
			}

			const allPhotoNames = [];

			pages.forEach(
				async ({
					node: {
						rawBody,
						frontmatter: { layout, title, order, limit },
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

					// Add recent photos to the main page
					if (slug === '/') {
						extraContext.photos = await getAlbumFromNames(allPhotoNames, {
							slug: '/albums/new',
							order: 'modified',
							limit: 4,
							filter: getHorizontalPhotos,
						});
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
}
