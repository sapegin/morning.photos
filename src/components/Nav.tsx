import React from 'react';
import { Stack, Box } from 'tamia';
import NavLink from './NavLink';

const MENU = [
	{
		title: 'Portfolio',
		href: '/albums',
	},
	{
		title: 'Subscribe',
		href: '/subscribe',
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
		<Stack as="ul" gridGap="m" justifyContent="center">
			{MENU.map(({ title, href }) => (
				<Box key={href} as="li">
					<NavLink
						href={href}
						variation={getVariation(href, url)}
						aria-current={href === url && 'page'}
					>
						{title}
					</NavLink>
				</Box>
			))}
		</Stack>
	</nav>
);
