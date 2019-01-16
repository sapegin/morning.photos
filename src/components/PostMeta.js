// @flow
import React from 'react';
import Group from 'react-group';
import { Row, Column, Text, VisuallyHidden } from 'tamia';
import { Link } from 'tamia-gatsby-link';
import config from '../../config';

const { tagNames } = config;

type Props = {
	/* Date in format YYYY-MM-DD */
	datetime: string,
	/* Formatted date */
	date: string,
	tags: string[],
	currentTag: string,
};

export default ({ datetime, date, tags, currentTag }: Props) => (
	<Text size="xs" as="footer">
		<Row narrow alignItems="baseline">
			<Column as="small">
				<VisuallyHidden as="span">Published on</VisuallyHidden>
				<time dateTime={datetime}>{date}</time>
			</Column>
			<Column as="small">
				<VisuallyHidden as="strong">Tags:</VisuallyHidden>
				<Group separator=", " inline>
					{tags.map(id =>
						id === currentTag ? (
							<Text key={id} as="b" size="xs" weight="bold" aria-current="page">
								{tagNames[id]}
							</Text>
						) : (
							<Link key={id} to={`/blog/tags/${id}`}>
								{tagNames[id]}
							</Link>
						)
					)}
				</Group>
			</Column>
		</Row>
	</Text>
);
