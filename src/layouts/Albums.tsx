import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Box, Heading } from 'tamia';
import { Link } from 'tamia-gatsby-link';
import Metatags from '../components/Metatags';
import Image from '../components/Image';
import PhotoGrid from '../components/PhotoGrid';
import PageWithTitle from './PageWithTitle';

const AlbumHeading = styled(Heading)`
	padding: 0 ${p => p.theme.page.xPadding};

	@media (min-width: ${p => p.theme.breakpoints[0]}) {
		padding: 0;
	}
`;

const BoxLink = Box.withComponent(Link);

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
	const albums = edges.map(x => x.node);
	return (
		<PageWithTitle title={title} url={pathname} pageTitle={pageTitle}>
			<Metatags slug={pathname} title={pageTitle} />
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
							{frontmatter.title}
						</AlbumHeading>
					</BoxLink>
				))}
			</PhotoGrid>
		</PageWithTitle>
	);
}

export const pageQuery = graphql`
	query AlbumsPage($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
				pageTitle
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
						coverModified
					}
				}
			}
		}
	}
`;
