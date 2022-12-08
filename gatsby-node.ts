import type { GatsbyNode } from 'gatsby';
import path from 'path';
import { uniq } from 'lodash';
import { createFilePath } from 'gatsby-source-filesystem';
import { getAlbumFromNames, getLines } from './src/util/node';
import { Photo } from './src/types/Photo';
import { GraphQL } from './src/types/graphql';
import { PageContext } from './src/types/PageContext';

const template = (layout: string) => path.resolve(`src/layouts/${layout || 'Page'}.tsx`);

const isAlbumsPage = (slug: string) => slug === '/albums' || slug === '/series';

const isAlbumOrPhotoPage = (slug: string) =>
	slug.startsWith('/albums/') || slug.startsWith('/series/');

const getPrefetchPhotos = (photos: Photo[], start: number) => [
	{
		name: photos[start]?.name,
		modified: photos[start]?.modified,
	},
	{
		name: photos[start + 1]?.name,
		modified: photos[start + 1]?.modified,
	},
];

const getHorizontalPhotos = (photos: Photo[]) =>
	photos.filter(({ width, height }) => width > height);

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions }) => {
	// Turn off source maps
	actions.setWebpackConfig({
		devtool: false,
	});
};

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
	node,
	getNode,
	actions: { createNodeField },
}) => {
	if (node.internal.type === 'MarkdownRemark') {
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
};

export const createPages: GatsbyNode['createPages'] = async ({
	graphql,
	actions: { createPage },
}) => {
	const result = await graphql<GraphQL.Query.Pages>(`
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

	if (result.errors) {
		throw result.errors;
	}

	const pages = result.data?.allMarkdownRemark.edges || [];

	const allPhotoNames: string[] = [];

	await Promise.all(
		pages.map(
			async ({
				node: {
					frontmatter: { layout, title, orderby, limit },
					fields: { slug },
					rawMarkdownBody,
				},
			}) => {
				const extraContext: PageContext = {};

				// Add photos data to album pages
				if (isAlbumOrPhotoPage(slug)) {
					const names = getLines(rawMarkdownBody);
					allPhotoNames.push(...names);

					const photos = await getAlbumFromNames(names.length > 0 ? names : uniq(allPhotoNames), {
						slug,
						orderby,
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
									prev: photos[index - 1]?.slug,
									next: photos[index + 1]?.slug,
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
						orderby: 'modified',
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
		)
	);
};
