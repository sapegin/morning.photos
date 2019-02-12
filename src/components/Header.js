// @flow
import React from 'react';
import { Row, Column } from 'tamia';
import Logo from './Logo';
import Nav from './Nav';

type Props = {
	url: string,
};

export default ({ url }: Props) => (
	<Row as="header" role="banner">
		<Column width={[1, null, 'auto']} pb="s" align="center">
			<Logo homepage={url === '/'} />
		</Column>
		<Column width={[1, null, 'auto']} pb="s" push="right">
			<Nav url={url} />
		</Column>
	</Row>
);
