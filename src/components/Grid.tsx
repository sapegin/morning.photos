import styled, { css } from 'styled-components';
import { Box } from 'tamia';

type Props = {
	columns?: number;
};

const Grid = styled(Box)<Props>`
	display: grid;
	gap: ${p => p.theme.space.m};

	grid-auto-flow: dense;
	grid-template-columns: 1fr;
	@media (min-width: ${p => p.theme.breakpoints[0]}) {
		grid-template-columns: 1fr 1fr;
	}
	${p =>
		p.columns &&
		p.columns > 2 &&
		css`
			@media (min-width: ${p.theme.breakpoints[1]}) {
				grid-template-columns: 1fr 1fr 1fr;
			}
		`}
`;

Grid.defaultProps = {
	columns: 3,
};

export default Grid;
