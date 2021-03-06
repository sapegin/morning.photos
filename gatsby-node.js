import path from 'path';
import { uniq } from 'lodash';
import { createFilePath } from 'gatsby-source-filesystem';
import { getAlbumFromNames, getLines } from './src/util/node';

const template = layout => path.resolve(`src/layouts/${layout || 'Page'}.tsx`);

const get = (l, i) => l[i] || {};

const isAlbumsPage = slug => slug === '/albums' || slug === '/series';

const isAlbumOrPhotoPage = slug => slug.startsWith('/albums/') || slug.startsWith('/series/');

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
	actions.setWebpackConfig({
		devtool: false,
	});
}

export function onCreateNode({ node, getNode, actions: { createNodeField } }) {
	if (
		node.internal.type === 'MarkdownRemark' &&
		// Don't process the same document twice
		!(node.fields && node.fields.slug)
	) {
		const slug = createFilePath({
			node,
			getNode,
			trailingSlash: false,
		});

		// Add slug
		createNodeField({
			node,
			name: 'slug',
			value: slug,
		});
	}
}

export async function createPages({ graphql, actions: { createPage } }) {
	const {
		errors,
		data: {
			allMarkdownRemark: { edges: pages },
		},
	} = await graphql(`
		{
			allMarkdownRemark(
				# Make sure that the New album will be the last and we'll
				# have all the photos available
				sort: { fields: [frontmatter___position], order: DESC }
			) {
				edges {
					node {
						frontmatter {
							layout
							title
							orderby
							limit
						}
						fields {
							slug
						}
						rawMarkdownBody
					}
				}
			}
		}
	`);

	if (errors) {
		throw errors;
	}

	const allPhotoNames = [];

	await Promise.all(
		pages.map(
			async ({
				node: {
					frontmatter: { layout, title, order, limit },
					fields: { slug },
					rawMarkdownBody,
				},
			}) => {
				const extraContext = {};

				// Add photos data to album pages
				if (isAlbumOrPhotoPage(slug)) {
					const names = getLines(rawMarkdownBody);
					allPhotoNames.push(...names);

					const photos = await getAlbumFromNames(names.length > 0 ? names : uniq(allPhotoNames), {
						slug,
						order,
						limit,
					});

					// Create pages for all photos in an album
					await Promise.all(
						photos.map((photo, index) =>
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
							})
						)
					);

					extraContext.photos = photos;
				}

				if (isAlbumsPage(slug)) {
					extraContext.childrenRegExp = `${slug}/.*\\.md/`;
				}

				// Add recent photos to the main page
				if (slug === '/') {
					extraContext.photos = await getAlbumFromNames(uniq(allPhotoNames), {
						slug: '/albums/new',
						order: 'modified',
						limit: 4,
						filter: getHorizontalPhotos,
					});
				}

				// Create a page for a Markdown document
				await createPage({
					path: slug,
					component: template(layout),
					context: {
						...extraContext,
						title,
						slug,
					},
				});
			}
		)
	);
}
