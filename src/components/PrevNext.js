// @flow
import React from 'react';
import styled from '@emotion/styled';
import { Box, Row, Column, Text, themeGet } from 'tamia';
import { QuotedLink } from 'tamia-gatsby-link';

const Prev = styled(Text)`
	position: relative;
	&::before {
		content: '← ';
		@media (min-width: ${themeGet('breakpoints.large')}) {
			position: absolute;
			transform: translateX(-130%);
		}
	}
`;

const Next = styled(Text)`
	position: relative;
	&::after {
		content: ' →';
		@media (min-width: ${themeGet('breakpoints.large')}) {
			position: absolute;
			transform: translateX(30%);
		}
	}
`;

type Props = {
	prev?: string,
	prevTitle?: string,
	next?: string,
	nextTitle?: string,
};

export default ({ prev, prevTitle, next, nextTitle }: Props) => (
	<Row>
		<Column width={[1, 1 / 2]}>
			{prev && (
				<Box mb="m">
					<QuotedLink to={prev}>
						<u>{prevTitle}</u>
						<Prev as="div" weight="bold">
							Previous
						</Prev>
					</QuotedLink>
				</Box>
			)}
		</Column>
		<Column width={[1, 1 / 2]} align="right">
			{next && (
				<Box mb="m">
					<QuotedLink to={next}>
						<u>{nextTitle}</u>
						<Next as="div" weight="bold">
							Next
						</Next>
					</QuotedLink>
				</Box>
			)}
		</Column>
	</Row>
);
