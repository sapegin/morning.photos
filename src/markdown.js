import React from 'react';
import { themeGet } from 'tamia';
import styled from '@emotion/styled';
import PhotoGrid from './components/PhotoGrid';
import PostPhoto from './components/PostPhoto';
import PostVideo from './components/PostVideo';
import Image from './components/Image';

const Container = styled.div`
	margin-bottom: ${themeGet('space.l')};

	& + & {
		margin-top: -${themeGet('space.m')};
	}

	figure > img {
		margin-bottom: 0;
	}
`;

export const Photo = props => (
	<Container>
		<PostPhoto {...props} />
	</Container>
);

export const Video = props => (
	<Container>
		<PostVideo {...props} />
	</Container>
);

export const Grid = ({ children }) => {
	const files = children.split(/\s+/);
	return (
		<Container>
			<PhotoGrid columns={files.length === 2 ? 2 : undefined}>
				{files.map(url => (
					<Image src={url} size="blog" />
				))}
			</PhotoGrid>
		</Container>
	);
};

// DON'T FORGET TO UPDATE gatsby-config.js!
export default {
	Photo,
	Video,
	Grid,
};
