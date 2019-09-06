const baseFont = 'Helvetica Neue, Arial, sans-serif';
const space = {
	xxs: '0.125rem', // 2px
	xs: '0.25rem', // 4px
	s: '0.5rem', // 8px
	m: '1rem', // 16px
	l: '2rem', // 32px
	xl: '4rem', // 64px
	xxl: '8rem', // 128px
	xxxl: '16rem', // 256px
};
const breakpoints = [
	'32rem', // 512px
	'48rem', // 768px
	'64rem', // 1024px
];
const fonts = {
	base: baseFont,
	heading: baseFont,
};
const fontSizes = {
	base: '1rem',
	xxl: '3rem',
	xl: '2rem',
	l: '1.6rem',
	s: '0.9375rem', // 15 px
	xs: '0.875rem', // 14 px
};
const colors = {
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
	selectionAlpha: 'rgba(255,237,117,0.25)',
};
const fontWeights = {
	base: 400,
	heading: 300,
	bold: 'bold',
};
const lineHeights = {
	base: 1.5,
	heading: 1.2,
};
const letterSpacings = {
	base: 0,
	heading: 0,
};
const radii = {
	base: '0.15em',
};
const headingBaseStyles = {
	color: colors.base,
	fontFamily: fonts.heading,
	fontWeight: fontWeights.heading,
	lineHeight: lineHeights.heading,
	letterSpacing: letterSpacings.heading,
};
const textBaseStyles = {
	color: colors.base,
	fontFamily: fonts.base,
	fontWeight: fontWeights.base,
	lineHeight: lineHeights.base,
	letterSpacing: letterSpacings.base,
};

const theme = {
	baseFontSize: '1.125em',
	blockMarginBottom: space.m,
	headingMarginTop: space.l,
	listMargin: '1.3em',
	page: {
		maxWidth: null,
		contentMaxWidth: '64rem', // 1024px
		textMaxWidth: '50rem',
		xPadding: space.m,
		yPadding: space.s,
	},
	fonts,
	space,
	fontSizes,
	fontWeights,
	lineHeights,
	letterSpacings,
	colors,
	radii,
	breakpoints,
	headingStyles: {
		// TODO
		1: {
			...headingBaseStyles,
			fontSize: fontSizes.xxl,
		},
		2: {
			...headingBaseStyles,
			fontSize: fontSizes.xl,
		},
		3: {
			...headingBaseStyles,
			fontSize: fontSizes.l,
		},
	},
	textStyles: {
		// TODO
		base: {
			...textBaseStyles,
		},
		bold: {
			...textBaseStyles,
			fontWeight: fontWeights.bold,
		},
		// small: {
		// 	...textBaseStyles,
		// 	fontSize: fontSizes.s,
		// },
		// xsmall: {
		// 	...textBaseStyles,
		// 	fontSize: fontSizes.xs,
		// },
		// italic: {
		// 	...textBaseStyles,
		// 	fontStyle: 'italic',
		// },
	},
} as const;

export default theme;

export const inverted = {
	...theme,
	colors: {
		...colors,
		bg: colors.base,
		base: colors.bg,
		primary: colors.bg,
		hover: '#e95d4e',
	},
} as const;
