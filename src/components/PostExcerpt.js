// @flow
import React, { type Node } from 'react';
import { Box, Heading, Text, TextContent, VisuallyHidden } from 'tamia';
import { Link } from 'tamia-gatsby-link';

type Props = {
	title: string,
	slug: string,
	/* Date in format YYYY-MM-DD */
	datetime: string,
	/* Formatted date */
	date: string,
	hasMore: boolean,
	children: Node,
};

export default ({ className, title, slug, datetime, date, hasMore, children }: Props) => (
	<article className={className}>
		<Box mb="m">
			<Heading level={2}>
				<Link to={slug}>{title}</Link>
			</Heading>
		</Box>
		<Box mb="l">
			<TextContent>{children}</TextContent>
			{hasMore && (
				<p>
					<Link to={slug}>Read more…</Link>
				</p>
			)}
		</Box>
		<footer>
			<small>
				<VisuallyHidden as="span">Published on</VisuallyHidden>
				<Text size="xs" as="time" dateTime={datetime}>
					{date}
				</Text>
			</small>
		</footer>
	</article>
);
