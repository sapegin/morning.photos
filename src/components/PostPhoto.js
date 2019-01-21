// @flow
import React from 'react';
import styled from '@emotion/styled';
import { Text } from 'tamia';
import Photo from '../components/Photo';

const Figure = styled.figure`
	width: 1024px;
	max-width: 100vw;
`;

type Props = {
	name: string,
	width: number,
	height: number,
	alt?: string,
	title?: string,
	color?: string,
};

export default ({ name, alt, title, width, height, color }: Props) => (
	<Figure>
		<Photo name={name} alt={alt} intrinsicSize={{ width, height }} color={color} size="blog" />
		{title && (
			<Text as="figcaption" size="s" mt="s">
				{title}
			</Text>
		)}
	</Figure>
);
