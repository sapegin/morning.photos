// @flow
import { Link } from 'tamia-gatsby-link';
import { themeGet } from 'tamia';
import styled from '@emotion/styled';

type Props = {
	variation: 'default' | 'section' | 'page',
};

const NavLink = styled(Link)`
	&& {
		font-size: ${themeGet('fontSizes.s')};
		font-weight: ${props => props.variation !== 'default' && 'bold'};
		text-decoration: ${props => props.variation === 'page' && 'none'};
	}
`;

NavLink.defaultProps = {
	variation: 'default',
};

export default NavLink;
