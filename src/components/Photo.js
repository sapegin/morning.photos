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

type Props = {
	name: string,
	size: Size,
	alt?: string,
	width?: number,
	height?: number,
	color?: string,
	css?: string,
};

export default ({ name, size, alt = '', ...props }: Props) => (
	<Image src={getPhotoUrl(name, size)} alt={alt} {...props} />
);
