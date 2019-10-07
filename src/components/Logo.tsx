import React from 'react';
import { Text } from 'tamia';
import { Link } from 'tamia-gatsby-link';

const TITLE = 'Artem Sapegin Photography';

type Props = {
	homepage?: boolean;
};

export default function Logo({ homepage }: Props) {
	return (
		<Text as={homepage ? 'h1' : 'div'} variant="bold" display="inline-block">
			{homepage ? TITLE : <Link href="/">{TITLE}</Link>}
		</Text>
	);
}
