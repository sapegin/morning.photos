import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { Box, Row, Column, Heading, Text, themeGet } from 'tamia';
import { QuotedLink } from 'tamia-gatsby-link';
import PageWithTitle from './PageWithTitle';
import Metatags from '../components/Metatags';
import Image from '../components/Image';
import config from '../../config';

const { tagNames } = config;

const PostContainer = styled(Box)`
	margin-left: -${themeGet('page.xPadding')};
	margin-right: -${themeGet('page.xPadding')};
	text-align: ${props => props.align};

	@media (min-width: ${themeGet('breakpoints.small')}) {
		margin-left: 0;
		margin-right: 0;
	}
`;

const TextPostContainer = styled(Box)`
	padding: ${themeGet('space.l')} ${themeGet('page.xPadding')};
	text-align: ${props => props.align};
	border: 2px solid ${themeGet('colors.base')};
`;

const PostHeaderStyle = styled.header`
	margin-top: -0.4rem;
	padding: 0 ${themeGet('page.xPadding')};

	@media (min-width: ${themeGet('breakpoints.small')}) {
		padding: 0;
	}
`;

const PostHeader = ({ title, tags }) => (
	<PostHeaderStyle>
		<Heading level={3} mb="s" as="h2">
			<u>{title}</u>
		</Heading>
		<Text as="p" size="xs" weight="bold">
			{tagNames[tags[0]]}
		</Text>
	</PostHeaderStyle>
);

const renderPost = (
	{ slug, cover, coverModified, coverSize, width, height, ...post },
	isLeftSide
) => {
	// Panoramic
	if (width >= height * 1.8) {
		return (
			<PostContainer key={slug} mb="xl" align={isLeftSide || 'right'}>
				<QuotedLink href={slug}>
					<Box mb="m">
						<Image src={cover} modified={coverModified} intrinsicSize={coverSize} />
					</Box>
					<PostHeader {...post} />
				</QuotedLink>
			</PostContainer>
		);
	}

	// Horizontal
	if (width >= height) {
		const columns = [
			<Column key="image" width={[1, 5 / 6]}>
				<Box mb={isLeftSide || 'm'}>
					<Image src={cover} modified={coverModified} intrinsicSize={coverSize} />
				</Box>
			</Column>,
			<Column key="header" width={[1, 1 / 6]}>
				<Box mb={isLeftSide && 'm'}>
					<PostHeader {...post} />
				</Box>
			</Column>,
		];
		return (
			<PostContainer key={slug} mb="xl">
				<Row as={QuotedLink} key={slug} narrow href={slug}>
					{isLeftSide ? columns.reverse() : columns}
				</Row>
			</PostContainer>
		);
	}

	// Just text heading
	return (
		<TextPostContainer key={slug} mb="xl" align={isLeftSide || 'right'}>
			<QuotedLink href={slug}>
				<PostHeader {...post} />
			</QuotedLink>
		</TextPostContainer>
	);
};

export default ({
	data: {
		mdx: {
			frontmatter: { title, pageTitle },
		},
		allMdx: { edges },
	},
	location: { pathname },
}) => {
	const posts = edges.map(({ node }) => ({
		...node.fields,
		...node.fields.coverSize,
		...node.frontmatter,
	}));
	return (
		<PageWithTitle title={title} pageTitle={pageTitle} url={pathname}>
			<Metatags slug={pathname} title={pageTitle} />
			{posts.map((post, index) => renderPost(post, !(index % 2)))}
		</PageWithTitle>
	);
};

export const pageQuery = graphql`
	query PostsPage($slug: String!) {
		mdx(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
				pageTitle
			}
		}
		allMdx(
			filter: { fileAbsolutePath: { regex: "/blog/.*/" } }
			sort: { fields: [frontmatter___date], order: DESC }
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
						pageTitle
						tags
						date(formatString: "MMMM DD, YYYY")
						datetime: date(formatString: "YYYY-MM-DD")
					}
				}
			}
		}
	}
`;
