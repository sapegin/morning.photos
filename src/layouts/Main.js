import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import styled from '@emotion/styled';
import Group from 'react-group';
import { Box, Row, Column, Text, TextContent, themeGet } from 'tamia';
import { Link } from 'tamia-gatsby-link';
import Page from './Page';
import Metatags from '../components/Metatags';
import Image from '../components/Image';
import PhotoGrid from '../components/PhotoGrid';
import { getPhotoUrl } from '../util/photos';

// Split posts into:
// 1. Photo posts with a main horizontal photo (up to three)
// 2. Rest of the posts
const splitPostsIntoPhotosAndNot = posts =>
	posts.reduce(
		(result, post) => {
			const { tags } = post.frontmatter;
			const { width, height } = post.fields.coverSize || {};
			if (width > height && tags.includes('photos') && result.photos.length < 3) {
				result.photos.push(post);
			} else {
				result.rest.push(post);
			}
			return result;
		},
		{ photos: [], rest: [] }
	);

const PrimaryPhotoHeading = styled(Text)`
	margin-top: ${themeGet('space.s')};

	@media (min-width: ${themeGet('breakpoints.small')}) {
		position: absolute;
		bottom: 0;
		left: -${themeGet('page.xPadding')};
		right: -${themeGet('page.xPadding')};
		padding: 50px ${themeGet('page.xPadding')} ${themeGet('page.xPadding')};
		line-height: 1;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-shadow: 0 0 0.2ex rgba(0, 0, 0, 0.3);
		color: ${themeGet('colors.bg')};
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
		font-size: ${themeGet('fontSizes.l')};
	}

	@media (min-width: ${themeGet('page.contentMaxWidth')}) {
		left: 0;
		right: 0;
	}
`;

const PrimaryPhotoLink = styled(Link)`
	&:hover *,
	&:focus * {
		text-decoration: underline;
	}
`;

const SecondaryPhoto = styled.div`
	padding-bottom: 66.66%; /* Always 3:2 aspect ratio*/
	background-position: center center;
	background-size: cover;
	background-color: ${themeGet('colors.lighter')};
	background-image: url(${props => getPhotoUrl(props.src, props.modified, 'blog')});
`;

const SecondaryPhotoHeading = styled(Text)`
	padding: 0 ${themeGet('page.xPadding')};

	@media (min-width: ${themeGet('breakpoints.small')}) {
		padding: 0;
	}
`;

export default ({
	data: {
		mdx: {
			code: { body },
			frontmatter: { title },
		},
		allMdx: { edges },
	},
	location: { pathname },
}) => {
	const posts = edges.map(x => x.node);
	const {
		photos: [primaryPhoto, ...secondaryPhotos],
		rest,
	} = splitPostsIntoPhotosAndNot(posts);

	return (
		<Page title={title} url={pathname}>
			<Metatags
				slug="/"
				title={title}
				image={primaryPhoto.fields.cover}
				imageModified={primaryPhoto.fields.coverModified}
			/>
			<Box position="relative" mb="m">
				<PrimaryPhotoLink href={primaryPhoto.fields.slug}>
					<Image
						src={primaryPhoto.fields.cover}
						modified={primaryPhoto.fields.coverModified}
						intrinsicSize={primaryPhoto.fields.coverSize}
						size="blog"
					/>
					<PrimaryPhotoHeading as="div">{primaryPhoto.frontmatter.title}</PrimaryPhotoHeading>
				</PrimaryPhotoLink>
			</Box>
			<PhotoGrid columns={2} mb="l">
				{secondaryPhotos.map(
					({ fields: { slug, cover, coverModified }, frontmatter: { title } }) => (
						<Link key={slug} href={slug}>
							<SecondaryPhoto src={cover} modified={coverModified} />
							<SecondaryPhotoHeading size="m" mt="s">
								{title}
							</SecondaryPhotoHeading>
						</Link>
					)
				)}
			</PhotoGrid>
			<Box as={Text} mb="xl" size="s">
				<Text weight="bold" as="strong" size="s">
					More from the blog:
				</Text>{' '}
				<Group separator=", ">
					{rest.map(({ fields: { slug }, frontmatter: { title } }) => (
						<Link key={slug} href={slug}>
							{title}
						</Link>
					))}
				</Group>
			</Box>
			<Row>
				<Column width={[1, 3 / 4]}>
					<Box as={TextContent} mb="l">
						<MDXRenderer>{body}</MDXRenderer>
					</Box>
				</Column>
				<Column width={[1, 1 / 4]}>
					<Box mb="l">
						<Image src="/images/about/me11.jpg" alt="Photo of Artem Sapegin" />
					</Box>
				</Column>
			</Row>
		</Page>
	);
};

export const pageQuery = graphql`
	query MainPage($slug: String!) {
		mdx(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
			}
			code {
				body
			}
		}
		allMdx(
			filter: { fileAbsolutePath: { regex: "/blog/.*/" } }
			sort: { fields: [frontmatter___date], order: DESC }
			limit: 8
		) {
			edges {
				node {
					fields {
						slug
						cover
						coverModified
						coverSize {
							width
							height
						}
					}
					frontmatter {
						title
						tags
					}
				}
			}
		}
	}
`;
