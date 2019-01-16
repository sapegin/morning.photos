import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import { TextContent } from 'tamia';
import PageWithTitle from './PageWithTitle';

const SubscribeThankYouPage = ({
	data: {
		mdx: {
			frontmatter: { title },
			code: { body },
		},
	},
	location: { pathname },
}) => {
	return (
		<PageWithTitle url={pathname} title={title}>
			<TextContent>
				<MDXRenderer>{body}</MDXRenderer>
			</TextContent>
		</PageWithTitle>
	);
};

export default SubscribeThankYouPage;

export const pageQuery = graphql`
	query SubscribeThankYouPage($slug: String!) {
		mdx(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
			}
			code {
				body
			}
		}
	}
`;
