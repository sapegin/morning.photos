import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Group from 'react-group';
import { Box, Row, Column, Text, TextContent, Html, themeGet } from 'tamia';
import { Link } from 'tamia-gatsby-link';
import Page from './Page';
import Photo from '../components/Photo';
import PhotoGrid from '../components/PhotoGrid';
import SubscriptionForm from '../components/SubscriptionForm';
import { getPhotoUrl } from '../util/photos';
import config from '../../gatsby-config';

const { excerptSeparator } = config.siteMetadata;

// Split posts into:
// 1. Posts with a main horizontal photo (up to three)
// 2. Rest of the posts
const splitPostsIntoPhotosAndNot = posts =>
	posts.reduce(
		(result, post) => {
			const { width, height } = post.fields.coverSize || {};
			if (width > height && result.photos.length < 3) {
				result.photos.push(post);
			} else {
				result.rest.push(post);
			}
			return result;
		},
		{ photos: [], rest: [] }
	);

const PrimaryPhotoContainer = styled(Box)`
	position: relative;
	background-color: ${themeGet('colors.lighter')};
	margin-left: -${themeGet('page.xPadding')};
	margin-right: -${themeGet('page.xPadding')};

	@media (min-width: 32rem) {
		margin-left: 0;
		margin-right: 0;
	}
`;

const PrimaryPhotoHeading = styled(Text)`
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-shadow: 0 0 0.2ex rgba(0, 0, 0, 0.3);
	padding: 50px ${themeGet('page.xPadding')} ${themeGet('page.xPadding')};
	line-height: 1;
	color: ${themeGet('colors.bg')};
	background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
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
	background-image: url(${props => getPhotoUrl(props.name, 'blog')});
`;

const PostHeading = styled(Text)`
	padding: 0 ${themeGet('page.xPadding')};

	/* Should match PhotoGrid */
	@media (min-width: 32rem) {
		padding: 0;
	}
`;

const Avatar = styled.img`
	max-width: 100%;
	width: auto;
	height: auto;
`;

export default ({
	data: {
		markdownRemark: {
			html,
			frontmatter: { title },
		},
		allMarkdownRemark: { edges },
	},
	location: { pathname },
}) => {
	const posts = edges.map(x => x.node);
	const {
		photos: [primaryPhoto, ...secondaryPhotos],
		rest,
	} = splitPostsIntoPhotosAndNot(posts);

	return (
		<Page title={title} url={pathname} textFullWidth>
			<PrimaryPhotoContainer mb="m">
				<PrimaryPhotoLink href={primaryPhoto.fields.slug}>
					<Photo name={primaryPhoto.fields.cover} size="blog" />
					<PrimaryPhotoHeading size="l">{primaryPhoto.frontmatter.title}</PrimaryPhotoHeading>
				</PrimaryPhotoLink>
			</PrimaryPhotoContainer>
			<PhotoGrid columns={2} mb="l">
				{secondaryPhotos.map(({ fields: { slug, cover }, frontmatter: { title } }) => (
					<Link href={slug}>
						<SecondaryPhoto name={cover} />
						<PostHeading size="m" mt="s">
							{title}
						</PostHeading>
					</Link>
				))}
			</PhotoGrid>
			<Box as={Text} mb="xl" size="s">
				<Text weight="bold" as="strong" size="s">
					More from the blog:
				</Text>{' '}
				<Group separator=", " inline>
					{rest.map(({ fields: { slug }, frontmatter: { title } }) => (
						<Link href={slug}>{title}</Link>
					))}
				</Group>
			</Box>
			<Row>
				<Column width={[1, 3 / 4]}>
					<Box mb="m">
						<TextContent as={Html}>{html}</TextContent>
					</Box>
					<Box mb="l">
						<SubscriptionForm from="Index" />
					</Box>
				</Column>
				<Column width={[1, 1 / 4]}>
					<Box mb="l">
						<Avatar src="/images/about/me11.jpg" alt="Photo of Artem Sapegin" />
					</Box>
				</Column>
			</Row>
		</Page>
	);
};

export const pageQuery = graphql`
	query MainPage($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
			}
			html
		}
		allMarkdownRemark(
			filter: { fileAbsolutePath: { regex: "/blog/.*/" } }
			sort: { fields: [frontmatter___date], order: DESC }
			limit: 8
		) {
			edges {
				node {
					fields {
						slug
						cover
						coverSize {
							width
							height
						}
					}
					frontmatter {
						title
					}
				}
			}
		}
	}
`;
