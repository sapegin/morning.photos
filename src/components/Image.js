import React from 'react';
import styled from '@emotion/styled';
import Photo from '../components/Photo';
import { isPhotoUrl, getPhotoNameFromUrl } from '../util/photos';

const ImageStyle = styled.img`
	max-width: 100%;
	width: auto;
	height: auto;
`;

const Image = ({ src, size, ...props }) =>
	isPhotoUrl(src) ? (
		<Photo name={getPhotoNameFromUrl(src)} size={size} {...props} />
	) : (
		<ImageStyle src={src} {...props} />
	);

Image.defaultProps = {
	size: 'blog',
};

export default Image;
