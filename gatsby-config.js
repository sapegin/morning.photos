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
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: ['gatsby-remark-photo'],
			},
		},
		'gatsby-plugin-netlify',
		'gatsby-plugin-flow',
	],
};
