import styled from '@emotion/styled';
import { themeGet } from 'tamia';
import Image from './Image';

const spansSmall = {
	full: '1 / -1',
	double: 'span 1',
};
const spansMedium = {
	double: 'span 2',
};

const GridImage = styled(Image)`
	grid-column: ${({ span }) => spansSmall[span]};
	@media (min-width: ${themeGet('breakpoints.small')}) {
		grid-column: ${({ span }) => spansMedium[span]};
	}
`;

export default GridImage;
