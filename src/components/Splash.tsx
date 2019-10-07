import React from 'react';
import styled, { css } from 'styled-components';
import Inverted from './Inverted';

// TODO: Smaller max height on narrow screens
// TODO: Think about art direction

type ContainerProps = {
	inverted?: boolean;
};

const Container = styled.div<ContainerProps>`
	height: 33vh;
	min-height: 100px;
	max-height: 400px;
	${props =>
		props.inverted &&
		css`
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			text-shadow: 0 0 0.2ex rgba(0, 0, 0, 0.3);
		`}
`;

const Image = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: inherit;
	min-height: 100px;
	max-height: 400px;
	background-color: ${p => p.theme.colors.bg};
	background-position: center top;
	background-repeat: no-repeat;
	background-size: cover;
	z-index: -1;
`;

type Props = {
	src: string;
	inverted?: boolean;
	children: React.ReactNode;
};

export default ({ src, inverted, children }: Props) => {
	const content = (
		<Container inverted={inverted}>
			<Image style={{ backgroundImage: `url(${src})` }} />
			{children}
		</Container>
	);
	if (inverted) {
		return <Inverted>{content}</Inverted>;
	}
	return content;
};
