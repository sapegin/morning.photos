import { Link } from 'tamia-gatsby-link';
import styled from 'styled-components';

type Props = {
	variation: 'default' | 'page' | 'section';
};

const NavLink = styled(Link)<Props>`
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
