// eslint-disable-next-line no-global-assign
require = require('esm')(module);

module.exports = {
	siteMetadata: require('./config'),
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-emotion',
		'gatsby-plugin-lodash',
		'gatsby-plugin-remove-trailing-slashes',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/content`,
				name: 'pages',
			},
		},
		{
			resolve: 'gatsby-mdx',
			options: {
				extensions: ['.mdx', '.md'],
				mdPlugins: [require('./src/remark/photo')],
				globalScope: `
					import { Photo, Video, Grid } from '${__dirname}/src/markdown'
					export default { Photo, Video, Grid }
					`,
			},
		},
		{
			resolve: `gatsby-plugin-feed`,
			options: {
				feeds: [
					{
						serialize: require('gatsby-mdx/feed').feeds[0].serialize,
						query: `
							{
								allMdx(
									filter: { fileAbsolutePath: { regex: "/blog/.*/" } }
									sort: { fields: [frontmatter___date], order: DESC },
									limit: 20,
								) {
									edges {
										node {
											frontmatter {
												title
												date
											}
											fields {
												slug
											}
											excerpt
										}
									}
								}
							}
							`,
						output: '/feed.xml',
					},
				],
			},
		},
		'gatsby-plugin-netlify',
		'gatsby-plugin-flow',
	],
};
