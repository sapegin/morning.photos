import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import { TextContent, Box } from 'tamia';
import PageWithTitle from './PageWithTitle';
import SubscriptionForm from '../components/SubscriptionForm';

const TextPage = ({
	data: {
		mdx: {
			frontmatter: { title, pageTitle },
			code: { body },
		},
	},
	location: { pathname },
}) => {
	return (
		<PageWithTitle
			url={pathname}
			title={title}
			pageTitle={pageTitle}
			splash="subscribe.jpg"
			inverted
		>
			<Box as={TextContent} mb="l">
				<MDXRenderer>{body}</MDXRenderer>
			</Box>
			<Box mb="xl">
				<SubscriptionForm from="Subscribe" />
			</Box>
		</PageWithTitle>
	);
};

export default TextPage;

export const pageQuery = graphql`
	query SubscribePage($slug: String!) {
		mdx(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
				pageTitle
			}
			code {
				body
			}
		}
	}
`;
