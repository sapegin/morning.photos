import React from 'react';
import styled from 'styled-components';
import { getPhotoUrl, Size } from '../util/photos';

type OptionalSizeProps = {
	width?: number;
	height?: number;
};

type SizeProps = {
	width: number;
	height: number;
};

const IntrinsicImageContainer = styled('div')<OptionalSizeProps>`
	width: ${props => props.width && `${props.width}px`};
	height: ${props => props.height && `${props.height}px`};
`;

const IntrinsicImageWrapper = styled('div')<SizeProps>`
	position: relative;
	padding-bottom: ${p => `${(p.height / p.width) * 100}%`};
	background-color: ${p => p.color || p.theme.colors.light};
`;

const ResponsiveIntrinsicImageWrapper = styled(IntrinsicImageWrapper)`
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

const PlainImage = styled('img')`
	display: block;
	max-width: 100%;
	width: auto;
	height: auto;
	background-color: ${p => p.color};
`;

type Props = {
	src?: string;
	size?: Size;
	modified?: number;
	alt?: string;
	width?: number;
	height?: number;
	color?: string;
	css?: string;
	responsive?: boolean;
	intrinsicSize?: SizeProps;
};

export default function Image({
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
}: Props) {
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

	if (url) {
		return (
			<PlainImage src={url} alt={alt} width={width} height={height} color={color} {...props} />
		);
	}
	return null;
}
