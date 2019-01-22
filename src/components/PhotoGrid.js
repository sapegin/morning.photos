import styled from '@emotion/styled';
import { themeGet } from 'tamia';
import Grid from './Grid';

const PhotoGrid = styled(Grid)`
	margin-left: -${themeGet('page.xPadding')};
	margin-right: -${themeGet('page.xPadding')};

	@media (min-width: ${themeGet('breakpoints.small')}) {
		margin-left: 0;
		margin-right: 0;
	}
`;

export default PhotoGrid;
