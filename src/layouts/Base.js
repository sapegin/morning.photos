import React from 'react';
import Helmet from 'react-helmet';
import Provider from './Provider';
import theme from '../theme';
import config from '../../gatsby-config';

const { lang, title, description, twitter } = config.siteMetadata;

const viewport = extra => 'width=device-width, initial-scale=1.0' + (extra ? `, ${extra}` : '');

// <meta charset="utf-8" />

/*<link
rel="alternative"
href="/feed.xml"
title={__('titleBlog')}
type="application/atom+xml"
/>*/

const Base = ({ viewportExtra, children }) => (
	<>
		<Helmet>
			<html lang={lang} />
			<meta name="theme-color" content={theme.colors.primary} />
			<meta name="description" content={description} />
			<meta property="og:type" content="website" />
			<meta property="og:title" content={title} />
			<meta name="twitter:creator" content={twitter} />
			<meta name="apple-mobile-web-app-capable" content="yes" />
			<meta name="viewport" content={viewport(viewportExtra)} />
		</Helmet>
		<Provider>{children}</Provider>
	</>
);

export default Base;
