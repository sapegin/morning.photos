// @flow
import React from 'react';
import { Row, Column } from 'tamia';
import NavLink from './NavLink';
import config from '../../config';

const { menu } = config;

const getVariation = (url, currentUrl = '') => {
	if (url === currentUrl) {
		return 'page';
	}
	if (currentUrl.startsWith(url)) {
		return 'section';
	}
	return 'default';
};

type Props = {
	url: string,
};

export default ({ url }: Props) => (
	<nav>
		<Row as="ul" narrow justifyContent="center">
			{menu.map(({ title, href }) => (
				<Column key={href} as="li">
					<NavLink
						href={href}
						variation={getVariation(href, url)}
						aria-current={href === url && 'page'}
					>
						{title}
					</NavLink>
				</Column>
			))}
		</Row>
	</nav>
);
