import React from 'react';
import { Flex, Box } from 'tamia';
import Logo from './Logo';
import Nav from './Nav';

type Props = {
	url: string;
};

export default ({ url }: Props) => (
	<Box as="header" role="banner" display={['block', null, 'flex']}>
		<Flex pb="s" justifyContent="center">
			<Logo homepage={url === '/'} />
		</Flex>
		<Box pb="s" ml="auto">
			<Nav url={url} />
		</Box>
	</Box>
);
