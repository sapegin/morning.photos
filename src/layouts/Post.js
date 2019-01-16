import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import { TextContent, Box } from 'tamia';
import PageWithTitle from './PageWithTitle';
import PostMeta from '../components/PostMeta';
import SubscriptionBox from '../components/SubscriptionBox';
import config from '../../config';

const { titleBlog } = config;

export default ({
	data: {
		mdx: {
			frontmatter: { title, tags = [], date, datetime },
			code: { body },
		},
	},
	location: { pathname },
}) => {
	return (
		<PageWithTitle url={pathname} title={title} pageTitle={`${title} — ${titleBlog}`}>
			<Box mb="xl">
				<Box as={TextContent} mb="l">
					<MDXRenderer>{body}</MDXRenderer>
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
		mdx(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
				tags
				date(formatString: "MMMM DD, YYYY")
				datetime: date(formatString: "YYYY-MM-DD")
			}
			code {
				body
			}
		}
	}
`;
