import React from 'react';
import { graphql } from 'gatsby';
import { TextContent, Box, Html } from 'tamia';
import PageWithTitle from './PageWithTitle';
import SubscriptionForm from '../components/SubscriptionForm';

const TextPage = ({
	data: {
		markdownRemark: {
			frontmatter: { title, pageTitle },
			html,
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
			<Box mb="l">
				<TextContent as={Html}>{html}</TextContent>
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
		markdownRemark(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
				pageTitle
			}
			html
		}
	}
`;
