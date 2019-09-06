import React from 'react';
import { graphql } from 'gatsby';
import { TextContent } from 'tamia';
import PageWithTitle from './PageWithTitle';

type Props = {
	data: {
		markdownRemark: {
			html: string;
			frontmatter: {
				title: string;
			};
		};
	};
	location: {
		pathname: string;
	};
};

export default function SubscribeThankYouPage({
	data: {
		markdownRemark: {
			html,
			frontmatter: { title },
		},
	},
	location: { pathname },
}: Props) {
	return (
		<PageWithTitle url={pathname} title={title}>
			<TextContent dangerouslySetInnerHTML={{ __html: html }} />
		</PageWithTitle>
	);
}

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
