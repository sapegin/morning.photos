import React from 'react';
import Helmet from 'react-helmet';
import Provider from './Provider';
import theme from '../theme';

type Props = {
	children: React.ReactNode;
};

export default function Base({ children }: Props) {
	return (
		<>
			<Helmet>
				<html lang="en" />
				<meta name="theme-color" content={theme.colors.primary} />
				<meta name="twitter:creator" content="iamsapegin" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<link rel="preconnect" href="https://res.cloudinary.com" />
			</Helmet>
			<Provider>{children}</Provider>
		</>
	);
}
