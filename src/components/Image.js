// @flow
import React from 'react';
import styled from '@emotion/styled';
import { getPhotoUrl, type Size } from '../util/photos';

const IntrinsicImageContainer = styled('div', {
	shouldForwardProp: props => !['width', 'height'].includes(props),
})`
	width: ${props => props.width && `${props.width}px`};
	height: ${props => props.height && `${props.height}px`};
`;

const IntrinsicImageWrapper = styled('div', {
	shouldForwardProp: props => !['width', 'height', 'color'].includes(props),
})`
	position: relative;
	padding-bottom: ${p => `${(p.height / p.width) * 100}%`};
	background-color: ${p => p.color || p.theme.colors.lighter};
`;

const ResponsiveIntrinsicImageWrapper = styled(IntrinsicImageWrapper, {
	shouldForwardProp: props => !['width', 'height'].includes(props),
})`
	padding-bottom: ${p => `calc(${(p.height / p.width) * 100}% + ${p.theme.page.xPadding})`};
	margin-left: -${p => p.theme.page.xPadding};
	margin-right: -${p => p.theme.page.xPadding};

	@media (min-width: ${p => p.theme.page.contentMaxWidth}) {
		padding-bottom: ${p => `${(p.height / p.width) * 100}%`};
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
	background-color: ${p => p.color};
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
	size = 'medium',
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
			<IntrinsicImageContainer width={width} height={height}>
				<Wrapper color={color} {...intrinsicSize}>
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
