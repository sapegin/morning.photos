import dotenv from 'dotenv';
import type { GatsbyConfig } from 'gatsby';
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from './src/shared';

dotenv.config();

const config: GatsbyConfig = {
	siteMetadata: {
	lang: 'en',
	title: SITE_TITLE,
	description: SITE_DESCRIPTION,
	siteUrl: SITE_URL,
	email: 'artem@sapegin.me',
	twitter: '@iamsapegin',
	fbappid: '155027288234245',
},
	plugins: [
		'gatsby-plugin-image',
		'gatsby-plugin-styled-components',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/content`,
				name: 'pages',
			},
		},
		'gatsby-transformer-remark',
		'gatsby-plugin-netlify',
		{
			resolve: 'gatsby-plugin-goatcounter',
			options: {
				code: 'morning-photos',
				allowLocal: false,
			},
		},
	],
};

export default config;
