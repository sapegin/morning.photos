import getTheme from 'tamia/lib/theme';

const font = 'Helvetica Neue, Arial, sans-serif';

const theme = getTheme({
	fontSizes: {
		xxl: '3rem',
		xl: '2rem',
		l: '1.6rem',
		s: '0.9375rem', // 15 px
		xs: '0.875rem', // 14 px
	},
	page: {
		maxWidth: null,
		contentMaxWidth: '64rem', // 1024px
		textMaxWidth: '50rem',
		xPadding: '1rem',
		yPadding: '0.5rem',
	},
	fonts: {
		base: font,
		heading: font,
	},
	fontWeights: {
		base: 400,
		heading: 300,
	},
	lineHeights: {
		heading: 1.2,
	},
	colors: {
		bg: '#fff',
		base: '#222',
		light: '#ccc',
		lighter: '#efefef',
		primary: '#222',
		hover: '#de3a1e',
		lightHover: '#fff',
		darkHover: '#555',
		link: '#222',
		visited: '#8c5ad2',
		photoBackground: '#1a1a1a',
		selection: 'rgba(255, 230, 15, 0.5)',
	},
	radii: {
		base: '0.15em',
	},
	breakpoints: {
		small: '32rem', // 512px
		huge: '64rem', // 1024px
	},
});

export default theme;

export const inverted = {
	...theme,
	colors: {
		...theme.colors,
		bg: theme.colors.base,
		base: theme.colors.bg,
		primary: theme.colors.bg,
		hover: '#e95d4e',
	},
};
