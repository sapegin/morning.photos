// @flow
import React from 'react';
import styled from '@emotion/styled';
import { themeGet } from 'tamia';
import { getPhotoUrl, type Size } from '../util/photos';

const IntrinsicImageContainer = styled('div', {
	shouldForwardProp: props => !['width', 'height', 'color'].includes(props),
})`
	width: ${props => props.width && `${props.width}px`};
	height: ${props => props.height && `${props.height}px`};
	background-color: ${props => props.color || props.theme.colors.lighter};
`;

const IntrinsicImageWrapper = styled('div', {
	shouldForwardProp: props => !['width', 'height'].includes(props),
})`
	position: relative;
	padding-bottom: ${props => `${(props.height / props.width) * 100}%`};
`;

const ResponsiveIntrinsicImageWrapper = styled('div', {
	shouldForwardProp: props => !['width', 'height'].includes(props),
})`
	position: relative;
	padding-bottom: ${props =>
		`calc(${(props.height / props.width) * 100}% + ${props.theme.page.xPadding})`};
	margin-left: -${themeGet('page.xPadding')};
	margin-right: -${themeGet('page.xPadding')};

	@media (min-width: ${themeGet('page.contentMaxWidth')}) {
		padding-bottom: ${props => `${(props.height / props.width) * 100}%`};
		margin-left: auto;
		margin-right: auto;
	}
`;

const IntrinsicImage = styled.img`
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
`;

const PlainImage = styled('img', {
	shouldForwardProp: prop => ['src', 'width', 'height', 'alt'].includes(prop),
})`
	display: block;
	max-width: 100%;
	width: auto;
	height: auto;
	background-color: ${props => props.color};
`;

type Props = {
	src?: string,
	size?: Size,
	modified?: number,
	alt?: string,
	width?: number,
	height?: number,
	color?: string,
	css?: string,
	responsive: boolean,
	intrinsicSize: ?{
		width?: number,
		height?: number,
	},
};

const Image = ({
	src = '',
	size = 'blog',
	alt = '',
	modified,
	intrinsicSize,
	color,
	width,
	height,
	responsive = true,
	...props
}: Props) => {
	const url = src.startsWith('/') ? src : getPhotoUrl(src, modified, size || width);
	const Wrapper = responsive ? ResponsiveIntrinsicImageWrapper : IntrinsicImageWrapper;
	if (intrinsicSize) {
		return (
			<IntrinsicImageContainer width={width} height={height} color={color}>
				<Wrapper {...intrinsicSize}>
					{url && <IntrinsicImage src={url} alt={alt} {...props} />}
				</Wrapper>
			</IntrinsicImageContainer>
		);
	}
	return (
		url && <PlainImage src={url} alt={alt} width={width} height={height} color={color} {...props} />
	);
};

export default Image;
