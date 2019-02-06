// @flow
import React from 'react';
import { Row, Column, Text } from 'tamia';
import SubscriptionForm from './SubscriptionForm';

export default () => (
	<Row narrow alignItems="baseline" justifyContent="center">
		<Column width={[1, 1, 'auto']} align="center">
			<Text as="h2" size="l" mb="s">
				Never miss a post
			</Text>
		</Column>
		<Column width={[1, 1, 'auto']}>
			<SubscriptionForm from="Blog" />
		</Column>
	</Row>
);
