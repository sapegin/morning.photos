// @flow
import React from 'react';
import styled from '@emotion/styled';
import { Text, Heading, themeGet } from 'tamia';
import { Link } from 'tamia-gatsby-link';
import SubscriptionForm from './SubscriptionForm';

const Container = styled.section`
	margin-left: calc((${themeGet('space.m')} + ${themeGet('space.s')}) * -1);
	padding-left: ${themeGet('space.m')};
	border-left: ${themeGet('space.s')} solid ${themeGet('colors.base')};
`;

export default () => (
	<Container>
		<Heading level={2} mb="s">
			Want more posts like this?
		</Heading>
		<Text size="m" mb="m">
			Subscribe to <Link to="/subscribe">my newsletter</Link> and receive all new posts and photos.
		</Text>
		<SubscriptionForm />
	</Container>
);
