import React from 'react';
import { graphql } from 'gatsby';
import { Box } from 'tamia';
import { renderAst } from '../markdown';
import Page from './Page';
import PostExcerpt from '../components/PostExcerpt';
import config from '../../gatsby-config';

const { excerptSeparator } = config.siteMetadata;

const isExcerpt = node =>
	node.type === 'comment' && node.value.trim().toLowerCase() === excerptSeparator;

const hasMore = ast => !!ast.children.find(isExcerpt);

const getExcerptAst = ast => {
	const index = ast.children.findIndex(isExcerpt);
	return {
		...ast,
		children: ast.children.slice(0, index > 0 ? index + 1 : ast.children.length),
	};
};

export default ({
	data: {
		markdownRemark: {
			frontmatter: { title },
		},
		allMarkdownRemark: { edges },
	},
	location: { pathname },
}) => {
	const posts = edges.map(x => x.node);
	return (
		<Page title={title} url={pathname}>
			{posts.map(({ htmlAst, fields, frontmatter }) => (
				<Box
					key={fields.slug}
					as={PostExcerpt}
					mb="l"
					{...fields}
					{...frontmatter}
					hasMore={hasMore(htmlAst)}
				>
					{renderAst(getExcerptAst(htmlAst))}
				</Box>
			))}
		</Page>
	);
};

export const pageQuery = graphql`
	query PostsPage($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
			}
		}
		allMarkdownRemark(
			filter: { fileAbsolutePath: { regex: "/blog/.*/" } }
			sort: { fields: [frontmatter___date], order: DESC }
		) {
			edges {
				node {
					htmlAst
					fields {
						slug
					}
					frontmatter {
						title
						date(formatString: "MMMM DD, YYYY")
						datetime: date(formatString: "YYYY-MM-DD")
					}
				}
			}
		}
	}
`;
