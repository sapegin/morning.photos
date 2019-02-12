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

const PostContainer = styled(Box, {
	shouldForwardProp: props => !['align'].includes(props),
})`
	margin-left: -${themeGet('page.xPadding')};
	margin-right: -${themeGet('page.xPadding')};
	overflow: hidden;

	@media (min-width: ${themeGet('breakpoints.huge')}) {
		margin-left: 0;
		margin-right: 0;
		text-align: ${props => props.align};
	}
`;

const TextPostContainer = styled(Box, {
	shouldForwardProp: props => !['align'].includes(props),
})`
	@media (min-width: ${themeGet('breakpoints.huge')}) {
		padding: ${themeGet('space.l')} ${themeGet('page.xPadding')};
		border: 2px solid ${themeGet('colors.base')};
		text-align: ${props => props.align};
	}
`;

const PostHeaderContainer = styled.header`
	padding: 0 ${themeGet('page.xPadding')};

	@media (min-width: ${themeGet('breakpoints.huge')}) {
		margin-top: -0.35rem;
		padding: 0;
	}
`;

const PostHeaderBody = ({ title, tags }) => (
	<>
		<Heading level={3} mb="s" as="h2">
			<u>{title}</u>
		</Heading>
		<Text as="p" size="xs" weight="bold">
			{tagNames[tags[0]]}
		</Text>
	</>
);

const PostHeader = ({ title, tags }) => (
	<PostHeaderContainer>
		<PostHeaderBody title={title} tags={tags} />
	</PostHeaderContainer>
);

const PostImageColumn = styled(Column, {
	shouldForwardProp: props => !['isLeftSide'].includes(props),
})`
	@media (min-width: ${themeGet('breakpoints.huge')}) {
		order: ${props => props.isLeftSide && '1'};
	}
`;

const PostHeaderColumn = styled(Column)`
	padding-top: ${themeGet('space.m')};

	@media (min-width: ${themeGet('breakpoints.huge')}) {
		padding-top: 0;
	}
`;

const renderPost = (
	{ slug, cover, coverModified, coverSize, width, height, ...post },
	isLeftSide
) => {
	// Panoramic
	if (width >= height * 1.8) {
		return (
			<PostContainer key={slug} mb="xl" align={isLeftSide ? undefined : 'right'}>
				<QuotedLink href={slug}>
					<Box mb="m">
						<Image
							src={cover}
							modified={coverModified}
							intrinsicSize={coverSize}
							alt=""
							responsive={false}
						/>
					</Box>
					<PostHeader {...post} />
				</QuotedLink>
			</PostContainer>
		);
	}

	// Horizontal
	if (width >= height) {
		return (
			<PostContainer key={slug} mb="xl">
				<Row as={QuotedLink} key={slug} narrow href={slug}>
					<PostImageColumn width={[1, null, null, null, 5 / 6]} isLeftSide={isLeftSide}>
						<Image
							src={cover}
							modified={coverModified}
							intrinsicSize={coverSize}
							alt=""
							responsive={false}
						/>
					</PostImageColumn>
					<PostHeaderColumn width={[1, null, null, null, 1 / 6]}>
						<PostHeader {...post} />
					</PostHeaderColumn>
				</Row>
			</PostContainer>
		);
	}

	// Just text heading
	return (
		<TextPostContainer key={slug} mb="xl" align={isLeftSide ? undefined : 'right'}>
			<QuotedLink href={slug}>
				<PostHeaderBody {...post} />
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
	pageContext: { nextPage },
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
			{nextPage && (
				<Box mb="l" as="footer">
					<QuotedLink to={nextPage}>
						↓ <u>Previously</u>
					</QuotedLink>
				</Box>
			)}
		</PageWithTitle>
	);
};

export const pageQuery = graphql`
	query PostsPage($slug: String!, $skip: Int!, $limit: Int!) {
		mdx(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
				pageTitle
			}
		}
		allMdx(
			filter: { fileAbsolutePath: { regex: "/blog/.*/" } }
			sort: { fields: [frontmatter___date], order: DESC }
			limit: $limit
			skip: $skip
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
