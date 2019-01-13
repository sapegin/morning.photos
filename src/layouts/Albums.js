import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { Box, Heading, themeGet } from 'tamia';
import { Link } from 'tamia-gatsby-link';
import Photo from '../components/Photo';
import PhotoGrid from '../components/PhotoGrid';
import PageWithTitle from './PageWithTitle';

const AlbumHeading = styled(Heading)`
	padding: 0 ${themeGet('page.xPadding')};

	/* Should match PhotoGrid */
	@media (min-width: 32rem) {
		padding: 0;
	}
`;

export default ({
	data: {
		markdownRemark: {
			frontmatter: { title },
		},
		allMarkdownRemark: { edges },
	},
	location: { pathname },
}) => {
	const albums = edges.map(x => x.node);
	return (
		<PageWithTitle title={title} url={pathname} textFullWidth>
			<PhotoGrid>
				{albums.map(({ fields, frontmatter }) => (
					<Box key={fields.slug} mb="l" as={Link} to={fields.slug}>
						<Photo name={frontmatter.cover} size="thumbnail" />
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
		markdownRemark(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
			}
		}
		allMarkdownRemark(
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
					}
				}
			}
		}
	}
`;
