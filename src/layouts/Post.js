import React from 'react';
import { graphql } from 'gatsby';
import { TextContent, Box } from 'tamia';
import { renderAst } from '../markdown';
import PageWithTitle from './PageWithTitle';
import PostMeta from '../components/PostMeta';
import SubscriptionBox from '../components/SubscriptionBox';
import config from '../../gatsby-config';

const { titleBlog } = config.siteMetadata;

export default ({
	data: {
		markdownRemark: {
			frontmatter: { title, tags = [], date, datetime },
			htmlAst,
		},
	},
	location: { pathname },
}) => {
	return (
		<PageWithTitle url={pathname} title={title} pageTitle={`${title} — ${titleBlog}`}>
			<Box mb="xl">
				<Box mb="l">
					<TextContent>{renderAst(htmlAst)}</TextContent>
				</Box>
				<Box mb="l">
					<PostMeta date={date} datetime={datetime} tags={tags} />
				</Box>
			</Box>
			<Box mb="xl">
				<SubscriptionBox from="Blog" />
			</Box>
		</PageWithTitle>
	);
};

export const pageQuery = graphql`
	query PostPage($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
				tags
				date(formatString: "MMMM DD, YYYY")
				datetime: date(formatString: "YYYY-MM-DD")
			}
			htmlAst
		}
	}
`;
