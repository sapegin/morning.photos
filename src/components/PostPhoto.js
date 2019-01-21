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
	caption: ?string,
};

export default ({ name, alt, title, width, height }: Props) => (
	<Figure>
		<Photo name={name} alt={alt} intrinsicSize={{ width, height }} size="blog" />
		{title && (
			<Text as="figcaption" size="s" mt="s">
				{title}
			</Text>
		)}
	</Figure>
);
