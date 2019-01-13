import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Box, themeGet } from 'tamia';

const Grid = styled(Box)`
	display: grid;
	gap: ${themeGet('space.m')};

	grid-auto-flow: dense;
	grid-template-columns: 1fr;
	@media (min-width: ${themeGet('breakpoints.small')}) {
		grid-template-columns: 1fr 1fr;
	}
	${props =>
		props.columns > 2 &&
		css`
			@media (min-width: ${props.theme.breakpoints.medium}) {
				grid-template-columns: 1fr 1fr 1fr;
			}
		`}
`;

Grid.defaultProps = {
	columns: 3,
};

export default Grid;
