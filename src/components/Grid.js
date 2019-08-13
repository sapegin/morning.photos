import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Box } from 'tamia';

const Grid = styled(Box)`
	display: grid;
	gap: ${p => p.theme.space.m};

	grid-auto-flow: dense;
	grid-template-columns: 1fr;
	@media (min-width: ${p => p.theme.breakpoints.small}) {
		grid-template-columns: 1fr 1fr;
	}
	${p =>
		p.columns > 2 &&
		css`
			@media (min-width: ${p.theme.breakpoints.medium}) {
				grid-template-columns: 1fr 1fr 1fr;
			}
		`}
`;

Grid.defaultProps = {
	columns: 3,
};

export default Grid;
