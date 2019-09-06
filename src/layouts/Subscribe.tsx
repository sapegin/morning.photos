import React from 'react';
import { graphql } from 'gatsby';
// @ts-ignore
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import { TextContent, Text, Box } from 'tamia';
import PageWithTitle from './PageWithTitle';
import Metatags from '../components/Metatags';
import SubscriptionForm from '../components/SubscriptionForm';

type Props = {
	data: {
		mdx: {
			code: {
				body: string;
			};
			frontmatter: {
				title: string;
				pageTitle: string;
				cover: string;
			};
		};
	};
	location: {
		pathname: string;
	};
};

export function SubscribePage({
	data: {
		mdx: {
			code: { body },
			frontmatter: { title, pageTitle, cover },
		},
	},
	location: { pathname },
}: Props) {
	return (
		<PageWithTitle url={pathname} title={title} pageTitle={pageTitle} splash={cover} inverted>
			<Metatags slug={pathname} title={title} image={cover} />
			<Box as={TextContent} mb="l">
				<MDXRenderer>{body}</MDXRenderer>
			</Box>
			<Box mb="xl">
				<SubscriptionForm />
				<Text size="xs" mt="s">
					A few times a year, no spam, unsubscribe at any time.
				</Text>
			</Box>
		</PageWithTitle>
	);
}

export const pageQuery = graphql`
	query SubscribePage($slug: String!) {
		mdx(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
				pageTitle
				cover
			}
			code {
				body
			}
		}
	}
`;
