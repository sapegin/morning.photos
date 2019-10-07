import styled from 'styled-components';
import Image from './Image';

type Span = 'single' | 'double' | 'full';
type Props = {
	span?: Span;
};

const spansSmall = {
	single: undefined,
	double: 'span 1',
	full: '1 / -1',
};
const spansMedium = {
	single: undefined,
	double: 'span 2',
	full: undefined,
};

const GridImage = styled(Image)<Props>`
	grid-column: ${({ span }) => span && spansSmall[span]};
	@media (min-width: ${p => p.theme.breakpoints[0]}) {
		grid-column: ${({ span }) => span && spansMedium[span]};
	}
`;

GridImage.defaultProps = {
	span: 'single',
};

export default GridImage;
