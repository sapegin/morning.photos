module.exports = {
	siteMetadata: require('./config'),
	plugins: [
		'gatsby-plugin-react-helmet',
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
		'gatsby-plugin-typescript',
		{
			resolve: 'gatsby-plugin-goatcounter',
			options: {
				code: 'morning-photos',
				allowLocal: false,
			},
		},
	],
};
