// @flow
import React from 'react';
import styled from '@emotion/styled';
import { Text } from 'tamia';
import { getPhotoUrl } from '../util/photos';

const Figure = styled.figure`
	width: 1024px;
	max-width: 100vw;
`;

type Props = {
	name: string,
	caption: ?string,
};

export default ({ name, caption }: Props) => (
	<Figure>
		<img src={getPhotoUrl(name, 'blog')} alt="" />
		{caption && (
			<Text as="figcaption" size="s" mt="s">
				{caption}
			</Text>
		)}
	</Figure>
);
