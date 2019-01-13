// @flow
import React from 'react';
import { Text } from 'tamia';
import { Link } from 'tamia-gatsby-link';
import config from '../../gatsby-config';

const { title } = config.siteMetadata;

type Props = {
	homepage: boolean,
};

export default ({ homepage }: Props) => (
	<Text weight="bold" as={homepage ? 'h1' : 'p'}>
		{homepage ? title : <Link href="/">{title}</Link>}
	</Text>
);
