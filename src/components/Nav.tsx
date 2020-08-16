import React from 'react';
import { Stack, Text } from 'tamia';
import NavLink from './NavLink';

const MENU = [
	{
		title: 'Portfolio',
		href: '/albums',
	},
	{
		title: 'Series',
		href: '/series',
	},
	{
		title: 'About me',
		href: '/about',
	},
] as const;

const getVariation = (url: string, currentUrl = '') => {
	if (url === currentUrl) {
		return 'page';
	}
	if (currentUrl.startsWith(url)) {
		return 'section';
	}
	return 'default';
};

type Props = {
	url: string;
};

export default ({ url }: Props) => (
	<nav>
		<Stack as="ul" gridGap="m" justifyContent="center" gridAutoFlow="column">
			{MENU.map(({ title, href }) => (
				<Text key={href} as="li">
					<NavLink
						href={href}
						variation={getVariation(href, url)}
						aria-current={href === url && 'page'}
					>
						{title}
					</NavLink>
				</Text>
			))}
		</Stack>
	</nav>
);
