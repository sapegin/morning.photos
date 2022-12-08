import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Box, Heading as TamiaHeading } from 'tamia';
import { QuotedLink } from 'tamia-gatsby-link';
import Metatags from '../components/Metatags';
import Image from '../components/Image';
import PhotoGrid from '../components/PhotoGrid';
import PageWithTitle from './PageWithTitle';

const AlbumHeading = styled(TamiaHeading)`
	padding: 0 ${(p) => p.theme.page.contentPaddingX};

	@media (min-width: ${(p) => p.theme.breakpoints[0]}) {
		padding: 0;
	}
`;

const BoxLink = Box.withComponent(QuotedLink);

type Props = {
	data: {
		markdownRemark: {
			frontmatter: {
				title: string;
				pageTitle: string;
			};
		};
		allMarkdownRemark: {
			edges: {
				node: {
					fields: {
						slug: string;
					};
					frontmatter: {
						title: string;
						cover: string;
						coverModified: number;
					};
				};
			}[];
		};
	};
	location: {
		pathname: string;
	};
};

export default function AlbumsPage({
	data: {
		markdownRemark: {
			frontmatter: { title, pageTitle },
		},
		allMarkdownRemark: { edges },
	},
	location: { pathname },
}: Props) {
	const albums = edges.map((x) => x.node);
	return (
		<PageWithTitle title={title} url={pathname} pageTitle={pageTitle}>
			<PhotoGrid>
				{albums.map(({ fields, frontmatter }) => (
					<BoxLink key={fields.slug} mb="l" href={fields.slug}>
						<Image
							src={frontmatter.cover}
							modified={frontmatter.coverModified}
							size="thumbnail"
							intrinsicSize={{ width: 3, height: 2 }}
							responsive={false}
						/>
						<AlbumHeading level={3} as="h2" mt="s">
							<u>{frontmatter.title}</u>
						</AlbumHeading>
					</BoxLink>
				))}
			</PhotoGrid>
		</PageWithTitle>
	);
}

export const Head = ({
	data: {
		markdownRemark: {
			frontmatter: { pageTitle },
		},
	},
	location: { pathname },
}: Props) => {
	return <Metatags slug={pathname} pageTitle={pageTitle} />;
};

export const pageQuery = graphql`
	query AlbumsPage($slug: String!, $childrenRegExp: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
				pageTitle
			}
		}
		allMarkdownRemark(
			filter: { fileAbsolutePath: { regex: $childrenRegExp } }
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
