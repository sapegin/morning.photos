import React from 'react';
import { graphql } from 'gatsby';
import { TextContent, Box, Html } from 'tamia';
import PageWithTitle from './PageWithTitle';

const SubscribeThankYouPage = ({
	data: {
		markdownRemark: {
			frontmatter: { title },
			html,
		},
	},
	location: { pathname },
}) => {
	return (
		<PageWithTitle url={pathname} title={title}>
			<Box mb="l">
				<TextContent as={Html}>{html}</TextContent>
			</Box>
		</PageWithTitle>
	);
};

export default SubscribeThankYouPage;

export const pageQuery = graphql`
	query SubscribeThankYouPage($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
			}
			html
		}
	}
`;
