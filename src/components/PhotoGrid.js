import styled from '@emotion/styled';
import Grid from './Grid';

const PhotoGrid = styled(Grid)`
	margin-left: -${p => p.page.xPadding};
	margin-right: -${p => p.page.xPadding};

	@media (min-width: ${p => p.breakpoints.small}) {
		margin-left: 0;
		margin-right: 0;
	}
`;

export default PhotoGrid;
