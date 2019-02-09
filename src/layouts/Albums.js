import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { Box, Heading, themeGet } from 'tamia';
import { Link } from 'tamia-gatsby-link';
import Metatags from '../components/Metatags';
import Image from '../components/Image';
import PhotoGrid from '../components/PhotoGrid';
import PageWithTitle from './PageWithTitle';

const AlbumHeading = styled(Heading)`
	padding: 0 ${themeGet('page.xPadding')};

	@media (min-width: ${themeGet('breakpoints.small')}) {
		padding: 0;
	}
`;

export default ({
	data: {
		mdx: {
			frontmatter: { title, pageTitle },
		},
		allMdx: { edges },
	},
	location: { pathname },
}) => {
	const albums = edges.map(x => x.node);
	return (
		<PageWithTitle title={title} url={pathname} pageTitle={pageTitle}>
			<Metatags slug={pathname} title={pageTitle} />
			<PhotoGrid>
				{albums.map(({ fields, frontmatter }) => (
					<Box key={fields.slug} mb="l" as={Link} to={fields.slug}>
						<Image
							src={frontmatter.cover}
							modified={frontmatter.coverModified}
							size="thumbnail"
							intrinsicSize={{ width: 3, height: 2 }}
						/>
						<AlbumHeading level={3} as="h2" mt="s">
							{frontmatter.title}
						</AlbumHeading>
					</Box>
				))}
			</PhotoGrid>
		</PageWithTitle>
	);
};

export const pageQuery = graphql`
	query AlbumsPage($slug: String!) {
		mdx(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
				pageTitle
			}
		}
		allMdx(
			filter: { fileAbsolutePath: { regex: "/albums/.*\\.md/" } }
			sort: { fields: [frontmatter___position], order: ASC }
		) {
			edges {
				node {
					fields {
						slug
					}
					frontmatter {
						title
						cover
						coverModified
					}
				}
			}
		}
	}
`;
