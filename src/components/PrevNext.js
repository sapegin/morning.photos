// @flow
import React from 'react';
import styled from '@emotion/styled';
import { Row, Column, Text } from 'tamia';
import { QuotedLink } from 'tamia-gatsby-link';

const Container = styled(Row)`
	width: 100vw;
	max-width: 1024px;
`;

const Prev = styled(Text)`
	position: relative;
	&::before {
		content: '←';
		position: absolute;
		transform: translateX(-130%);
	}
`;

const Next = styled(Text)`
	position: relative;
	&::after {
		content: '→';
		position: absolute;
		transform: translateX(30%);
	}
`;

type Props = {
	prev?: string,
	prevTitle?: string,
	next?: string,
	nextTitle?: string,
};

export default ({ prev, prevTitle, next, nextTitle }: Props) => (
	<Container>
		<Column width={[1, 1 / 2]}>
			{prev && (
				<QuotedLink to={prev}>
					<u>{prevTitle}</u>
					<Prev as="div" weight="bold">
						Previous
					</Prev>
				</QuotedLink>
			)}
		</Column>
		<Column width={[1, 1 / 2]} align="right">
			{next && (
				<QuotedLink to={next}>
					<u>{nextTitle}</u>
					<Next as="div" weight="bold">
						Next
					</Next>
				</QuotedLink>
			)}
		</Column>
	</Container>
);
