import styled from '@emotion/styled';
import Grid from './Grid';

const PhotoGrid = styled(Grid)`
	margin-left: -${p => p.theme.page.xPadding};
	margin-right: -${p => p.theme.page.xPadding};

	@media (min-width: ${p => p.theme.breakpoints.small}) {
		margin-left: 0;
		margin-right: 0;
	}
`;

export default PhotoGrid;
