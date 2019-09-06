import React from 'react';
import { graphql } from 'gatsby';
// @ts-ignore
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import { TextContent } from 'tamia';
import PageWithTitle from './PageWithTitle';

type Props = {
	data: {
		mdx: {
			code: {
				body: string;
			};
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
		mdx: {
			code: { body },
			frontmatter: { title },
		},
	},
	location: { pathname },
}: Props) {
	return (
		<PageWithTitle url={pathname} title={title}>
			<TextContent>
				<MDXRenderer>{body}</MDXRenderer>
			</TextContent>
		</PageWithTitle>
	);
}

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
