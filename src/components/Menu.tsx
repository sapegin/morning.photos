import { Fragment } from 'react';
import { Box } from './Box';
import { Grid } from './Grid';
import { Link } from './Link';
import { Text } from './Text';
import { Stack } from './Stack';

type Props = {
	current: string;
};

interface Item {
	title: string;
	href: string;
}

const ITEMS: Item[] = [
	{
		title: 'Photos',
		href: '/photos/',
	},
	{
		title: 'Series',
		href: '/series/',
	},
	{
		title: 'Blog',
		href: '/blog/',
	},
	{
		title: 'Zine',
		href: '/zine/',
	},
	{
		title: 'About',
		href: '/about/',
	},
];

function isCurrent(href: string, current: string) {
	return current.startsWith(href);
}

export function Menu({ current }: Props) {
	return (
		<nav aria-label="Main">
			<Stack
				as="ul"
				direction="row"
				columnGap="m"
				rowGap={{ tablet: 'm' }}
				justifyItems="center"
			>
				{ITEMS.map(({ title, href }) => (
					<Fragment key={href}>
						<Text as="li" variant="menu">
							<Link
								href={href}
								css={{
									whiteSpace: 'nowrap',
									textShadow: isCurrent(href, current)
										? `2px 2px color-mix(in hsl, token(colors.primary), transparent 70%)`
										: undefined,
									// HACK: Increase specificity to override Link styles (Astro production
									// build imports CSS in a different order)
									'&&': {
										textDecoration: 'none',
									},
									_hover: {
										textDecoration: 'underline',
									},
								}}
							>
								{title}
							</Link>
						</Text>
					</Fragment>
				))}
			</Stack>
		</nav>
	);
}
