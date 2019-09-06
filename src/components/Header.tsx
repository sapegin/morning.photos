import React from 'react';
import { Flex, Box } from 'tamia';
import Logo from './Logo';
import Nav from './Nav';

type Props = {
	url: string;
};

export default ({ url }: Props) => (
	<Flex as="header" role="banner">
		<Box width={[1, null, 'auto']} pb="s" alignItems="center">
			<Logo homepage={url === '/'} />
		</Box>
		<Box width={[1, null, 'auto']} pb="s" ml="auto">
			<Nav url={url} />
		</Box>
	</Flex>
);
