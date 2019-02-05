import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import { TextContent, Box } from 'tamia';
import PageWithTitle from './PageWithTitle';
import PostMeta from '../components/PostMeta';
import PostFooter from '../components/PostFooter';
import PrevNext from '../components/PrevNext';
import Metatags from '../components/Metatags';
import config from '../../config';

const { titleBlog } = config;

export default ({
	pageContext,
	data: {
		mdx: {
			frontmatter: { title, tags = [], date, datetime },
			fields: { slug, cover, coverModified },
			code: { body },
			excerpt,
		},
	},
	location: { pathname },
}) => {
	return (
		<PageWithTitle url={pathname} title={title} pageTitle={`${title} — ${titleBlog}`}>
			<Metatags
				slug={slug}
				title={title}
				description={excerpt}
				image={cover}
				imageModified={coverModified}
			/>
			<Box mb="xl">
				<Box as={TextContent} mb="l">
					<MDXRenderer>{body}</MDXRenderer>
				</Box>
				<Box mb="l">
					<PostMeta date={date} datetime={datetime} tags={tags} />
				</Box>
			</Box>
			<Box mb="xl">
				<PostFooter />
			</Box>
			<Box mb="xl">
				<PrevNext {...pageContext} />
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
			fields {
				slug
				cover
				coverModified
			}
			code {
				body
			}
			excerpt
		}
	}
`;
