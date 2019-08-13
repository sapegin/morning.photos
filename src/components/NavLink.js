// @flow
import { Link } from 'tamia-gatsby-link';
import styled from '@emotion/styled';

const NavLink = styled(Link)`
	&& {
		font-size: ${p => p.theme.fontSizes.s};
		font-weight: ${p => p.variation !== 'default' && 'bold'};
		text-decoration: ${p => p.variation === 'page' && 'none'};
	}
`;

NavLink.defaultProps = {
	variation: 'default',
};

export default NavLink;
