import styled from 'styled-components';
import Image from './Image';

type Span = 'full' | 'double';
type Props = {
	span: Span;
};

const spansSmall = {
	full: '1 / -1',
	double: 'span 1',
};
const spansMedium = {
	full: undefined,
	double: 'span 2',
};

const GridImage = styled(Image)<Props>`
	grid-column: ${({ span }) => spansSmall[span]};
	@media (min-width: ${p => p.theme.breakpoints[0]}) {
		grid-column: ${({ span }) => spansMedium[span]};
	}
`;

export default GridImage;
