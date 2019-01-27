// @flow
import React from 'react';
import { Text } from 'tamia';
import Image from '../components/Image';

type Props = {
	src: string,
	width: number,
	height: number,
	modified: number,
	alt?: string,
	title?: string,
	color?: string,
};

export default ({ src, alt, title, width, height, modified, color }: Props) => (
	<figure>
		<Image
			src={src}
			alt={alt}
			intrinsicSize={{ width, height }}
			modified={modified}
			color={color}
			size="blog"
		/>
		{title && (
			<Text as="figcaption" size="s" mt="s">
				{title}
			</Text>
		)}
	</figure>
);
