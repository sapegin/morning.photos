// @flow
import React from 'react';
import styled from '@emotion/styled';
import { getPhotoUrl, type Size } from '../util/photos';

const Image = styled('img', {
	shouldForwardProp: prop => ['src', 'width', 'height', 'alt'].includes(prop),
})`
	max-width: 100%;
	background-color: ${props => props.color};
`;

const IntrinsicImage = styled.img`
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
`;

const Container = styled('div', {
	shouldForwardProp: props => !['width', 'height', 'color'].includes(props),
})`
	width: ${props => props.width && `${props.width}px`};
	height: ${props => props.height && `${props.height}px`};
	background-color: ${props => props.color};
`;

const ImageContainer = styled('div', {
	shouldForwardProp: props => !['width', 'height'].includes(props),
})`
	position: relative;
	padding-bottom: ${props => `${(props.height / props.width) * 100}%`};
`;

type Props = {
	name: string,
	size: Size,
	alt?: string,
	width?: number,
	height?: number,
	color?: string,
	css?: string,
	intrinsicSize: ?{
		width?: number,
		height?: number,
	},
};

export default ({ name, size, alt = '', intrinsicSize, color, width, height, ...props }: Props) => {
	const src = getPhotoUrl(name, size);
	if (intrinsicSize) {
		return (
			<Container width={width} height={height} color={color}>
				<ImageContainer {...intrinsicSize}>
					<IntrinsicImage src={src} alt={alt} {...props} />
				</ImageContainer>
			</Container>
		);
	}
	return <Image src={src} alt={alt} width={width} height={height} color={color} {...props} />;
};
